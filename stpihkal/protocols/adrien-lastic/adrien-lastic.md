---
title: Adrien Lastic
brand: adrien-lastic
transport: btle
config_ref: adrienlastic.yml
config_identifier: null
---

# Adrien Lastic

## Introduction

Adrien Lastic vibrators (Palpitation and Revelation lines) communicate over BLE using the Nordic UART service. Commands are hardcoded 11-byte packets, one per mode, with 10 pre-defined vibration patterns.

## BLE Profile

```yaml
ble_names:
  - varies by model
services:
  nordic_uart:
    uuid: 6e400001-b5a3-f393-e0a9-e50e24dcca9e
    characteristics:
      tx: 6e400002-b5a3-f393-e0a9-e50e24dcca9e
```

## Devices

| Model | SKU |
|-------|-----|
| Palpitation | LVS-S001 |
| Palpitation (legacy) | LVS-S001L |
| Revelation | LVS-S002 |
| Revelation (legacy) | LVS-S002L |

## Commands

Commands are 11-byte packets written to the Tx characteristic. Each mode corresponds to a fully hardcoded packet; there are 10 pre-defined patterns (modes 0–9) plus a stop command.

| Mode | Description |
|------|-------------|
| 0 | Stop / off |
| 1 | Constant low |
| 2 | Constant medium |
| 3 | Constant high |
| 4–9 | Pre-defined vibration patterns |

The full byte arrays for each mode are documented in the [tracking issue](https://github.com/buttplugio/docs.buttplug.io/issues/5).

## Notes

Because the protocol only supports hardcoded pattern packets, there is no continuous speed control — only the 10 fixed modes are available.

## Sources

- [docs.buttplug.io Issue #5](https://github.com/buttplugio/docs.buttplug.io/issues/5)
- [Buttplug Rust implementation](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/adrienlastic.rs)
