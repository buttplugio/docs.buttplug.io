---
title: Fox Protocol
brand: fox
transport: btle
config_ref: fox.yml
---

# Fox Protocol

## Introduction

The Fox vibrator uses a 5-byte BLE command combining speed (lower range) and pattern selection (upper range) in the final byte.

## BLE Profile

```yaml
ble_names:
  - "FOX"
  - "FOX M70 Pro"
  - "FoxM70Pro"
services:
  - uuid: "0000ae00-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ae01-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
```

## Commands

### Vibration / Pattern

```
03 01 01 fe XX
```

Where `XX`:
- `0x00`–`0x03` = speed levels
- `0x04`–`0x0a` = patterns

## Sources

- [GitHub Issue (docs.buttplug.io#17)](https://github.com/buttplugio/docs.buttplug.io/issues/17)
- [Buttplug implementation (fox.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/fox.rs)
