---
title: Synchro
brand: synchro
transport: btle
config_ref: synchro.yml
config_identifier: null
---

# Synchro

## Introduction

Synchro manufactures BLE-controlled rotating devices. Devices advertise as "Shinkuro", "synchro2", or "synchro EX". The Synchro Exchange is a variant with its own BLE name.

## BLE Profile

```yaml
ble_names: ["Shinkuro", "synchro2", "synchro EX"]
services:
  - uuid: "0000ffe0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ffe1-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
```

## Commands

### Rotate

Controls the rotation speed and direction.

**Format:**

```
0xA1 0x01 XY 0x77 0x55
```

| Byte | Description | Range |
|------|-------------|-------|
| `0xA1` | Command prefix | Fixed |
| `0x01` | Unknown | Fixed |
| `X` | Direction (high nibble) | `0x0` = clockwise, `0x8` = anti-clockwise |
| `Y` | Speed/pattern (low nibble) | `0x0`-`0x6` = speed, `0x7`-`0xF` = patterns |
| `0x77` | Unknown | Fixed |
| `0x55` | Trailer | Fixed |

The speed and direction are packed into a single byte. For example:
- `0x03` = clockwise, speed 3
- `0x83` = anti-clockwise, speed 3
- `0x07` = clockwise, pattern 1

## Sources

- [GitHub Issue](https://github.com/buttplugio/stpihkal/issues/170)
- [Buttplug implementation](https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server/src/device/protocol_impl/synchro.rs)
