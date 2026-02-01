# Client Devices

When a Client is notified by the server that a device has connected, it will create a Client Device instance. These instances are accessible by developers, and are how developers can control devices from the client. A Client Device contains:

- The index of the device, an unsigned 32-bit integer that identifies the device to the server. This
  index will be unique per device. If a device reconnects it will usually use the same index, so it can be used to save configuration between sessions (though it may change if the user clears their server configuration).
- The name of the device as present to the client. This may not always be the exact product name of
  the device, but acts as an identifier for the application user.
- The capabilities of the device (For instance, can the device vibrate? If so, how many vibration
  motors does it have? How many levels of power do those motors have? Etc...)
- An event emitter, for handling device disconnection/reconnection events, as well as emitting any
  sensor readings the device might receive (accelerometer, pressure, etc... depending on the
  hardware in question)

Client devices are accessible through the client instance, and will generally live through the lifetime of the device connection. Once a device has disconnected, all calls to a client device will return errors.

## Device Features

Each device is made of one or more features, which define what the device can do. These can be anything from vibration motors, to stroker axes, to battery level reading access. [Output types](../../spec/output#outputtype) and [Input types](../../spec/input#inputtype) for features are defined in the [Buttplug API Spec](../../spec/).

Features contain:
- A basic text description of what they do, for display in UI
- Dictionaries of OutputTypes to Output Settings, for instance, an entry for the Vibrate OutputType
  (let's say a lovense device), with a corresponding field that denotes how many steps of vibration
  the device can handle (which, for a lovense vibrator, will always be a maximum of 20. All lovense vibrators have 20 steps of vibration available. The number presented here might be lower as the user may have set an upper vibration speed limit in the server).
- Dictionaries of InputTypes to Input Settings, for instance, an entry for the Pressure InputType,
  with a corresponding field that denotes how many steps of pressure we can read from the device. Some fields, like Battery, may have no settings fields, as they are assumed to return a set of values (in this case, 0-100 reflecting percentage).

Not all devices will have both inputs and outputs, many will just have outputs, and likely a single output at that.

:::tip What kind of units will Outputs and Inputs take?

This is, unfortunately, one of the hardest parts of dealing with the type of hardware our library provides access to. There are almost never "units", just "steps". Vibrators and fucking machines usually just come with an a number of set speeds they run at with no relation to power or frequency. Strokers may have encoder ticks but usually don't correspond to any sort of actual length measurement. The best we can do is provide the number of steps we know of that the device provides.

:::

## Controlling Devices and Features

Controlling a device is usually a matter of controlling its features. How this happens will differ between different client implementations, but will usually take one or more of the following forms, with the example being a device with 2 vibration motors:

- The top level _Device_ will have some sort of `run_output()` command, which takes an output type
  and a value to set it to. If this is used, all features that support the Vibrate OutputType will
  be set to this value.
  - There may be two variations of the arguments this command takes, one that takes a value between
    0 and the number of steps defined in the feature, as well as one that takes a floating point
    value between 0.0 and 1.0, which will automatically scale to the range of steps allowed by the
    feature.
- Each feature will also have some sort of `run_output()` command, which will allow setting the
  value for just that feature. This allows developers to only control one of the two available
  motors, setting them to different speeds.

Depending on language capabilities, there may also be a generic way to put together commands, useful for building complex programmatic structures for control.

## Value Systems

At the message level, device features accept commands only in raw steps. Client libraries typically support break these values out into two different types.

:::tip Objectivity and Pseudocode Ahead

We haven't gotten into examples yet, so all code in this section is just random pseudocode to give you an idea of how things *might* work in the implementation you're using. There's no telling whether the author of the client library you're using actually does things this way, it's just how we as the buttplug core dev team write our clients.

:::

### Percentage-Based Values (Recommended)

Values between 0.0 and 1.0 that are automatically scaled to the device's capabilities:

```
device.vibrate.percent(0.5)  // 50% power - works on any device
```

This is the recommended approach for most applications because:
- It works consistently across all devices regardless of their step counts
- It's ideal for normalized input values
- The client library handles the conversion to actual device steps

### Step-Based Values

Raw integer values within the device's StepCount range:

```
device.vibrate.steps(10)  // Exactly step 10, regardless of max steps (errors if over max)
```

Use step-based values when:
- You need precise control over exact device behavior
- You're working with device-specific patterns or sequences
- You want to ensure consistent behavior across sessions

### Checking Device Capabilities

Before sending commands, you can query what a device supports:

```
// Check if device has vibration. This may be an enum value in your impl.
if (device.hasOutput("Vibrate")) {
    // Get the value range for the first vibration feature
    range = device.features[0].outputs["Vibrate"].valueRange  // e.g., [0, 20]
}
```

The value range tells you the valid step values. A range of `[0, 20]` means steps 0 through 20 are valid (21 total levels including off).

## Command Patterns

Client libraries typically provide multiple ways to control devices:

### All-Features Commands

Set all features of a given type to the same value:

```
device.vibrate.percent(0.5)      // All vibration motors at 50%
device.oscillate.percent(0.8)    // All oscillation features at 80%
```

### Per-Feature Commands

Control individual features when a device has multiple motors/axes:

```
device.features[0].vibrate.percent(0.8)  // First motor at 80%
device.features[1].vibrate.percent(0.3)  // Second motor at 30%
```

### Output Types

Different output types exist for different device capabilities:

| OutputType | Use Case | Example Devices |
|------------|----------|-----------------|
| Vibrate | Vibration motors | Most toys |
| Oscillate | Speed-controlled movement | Fucking machines |
| Position | Instant position change | Strokers (servo mode) |
| HwPositionWithDuration | Hardware regulated timed position movement | Strokers, linear actuators |
| Rotate / RotationWithDirection | Rotating mechanisms | Rotating toys |
| Constrict | Pumps and squeezing | Air pumps |
| Temperature | Heating/cooling | Warming toys |

See the [Output Types in the Spec](../../spec/output#outputtype) for the complete list and details.

## Sensor Input and Subscriptions

Devices may have input features for reading sensor data. There are two patterns for accessing this data:

### Single Reads

For data that changes slowly, use a one-time read:

```
level = await device.battery()  // Returns 0-100 percentage
rssi = await device.rssi()      // Returns signal strength (negative dBm)
```

Battery and RSSI are the most common single-read inputs. They don't change fast enough to warrant continuous streaming.

### Subscriptions

For continuous data like pressure sensors or buttons, subscribe to receive events:

```
// Subscribe to pressure sensor updates
device.feature[0].pressure.subscribe((reading) => {
    console.log("Pressure:", reading.value)
})

// Later, when done:
device.feature[0].pressure.unsubscribe()
```

Subscription events fire whenever the sensor value changes, which may be many times per second for active sensors.

### Subscription Lifecycle

- **Subscriptions persist** until explicitly unsubscribed or the connection ends
- **Duplicate subscriptions are ignored** - subscribing twice doesn't create two streams
- **Auto-cleanup on disconnect** - all subscriptions are automatically cleaned up when the client disconnects
- **No subscription limit** - you can have any number of concurrent subscriptions across devices

### Input Types

| InputType | Description | Typical Use |
|-----------|-------------|-------------|
| Battery | Charge level (0-100%) | Single read |
| RSSI | Bluetooth signal strength | Single read |
| Pressure | Squeeze/kegel sensors | Subscription |
| Button | Physical device buttons | Subscription |

See the [Input Types in the Spec](../../spec/input#inputtype) for the complete list.

:::warning Sensor Values Are Not Standardized

Sensor readings (especially pressure) are **not in standardized units**. A pressure reading of "200" on one device has no relation to "200" on another device. If your application requires meaningful values (like actual pressure in kPa), you must implement per-device calibration at the application level.

:::
