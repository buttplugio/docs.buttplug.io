# Spec Changelog

## Version 4 (2025-??-??)

- Change from Message Attributes to Device Features
  - In message specs v0-3, we'd enumerated devices in terms of the messages they could receive. This
    had multiple problems, including index collisions, difficult figuring out what a device actually
    does, and building coherent APIs to form messages. In v4, we switch to a Device Feature system, which presents devices as sets of 3 different types of features: Actuators, Sensors, and Raw. This allows us to state what a device can do, and then define messages within each feature. This solves the issue with index collisions (as we now use feature indexes instead of just message enumeration array indexes), and makes it easier for developers using buttplug to create UI representing the capabilities of a connected device.
  - This change will be seen in the `DeviceList` messages, as well as in commands that need to refer
    to specific feature indexes (see next bullet).
- Define `FeatureType` in message spec and require spec point updates to add new features
  - As part of the introduction of `ScalarCmd` in spec v3, we introduced an `ActuatorType` value, to
    let developers know what type of value they were setting. The values of `ActuatorType` were never set in the message spec, only in the reference implementations of the Buttplug server. These values should be defined within the message spec to let Client writers know exactly what to expect, and how to handle types they may not know (i.e. a client built for message spec v4.1 receives a `FeatureType` defined in v4.2 should not completely break, but should complain).
- Rename `Index` fields of subcommands to `FeatureIndex`
  - As we now refer to features instead of message attribute array positions, we're updating the
    `Index` field of commands with corresponding subcommands (`ScalarCmd`/`RotateCmd`/`LinearCmd` in
    v3) to take `FeatureIndex` instead. The name change here is purely for context, as leaving it as
    "Index" when the value changed to different origin between message spec versions seemed like it
    may be confusing.
- Remove `DeviceAdded` and `DeviceRemoved`
  - We will now just send `DeviceList` when a client connects (post handshake), and on any device
    connection changes. It will be up to the client to implement logic to handle additions/deletions from the device list, but this allows us to simplify protocol implementations.
- Rename `ScalarCmd` to `ValueCmd`
  - What we're really doing with this command is setting a value on a piece of hardware that we do
    not expect to change until either `ValueCmd` or `StopDevice` is called at a later point. Name has been changed to try to describe this properly.
- Rename `LinearCmd` and `RotateCmd` to `ValueWithParameterCmd`
  - Linear and Rotate were both messages that could be described in an "x with y" way, i.e.
    `RotationWithDirection`, `PositionWithDuration`, etc... This condensing and renaming of commands will hopefully make this idea easier to convey while giving us the extensibility of using ActuatorTypes (and therefore not having to add new messages whenever we want to update).
- Change device commands (`ValueCmd`, `ValueWithParameterCmd`) to use integers instead of floats for
  control values
  - When Buttplug started we decided to use floats instead of integers for command values. This
    meant that clients had to calculate steps to a value between 0.0-1.0. However, this was also usually exposed to application developers in this way, meaning they had to consider the step difference amounts in order to make device actuators actually do something different (i.e. if a device had 5 steps, the application dev would have to know to round between values of x * 0.2). Moving to integers that are limited by the amount of available steps on a device makes life easier for everyone, as well as optimizing our line protocol as it's one less float to try to translate.    
- Add `EventCmd` _(Ed. Note: or maybe BangCmd, not sure yet)_
  - We're seeing devices that require a one-off command to cause an event to happen. For instance,
    the Hismith lubrication injector, lube injectors for the SR-6/OSR-2, etc... We needed a command that denote that an event will happen, but will not be continuously happening, like StaticCmd.
- Rename `MessageVersion` to `MessageMajorVersion` and add `MessageMinorVersion` to
  `RequestServerInfo` message.
  - This allows us to add features to message versions without having to bump major versions every
    time. 
- Servers no longer return a message version in `ServerInfo`
  - There's no reason a client needs to know the version a server supports. Rather, the server
    should just say yes (by replying with `ServerInfo` to a `RequestServerInfo` call) or no (by
    replying with an `Error`) to the version requested by the client.

## Version xx (2024-09-??)

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
