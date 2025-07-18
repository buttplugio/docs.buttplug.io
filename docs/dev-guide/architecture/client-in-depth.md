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

- *Embedded Connectors*, which contains the client and its connected server instance. This means that the whole Buttplug system is running in the same process as the application.
- *Remote Connectors*, which means the client is using some mechanism (TCP, Websockets, IPC, etc...) to talk to a server in another process.

As a Buttplug developer, you'll usually only have a couple of interactions with connectors.

- Setting up them up, adding things like the name of your client, and maybe a network address or some other identifying information if needed.
- Passing them to the client when calling the Connect method.

That's it. After that, outside of very special circumstances that we'll cover in the Winning Ways chapter, you'll rarely deal with your connector again. You set it up, connect with it, then the Client manages it for the life of your Buttplug session.

## Client Lifetime

After handling connections, clients mainly exist as a frontend for event emitting and device discovery. Devices can be discovered using something like `StartScanning()` and `StopScanning()` methods. Changes in device connectivity and asynchronous server errors (i.e. errors not caused by commands from the client) will be relayed through whatever event system is provided by the language/runtime currently being used.