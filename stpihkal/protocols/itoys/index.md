---
title: iToys
brand: itoys
transport: btle
config_ref: itoys.yml
config_identifier: null
---

# iToys

## Introduction

iToys vibrators use a compact 6-byte BLE command to select vibration mode and speed.

## BLE Profile

```yaml
ble_names:
  - 26-021-B
services:
  main:
    uuid: 0x0000ffa0-0000-1000-8000-00805f9b34fb
    characteristics:
      tx: 0x0000ffa1-0000-1000-8000-00805f9b34fb
```

## Commands

### Set Mode / Speed

```
0xa0 0x01 0x00 0x00 0x0X YY
```

- `X` — mode: `0x0` = off, `0x1`–`0x3` = speed levels (slow to fast), `0x4`–`0xA` = additional modes
- `YY` — `0x00`–`0xFF` (this byte does not affect device behavior)

## Notes

The mode byte (`0x0X`) encodes both on/off state and speed. Values `0x1`–`0x3` represent the three documented speed levels; values up to `0xA` are accepted by the device but their behavior is not fully documented.

## Sources

- [docs.buttplug.io Issue #23](https://github.com/buttplugio/docs.buttplug.io/issues/23)
- [Buttplug Rust implementation](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/itoys.rs)
