---
title: D-Lab Powerbox Protocol
brand: d-lab
transport: btle
---

# D-Lab Powerbox Protocol

## Introduction

The D-Lab Powerbox (marketed as "E-STIM POWERBOX 2.0") is a BLE e-stim device. Its BLE name is `D-LAB ESTIM01`. The protocol has been partially reverse-engineered from the Android app.

## BLE Profile

```yaml
ble_names:
  - "D-LAB ESTIM01"
services:
  - uuid: "955a180a-0fe2-f5aa-a094-84b8d4f3e8ad"
    characteristics:
      - uuid: "955a1500-0fe2-f5aa-a094-84b8d4f3e8ad"
        handle: "0x0c"
        properties: [read, notify]
        role: rx
        description: "Battery / status (purpose uncertain)"
      - uuid: "955a1501-0fe2-f5aa-a094-84b8d4f3e8ad"
        properties: [write]
        role: tx
        description: "Command"
      - uuid: "955a1503-0fe2-f5aa-a094-84b8d4f3e8ad"
        properties: [write]
        role: tx
        description: "???  (additional command channel)"
```

## Notes

- Full command format has not been documented. The issue contains an nRF Connect dump for one unit labeled "E-STIM POWERBOX 2.0".
- Battery parsing logic exists in the app but the full protocol is incomplete.
- Multiple hardware revisions may exist with different characteristic layouts.

## Sources

- [GitHub Issue (stpihkal#91)](https://github.com/buttplugio/stpihkal/issues/91)
