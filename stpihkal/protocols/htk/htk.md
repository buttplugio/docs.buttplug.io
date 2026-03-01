---
title: HTK Breast Massager Protocol
brand: htk
transport: btle
config_ref: htk_bm.yml
config_identifier: null
---

# HTK Breast Massager Protocol

## Introduction

The HTK BM001 is a BLE breast massager with multiple massage modes. Commands are single-byte values written to a standard Immediate Alert characteristic.

## BLE Profile

```yaml
ble_names:
  - "HTK-BLE-BM001"
services:
  - uuid: "0000180f-0000-1000-8000-00805f9b34fb"
    description: "Battery Service"
    characteristics:
      - uuid: "00002a19-0000-1000-8000-00805f9b34fb"
        properties: [read, notify]
        role: rx
        description: "Battery level"
  - uuid: "00001802-0000-1000-8000-00805f9b34fb"
    description: "Immediate Alert Service"
    characteristics:
      - uuid: "00002a06-0000-1000-8000-00805f9b34fb"
        properties: [write_no_response]
        role: tx
        description: "Command / Alert Level"
```

## Commands

Single-byte commands written to the Alert Level characteristic (`0x2a06`):

| Command | Byte | Description |
|---------|------|-------------|
| NR Massage | `0x08` | ??? mode |
| Disconnect | `0x09` | Disconnect device |
| Power Off | `0x0A` | Power off |
| Normal Massage | `0x0B` | Normal massage mode |
| Left Massage | `0x0C` | Left-side massage |
| Right Massage | `0x0D` | Right-side massage |
| Inversion Massage | `0x0E` | Inversion mode |
| Stop Massage | `0x0F` | Stop current massage |

## Notes

- Uses standard Bluetooth SIG services (Immediate Alert, Battery Service).
- "NR Massage" mode meaning is unknown.

## Sources

- [GitHub Issue (stpihkal#138)](https://github.com/buttplugio/stpihkal/issues/138)
- [Buttplug implementation (htk_bm.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/htk_bm.rs)
