---
title: LiBo Shark Protocol
brand: libo
transport: btle
config_ref: libo-shark.yml
---

# LiBo Shark Protocol

## Introduction

The LiBo Shark is an inflating rabbit vibrator. Unlike other LiBo devices, the Shark encodes both vibration and inflation control in a single byte sent to the standard TX characteristic.

## BLE Profile

```yaml
ble_names:
  - "ShaYu"
services:
  - uuid: "00006000-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "00006001-0000-1000-8000-00805f9b34fb"
        properties: [write_without_response]
        role: tx
        description: "Combined vibration and inflation control"
  - uuid: "00006050-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "00006051-0000-1000-8000-00805f9b34fb"
        properties: [notify, read]
        role: rx
        description: "Battery / pressure"
```

## Commands

### Combined Vibration + Inflation (`0x6001`)

Command byte: `0xAB`

- `A` = vibration: `0x0`–`0x3` constant levels, higher values = patterns
- `B` = inflation: `0x0`–`0x3` intensity patterns

## Sources

- [GitHub Issue (stpihkal#48)](https://github.com/buttplugio/stpihkal/issues/48)
- [Buttplug implementation (libo_shark.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/libo_shark.rs)
