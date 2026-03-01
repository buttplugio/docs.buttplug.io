---
title: Youou Wand Vibrator Protocol
brand: youou
transport: btle
config_ref: youou.yml
---

# Youou Wand Vibrator Protocol

## Introduction

The Youou Wand Vibrator uses a 17-byte command packet with a monotonically increasing packet ID and an XOR checksum over the first 8 bytes.

## BLE Profile

```yaml
ble_names:
  - "???"
services:
  - uuid: "???"
    characteristics:
      - uuid: "???"
        properties: [write]
        role: tx
        description: "Command endpoint"
```

## Commands

### Vibration

Packet structure (17 bytes):

```
aa 55 ID 02 03 01 VV ST CRC ff 00 00 00 00 00 00 00
```

Where:
- `ID` = packet ID, monotonically increasing `0x00`–`0xff`, wraps to `0x00`
- `VV` = speed value `0x00`–`0xf7` (`247` decimal). Values above `0xf7` select patterns instead of speed.
- `ST` = state: `0x01` if speed \> 0, `0x00` if stopped
- `CRC` = XOR of bytes 0–7 (bytes `aa 55 ID 02 03 01 VV ST`)

Maximum effective speed value: `0xf7` (247). Values `0xf8`–`0xff` trigger built-in patterns.

### Example — speed at 50%

Assuming `ID = 0x01` and speed = 124 (`0x7c`):

```
aa 55 01 02 03 01 7c 01 [XOR] ff 00 00 00 00 00 00 00
```

## Notes

- BLE advertisement name and service/characteristic UUIDs are not documented in the source issue. The implementation was derived from TypeScript source code in buttplug-js.
- The packet ID must be tracked in software and wraps at 255.

## Sources

- [GitHub Issue (stpihkal#51)](https://github.com/buttplugio/stpihkal/issues/51)
- [Buttplug implementation (youou.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/youou.rs)
