# Client Architecture

![Buttplug Client Architecture Diagram](/img/dev-guide/architecture/client.png)

Applications use clients to talk to Buttplug Servers. Let's go over what each part of clients and connectors do.

## Clients

The client is the name for the publically exposed API that an application uses to access Buttplug, and acts as a bookkeeper for system state. Instead of writing raw protocol messages, you call methods on the client, and it turns them into messages for you, while also managing replies from messages it has generated from earlier calls.

The client's main functions are:

- Manage connecting/disconnecting with the server, via Connectors
- Starts/stops device enumeration, while also keeping track of all devices the server claims to have added/removed and emitting updates for these events. The devices are exposed as Client Devices.

## Connectors

Connectors are how clients and servers talk to each other. There are two classes of connectors:

- *Remote Connectors*, which means the client is using some mechanism (TCP, Websockets, IPC, etc...) to talk to a server in another process.
- *Embedded Connectors*, which contains the client and its connected server instance. This means that the whole Buttplug system is running in the same process as the application.

As a Buttplug developer, you'll usually only have a couple of interactions with connectors.

- Setting up them up, adding things like the name of your client, and maybe a network address or some other identifying information if needed.
- Passing them to the client when calling the Connect method.

That's it. After that, outside of very special circumstances that we'll cover in the Winning Ways chapter, you'll rarely deal with your connector again. You set it up, connect with it, then the Client manages it for the life of your Buttplug session.

## Client Lifetime

After handling connections, clients mainly exist as a frontend for event emitting and device discovery. Devices can be discovered using something like `StartScanning()` and `StopScanning()` methods. Changes in device connectivity and asynchronous server errors (i.e. errors not caused by commands from the client) will be relayed through whatever event system is provided by the language/runtime currently being used.

## Client Events

Clients emit events for asynchronous notifications from the server. The exact API varies by language (callbacks, event emitters, streams, etc.), but the reference implementations we provide expose these core events. Other implementations may vary in naming or structure, but should provide equivalent functionality.

### Device Events

| Event | When It Fires | What You Receive |
|-------|---------------|------------------|
| DeviceAdded | A new device connects | The new device object |
| DeviceRemoved | A device disconnects | The removed device (or its index) |

In protocol V4, the server sends the complete device list on any change. Client libraries typically diff this list and emit individual add/remove events for convenience, though implementations may handle this differently.

### Scanning Events

| Event | When It Fires |
|-------|---------------|
| ScanningFinished | Server completes a scan cycle |

Note that ScanningFinished does **not** mean no devices were found. Scanning may complete successfully with or without discovering devices. Some connection types (like Bluetooth) may continue finding devices after the initial scan completes.

### Connection Events

| Event | When It Fires |
|-------|---------------|
| ServerDisconnect | Connection to server lost |
| PingTimeout | Client missed ping deadline (if ping enabled) |

After a disconnect event, all device references should be considered invalid. You'll need to reconnect and request a new device list.

### Sensor Events

| Event | When It Fires | What You Receive |
|-------|---------------|------------------|
| InputReading | Subscribed sensor sends data | Device index, feature index, reading |

Sensor readings arrive as events when you've subscribed to a sensor input. See the [Client Devices](./client-device-in-depth) section for subscription details.

## Message ID Tracking

Every message sent to the server includes an `Id` field. Client libraries typically handle this automatically:

1. Client generates a unique ID for each outgoing message (often an incrementing counter)
2. Client stores a reference to the pending request, keyed by ID
3. When a response arrives, the client matches it to the pending request by ID
4. The original caller receives the response (or error)

This enables **out-of-order responses** - if you send commands to devices A and B, B might respond before A. The ID tracking ensures each response reaches the correct caller.

:::tip You Likely Won't Need to Manage IDs

In the reference implementations, this is handled internally by the client library. You won't see message IDs when using the client API - they're mentioned here to help you understand how the system works if you're debugging connection issues or building your own client.

:::

## Handling Errors

### Error Types

When commands fail, the server returns an error with a code indicating the category. These codes are defined in the [protocol spec](/docs/spec/status#error):

| Error Code | Name | Meaning |
|------------|------|---------|
| 0 | ERROR_UNKNOWN | Unexpected/uncategorized error |
| 1 | ERROR_INIT | Handshake failed (version mismatch, invalid client name) |
| 2 | ERROR_PING | Ping timeout occurred |
| 3 | ERROR_MSG | Message parsing failed or invalid message |
| 4 | ERROR_DEVICE | Device command failed |

### Common Failure Scenarios

**Device Disconnects Mid-Command**
- The command returns ERROR_DEVICE
- A DeviceRemoved event should fire
- All subsequent commands to that device will fail
- The device may reconnect later (watch for DeviceAdded)

**Invalid Feature or Value**
- Sending a command to a non-existent feature index returns ERROR_DEVICE
- Sending a step value outside the valid range returns ERROR_DEVICE
- Checking device capabilities before sending commands can help avoid these errors

**Connection Lost**
- A disconnect event should fire
- All pending commands fail
- All device references become invalid
- You must create a new client connection to continue

### Error Recovery

Most Buttplug errors require user intervention (reconnect the device, restart the server, etc.). In general:

- **Log errors** for debugging
- **Update UI** to reflect device/connection state
- **Avoid aggressive retry logic** - if a device command fails, the device likely disconnected

## Connector Types in Practice

:::tip Objectivity and Pseudocode Ahead

The examples in this section are pseudocode to illustrate concepts. Check your specific client library's documentation for actual API usage.

:::

### Remote Connectors

The most common setup uses a remote WebSocket connector to talk to Intiface Central:

```
connector = WebSocketConnector("ws://127.0.0.1:12345")
client.connect(connector)
```

The default Intiface Central address is `ws://127.0.0.1:12345`. Users can change this port in Intiface Central's settings.

Remote connectors are generally recommended because:
- Users can update Intiface Central independently of your application
- Device support improvements don't require app updates
- Intiface Central handles all the hardware complexity

### Embedded Connectors

For advanced use cases, you can embed the server directly in your application:

```
server = ButtplugServer("My App Server")
connector = EmbeddedConnector(server)
client.connect(connector)
```

Embedded connectors mean:
- Your application is fully self-contained (no external dependencies at runtime)
- You're responsible for updating the library to get new device support
- You take on the complexity of hardware manager configuration

See the Embedding section in the cookbook for detailed guidance on embedded setups.