---
title: TryFun Yaun Series Protocol
brand: tryfun
transport: btle
config_ref: tryfun.yml
---

# TryFun Yaun Series Protocol

## Introduction

The TryFun Yaun series uses a structured 5-byte BLE command with a checksum. Supported modes include pause, heat, thrust, spin, and pattern playback.

## BLE Profile

```yaml
ble_names:
  - "TRYFUN-ONE"
services:
  - uuid: "0000ff10-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000fff1-0000-1000-8000-00805f9b34fb"
        properties: [write, notify]
        role: tx/rx
        description: "Command and response endpoint"
```

## Commands

### Command Structure

```
AA NN MM VV ZZ
```

Where:
- `AA` = header byte, always `0xAA`
- `NN` = number of data bytes (`0x01` or `0x02`)
- `MM` = mode byte (see table below)
- `VV` = value byte
- `ZZ` = checksum: `0xFF - (NN + MM + VV)`

### Mode Table

| Mode | `MM` | `VV` range | Notes |
|------|------|-----------|-------|
| Pause | `0x03` | `0x00` restart, `0x01` pause | |
| Heat | `0x06` | `0x01` on, `0x02` off | |
| Thrust | `0x07` | `0x00`–`0x09` speed | |
| Spin | `0x08` | `0x00`–`0x09` speed | |
| Pattern | `0x09` | `0x01`–`0x05` | |

### Example Commands

```
# Heat on
aa 02 06 01 f9

# Heat off
aa 02 06 00 fa

# Thrust speed 1
aa 02 07 01 f8

# Thrust speed 9
aa 02 07 09 f0

# Spin speed 0 (stop)
aa 02 08 00 f8

# Spin speed 9
aa 02 08 09 ef

# Pause
aa 02 03 00 fd

# Restart
aa 02 03 01 fc

# Pattern 1
aa 02 09 01 f6

# Pattern 5
aa 02 09 05 f2
```

## Notes

- Two unknown commands observed from app traffic: `aa 01 02 fe` and `aa 01 04 fc` — purpose unknown.
- No Buttplug Rust implementation found at time of writing.

## Sources

- [GitHub Issue (stpihkal#175)](https://github.com/buttplugio/stpihkal/issues/175)
- [Buttplug implementation (tryfun.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/tryfun.rs)
