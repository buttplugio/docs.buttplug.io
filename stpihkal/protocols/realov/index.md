---
title: Realov
brand: realov
transport: btle
config_ref: realov.yml
config_identifier: null
---

# Realov

## Introduction

Realov vibrators use a simple 4-byte BLE command to set vibration intensity on a 0–50 scale.

## BLE Profile

```yaml
ble_names:
  - REALOV_VIBE
services:
  main:
    uuid: 0000ffe0-0000-1000-8000-00805f9b34fb
    characteristics:
      tx: 0000ffe1-0000-1000-8000-00805f9b34fb
```

## Commands

### Set Vibration Intensity

```
0xc5 0x55 XX 0xaa
```

- `XX` — intensity: `0x00` (off) to `0x32` (50, maximum)

## Sources

- [STPIHKAL Issue #59](https://github.com/buttplugio/stpihkal/issues/59)
- [Buttplug Rust implementation](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/realov.rs)
