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
        properties: [read, write]
        role: tx
        description: "Command endpoint"
      - uuid: "0xfff4"
        properties: [notify, read]
        role: rx
        description: "Response/notification endpoint"
```

## Device Configuration

<!-- Auto-populated from device-config-v4 at build time -->

## Pairing

No special pairing procedure required.

## Command Message Format

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
| Byte 17 | CRC byte | CRC-8 checksum |

## Notification Response Format

```
CMD 64 00 BITMASK 00 00 00 00 00 00 00 00 00 00 00 00 00 CRC
```

| Position | Value | Description |
|----------|-------|-------------|
| Byte 0 | Command byte | See command table below |
| Byte 1 | `0x64` | Constant |
| Byte 2 | `0x00` | Constant |
| Byte 3 | Bitmask byte | See response bitmask below |
| Bytes 4–16 | `0x00` | Constant |
| Byte 17 | CRC byte | CRC-8 checksum |

## Commands

Each command represents a button event. Button-held events are followed by a button-released event when released.

| Command | Byte | Description |
|---------|------|-------------|
| On/Off hold | `0x01` | On/Off button held down |
| On/Off release | `0x02` | On/Off button released |
| Speed buttons release | `0x03` | Speed buttons released |
| Reserved | `0x04` | Unknown / Reserved |
| Speed Up hold | `0x05` | Speed Up button held down |
| Speed Down hold | `0x06` | Speed Down button held down |
| Secondary Function Up hold | `0x07` | Secondary Function Up button held down |
| Secondary Function Down hold | `0x08` | Secondary Function Down button held down |
| Secondary Function buttons release | `0x09` | Secondary Function buttons released |

The secondary function (`0x07`/`0x08`/`0x09`) controls different physical mechanisms depending on the device: **Suction** on the Tremblr BT-R, and **Thrust Depth** on the Alpha. The Gigolo BT-R has no secondary function and does not use these commands.

## CRC-8 Checksum

The checksum is computed over the first 17 bytes of the message:

```javascript
function calcCRC8 (data) {
    let bitCount = 0
    let crc = 0

    for (let i = 0; i < 17; i++) {
        let byte = data[i]
        for (let b = 0; b < 8; b++) {
            if ((byte & (1 << b)) !== 0 ) {
                bitCount++
            }
        }
    }

    const remainder = bitCount % 3
    if (remainder === 0) {
        crc = 222 - bitCount
    } else if (remainder === 1) {
        crc = Math.floor(bitCount / 2) + 111
    } else {
        crc = Math.floor(bitCount / 3) + 177
    }

    return crc
}
```

## Response bitmask

Although multiple buttons may be held simultaneously, the device only ever reports the highest value bit at any one time.

```
000xxxxx
   ||||\_ Is On/Off Held (`0x01`)
   |||\__ Is Speed Up Held (`0x02`)
   ||\___ Is Speed Down Held (`0x04`)
   |\____ Is Secondary Function Up Held (`0x08`)
   \_____ Is Secondary Function Down Held (`0x10`)
```

An example, if Speed Up and Secondary Function Up are both held, only `0x08` will be returned until Secondary Function Release is sent, then it will reply `0x02` as Speed Up is still held. Once nothing is held it will go back to `0x00`.

## Notes

- All three BLE devices (Tremblr BT-R `FM-T`, Gigolo BT-R `FM-G`, Alpha `FM-A`) share this protocol. The secondary function commands (`0x07`/`0x08`/`0x09`) are only applicable to the Tremblr BT-R (suction) and the Alpha (thrust depth); the Gigolo BT-R has no secondary function.
- Password bytes (`0x31 0x32 0x33 0x34`) are intended for authentication but not implemented in current firmware. It's unknown whether firmware can be upgraded.
- CRC formula: based on `bitCount mod 3`, applies one of three linear transformations to the total bit count.

## Sources

- [GitHub Issue (docs.buttplug.io#13)](https://github.com/buttplugio/docs.buttplug.io/issues/13)
