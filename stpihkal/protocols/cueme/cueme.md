---
title: Cueme Underwear Protocol
brand: cueme
transport: btle
config_ref: cueme.yml
---

# Cueme Underwear Protocol

## Introduction

Cueme vibrating underwear devices advertise with names in the form `FUNCODE_{bt_id}_{type}`, where `bt_id` is the reversed Bluetooth MAC address and `type` identifies the garment (1 = men's, 2 = bra, 3 = women's). All variants use the same BLE service layout.

## BLE Profile

```yaml
ble_names:
  - "FUNCODE_*"
services:
  - uuid: "0000fff0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000fff1-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "MotorCtl — motor command endpoint"
      - uuid: "0000fff2-0000-1000-8000-00805f9b34fb"
        properties: [read]
        role: rx
        description: "UserDefMotor — not used by official app"
      - uuid: "0000fff3-0000-1000-8000-00805f9b34fb"
        properties: [read, notify]
        role: rx
        description: "BatLev — battery level"
      - uuid: "0000fff4-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "AutoMode — pattern selection"
```

## Commands

### Motor Control (MotorCtl — `0xfff1`)

```
AB
```

Where:
- `A` = motor ID `0x1`–`0x8`
- `B` = strength `0x0`–`0xf`

One byte, one motor at a time. It is not confirmed whether multiple motors can be driven simultaneously.

### Auto Mode (AutoMode — `0xfff4`)

```
0x01 – 0x04
```

Selects one of four automatic patterns.

### Battery Level (BatLev — `0xfff3`)

Read or subscribe for a single byte indicating battery level. Example: `0x37` = 55%.

## Notes

- The `bt_id` in the device name is the Bluetooth MAC address reversed (e.g., MAC `E0:E5:CF:A0:D8:EB` → `EBD8A0CFE5E0`).
- The suffix digit in the device name indicates garment type: `_1` men's, `_2` bra, `_3` women's.
- Driving more than one motor simultaneously is unconfirmed.

## Sources

- [GitHub Issue (stpihkal#22)](https://github.com/buttplugio/stpihkal/issues/22)
