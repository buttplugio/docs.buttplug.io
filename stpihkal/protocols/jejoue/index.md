---
title: Je Joue Nuo Protocol
brand: jejoue
transport: btle
config_ref: jejoue.yml
---

# Je Joue Nuo Protocol

## Introduction

The Je Joue Nuo is a dual-motor Bluetooth LE vibrator. Commands are 2 ASCII characters selecting pattern and intensity independently.

## BLE Profile

```yaml
ble_names:
  - "???"
services:
  - uuid: "0000fff0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000fff1-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
```

## Commands

### Vibration Control

Commands are 2 ASCII characters (e.g., `"41"`):

```
PP II
```

Where:
- `PP` = pattern (ASCII character `'1'`–`'8'`)
- `II` = intensity (ASCII character `'0'`–`'5'`; `'0'` = off)

### Pattern Table

| Pattern | Effect |
|---------|--------|
| `1` | Both vibes at specified intensity |
| `2` | Larger vibe only |
| `3` | Smaller vibe only |
| `4`–`8` | Alternating combinations of both vibes |

### Stopping

The official app stops the device by sending the last pattern with intensity `'0'`:

```
80
```

Sending `"00"` also stops the vibes, but this may be treated as an error condition by the device.

## Notes

- Patterns outside `'1'`–`'8'` appear to turn off both motors.
- BLE device advertisement name is not documented in the source issue.

## Sources

- [GitHub Issue (stpihkal#102)](https://github.com/buttplugio/stpihkal/issues/102)
- [Buttplug implementation (jejoue.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/jejoue.rs)
