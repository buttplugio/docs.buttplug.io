# Spec Changelog

## Version 4 (2025-10-18)

- Nomenclature change: Standard -> API
  - Gonna stop calling this a standard. it's not. There's nothing to standardize here. No one wants
    to work together in this field. This library is glue between a bunch of devices and
    manufacturers that either don't recognize or actively hate each other, and trying to pass
    ourselves off as some unifying piece between these entities has been a fine branding move, but
    ultimately futile in terms of actually setting anything usable in stone.
  - On top of that, Buttplug as a project is operating without a plan. There's no real direction,
    we're mostly pulling stuff out of our butt, seeing what works, then reorienting around that.
    Not a particularly good way to standardize anything. The rest of this changelog will bear out
    that fact in excrusiating detail.
  - Also, we're 8 years into this project now and not a single person has tried building a server
    themselves. Which is good, because doing so requires a level of mental instability that would make quality of life questionable for anyone who tried. The ecosystem exists on top of us, but it is not us. I don't think it's ever going to be, and that's fine. 
  - From here on out, this will now just be referred to as the Buttplug Protocol Spec.
- Change from Message Attributes to Device Features
  - In message specs v0-3, we'd enumerated devices in terms of the messages they could receive. This
    had multiple problems, including index collisions, difficult figuring out what a device actually
    does, and building coherent APIs to form messages. In v4, we switch to a Device Feature system, which presents devices as sets of 2 different types of features: Outputs and Inputs. This allows us to state what a device can do, and then define capabilities within each feature. This solves the issue with index collisions (as we now use feature indexes instead of just message enumeration array indexes), and makes it easier for developers using buttplug to create UI representing the capabilities of a connected device.
  - This change will be seen in the `DeviceAdded`/`DeviceList` messages, as well as in the new
    `OutputCmd`/`InputCmd` commands.
- Define `OutputType`, and `InputType` in message spec and require spec point updates
  to add new features
  - As part of the introduction of `ScalarCmd` in spec v3, we introduced an `ActuatorType` value, to
    let developers know what type of value they were setting, as well as `SensorType` for sensors.
    The values of `ActuatorType`/`SensorType` were never set in the message spec, only in the
    reference implementations of the Buttplug server. These values should be defined within the
    message spec to let Client writers know exactly what to expect, and how to handle types they may
    not know (i.e. a client built for message spec v4.1 receives a
    `OutputType`/`InputType` defined in v4.2 should not completely break, but should
    complain).
- Remove ability to send multiple commands ("subcommands") in device command messages
  - In past versions of Buttplug, we allowed multiple commands to be sent within a command package.
    For instance, if a device had multiple vibrators, a single v3 `ScalarCmd` could contain commands for both of these devices. Creating a usable API to form these messages was damn near impossible, and just ended up in implementation complexity on the server side that was never really exposed to developers well. From v4 on, command packets take one command for one output, and the server can handle that as it will.
- Add `FeatureIndex` to commands
  - As we now refer to features instead of message attribute array positions, we're updating the
    `Index` field of commands with corresponding commands (what would've been subcommands in
    `ScalarCmd`/`RotateCmd`/`LinearCmd` in v3) to take `FeatureIndex` in v4's `OutputCmd`/`InputCmd`
    instead.
- `DeviceInfo` now contains range information about all fields of a feature
  - In v2/v3, we introduced the idea of `StepCount` to communicate actuator range. For instance, if
    a device had 20 speeds of vibration, it'd have `StepCount` of 20. Some actuators (like `Rotate` and `Temperature`) can now have negative values, so we now send a definition of the range with the name of the field it represents. Instead of `StepCount: 20`, we send `Value: [-20, 20]`. We have also extended to fields we didn't define limits on before, like the `Duration` portion of `PositionWithDuration` (aka `LinearCmd`), as some devices have upper limits on how slowly they can move.
- Remove `DeviceAdded` and `DeviceRemoved`
  - We will now just send `DeviceList` when a client connects (post handshake), and on any device
    connection changes. It will be up to the client to implement logic to handle additions/deletions from the device list, but this allows us to simplify protocol implementations.
