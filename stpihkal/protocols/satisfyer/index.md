---
title: Satisfyer
brand: satisfyer
transport: btle
config_ref: satisfyer.yml
config_identifier: null
---

# Satisfyer

## Introduction

Satisfyer is a major manufacturer of BLE-controlled intimate devices. Their devices use custom 128-bit BLE service UUIDs and share a common protocol. Specifically documented from reverse engineering the Royal One, but the protocol applies across the product line.

## BLE Profile

```yaml
ble_names: []  # Satisfyer devices don't broadcast names in advertisements
services:
  - uuid: "51361500-c5e7-47c7-8a6e-47ebc99d80e8"
    description: "Live control service"
    characteristics:
      - uuid: "51361501-c5e7-47c7-8a6e-47ebc99d80e8"
        properties: [write]
        role: tx
        description: "Motor control (start/stop)"
      - uuid: "51361502-c5e7-47c7-8a6e-47ebc99d80e8"
        properties: [write]
        role: tx
        description: "Motor value (speed)"
  - uuid: "51361600-c5e7-47c7-8a6e-47ebc99d80e8"
    description: "Factory/rename service"
    characteristics:
      - uuid: "51361601-c5e7-47c7-8a6e-47ebc99d80e8"
        properties: [write]
        description: "Rename value"
  - uuid: "51361700-c5e7-47c7-8a6e-47ebc99d80e8"
    description: "DFU service"
```

## Pairing

- If the device was previously paired to another host, hold the button for 15 seconds to factory reset (the device vibrates 5 times rapidly when complete).
- To make the device discoverable, hold the button for 4 seconds (2 rapid vibrations).
- Connecting without prior pairing works without an explicit pairing step.
- The device does not broadcast its name in BLE advertisements. The name is only available after the first GATT connection via the Device Name attribute.

## Commands

### Start Motor

**Write to `51361501` (motor control):**

```
0x01
```

### Pause Motor

**Write to `51361501` (motor control):**

```
0x03
```

### Stop Motor

**Write to `51361501` (motor control):**

```
0x07
```

Both pause (`0x03`) and stop (`0x07`) halt vibration and require a new start command. The functional difference between them is unknown.

### Set Speed

**Write to `51361502` (motor value):**

```
0x00 0x00 0x00 XX
```

| Byte | Description | Range |
|------|-------------|-------|
| `0x00 0x00 0x00` | Padding (must be 4 bytes total) | Fixed |
| `XX` | Speed | `0x00`-`0x64` (0-100) |

## Notes

- The speed value must be written as a 4-byte value with the speed in the least significant byte.
- If the motor speed is set to 0 for a few seconds, the device exits "start" mode and requires a new start command.
- Standard BLE services are also exposed: Battery Level Service (`0x180F`) and Device Information Service (`0x180A`).

## Sources

- [GitHub Issue](https://github.com/buttplugio/stpihkal/issues/99)
- [Buttplug implementation](https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server/src/device/protocol_impl/satisfyer.rs)
