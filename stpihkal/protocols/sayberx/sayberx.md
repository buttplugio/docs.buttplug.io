---
title: SayberX
brand: sayberx
transport: btle
config_ref: sayberx.yml
config_identifier: null
---

# SayberX

## Introduction

The SayberX system consists of a motorized stroker (output device) and a paired input ring controller (X-Ring). Both communicate over BLE using AT-style ASCII commands. The host sends speed commands to the SayberX device; the X-Ring reports user input back.

## BLE Profile

```yaml
ble_names:
  - SayberX                   # output device
  - "X-Ring 0F313B"           # input ring (suffix varies per device)
services:
  main:
    uuid: 0000fff0-0000-1000-0000-00805f9b34fb
    characteristics:
      tx_sayberx: 0000fff6-0000-1000-0000-00805f9b34fb   # write to SayberX
      rx_xring:   0000fff8-0000-1000-0000-00805f9b34fb   # notify from X-Ring
```

## Commands

### Set Speed (ASCII)

Commands are ASCII strings written to the SayberX Tx characteristic:

```
AT+SPD00
```

The last two characters are a decimal value from `00` to `40` representing speed.

### Set Speed (Hex equivalent)

```
0x41 0x54 0x2b 0x53 0x50 0x44 AA 0x30
```

- `AA` — speed byte: `0x30` (`'0'`) to `0x34` (`'4'`), combined with the trailing `0x30` to form a 2-digit decimal

## Notes

The X-Ring reports speed/input data via notifications on the Rx characteristic (`0000fff8-...`). The BLE name suffix of the X-Ring (e.g., `0F313B`) appears to be device-specific and may vary.

## Sources

- [STPIHKAL Issue #66](https://github.com/buttplugio/stpihkal/issues/66)
