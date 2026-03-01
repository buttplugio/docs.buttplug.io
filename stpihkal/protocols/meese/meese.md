---
title: Meese Tera Protocol
brand: meese
transport: btle
config_ref: meese.yml
---

# Meese Tera Protocol

## Introduction

The Meese Tera is a Bluetooth LE device with vibration and suction motors. Commands are 4 bytes sent to a `0xffe0` service.

## BLE Profile

```yaml
ble_names:
  - "Meese-V389"
services:
  - uuid: "0000ffe0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ffe1-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
```

## Commands

### Vibration

```
01 80 01 VV
```

Where `VV` is speed `0x00`–`0x0a`.

### Suction

```
01 80 02 VV
```

Where `VV` is suction level `0x00`–`0x03`.

## Sources

- [GitHub Issue (stpihkal#158)](https://github.com/buttplugio/stpihkal/issues/158)
- [Buttplug implementation (meese.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/meese.rs)
