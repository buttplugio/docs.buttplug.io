---
title: OhMiBod Esca 2 Protocol
brand: ohmibod
transport: btle
---

# OhMiBod Esca 2 Protocol

## Introduction

The OhMiBod Esca 2 is a BLE vibrator made by OhMiBod (a Kiiroo brand). It uses Nordic Semiconductor chipset firmware (advertises the Nordic DFU service). The vibration command format is similar to the Kiiroo v2.1 protocol.

## BLE Profile

```yaml
ble_names:
  - "OhMiBod 4.0"
services:
  - uuid: "a0d70001-4c16-4ba7-977a-d394920e13a3"
    characteristics:
      - uuid: "a0d70002-4c16-4ba7-977a-d394920e13a3"
        properties: [write]
        role: tx
        description: "Vibration control"
      - uuid: "a0d70003-4c16-4ba7-977a-d394920e13a3"
        properties: [notify]
        role: rx
        description: "Status"
```

## Commands

### Vibration Control

```
01 XX
```

Where `XX` is intensity in the range `0x00`–`0x64` (0–100).

## Notes

- The device also supports light intensity settings (including a "double intensity for camming" mode) but the command format for light control is not documented.
- Advertising the Nordic DFU service means the device can be firmware-updated over BLE.
- The UUIDs do not match any known Kiiroo protocol variant.

## Sources

- [GitHub Issue (stpihkal#83)](https://github.com/buttplugio/stpihkal/issues/83)
