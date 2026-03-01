---
title: Love Distance
brand: love-distance
transport: btle
config_ref: lovedistance.yml
config_identifier: null
---

# Love Distance

## Introduction

Love Distance manufactures a range of BLE-controlled vibrators. All models share the same protocol, advertising under their product names (REACH G, REACH, MAG, SPAN, RANGE, ORBIT, JOIN G, LINK, GRASP, RECEIVE).

## BLE Profile

```yaml
ble_names: ["REACH G", "REACH", "MAG", "SPAN", "RANGE", "ORBIT", "JOIN G", "LINK", "GRASP", "RECEIVE"]
services:
  - uuid: "0000ff00-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ff01-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
      - uuid: "0000ff02-0000-1000-8000-00805f9b34fb"
        properties: [read]
        description: "Battery level"
```

## Commands

### Set Speed

Controls the vibration speed directly.

**Format:**

```
0xF3 0x00 YY
```

| Byte | Description | Range |
|------|-------------|-------|
| `0xF3` | Speed command | Fixed |
| `0x00` | Unknown | Fixed |
| `YY` | Speed | `0x00`-`0x79` (0-121) |

### Set Pattern

Activates a built-in vibration pattern.

**Format:**

```
0xF4 XX
```

| Byte | Description | Range |
|------|-------------|-------|
| `0xF4` | Pattern command | Fixed |
| `XX` | Pattern number | `0x01`-`0x14` (1-20; `0x01` = constant) |

## Sources

- [GitHub Issue](https://github.com/buttplugio/stpihkal/issues/142)
- [Buttplug implementation](https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server/src/device/protocol_impl/lovedistance.rs)
