---
title: Pink Punch Sunset Mushroom Protocol
brand: pink-punch
transport: btle
config_ref: pink_punch.yml
---

# Pink Punch Sunset Mushroom Protocol

## Introduction

The Pink Punch Sunset Mushroom uses a 2-byte BLE command for vibration and pattern control.

## BLE Profile

```yaml
ble_names:
  - "Pink_Punch"
services:
  - uuid: "0000ffe0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ffe1-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
      - uuid: "0000ffe2-0000-1000-8000-00805f9b34fb"
        properties: [notify]
        role: rx
        description: "Response/notification endpoint"
```

## Commands

### Vibration / Pattern Control

```
XX YY
```

Where:
- `XX` = mode: `0x07`–`0x09` (patterns; `0x09` is constant vibration)
- `YY` = speed: `0x00`–`0x64`

## Notes

- `0x09` for `XX` selects constant (non-patterned) vibration mode.
- Values `0x07` and `0x08` select different vibration patterns.

## Sources

- [GitHub Issue (stpihkal#168)](https://github.com/buttplugio/stpihkal/issues/168)
- [Buttplug implementation (pink_punch.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/pink_punch.rs)
