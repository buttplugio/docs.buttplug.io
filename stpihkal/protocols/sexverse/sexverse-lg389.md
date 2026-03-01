---
title: Sexverse LG389
brand: sexverse
transport: btle
config_ref: sexverse-lg389.yml
config_identifier: null
---

# Sexverse LG389

## Introduction

The Sexverse LG389 is a BLE-controlled vibrator with configurable vibration mode, anchor position, intensity range, and speed, communicated via structured hex command packets.

## BLE Profile

```yaml
ble_names:
  - LG389
services:
  main:
    uuid: 0x0000bae0-0000-1000-8000-00805f9b34fb
    characteristics:
      tx: 0x0000bae1-0000-1000-8000-00805f9b34fb
      rx: 0x0000bae2-0000-1000-8000-00805f9b34fb
```

## Commands

### Set Vibration

10-byte command packet:

```
aa 05 XX 14 YY 00 ZZ 00 UU 00
```

| Byte | Field | Range | Description |
|------|-------|-------|-------------|
| `XX` | Vibe mode | `0x00`–`0x03` | Vibration mode |
| `YY` | Anchor | `0x01`–`0x03` | Anchor position |
| `ZZ` | Range | `0x01`–`0x04` | Intensity range |
| `UU` | Speed | `0x00`–`0x0A` | Motor speed |

### Battery Query

Send:
```
aa 04
```

Response from Rx characteristic:
```
55 04 01 01 XX 00 ...
```

`XX` — battery level (value interpretation may vary).

## Sources

- [docs.buttplug.io Issue #41](https://github.com/buttplugio/docs.buttplug.io/issues/41)
- [Buttplug Rust implementation](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/sexverse_lg389.rs)
