---
title: Hismith
brand: hismith
transport: btle
config_ref: hismith.yml
config_identifier: null
---

# Hismith

## Introduction

Hismith manufactures BLE-controlled sex machines and strokers. The devices advertise as "HISMITH" and use a command protocol with two command families: `0xAA` commands for motor/vibration control and `0xFF` commands for fucking machine (FF) control.

## BLE Profile

```yaml
ble_names: ["HISMITH"]
services:
  - uuid: "0000ffe5-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ffe9-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
  - uuid: "0000ffe0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ffe4-0000-1000-8000-00805f9b34fb"
        properties: [notify]
        role: rx
        description: "Response/notification endpoint"
  - uuid: "0000ff90-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ff96-0000-1000-8000-00805f9b34fb"
        properties: [read]
        description: "Model information"
```

## Commands

All commands use a 4-byte format with a checksum: the last byte equals the sum of the second and third bytes.

### AA Commands (Motor/Vibration)

**Format:**

```
0xAA XX YY ZZ
```

Where `ZZ = XX + YY` (checksum).

| XX | YY | Description |
|----|------|-------------|
| `0x01` | `0x00` | Power on |
| `0x02` | `0x00` | Power off |
| `0x03` | `0x00` | Get speed |
| `0x04` | `0x00`-`0x64` | Set speed (0-100) |
| `0x05` | `0x00` | Get mode |
| `0x05` | `??` | Set mode |
| `0x06` | `0x00` | Get vibrate status |
| `0x06` | `??` | Set vibrate |
| `0x06` | `0xF0` | Close vibrate |
| `0x07` | `0x00` | Get music mode status |
| `0x07` | `0x01` | Open music mode |
| `0x07` | `0xF0` | Close music mode |

### FF Commands (Fucking Machine)

**Format:**

```
0xFF XX YY ZZ
```

Where `ZZ = XX + YY` (checksum).

| XX | YY | Description |
|----|------|-------------|
| `0x01` | `0x00` | Auto mode |
| `0x01` | `0x01` | Manual mode |
| `0x01` | `0xA0` | Query run mode |
| `0x02` | `0x00` | Stop |
| `0x03` | `0xA0` | Query speed |
| `0x03` | `0x00`-`0x64` | Set speed (0-100) |
| `0x04` | `0xA0` | Query mode |
| `0x04` | `??` | Set mode |
| `0x06` | `0xA0` | Query stop bit |
| `0x06` | `??` | Set stop bit |
| `0x07` | `0xA0` | Query start bit |
| `0x07` | `??` | Set start bit |
| `0x08` | `0xA0` | Query smoothness |
| `0x08` | `??` | Set smoothness |
| `0x09` | `??` | Set position |

### FF New Mode

A special command for custom patterns:

```
0xFF 0x05 0x05 XX (0x05+XX) YY...
```

Where `XX` is the length of the hex pattern `YY...`.

## Notes

- Product information is available by reading the model characteristic at `0xFF96`.
- The Thrusting Cup (identifier 2001) and G011 (identifier 1006) support both oscillation and vibration.
- Query commands use `YY=0xA0` and return data on the Rx characteristic.
- The Wildolo (identifier 3001) is also supported via this protocol.

## Sources

- [GitHub Issue](https://github.com/buttplugio/stpihkal/issues/139)
- [Buttplug implementation](https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server/src/device/protocol_impl/hismith.rs)
