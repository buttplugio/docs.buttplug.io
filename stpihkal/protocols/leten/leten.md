---
title: Leten Dinosaur Protocol
brand: leten
transport: btle
config_ref: leten.yml
---

# Leten Dinosaur Protocol

## Introduction

The "Leten Dinosaur" is an informal name for an app-controlled Bluetooth LE egg vibrator sold by Leten on AliExpress. All packaging text is in Chinese and the actual product name is unknown. Protocol details have not been reverse engineered.

## BLE Profile

```yaml
ble_names:
  - "???"
services:
  - uuid: "???"
    characteristics:
      - uuid: "???"
        properties: [write]
        role: tx
        description: "???"
```

## Commands

Protocol not yet documented.

## Notes

- This device has not been reverse engineered. Protocol details are entirely unknown.
- Purchase URL at time of issue: [AliExpress listing](https://www.aliexpress.com/item/Leten-APP-Remote-Control-USB-Charge-Wireless-Anal-Clitoris-Vagina-G-spot-Vibrating-Egg-Kegel-Ball/32829532705.html)

## Sources

- [GitHub Issue (stpihkal#38)](https://github.com/buttplugio/stpihkal/issues/38)
- [Buttplug implementation (leten.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/leten.rs)
