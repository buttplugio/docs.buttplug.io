---
title: Adding Devices Overview
---

:::warning Deprecated Documentation

This documentation is for version 3 of the Buttplug Developer Guide. Please refer to the [latest version](/docs/dev-guide/v4/) for the most up-to-date information.

:::

# Adding Devices Overview

Devices are by far the most common addition to Buttplug. Between new devices that've just
arrived on the market, or filling out support in the library for older devices missing implementations, the device portion of the Server sees a lot of code editing actions.

As a quick refresher on the device system as it's implemented in Buttplug v6+:

- Device information is loaded from a combination of the Device Configuration File and the User
  Device Configuration File.
- When a Buttplug Server is created, these configuration files are loaded into the server, along
  with Device Communicaiton Manager instances that define how devices can be connected (via Bluetooth, USB, HID, etc)
- When the Buttplug Server is sent a `StartScanning` message, Device Communication Managers look for
  devices, which are then compared to the information from the Configuration files.
- If a device matches the specifiers in the configuration file, and Buttplug implements the protocol
  that the device uses, then the device is connected and emitted to the client for control.

This section outlines all the actions needed to add new devices to the system, going from most to
least common tasks:

- Adding devices in the Device Configuration File
  - In addition to this, we'll cover the User Device Configuration system, which allows users to
    futher customize devices or add configurations that are purely local (DIY builds, etc...)
  - This requires editing YAML/JSON files.    
- Connecting device via the Websocket Device Manager
  - This allows users to have Buttplug send command packets over a network instead of a dedicated
    hardware connection, meaning they can either build a simple hardware flow without having to learn Bluetooth/USB/etc, or build pure software network devices for testing or simulation.
  - Connection to the Websocket Device Manager can happen from any language with a network library
    and websocket capabilities
- Adding new device protocols
  - When a new company appears or a new set of devices is released, new protocols need to be added
    to the library to support device control.
  - Implementing new protocols requires work in Rust.
- Adding new device communication managers
  - While Buttplug already handles multiple types of device communication, new technologies and
    systems appear every once in a while that require additions of completely new communication managers. While this is rare, it's good to know how to add these to make sure device support is robust as possible.
  - Implementing new device communication managers requires work in Rust.
