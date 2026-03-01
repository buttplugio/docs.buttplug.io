---
title: Zalo
brand: zalo
transport: btle
config_ref: zalo.yml
config_identifier: null
---

# Zalo

## Introduction

Zalo devices are luxury vibrators and oscillators controlled over BLE with a compact 3-byte command format. The Queen and King models use the same command structure but swap the roles of the two intensity bytes.

## BLE Profile

```yaml
ble_names:
  - ZALO-Queen
  - ZALO-King
services:
  main:
    uuid: 0000fff0-0000-1000-8000-00805f9b34fb
    characteristics:
      tx: 0000fff1-0000-1000-8000-00805f9b34fb
```

## Commands

All commands are 3-byte writes to the Tx characteristic:

```
0xAA 0xBB 0xCC
```

### Zalo Queen

| `AA` | `BB` | `CC` | Description |
|------|------|------|-------------|
| `0x01` | oscillator speed (`0x01`–`0x08`) | vibrator speed (`0x01`–`0x08`) | Manual mode |
| `0x02` | — | — | Off |
| `0x03` | pattern (`0x01`–`0x08`) | intensity (`0x01`–`0x08`) | Pattern mode |

### Zalo King

| `AA` | `BB` | `CC` | Description |
|------|------|------|-------------|
| `0x01` | vibrator speed (`0x01`–`0x04`) | oscillator speed (`0x01`–`0x04`) | Manual mode |
| `0x02` | — | — | Off |
| `0x03` | pattern | intensity | Pattern mode |
| `0x04` | — | — | Shutdown |

## Notes

The roles of `BB` and `CC` are swapped between the Queen and the King models. On the Queen, `BB` controls the oscillator and `CC` controls the vibrator; on the King, `BB` controls the vibrator and `CC` controls the oscillator.

## Sources

- [STPIHKAL Issue #68](https://github.com/buttplugio/stpihkal/issues/68)
- [Buttplug Rust implementation](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/zalo.rs)
