---
title: Foreo Luna Fofo Protocol
brand: foreo
transport: btle
config_ref: foreo.yml
---

# Foreo Luna Fofo Protocol

## Introduction

The Foreo Luna Fofo is a Bluetooth LE facial cleansing device with a vibration motor, battery reporting, and skin conductivity sensing.

## BLE Profile

```yaml
ble_names:
  - "FOFO"
services:
  - uuid: "0000fff0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000fff1-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Motor control"
      - uuid: "00000a00-0000-1000-8000-00805f9b34fb"
        properties: [notify]
        role: rx
        description: "Battery level (read)"
      - uuid: "00000a05-0000-1000-8000-00805f9b34fb"
        properties: [read, write]
        role: rx/tx
        description: "Skin conductivity"
```

## Commands

### Motor Control (`0xfff1`)

```
01 01 0X
```

Where `X` is speed `0x0`–`0xa`.

### Battery Level (`0x0a00`)

Read or subscribe. Returns `0x64` for 100% (full).

### Skin Conductivity (`0x0a05`)

Write `0xef` to initialize the skin conductivity sensor. Returns 2 bytes; interpretation of the returned values is unknown.

## Notes

- The skin conductivity sensor return values have not been reverse engineered.

## Sources

- [GitHub Issue (docs.buttplug.io#16)](https://github.com/buttplugio/docs.buttplug.io/issues/16)
- [Buttplug implementation (foreo.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/foreo.rs)
