---
title: F-Machine BLE Protocol
brand: f-machine
transport: btle
---

# F-Machine BLE Protocol

## Introduction

Several F-Machine products are available in Bluetooth LE-enabled variants. These devices share a common BLE protocol using an 18-byte message with a CRC-8 checksum. Commands map to button presses on the physical device UI.

Covered devices:

| Device | BLE Name | Secondary Function |
|--------|----------|--------------------|
| Tremblr BT-R | `FM-T` | Suction |
| Gigolo BT-R | `FM-G` | None |
| Alpha | `FM-A` | Thrust Depth |

## BLE Profile

```yaml
ble_names:
  - "FM-T"
  - "FM-G"
  - "FM-A"
services:
  - uuid: "0xfff0"
    characteristics:
      - uuid: "0xfff1"
        properties: [write]
        role: tx
        description: "Command"
```

## Device Configuration

<!-- Auto-populated from device-config-v4 at build time -->

## Message Format

```
CMD 64 00 00 00 00 31 32 33 34 00 00 00 00 00 00 00 CRC
```

| Position | Value | Description |
|----------|-------|-------------|
| Byte 0 | Command byte | See command table below |
| Byte 1 | `0x64` | Constant |
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
| Secondary Function Up hold | `0x07` | Secondary Function Up button held down |
| Secondary Function Down hold | `0x08` | Secondary Function Down button held down |
| Seconday Function buttons release | `0x09` | Secondary Function buttons released |

The secondary function (`0x07`/`0x08`/`0x09`) controls different physical mechanisms depending on the device: **Suction** on the Tremblr BT-R, and **Thrust Depth** on the Alpha. The Gigolo BT-R has no secondary function and does not use these commands.

## CRC-8 Checksum

The checksum is computed over the first 17 bytes of the message:

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

- All three BLE devices (Tremblr BT-R `FM-T`, Gigolo BT-R `FM-G`, Alpha `FM-A`) share this protocol. The secondary function commands (`0x07`/`0x08`/`0x09`) are only applicable to the Tremblr BT-R (suction) and the Alpha (thrust depth); the Gigolo BT-R has no secondary function.
- Password bytes (`0x31 0x32 0x33 0x34`) are intended for authentication but not implemented in current firmware.
- CRC formula: divides the total bit count by 1/2/3 based on `bitCount mod 3`, plus a constant offset. The exact formula may need verification.

## Sources

- [GitHub Issue (docs.buttplug.io#13)](https://github.com/buttplugio/docs.buttplug.io/issues/13)
