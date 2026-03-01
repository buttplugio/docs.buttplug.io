---
title: Magic Motion Kegel Master Protocol
brand: magic-motion
transport: btle
---

# Magic Motion Kegel Master Protocol

## Introduction

The Magic Motion Kegel Master is a BLE-connected pelvic floor biofeedback vibrator with a pressure sensor. It uses the same VT Command Service (write characteristic) as other Magic Motion devices. This page documents the sensor service and the single/multi-argument vibration commands from community reverse engineering.

## BLE Profile

```yaml
ble_names:
  - "???"
services:
  - uuid: "6f468792-f91f-11e3-a847-b2227cce2b54"
    description: "Vtoy Sensor Service"
    characteristics:
      - uuid: "6f468bfc-f91f-11e3-a847-b2227cce2b54"
        properties: [notify]
        role: rx
        description: "Pressure sensor value"
      - uuid: "00002902-0000-1000-8000-00805f9b34fb"
        description: "CCCD for sensor notification subscription"
  - uuid: "78667579-7b48-43db-b8c5-7928a6b0a335"
    description: "VT Command Service"
    characteristics:
      - uuid: "78667579-a914-49a4-8333-aa3c0cd8fedc"
        properties: [write]
        role: tx
        description: "Vibration command"
```

## Sensor Data

### Notification Subscription

Write to CCCD (`0x2902`):
- `01 00` — subscribe
- `00 00` — unsubscribe

### Pressure Value (1 sensor)

Returns 2 bytes:

```
sensor_value = (data[0] & 0xFF) * 256 + (data[1] & 0xFF)
```

Devices with 2 or more sensors have not been fully documented.

## Commands

### Vibration — Single Argument

```
04 08 v1 64 00
```

`v1` = intensity, `0x00`–`0xFF`. Values above 100 (`0x64`) are not recommended (may degrade motor).

### Vibration — Two Arguments

```
0b ff 04 v2 v2 0a 00 04 08 v1 64 00
```

Both `v2` fields appear to share the same value. Meaning of the second argument is unknown.

### Vibration — Three Arguments

```
... 04 08 v3 64 01
```

`v3` format is the same as the one-argument packet; relationship between `v2` and `v3` is unknown.

## Notes

- Values above 100 (`0x64`) are explicitly warned against by the original reverse engineer.
- Multi-argument commands may apply to multi-motor devices; the Kegel Master has only one motor.
- BLE advertisement name is not documented.

## Sources

- [GitHub Issue (stpihkal#21)](https://github.com/buttplugio/stpihkal/issues/21)
- [Buttplug implementation (magic_motion_v1.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/magic_motion_v1.rs)
