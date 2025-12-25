---
title: Device Configuration
---

:::warning Deprecated Documentation

This documentation is for version 3 of the Buttplug Developer Guide. Please refer to the [latest version](/docs/dev-guide/v4/) for the most up-to-date information.

:::

# Device Configuration

When run with no configuration, Buttplug has no information about any devices and won't actually do anything. As this is a device control library, that situation is not ideal.

There are a few ways to two device configurations to buttplug:

- Via the API
- Via the configuration files

While configuration files will be the way this is done 99% of the time, both methods will be covered here.

## Configuring Devices via the Device Setup API

:::info Rust Only section

As this requires working with the Buttplug Server, the content covered in this section is currently only available via the Rust implementation of buttplug

:::

:::warning Not Yet Written

Skipping writing this section for now so I can get the file sections written up. I highly doubt anyone uses this anyways.

:::

## Configuring Devices via the Device Configuration File

:::caution Feature Not Standardized

The following feature is an aspect of the Buttplug Reference implementation, and is not part of the specification for the protocol. Therefore, this information may change in relation to revisions of the Buttplug Library rather than the protocol specification.

:::

:::caution Section Incomplete

This section will cover the basics of device configurations for now, but doesn't go into the specifics of identifier blocks for device enumeration, or message capability definition.

:::

In lieu of having to change source code every time a new device needs to be added, the Rust implementation of the Buttplug Server has a utility system for loading device configurations from a JSON file. This is known as the Device Configuration File, or DCF.

The DCF is the main source of truth for device configuration in Buttplug, and as such, is stored with the source code. For human readability and ease of editting, the core file is a YAML file that is converted to JSON (and checked against [a JSON Schema](https://github.com/buttplugio/buttplug/blob/master/buttplug/buttplug-device-config/buttplug-device-config-schema.json)) on build.

[These files are available in the Buttplug Github Repo.](https://github.com/buttplugio/buttplug/tree/master/buttplug/buttplug-device-config)

The DCF is indexed by device protocols. Each protocol contains multiple key/value pair sections:

### Identifiers

- Keys for identifiers are `btle`, `serial`, `usb`, `hid`. All other keys are usually specialized
  for specific Device Communication Managers (DCMs). There may be multiple identifier keys in a
  single protocol, as some protocols support toys that work on multiple DCMs (i.e. the
  manufacturer makes toys that connect over bluetooth or USB and uses a similar control protocol
  over both, etc...).
- These sections define how devices that implement this protocol should be found by a DCMs.
  Bluetooth LE identifiers will list device names and service/characteristic info, Serial
  identifiers will list port names, baud rates, etc, USB and HID identifiers use VID/PID pairings.
- Some specialized systems do not have identifiers. For instance, the XInput Gamepad connection
  system will simply find all compatible gamepads connected to the system by default, and
  therefore does not need an identifier setup. These sections will usually have a single
  specialized identifier set to `null`.

### Default Configurations

- Key for default configurations is `defaults`.
- Defaults denote what name should be assigned, and messages allowed, for a device that we cannot
  detect more info on. For instance, it can be assumed that all Lovense devices will react to a
  single vibrator command, even if there is no information available about exactly which type of
  Lovense device it is. Therefore the name is set to _Lovense Device_ and the messages can be set
  to a _ScalarCmd_ with _Vibrate_ type and _20_ as max steps. This means that, if a new Lovense
  device is released and the Buttplug Library and/or its configurations have not been updated yet,
  the library will still at least support some features of the toy.
- For some devices/protocols, there is no identifying information available. Therefore the
  `defaults` section is used to set capabilities for all devices that use that protocol, and no
  custom configurations are given.

Here's an example of a simple device/protocol configuration. The manufacturer Aneros only puts out a single toy that Buttplug supports, the _Vivi_ prostate massager. Therefore, we know that any hardware with the bluetooth name of `Massage Demo` and the specific services/characteristics setup listed will be a _Vivi_, and so we can just use a `defaults` section that defines the 2 controllable motors.

```yaml
  aneros:
    btle:
      names:
        - Massage Demo
      services:
        0000ff00-0000-1000-8000-00805f9b34fb:
          tx: 0000ff01-0000-1000-8000-00805f9b34fb
    defaults:
      name: Aneros Vivi
      messages:
        ScalarCmd:
          - StepRange: [0, 127]
            FeatureDescriptor: Perineum Vibrator
            ActuatorType: Vibrate
          - StepRange: [0, 127]
            FeatureDescriptor: Internal Vibrator
            ActuatorType: Vibrate
```

### Custom Configurations

- Key for custom configurations is `configurations`.
- Custom Configurations provide name and message information for a specific device type.
  Information from the `defaults` section is inherited here, but any included top level settings
  in a custom configuration (`name`, `messages`, etc...) will override the corresponding `default`
  key.
- Extending the Lovense example from above, the Lovense protocol implementation has a way to
  detect the identifier for a device. The Edge Prostate Massager has 2 motors available: an
  internal vibrator and a perineum vibrator. Knowing that, a custom configuration can be added
  with the Edge identifer (in this case, _P_ is the identifer for the Edge in the Lovense
  Protocol). This block will provide the specific name (_Lovense Edge_) and specific message
  information (a _ScalarCmd_ specification with 2 _Vibrate_ definitions) to provide control
  methods for all device components.

A condensed example of the Lovense protocol section is provided below as an example of customized
configurations:

```yaml
  lovense:
    btle:
      names:
        - LVS-*
        - LOVE-*
      services:
        50300011-0023-4bd4-bbd5-a6920e4c5653: # Edge2 paired
          tx: 50300012-0023-4bd4-bbd5-a6920e4c5653
          rx: 50300013-0023-4bd4-bbd5-a6920e4c5653
    defaults:
      name: Lovense Device
      messages:
        ScalarCmd:
          - StepRange: [0, 20]
            ActuatorType: Vibrate
        SensorReadCmd:
          - FeatureDescriptor: Battery Level
            SensorType: Battery
            SensorRange: [[0, 100]]
    configurations:
      # For lovense, our identifiers are the letters returned from the
      # DeviceInfo query sent on initialization.
      - identifier:
          - B
        name: Lovense Max
        messages:
          ScalarCmd:
            - StepRange: [0, 20]
              FeatureDescriptor: Vibrator
              ActuatorType: Vibrate
            - StepRange: [0, 3]
              FeatureDescriptor: Air Pump
              ActuatorType: Constrict
      - identifier:
          - P
        name: Lovense Edge
        messages:
          ScalarCmd:
            - StepRange: [0, 20]
              ActuatorType: Vibrate
            - StepRange: [0, 20]
              ActuatorType: Vibrate
```

## Customizing Devices via User Device Configuration Files

While the DCF is good for configuration global information about devices in order to connect them, there is information that a user might want to add for their specific instance. Specifications for protocols that are context specific like Serial port names, customized device names for situations where multiple of the same device may be used, limited to the maximum power output, etc... For this situation, there is the User Device Configuration File (UDCF).

The UDCF allows customizations on protocols and custom device configurations. It **does not allow** for additions of new protocols, only refinement of or additions to already supported protocols.

### UDCF Protocol Extensions

:::caution Section Incomplete

This section is pretty much specifically for OSR-2/SR-6 users, who can continue to wait.

:::

### UDCF Device Customizations

In addition to connection identifiers, users can change or add device customizations on top of what is provided in the DCF. Unlike the custom configurations in the DCF which pertain to a type of devices, these customizations are per-specific-device.

## Experimenting with DCF and UDCF Changes
