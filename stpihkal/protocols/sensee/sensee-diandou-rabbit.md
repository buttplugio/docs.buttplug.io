---
title: Sensee Diandou Rabbit
brand: sensee
transport: btle
config_ref: sensee.yml
config_identifier: null
---

# Sensee Diandou Rabbit

## Introduction

The Sensee Diandou Rabbit is a BLE-controlled vibrator manufactured by Sensee. It advertises as "CTY222S4".

## BLE Profile

```yaml
ble_names: ["CTY222S4"]
services:
  - uuid: "0000fff0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000fff5-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
```

## Commands

### Vibrate

Controls the vibration speed.

**Format:**

```
0x55 0xAA 0xF0 0x01 YY 0x0B 0x65 0xF7 0x01 0x01 XX
```

| Byte | Description | Range |
|------|-------------|-------|
| `0x55 0xAA` | Header | Fixed |
| `0xF0` | Command type | Fixed |
| `0x01` | Unknown | Fixed |
| `YY` | Incremental counter | `0x01`+ (not required to change) |
| `0x0B 0x65 0xF7 0x01 0x01` | Unknown fixed bytes | Fixed |
| `XX` | Speed | `0x00`-`0x64` (0-100) |

## Notes

- The counter byte (`YY`) is described in the issue as an incremental counter starting at `0x01`, but the Buttplug implementation always sends `0x01` — changing the counter is not required.
- Speed range is 0-100 decimal (`0x00`-`0x64`).

## Sources

- [GitHub Issue](https://github.com/buttplugio/stpihkal/issues/178)
- [Buttplug implementation](https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server/src/device/protocol_impl/sensee.rs)
