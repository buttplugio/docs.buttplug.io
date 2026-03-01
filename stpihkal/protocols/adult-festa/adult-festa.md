---
title: Adult Festa Rocket+1D Protocol
brand: adult-festa
transport: btle
---

# Adult Festa Rocket+1D Protocol

## Introduction

The Adult Festa Rocket+1D is a BLE vibrator that uses the same service UUID structure as Vorze devices. Commands use a device ID byte, command byte, and intensity byte.

## BLE Profile

```yaml
ble_names:
  - "ROCKET"
services:
  - uuid: "???  (same UUIDs as Vorze devices)"
    characteristics:
      - uuid: "???"
        properties: [write_with_response]
        role: tx
        description: "Control"
```

Full UUIDs were not provided in the issue — refer to the Vorze protocol documentation for the shared service layout.

## Commands

### Vibration Control

Written with response:

```
07 03 ZZ
```

| Field | Value | Description |
|-------|-------|-------------|
| Byte 0 | `0x07` | Device ID |
| Byte 1 | `0x03` | Command ID (vibration) |
| Byte 2 | `0x00`–`0x64` | Intensity (0–100) |

## Notes

- Commands must be sent with "write with response".
- The device ID `0x07` and command ID `0x03` distinguish this device's format from other Vorze variants.

## Sources

- [GitHub Issue (stpihkal#125)](https://github.com/buttplugio/stpihkal/issues/125)
