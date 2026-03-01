---
title: Xibao
brand: xibao
transport: btle
config_ref: xibao.yml
config_identifier: null
---

# Xibao

## Introduction

Xibao vibrators are controlled over BLE using a 13-byte structured command packet with a simple additive checksum. The device must be placed in AI mode before BLE control commands are accepted.

## BLE Profile

```yaml
ble_names:
  - CCYB_1904
services:
  main:
    uuid: 0x0000fff0-0000-1000-8000-00805f9b34fb
    characteristics:
      tx: 0x0000fff2-0000-1000-8000-00805f9b34fb
```

## Commands

### Set Speed

13-byte write to Tx:

```
0x66 0x3a 0x00 0x06 0x00 0x06 0x01 0x02 0x00 0x02 0x04 XX YY
```

- `XX` — speed: `0x00` (off) to `0x63` (99, maximum)
- `YY` — checksum: `(0xB5 + XX) & 0xFF`

### Checksum Calculation

```
YY = (0xB5 + XX) % 256
```

## Notes

The device must be in AI mode (selected via the physical button) to accept BLE speed commands. Battery level, heater, and temperature control have not been documented.

## Sources

- [docs.buttplug.io Issue #18](https://github.com/buttplugio/docs.buttplug.io/issues/18)
- [Buttplug Rust implementation](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/xibao.rs)
