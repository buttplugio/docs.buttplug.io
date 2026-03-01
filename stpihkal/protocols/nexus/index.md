---
title: Nexus Revo
brand: nexus
transport: btle
config_ref: nexus-revo.yml
config_identifier: null
---

# Nexus Revo

## Introduction

The Nexus Revo is a prostate massager with independent vibration and rotation motors, controllable over BLE. Rotation supports clockwise and counter-clockwise directions at two speed levels each. Battery level is reported via a notification characteristic.

## BLE Profile

```yaml
ble_names:
  - XW-LW3
services:
  main:
    uuid: 0000c570-0000-1000-8000-00805f9b34fb
    characteristics:
      tx:      0000c571-0000-1000-8000-00805f9b34fb
      battery: 0000c572-0000-1000-8000-00805f9b34fb
```

## Commands

All commands are 6-byte writes to the Tx characteristic.

### Set Vibration

```
0xaa 0x01 0x01 0x00 0x02 XX
```

- `XX` — vibration intensity: `0x00` (off) to `0x0A` (10, maximum)

### Set Rotation

```
0xaa 0x01 0x02 0x00 XX 0x00
```

| `XX` | Direction / Speed |
|------|-------------------|
| `0x00` | Off |
| `0x01` | Clockwise, slow |
| `0x02` | Clockwise, fast |
| `0x03` | Counter-clockwise, slow |
| `0x04` | Counter-clockwise, fast |

### Stop All

```
0xaa 0x00 0x00 0x00 0x00 0x00
```

## Battery

Subscribe to notifications on `0000c572-...`. The last byte of the notification contains the battery level.

## Sources

- [docs.buttplug.io Issue #40](https://github.com/buttplugio/docs.buttplug.io/issues/40)
- [Buttplug Rust implementation](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/nexus_revo.rs)
