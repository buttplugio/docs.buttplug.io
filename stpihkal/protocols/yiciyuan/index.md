---
title: YiCiYuan Protocol
brand: yiciyuan
transport: btle
---

# YiCiYuan Protocol

## Introduction

YiCiYuan devices come in 1, 2, and 3 channel variants. Speed values are in the range 0–20. The prostate massager oscillator (channel 1) does not start moving until level 6.

## BLE Profile

```yaml
ble_names:
  - "???"
services:
  - uuid: "0000ff40-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ff41-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Channel speed command"
```

## Commands

Speed range per channel: `0x00`–`0x14` (0–20).

### 1-Channel Toy

```
35 12 CH1 00 00
```

### 2-Channel Toy

```
35 12 CH1 CH2 00
```

### 3-Channel Toy

```
35 12 CH1 CH2 CH3
```

Where `CH1`, `CH2`, `CH3` are speed values `0x00`–`0x14`.

## Notes

- The prostate massager oscillator (channel 1 on 2-channel variant) does not begin moving until level 6 (`0x06`).
- BLE advertisement name is not documented.

## Sources

- [GitHub Issue (docs.buttplug.io#33)](https://github.com/buttplugio/docs.buttplug.io/issues/33)