- Remove `Raw*Cmd`
  - `RawReadCmd`/`RawWriteCmd`/`Raw[Un]Subscribe` were introduced in the v2 spec to aid development,
    allowing developers to bypass the protocol system in Buttplug and directly write byte buffers to
    devices. This was a bad idea, as Buttplug is built to be a protocol translation system, and this routed around the main point of the library. It ended up being about 2000 extra lines of code around the library to support, with almost no use, and the possibility of users turning it on and exposing their devices to bricking.
- Remove `ScalarCmd`/`RotateCmd`/`LinearCmd`, replace with `OutputCmd` and `OutputType` variations
  - We have flipped the context of device command messages. Instead of stating intention by action,
    we now simply state that we are addressing the output of a device, and give more context with
    the message. This allows us to only update possible field values within a message versus having
    to add new messages any time we want to address a new context.
  - In ELI5 terms: If a new device comes out that moves or does something in a new way, we don't
    have to do a major revision to the message spec to add support.
- Remove `Sensor*Cmd`, replace with `InputCmd` and `InputCommand` variations
  - Due to index collision issues, `Sensor*Cmd` was never really directly supported or used in
    Buttplug outside of getting Battery values. These issues have now been fixed, and the same context flip as `OutputCmd` has been applied to provide us with `InputCmd`.
  - Why are they named `OutputCmd` and `InputCmd` instead of following the nomenclature of v3 and
    using `ActuatorCmd` and `SensorCmd`? Because our domain is buttplug.io and now we have io commands. You can never say we do not commit to the bit fully on this project.
- Change device commands to use integers instead of floats for control values
  - When Buttplug started we decided to use floats instead of integers for command values. This
    meant that clients had to calculate steps to a value between 0.0-1.0. However, this was also usually exposed to application developers in this way, meaning they had to consider the step difference amounts in order to make device actuators actually do something different (i.e. if a device had 5 steps, the application dev would have to know to round between values of x * 0.2). Moving to integers that are limited by the amount of available steps on a device makes life easier for everyone, as well as optimizing our line protocol as it's one less float to try to translate.    
- Rename `MessageVersion` to `ProtocolVersionMajor` and add `ProtocolVersionMinor` in
  `RequestServerInfo`/`ServerInfo` messages.
  - This allows us to add features to message versions without having to bump major versions every
    time.
  - Servers return `ProtocolVersionMajor` and `ProtocolVersionMinor` for connections on >= v4, just
    `MessageMajorVersion` for < v4
- `StopDeviceCmd` no longer sent as a possible message on a device description
  - We now let developers assume all devices can take `StopDeviceCmd`, so there is no need to attach
    it to device descriptors.
  - `StopDeviceCmd` will be valid for both actuators (i.e. make a vibrator stop vibrating) and
    sensors (i.e. cause an unsubscribe from a subscribed endpoint)
- `Rotate` actuators can now possibly take negative values
  - Instead of having a `clockwise` attribute, devices with bidirectional rotation will have a `value` range of negative to positive, with positive being clockwise, negative being counterclockwise.
