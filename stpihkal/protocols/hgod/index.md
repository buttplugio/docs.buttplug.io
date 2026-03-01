---
title: Hgod Butterfly Love Protocol
brand: hgod
transport: btle
config_ref: hgod.yml
---

# Hgod Butterfly Love Protocol

## Introduction

The Hgod Butterfly Love (advertised as "AMN NEO") uses a 6-byte BLE command supporting pattern and direct speed control modes.

## BLE Profile

```yaml
ble_names:
  - "AMN NEO"
services:
  - uuid: "0000ffe3-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ffe1-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
      - uuid: "0000ffe2-0000-1000-8000-00805f9b34fb"
        properties: [notify]
        role: rx
        description: "Response endpoint"
```

## Commands

### Pattern Mode

```
55 03 01 00 XX 00
```

Where `XX` is the pattern index `0x00`–`0x0b`. `0x00` is off.

### Direct Speed Control

```
55 04 00 00 00 XX
```

Where `XX` is speed `0x00`–`0x0f`. Note: the motor stops increasing speed at some point before `0x0f`.

The direct speed command only runs for approximately 1 second before stopping; the pattern command must be used for sustained output.

## Notes

- At least one user reported that the device connects but cannot be turned off via direct control — behaviour with the vendor app was unknown.
- The speed ceiling in direct mode is not precisely documented; testing is recommended.

## Sources

- [GitHub Issue (stpihkal#140)](https://github.com/buttplugio/stpihkal/issues/140)
- [Buttplug implementation (hgod.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/hgod.rs)
