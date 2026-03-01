---
title: Kinsa Thermometer Protocol
brand: kinsa
transport: btle
---

# Kinsa Thermometer Protocol

## Introduction

Kinsa makes BLE smart thermometers. Two models are documented: Herschel (ear) and Kelvin (stick). These are health measurement devices, not adult toys.

## BLE Profile

### Herschel (Ear Thermometer)

```yaml
services:
  - uuid: "00000000-0068-746c-6165-4861736e694b"
    characteristics:
      - uuid: "00000004-0068-746c-6165-4861736e694b"
        properties: [write]
        role: tx
      - uuid: "00000002-0068-746c-6165-4861736e694b"
        properties: [notify]
        role: rx
```

### Kelvin (Stick Thermometer)

```yaml
services:
  - uuid: "00000000-006a-746c-6165-4861736e694b"
    characteristics:
      - uuid: "00000004-006a-746c-6165-4861736e694b"
        properties: [write]
        role: tx
      - uuid: "00000002-006a-746c-6165-4861736e694b"
        properties: [notify]
        role: rx
```

## Response Format

Rx notifications: `0xAA 0xNN...` where `0xAA` is the OpCode.

## OpCode Table

| Event | Herschel OpCode | Kelvin OpCode |
|-------|----------------|---------------|
| Temp notification | 70 | 67 |
| Firmware Version | 2 | 2 |
| Battery Voltage | 10 | 10 |
| Serial Number | 8 | 8 |
| RTC Date | 6 | 6 |
| RTC Counter | 4 | 4 |
| Next Cached Temp | 65 | 69 |
| Handshake complete | 5 | 5 |
| Error | — | 7 |
| Intermediate Temp | — | 66 |
| Temp Source | — | -76 |
| Unknown | 13 | 13 |

## Notes

- These are health thermometers, not adult devices.
- BLE advertisement names are not documented.
- The service UUIDs embed ASCII text: `6165-4861736e694b` decodes as `aeHasnIK`.

## Sources

- [GitHub Issue (stpihkal#46)](https://github.com/buttplugio/stpihkal/issues/46)
