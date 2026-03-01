---
title: LiBo ELLE / Whale (PiPiJing) Protocol
brand: libo
transport: btle
config_ref: libo-elle.yml
---

# LiBo ELLE / Whale (PiPiJing) Protocol

## Introduction

The LiBo ELLE (shock egg) and its older variant the Whale both advertise as "PiPiJing". The Whale uses different UUIDs from the standard LiBo vibration protocol and has independent shock and vibration characteristics. The ELLE uses the standard `0x6000` service but with shock on the primary TX and vibration on the secondary channel.

## BLE Profile

### Older Whale (PiPiJing — different UUIDs)

```yaml
ble_names:
  - "PiPiJing"
services:
  - uuid: "00006000-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "00006001-0000-1000-8000-00805f9b34fb"
        properties: [write_without_response]
        role: tx
        description: "Shock intensity + mode (XY format)"
      - uuid: "00006002-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Vibration mode"
  - uuid: "00006060-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "00006062-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Additional write endpoint"
  - uuid: "00006050-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "00006051-0000-1000-8000-00805f9b34fb"
        properties: [notify, read]
        role: rx
        description: "Power percentage"
```

### Newer ELLE (standard LiBo service, different channel roles)

```yaml
ble_names:
  - "PiPiJing"
services:
  - uuid: "00006000-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "00006001-0000-1000-8000-00805f9b34fb"
        properties: [write_without_response]
        role: tx
        description: "Shock control (0x01 low, 0x04 high, other values = patterns)"
      - uuid: "00006002-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Vibration (speed levels 0-3, patterns 4-9)"
```

## Commands

### Whale — Shock Control (`0x6001`)

Command byte: `0xXY`

- `X` = shock intensity `0x0`–`0x6` (other values may leave intensity unchanged without turning shock off)
- `Y` = shock mode `0x0`–`0x8` (`0x0` = shock off)

### Whale — Vibration Control (`0x6002`)

Command byte: `0x0Y`

- `Y` = vibration mode `0x0`–`0x8` (`0x0` = vibration off)
- Modes `1`–`3` are static vibrations of increasing intensity
- Shock modes `1`–`3` pulse regardless of intensity byte

The device can be in four states: shock off/vibe off, shock off/vibe on, shock on/vibe on, shock on/vibe off.

### ELLE — Shock Control (`0x6001`)

- `0x01` = low shock
- `0x04` = high shock
- Other values select shock patterns

### ELLE — Vibration Control (`0x6002`)

- `0x00`–`0x03` = constant vibration speed levels
- `0x04`–`0x09` = vibration patterns

### Shock Patterns (Whale, as documented from community testing)

| Value | Pattern |
|-------|---------|
| `0` | Off |
| `1` | Constant, low |
| `2` | Quick pulse |
| `3` | Square wave, low to high (1 sec interval) |
| `4` | Constant high |
| `5` | Square wave, low to off (1 sec interval) |
| `6` | Random pulses |
| `7` | Random pulses |
| `8` | Random off to high |

## Notes

- The ELLE is the current production version; the Whale is older with different UUIDs.
- The Whale shock control does not scale linearly — `0xAB` with `A` ignored, `B` controlling patterns, was an earlier misunderstanding.
- ELLE2 conforms to the newer docs.buttplug.io#19 auth protocol.
- The `f000ffc0` service on the Whale is for OTA firmware updates.

## Sources

- [GitHub Issue (stpihkal#19 — Whale)](https://github.com/buttplugio/stpihkal/issues/19)
- [GitHub Issue (stpihkal#48 — ELLE)](https://github.com/buttplugio/stpihkal/issues/48)
- [Buttplug implementation (libo_elle.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/libo_elle.rs)
