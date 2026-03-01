---
title: Blissmakers Protocol
brand: blissmakers
transport: btle
---

# Blissmakers Protocol

## Introduction

Blissmakers vibrators advertise under many different BLE names but share a common protocol. Single- and dual-channel variants exist.

## BLE Profile

```yaml
ble_names:
  - "AR-085-M-C2"
  - "AR-JX052X"
  - "AR-073-M-D2"
  - "SYJ-0425-M-D2"
  - "AR-033S-M-D1"
  - "DG-D01M-M-C1"
  - "GM-PNO11-M-D2"
  - "AR-061-M-C1"
  - "GM-PN011-M-D2"
  - "AR-069-M-E1"
  - "AR-JX050X-M-D1"
services:
  - uuid: "0xffa0"
    characteristics:
      - uuid: "0xffa1"
        properties: [write]
        role: tx
        description: "Vibration control"
```

## Commands

### Vibration

```
bb 0b 00 00 XX
```

Where `XX` is intensity `0x00`–`0x0A` (0–10).

Note: `0x00` is the **lowest** vibration level, not off.

### Stop Vibration

```
bb 0b 14 00 00
```

## Notes

- 2-channel toys exist; the commands to control each channel independently are unknown.
- The minimum intensity byte `0x00` still produces vibration — it is the lowest level, not off.
- `0xffa0` and `0xffa1` are 16-bit short-form UUIDs.

## Sources

- [GitHub Issue (docs.buttplug.io#39)](https://github.com/buttplugio/docs.buttplug.io/issues/39)
