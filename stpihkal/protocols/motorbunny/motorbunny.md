---
title: Motorbunny Classic Protocol
brand: motorbunny
transport: btle
config_ref: motorbunny.yml
---

# Motorbunny Classic Protocol

## Introduction

The Motorbunny Classic is a Bluetooth LE saddle vibrator with a separate rotation motor. Commands are 18 bytes with a mode byte, 7 two-byte data pairs, an additive CRC, and a fixed trailer.

## BLE Profile

```yaml
ble_names:
  - "MB Controller"
services:
  - uuid: "0000fff0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000fff6-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Control command endpoint"
```

## Packet Format

```
MM D1 D2 D3 D4 D5 D6 D7 D8 D9 D10 D11 D12 D13 D14 CRC EC
```

- Byte 0 (`MM`): mode byte — `0xff` for vibrate, `0xaf` for rotate
- Bytes 1–14 (`D1`–`D14`): 7 two-byte data pairs (speed or pattern parameters)
- Byte 15 (`CRC`): additive checksum of bytes 1–14
- Byte 16: always `0xec`

Total packet length: 17 bytes.

## Commands

### Vibration (constant speed)

All 7 pairs set to the same value:

```
ff a1 14 a1 14 a1 14 a1 14 a1 14 a1 14 a1 14 f3 ec
```

### Vibration Pattern (example — single spike)

```
ff b3 64 02 05 47 50 01 32 00 00 00 00 00 00 e8 ec
```

### Rotation (single direction, constant speed)

Direction byte: `0x2a` or `0x29`:

```
af 2a 3e 2a 3e 2a 3e 2a 3e 2a 3e 2a 3e 2a 3e d8 ec
```

### Vibration Off

```
f0 00 00 00 00 ec
```

(6-byte form used for stop commands.)

### Rotation Off

```
a0 00 00 00 00 ec
```

## Notes

- Speed range for rotation is `0x00`–`0xff`.
- Rotation direction is set by the byte at positions 1, 3, 5, … — `0x2a` or `0x29`.
- Stop commands use a shorter 6-byte form rather than the full 17-byte packet.

## Sources

- [GitHub Issue (stpihkal#72)](https://github.com/buttplugio/stpihkal/issues/72)
- [Buttplug implementation (motorbunny.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/motorbunny.rs)
