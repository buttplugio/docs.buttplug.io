---
title: Picobong Remoji Protocol
brand: picobong
transport: btle
config_ref: picobong.yml
---

# Picobong Remoji Protocol

## Introduction

All Picobong Remoji devices share a single 3-byte BLE command format covering motor selection, mode/pattern, and speed.

## BLE Profile

```yaml
ble_names:
  - "Picobong Male Toy"
  - "Picobong Egg"
  - "Picobong Ring"
  - "Picobong Butt Plug"
  - "Egg driver"
  - "Surfer_plug"
services:
  - uuid: "0000fff0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000fff1-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Speed/pattern command endpoint"
```

## Commands

### Vibration / Pattern

```
XX YY ZZ
```

Where:
- `XX` = motor ID, always `0x01`
- `YY` = mode/pattern (see table)
- `ZZ` = speed `0x00`–`0x0a`

### Mode Table

| `YY` | Mode |
|------|------|
| `0xff` | Stopped |
| `0x01` | Continuous |
| `0x02` | Long pause |
| `0x03` | Medium pause |
| `0x04` | Short pause |
| `0x05` | Long wave |
| `0x06` | Fast wave |
| `0x07` | Half wave |
| `0x08` | Medium half wave |
| `0x09` | Medium half wave pause |
| `0x0a` | Random |
| `0xfa` | Power off |

## Notes

- The motor continues to move at speed `0x00` — it is too slow to vibrate but not fully stopped.
- Tested speed range is `0x00`–`0x0a` (`0`–`10`); the motor can reportedly still move at negative speeds if the value wraps.
- Use `0xff` in the mode byte to fully stop vibration.

## Sources

- [GitHub Issue (stpihkal#45)](https://github.com/buttplugio/stpihkal/issues/45)
- [Buttplug implementation (picobong.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/picobong.rs)
