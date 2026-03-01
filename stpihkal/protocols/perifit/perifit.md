---
title: Perifit Protocol
brand: perifit
transport: btle
---

# Perifit Protocol

## Introduction

The Perifit is a Bluetooth LE pelvic floor trainer that reads pressure sensor data. It exposes pressure readings from two points (base and tip) as 16-bit values.

## BLE Profile

```yaml
ble_names:
  - "Perifit_o)"
services:
  - uuid: "0xaa41"
    characteristics:
      - uuid: "0xaa41"
        properties: [notify]
        role: rx
        description: "Pressure sensor data"
```

## Sensor Data

The pressure characteristic returns 4 bytes:

```
[B1 B2 T1 T2]
```

Where:
- `B1 B2` = 16-bit base pressure (big-endian)
- `T1 T2` = 16-bit tip pressure (big-endian)

Maximum observed pressure value: approximately `0x1378`; expected maximum is `0x1400`.

## Notes

- The BLE name contains a closing parenthesis (`Perifit_o)`) which appears to be intentional.
- Full UUID resolution for `0xaa41` is unknown — this may be a 16-bit short-form UUID.

## Sources

- [GitHub Issue (stpihkal#171)](https://github.com/buttplugio/stpihkal/issues/171)
