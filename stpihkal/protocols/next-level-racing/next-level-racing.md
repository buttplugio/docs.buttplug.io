---
title: Next Level Racing HF8 Protocol
brand: next-level-racing
transport: serial
config_ref: nextlevelracing.yml
---

# Next Level Racing HF8 Protocol

## Introduction

The Next Level Racing HF8 Haptic Gaming Pad is a USB serial device with 8 vibration motors positioned across the seat surface. It is not a Bluetooth device.

## Transport

- **Interface:** USB Serial (CDC)
- **Baud rate:** 115200
- **Data bits:** 8
- **Parity:** None
- **Stop bits:** 1.5
- **Handshake:** None
- **Line ending:** `\r` (carriage return)
- **Read timeout:** 1 ms
- **Write timeout:** 50 ms
- **Write buffer size:** 64 bytes

## Commands

### Query State

```
P\r
```

Response format:

```
E<IntensityScale>,A<AudioMode>
```

Where:
- `IntensityScale` = `0`–`255`
- `AudioMode` = `0` (off) or `1` (on)

### Set Motor Intensity

```
M<Motor><Intensity>\r
```

Where:
- `Motor` = `0`–`7`
- `Intensity` = `0`–`255`

### Motor Layout

| Motor | Position |
|-------|----------|
| `M0` | Right thigh |
| `M1` | Left thigh |
| `M2` | Right buttock |
| `M3` | Left buttock |
| `M4` | Right back |
| `M5` | Left back |
| `M6` | Right shoulder |
| `M7` | Left shoulder |

## Sources

- [GitHub Issue (docs.buttplug.io#36)](https://github.com/buttplugio/docs.buttplug.io/issues/36)
- [Buttplug implementation (nextlevelracing.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/nextlevelracing.rs)
