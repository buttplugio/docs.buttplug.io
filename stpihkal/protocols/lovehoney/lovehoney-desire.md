---
title: Lovehoney Desire
brand: lovehoney
transport: btle
config_ref: lovehoney-desire.yml
config_identifier: null
---

# Lovehoney Desire

## Introduction

The Lovehoney Desire line includes wearable and insertable vibrators with up to two independent vibration motors, controlled over BLE using a simple proprietary command format.

## BLE Profile

```yaml
ble_names:
  - PROSTATE VIBE
  - KNICKER VIBE
services:
  main:
    uuid: 0000ff00-0000-1000-0000-00805f9b34fb
    characteristics:
      tx: 0000ff01-0000-1000-0000-00805f9b34fb
```

## Commands

### Vibrate

Sent to the Tx characteristic as a 3-byte write.

```
0xf3 XX YY
```

- `XX` — vibrator number: `0x00` = all, `0x01` = motor 1, `0x02` = motor 2
- `YY` — intensity: `0x00`–`0x7F` (7-bit range; only the lower 7 bits are used)

### Reset / Stop

```
0xf4 0x64
```

Resets the device (used to stop all vibration).

### Pattern / Constant Mode

```
0xf7 XX ZZ
```

- `XX` — target vibrator
- `ZZ` — pattern number; `0x01` = constant (no pattern)

### Initialization

On connect, cycle through each motor (0x01, 0x02) and send a vibrate command with intensity `0x00` to initialize the device state.

## Sources

- [STPIHKAL Issue #74](https://github.com/buttplugio/stpihkal/issues/74)
- [Buttplug Rust implementation](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/lovehoney_desire.rs)