- Added `Temperature`, `Led`, `Spray` actuators
  - `Temperature` refers to devices with cooling/heating units. This will be communicated as
    negative/positive values, similar to `Rotate.
  - `Led` is light levels for devices with controllable lights, most likely used just to turn them
    off.
  - `Spray` is for lubrication injection

### Imaginary Version ~4 Beta 1 (2025-03-??)

THEN IT HAPPENED AGAIN.

- Rename `LinearCmd` and `RotateCmd` to `ValueWithParameterCmd`
  - Linear and Rotate were both messages that could be described in an "x with y" way, i.e.
    `RotationWithDirection`, `PositionWithDuration`, etc... This condensing and renaming of commands will hopefully make this idea easier to convey while giving us the extensibility of using ActuatorTypes (and therefore not having to add new messages whenever we want to update).
- Renamed `Sensor*` fields to `Feature*` in `Sensor*Cmd` Messages
  - Aligns with new feature system
- Add `EventCmd` _(Ed. Note: or maybe BangCmd, not sure yet)_
  - We're seeing devices that require a one-off command to cause an event to happen. For instance,
    the Hismith lubrication injector, lube injectors for the SR-6/OSR-2, etc... We needed a command that denote that an event will happen, but will not be continuously happening, like StaticCmd.  

### Imaginary Version ~4 Beta 0 (2024-09-??)

This version never actually existed. I'm just leaving it here to show how things change if I let the project sit for months at a time.

- Rename `LinearCmd` to `GoalWithDurationCmd` _(Ed. Note: This is still a maybe)_
  - Much like the move to `ScalarCmd` in v3, `LinearCmd` is now being generalized to "movement
    toward a goal value with a duration". Added to the definition will be a curve type for the
    movement, though at the moment the only supported curve will be of "Linear" type (later versions
    may include different curves or the ability to define a curve function over time). For now, this
    means we can handle both stroker style movement as well as things like angular rotation in TCode
    v3, denoting the movement type via feature types.
- Rename `ScalarCmd` to `StaticCmd` _(Ed. Note: I'm not sure about this name yet :| )_
  - `ScalarCmd` is being renamed to `StaticCmd` to denote that sending the command is expected to
    set a value and leave it set until another `StaticCmd` or `StopDeviceCmd` call is sent.
    `ScalarCmd` didn't properly relay this meaning.
- Remove `RotateCmd`, use `StaticCmd`
  - See note on last bullet for more info.
- Remove `ActuatorType` from `StaticCmd` _(Ed Note: This is still a maybe)_
  - This was initially added as a safety check on `ScalarCmd`, to make sure that the developer was
    actually triggering the type of actuator they meant to be. However, as clients usually (or at
    least should) hide this detail from end users, it's not useful to anyone but client developers.
- Change `StaticCmd` to take signed double instead of unsigned double
  - The unsigned value given to v3 `ScalarCmd` made it difficult to define messages that might
    actually be 2d instead of 1d (i.e. embedding rotation direction with a -1 \<= x \<= 1 value,
    letting us remove `RotateCmd`). Change `StaticCmd` in v4 to take signed values, so we can
    condense methods.

## Version 3 Patch 3 (2022-12-30)

- Message Definitions Fixed:
  - The `SensorType` and `SensorRange` message attributes are valid for SensorSubscribeCmd as well
    as SensorReadCmd.

## Version 3 Patch 2 (2022-12-27)

- Message Definitions Fixed:
  - DeviceAdded/DeviceList use `DeviceMessageTimingGap`, not `DeviceMessageGap`.
  - LinearCmd/RotateCmd information in the message attributes of DeviceAdded/DeviceList will have an
    ActuatorType (Previously stated that only ScalarCmd has an actuator type).

## Version 3 Patch 1 (2022-10-14)

- Message Descriptions Changed:
  - ServerInfo
    - The original idea behind ServerInfo's message spec version output was to notify clients if a
      new, higher version of the message spec might be available, prompting for upgrade.
      Unfortunately, a long running programming error in multiple official reference libraries will
      cause connections to fail if the server lists its maximum available spec version and that
      version is higher than the client's spec version. Therefore, ServerInfo cannot return a
      version that is higher than the client's spec verison. ServerInfo should return either a
      version that matches the clients, or throw an error if it cannot match the client's version.
      This does not change the structure of the message, just the expectations of how it should
      function.

## Version 3 (2022-08-29)

- Messages Added:
  - ScalarCmd
    - Replaces VibrateCmd and adds ability to easily extend with new actuator types that take a
      single value.
  - SensorReadCmd
    - Replaces Battery/RSSI messages and adds ability to easily extend with new sensor types.
  - SensorSubscribeCmd
    - Allows users to receive realtime updates from devices (pressure sensors kegelcizers,
      accelerometers in toys that have them, etc...)
  - SensorUnsubscribeCmd
  - SensorReading
    - Data returned from either sensor being read, or a subscription event.
- Messages Changed:
  - DeviceList/DeviceAdded
    - Remove _FeatureCount_, Message Attributes are now an array of attribute objects instead of
      many fields of arrays that had to be reconstructed. Should reduce bookkeeping.
    - Added Message Attributes _FeatureDescriptor_, _ActuatorType_, _SensorType_
    - Added Device Attributes _DisplayName_, _DeviceMessageGap_
    - For messages that have matching "undo" types, like RawSubscribe/RawUnsubscribe or
      SensorSubscribe/SensorUnsubscribe, only the initial command is relayed in the message attributes of _DeviceAdded_ or _DeviceList_. The arguments for these commands are the same, and it's assumed that if you can do something that has a matching undo, you'll only need to know about one.
- Messages Deprecated:
  - VibrateCmd
    - Superceded by ScalarCmd. Will still be available via API calls in client APIs, just no longer
      needs to be a specific message in the protocol.
  - BatteryLevelCmd
    - Superceded by SensorReadCmd
  - RSSILevelCmd
    - Superceded by SensorReadCmd
  - BatteryLevelReading
    - Superceded by SensorReading
  - RSSILevelReading
    - Superceded by SensorReading

## Version 2 (2020-09-28)

- Messages Added:
  - RawWriteCmd
  - RawReadCmd
  - RawReading
  - RawSubscribeCmd
  - RawUnsubscribeCmd
  - BatteryLevelCmd
  - BatteryLevelReading
  - RSSILevelCmd
  - RSSILevelReading
- Messages Changed:
  - DeviceList/DeviceAdded
    - Adding StepCount to Message Attributes, to let users know how
      many steps a feature can use (i.e. how many vibration levels a
      piece of hardware might have)
  - ServerInfo
    - Remove Version fields
- Messages Deprecated:
  - LovenseCmd
    - Superceded by VibrateCmd/RotateCmd/Raw\*Cmd. The protocol messages were originally meant to
      map generic -> protocol -> raw, but the protocols change quickly enough that it's not worth it
      to encode that at the protocol level. From v2 of the spec on, we will try to encode as many
      actions as possible in generic messages. For anything we haven't mapped yet, Raw\*Cmd can be
      used, though it's not a great idea due to security concerns.
    - LovenseCmd was never implemented in any of the Buttplug reference libraries, so removal
      shouldn't affect anything.
  - KiirooCmd
    - Superceded by VibrateCmd/LinearCmd/Raw*Cmd. See above for more explanation.
    - Only implemented by the Kiiroo Pearl 1 and Onyx 1 in Buttplug C#. Not sure it was ever used
      anywhere.
  - VorzeA10CycloneCmd
    - Superceded by RotateCmd/PatternCmd. See above for more explanation.
    - Implemented for the Vorze A10 Cyclone in C# and JS, but translates directly to rotation
      messages.
  - FleshlightLaunchFW12Cmd
    - Superceded by LinearCmd/Raw\*Cmd. See LovenseCmd reason for more explanation.
    - Implemented for the Fleshlight Launch, and will be problematic to switch out. We should still
      support it on the server side for v0/v1 for compat.
  - Test
    - Violates assumptions that client/server sends different message types. Also, not particularly
      useful.
  - RequestLog/Log
    - Allows too much information leakage across the protocol in situations we may not want, and
      also has nothing to do with sex toy control. Logging is an application level function, not
      really required in the protocol itself.

## Version 1 (2017-12-11)

- Messages Added:
  - VibrateCmd
  - LinearCmd
  - RotateCmd
- Messages Changed:
  - DeviceList/DeviceAdded
    - Added Message Attributes blocks to device info, with FeatureCount attribute
  - RequestServerInfo
    - Added Spec Version Field
- Messages Deprecated:
  - SingleMotorVibrateCmd
    - Superceded by VibrateCmd

## Version 0 (2017-08-24)

- First version of spec
- Messages Added:
  - Ok
  - Error
  - Log
  - RequestLog
  - Ping
  - Test
  - RequestServerInfo
  - ServerInfo
  - RequestDeviceList
  - DeviceList
  - DeviceAdded
  - DeviceRemoved
  - StartScanning
  - StopScanning
  - ScanningFinished
  - SingleMotorVibrateCmd
  - FleshlightLaunchFW12Cmd
  - LovenseCmd
  - KiirooCmd
  - VorzeA10CycloneCmd
  - StopDeviceCmd
  - StopAllDevices
