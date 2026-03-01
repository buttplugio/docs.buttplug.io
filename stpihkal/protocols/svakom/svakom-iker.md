---
title: Svakom Iker
brand: svakom
transport: btle
config_ref: svakom-iker.yml
config_identifier: null
---

# Svakom Iker

## Introduction

The Svakom Iker is a BLE-controlled prostate massager with independent vibration and pulsation motors.

## BLE Profile

```yaml
ble_names: ["Iker"]
services:
  - uuid: "0000ffe0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ffe1-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
```

## Commands

### Vibrate

Controls the vibration motor with selectable modes.

**Format:**

```
0x55 0x03 0x03 0x00 XX YY
```

| Byte | Description | Range |
|------|-------------|-------|
| `0x55` | Command prefix | Fixed |
| `0x03` | Command type (vibrate) | Fixed |
| `0x03` | Unknown | Fixed |
| `0x00` | Unknown | Fixed |
| `XX` | Mode | `0x01`-`0x0B` |
| `YY` | Speed | `0x00`-`0x0A` (0-10) |

### Pulsate

Controls the pulsation motor.

**Format:**

```
0x55 0x07 0x00 0x00 ZZ 0x00
```

| Byte | Description | Range |
|------|-------------|-------|
| `0x55` | Command prefix | Fixed |
| `0x07` | Command type (pulsate) | Fixed |
| `0x00 0x00` | Unknown | Fixed |
| `ZZ` | Speed | `0x00`-`0x05` (0-5) |
| `0x00` | Unknown | Fixed |

## Notes

- Setting the vibrator speed to 0 will also turn off the pulsator. If you only want to stop vibration while keeping pulsation active, you must resend the pulsator command after setting vibration to 0.
- The vibrator supports 11 modes (`0x01`-`0x0B`) and 11 speed levels (`0x00`-`0x0A`).
- The pulsator supports 6 speed levels (`0x00`-`0x05`).

## Sources

- [GitHub Issue](https://github.com/buttplugio/stpihkal/issues/148)
