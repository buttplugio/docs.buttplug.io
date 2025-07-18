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

Each device is made of one or more features, which define what the device can do. These can be anything from vibration motors, to stroker axes, to battery level reading access. [Output types](/docs/spec/output#outputtype) and [Input types](/docs/spec/input#inputtype) for features are defined in the [Buttplug API Spec](/docs/spec/).

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

- The top level _Device_ will have some sort of `vibrate()` command. If this is used, all features
  that support the Vibrate OutputType will be set to this value.
  - There may be two variations of this command, one that takes a value between 0 and the number of
    steps defined in the feature, as well as one that takes a floating point value between 0.0 and 1.0, which will automatically scale to the range of steps allowed by the feature.
- Each feature will also have some sort of `vibrate()` command (as well as the floating point
  variation), which will allow setting the value for just that feature. This allows developers to
  only control one of the two available motors, setting them to different speeds.

There will be similar commands for other OutputTypes, like _oscillate()_, _position\_with\_duration()_, etc... Depending on language capabilities, there may also be a generic way to put together commands, useful for building complex programmatic structures for control.

Inputs can be either read a single time, or subscribed to, which will provide an ongoing stream of events until they are unsubscribed. As an example, Battery values are usually read once (as batteries don't usually drain fast enough to need a stream of updates), while pressure and button sensors will be subscribed to and send events as available.