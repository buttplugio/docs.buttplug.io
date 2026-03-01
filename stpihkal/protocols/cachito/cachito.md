---
title: Cachito
brand: cachito
transport: btle
config_ref: cachito.yml
config_identifier: null
---

# Cachito

## Introduction

Cachito manufactures BLE-controlled devices with both thruster and vibration/suction capabilities. Known models include the "Lure Tao Out of Control" (CCTSK) and "More Ice Cream" (CCTXueGao).

## BLE Profile

```yaml
ble_names: ["CCTSK", "CCTXueGao"]
services:
  - uuid: "0000fff0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000fff2-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
```

## Commands

### Thruster

Controls the thrusting motor.

**Format:**

```
0x02 0x01 0x0X 0x00
```

| Byte | Description | Range |
|------|-------------|-------|
| `0x02` | Thruster command | Fixed |
| `0x01` | Unknown | Fixed |
| `0x0X` | Speed | `0x00`-`0x05` (0-5) |
| `0x00` | Padding | Fixed |

### Suction/Vibrate

Controls the suction or vibration motor.

**Format:**

```
0x03 0x02 XX 0x00
```

| Byte | Description | Range |
|------|-------------|-------|
| `0x03` | Vibrate/suction command | Fixed |
| `0x02` | Unknown | Fixed |
| `XX` | Speed | `0x00`-`0x64` (0-100) |
| `0x00` | Padding | Fixed |

## Sources

- [GitHub Issue](https://github.com/buttplugio/stpihkal/issues/118)
- [Buttplug implementation](https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server/src/device/protocol_impl/cachito.rs)
