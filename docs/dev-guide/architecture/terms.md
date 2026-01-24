# Glossary

Just in case you don't want to go digging through the architecture section again, here's a quick list of common terms.

* **Client**
  * The part of Buttplug implementations that applications use in order to access servers. Client
    APIs are what most Buttplug applications developers will see.
* **Connector**
  * Used by a client/server so it can talk to the corresponding pieces in some way. This could be
    embedded (other side in same program), or via networks (i.e. websockets), ipc (i.e. pipes), or
    other mechanisms.
* **Device**
  * A device is the general term for anything that buttplug connects to and controls. Sex toys,
    gamepads, fucking machines, whatever. Inside the library, it refers to either a representation
    of the hardware (in the client), or the actual code to talk to the hardware (in the server).
* **Device Communication Manager (DCM)**
  * A server component responsible for handling a specific hardware communication bus, such as
    Bluetooth LE, USB HID, Serial, or network protocols. DCMs enumerate devices on their bus and
    create connections when devices are found.
* **DeviceIndex**
  * An unsigned 32-bit integer that uniquely identifies a device within a Buttplug session. Used
    in commands to specify which device should receive the command. The index typically persists
    across reconnections unless the user clears their server configuration.
* **Feature**
  * A discrete capability of a device, such as a vibration motor, rotation mechanism, stroker axis,
    or pressure sensor. Each device contains one or more features, and each feature has its own
    index, supported output/input types, and value ranges.
* **FeatureIndex**
  * An unsigned 32-bit integer identifying a specific feature within a device. Used in commands
    to target a specific motor, axis, or sensor when a device has multiple features of the same type.
* **InputType**
  * Categories of sensor data that can be read from device features. Examples include Battery
    (charge level), RSSI (signal strength), Pressure (squeeze sensors), and Button (physical buttons).
    See the [Input Types](/docs/spec/input#inputtype) in the spec for the complete list.
* **Intiface Central**
  * GUI interface to configure and start a Buttplug server, distributed by the same team that
    makes Buttplug. This is what most users of Buttplug will have on their system for your
    applications to communicate with.
* **Intiface Engine**
  * Command line interface to configure and start a Buttplug server, distributed by the same team
    that makes Buttplug.
* **Message**
  * Buttplug messages are defined in the [Buttplug Spec](https://buttplug-spec.docs.buttplug.io),
    and are how Buttplug Clients and Servers communicate with each other.
* **OutputType**
  * Categories of actions that can be sent to device features. Examples include Vibrate, Rotate,
    Oscillate, Position, and Temperature. Each output type may have different parameters (e.g.,
    Position includes duration). See the [Output Types](/docs/spec/output#outputtype) in the spec
    for the complete list.
* **Ping Manager**
  * An optional server safety mechanism that requires clients to send periodic ping messages. If
    enabled (MaxPingTime > 0 in ServerInfo), clients must ping within the specified interval or the
    server will disconnect and stop all devices. This protects against client crashes leaving
    devices running when using stateless connection mechanisms.
* **Server**
  * The part of Buttplug implementations that manages device connections and communication. This may
    be a standalone server, or may exist inside an application that uses Buttplug. Those wanting to
    add implementations for new devices will do so in Buttplug Server code.
* **StepCount**
  * The number of discrete levels a device feature supports. For example, a vibrator with 20 speed
    levels has a StepCount of 20, meaning valid step values are 0-20. This information is provided
    in the device's feature definitions and is used to convert percentage values (0.0-1.0) to
    actual device commands.
