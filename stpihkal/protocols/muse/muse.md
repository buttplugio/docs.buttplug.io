---
title: Mu Se / Love Spouse
brand: muse
transport: btle
config_ref: muse.yml
config_identifier: null
---

# Mu Se / Love Spouse

## Introduction

Mu Se (also marketed as Love Spouse) is an OEM platform used by brands such as Dream Lover and Galaku for panty vibrators and wearables. Devices are controlled over BLE with a 2-byte command packet that selects either a speed or a pattern.

## BLE Profile

```yaml
ble_names:
  - varies by OEM product
services:
  main:
    uuid: 0000aaa0-0000-1000-8000-00805f9b34fb
    characteristics:
      tx: 0000aaa1-0000-1000-8000-00805f9b34fb
```

Known devices include:

- Dream Lover Archer 2 (`WB-ZDB-WST`)
- Galaku Panty Vib (`WB-TDD`)

## Commands

All commands are 2-byte writes to the Tx characteristic:

```
AA BB
```

### Stop

```
0x00 BB
```

Setting `AA` to `0x00` stops the device regardless of `BB`.

### Pattern Mode

```
AA 0x00
```

When `BB` is `0x00`, `AA` selects a built-in pattern (`0x01`–`0x09`).

### Speed Mode (timed)

```
AA BB   (BB != 0x00)
```

When `BB` is non-zero, `AA` is interpreted as a speed value (`0x01`–`0x0F`, effective range up to ~`0x09`) applied for approximately 1 second.

## Sources

- [STPIHKAL Issue #65](https://github.com/buttplugio/stpihkal/issues/65)
