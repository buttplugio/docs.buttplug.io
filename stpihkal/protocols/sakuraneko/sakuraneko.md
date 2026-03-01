---
title: Sakuraneko
brand: sakuraneko
transport: btle
config_ref: sakuraneko.yml
config_identifier: null
---

# Sakuraneko

## Introduction

Sakuraneko manufactures a line of BLE-controlled devices with sequential naming (sakuraneko-01 through sakuraneko-04). The Koikoi (sakuraneko-04) adds rotation capability in addition to vibration.

## BLE Profile

```yaml
ble_names: ["sakuraneko-01", "sakuraneko-02", "sakuraneko-03", "sakuraneko-04"]
services:
  - uuid: "0000ffe0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ffe1-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
```

## Commands

### Vibrate

Controls the vibration speed.

**Format:**

```
0xA1 0x08 0x01 0x00 0x00 0x00 0x64 XX 0x00 0x64 0xDF 0x55
```

| Byte | Description | Range |
|------|-------------|-------|
| `0xA1` | Command prefix | Fixed |
| `0x08` | Unknown | Fixed |
| `0x01 0x00 0x00 0x00 0x64` | Unknown fixed bytes | Fixed |
| `XX` | Speed | `0x00`-`0x64` (0-100) |
| `0x00 0x64 0xDF 0x55` | Unknown trailer | Fixed |

## Notes

- The sakuraneko-04 (Koikoi) supports both vibration and rotation, while the other models support vibration only.
- Speed range is 0-100 decimal (`0x00`-`0x64`).

## Sources

- [GitHub Issue](https://github.com/buttplugio/stpihkal/issues/169)
- [Buttplug implementation](https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server/src/device/protocol_impl/sakuraneko.rs)
