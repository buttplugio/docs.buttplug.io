---
title: Magic Motion Protocol
slug: magic-motion-protocol
brand: magic-motion
transport: btle
config_ref: magic-motion-1.yml
---

# Magic Motion Protocol

## Introduction

Magic Motion produces a range of Bluetooth LE vibrating devices. At least four protocol variants exist across their product line. This page documents the shared BLE profile and command formats gathered from community reverse engineering. The Solstice X (dual-motor) and Zenith ("funwand") devices are confirmed to use this same service and characteristic layout.

## BLE Profile

```yaml
ble_names:
  - "Solstice X"
  - "funwand"
  - "???*"
services:
  - uuid: "78667579-7b48-43db-b8c5-7928a6b0a335"
    characteristics:
      - uuid: "78667579-a914-49a4-8333-aa3c0cd8fedc"
        properties: [write]
        role: tx
        description: "Command endpoint"
```

## Commands

### Single Motor Vibration

Short-form command (used by Zenith / "funwand"):

```
04 08 VV 64 00
```

Where `VV` is speed `0x00`–`0x64`. Minimum effective value is approximately `0x06`.

### Dual Motor Vibration (Solstice X)

```
10 ff 04 0a 32 32 00 04 08 AA 64 00 04 08 BB 64 01
```

Where:
- `AA` = vibe motor 1 speed `0x00`–`0x64`
- `BB` = vibe motor 2 speed `0x00`–`0x64`

## Notes

- The Zenith ("funwand") was not tested against the official app but responds correctly to the single-motor command format above.
- The minimum value that produces noticeable vibration on the Zenith is `0x06`.
- Multiple protocol variants (v1–v4) exist in the Buttplug device config for different Magic Motion products; this page covers the Solstice X and Zenith additions documented in issue #10.

## Sources

- [GitHub Issue (docs.buttplug.io#10)](https://github.com/buttplugio/docs.buttplug.io/issues/10)
- [Buttplug implementation (magic_motion_v1.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/magic_motion_v1.rs)
