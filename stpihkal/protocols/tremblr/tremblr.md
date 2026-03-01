---
title: Tremblr BT-R Protocol
brand: tremblr
transport: btle
---

# Tremblr BT-R Protocol

## Introduction

The Tremblr BT-R is a BLE-connected prostate massager. Commands map to button presses on the physical UI. The protocol uses an 18-byte message with a CRC-8 checksum. An associated device called "GIGOLO" (BLE name `FM-G`) may share the same protocol.

## BLE Profile

```yaml
ble_names:
  - "FM-T"
services:
  - uuid: "0xfff0"
    characteristics:
      - uuid: "0xfff1"
        properties: [write]
        role: tx
        description: "Command"
```

## Message Format

```
CMD 64 00 00 00 00 31 32 33 34 00 00 00 00 00 00 00 CRC
```

| Position | Value | Description |
|----------|-------|-------------|
| Byte 0 | Command byte | See command table below |
| Bytes 1 | `0x64` | Constant |
| Bytes 2–5 | `0x00` | Constant |
| Bytes 6–9 | `0x31 0x32 0x33 0x34` | Password placeholder (not implemented) |
| Bytes 10–16 | `0x00` | Constant |
| Byte 17 | CRC | CRC-8 checksum |

## Commands

Each command represents a button event. Button-held events are followed by a button-released event when released.

| Command | Byte | Description |
|---------|------|-------------|
| On/Off hold | `0x01` | On/Off button held down |
| On/Off release | `0x02` | On/Off button released |
| Speed buttons release | `0x03` | Speed buttons released |
| Speed Up hold | `0x05` | Speed Up button held down |
| Speed Down hold | `0x06` | Speed Down button held down |
| Suction Up hold | `0x07` | Suction Up button held down |
| Suction Down hold | `0x08` | Suction Down button held down |

Additional commands exist for pattern control (not fully documented in the issue).

## CRC-8 Checksum

```javascript
function calcCRC(data) {
    let bitCount = 0
    for (let i = 0; i < 17; i++) {
        let byte = data[i]
        for (let b = 0; b < 8; b++) {
            if (byte & 0x80) bitCount++
            byte <<= 1
        }
    }
    const remainder = bitCount % 3
    if (remainder === 0) {
        return Math.floor(bitCount / 1) + 55  // approximate
    } else if (remainder === 1) {
        return Math.floor(bitCount / 2) + 111
    } else {
        return Math.floor(bitCount / 3) + 177
    }
}
```

## Notes

- Password bytes (`0x31 0x32 0x33 0x34`) are intended for authentication but not implemented in current firmware.
- A related device "GIGOLO" uses BLE name `FM-G` and likely shares this protocol.
- CRC formula: divides the total bit count by 1/2/3 based on `bitCount mod 3`, plus a constant offset. The exact formula may need verification.

## Sources

- [GitHub Issue (docs.buttplug.io#13)](https://github.com/buttplugio/docs.buttplug.io/issues/13)
