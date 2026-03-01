---
title: Lovenuts
brand: lovenuts
transport: btle
config_ref: lovenuts.yml
config_identifier: null
---

# Lovenuts

## Introduction

Lovenuts manufactures BLE-controlled vibrators. The device uses a pattern-based control scheme where a sequence of 20 speed values is cycled at a configurable interval.

## BLE Profile

```yaml
ble_names: ["Love_Nuts"]
services:
  - uuid: "0000fff0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000fff1-0000-1000-8000-00805f9b34fb"
        properties: [write, notify]
        role: tx/rx
        description: "Command endpoint and button notifications"
```

## Commands

### Set Pattern

The device uses a unique pattern-based speed control. A single command contains 20 speed values (packed as 4-bit nibbles) and a 16-bit interval timer.

**Format:**

```
0x45 0x56 0x04 0xF4C X1X2 X3X4 X5X6 X7X8 X9XA XBXC XDXE XFXG XHXI XJXK II II
```

| Byte | Description | Range |
|------|-------------|-------|
| `0x45 0x56 0x04 0xF4C` | Header | Fixed |
| Bytes 5-14 | 20 speed values as 4-bit nibbles | `0x0`-`0xF` each (15 levels) |
| Last 2 bytes | Interval (16-bit) | Duration per step; `0x0000` = off |

Each 4-bit speed value is applied for the duration specified by the interval. Changes take effect immediately, though the device may stutter briefly when new values are applied.

### Button Notifications

The device sends button press notifications on the same characteristic. The notification value depends on both the current highest speed and which button was pressed:

| Highest Speed | "-" Pressed | "+" Pressed |
|:---:|:---:|:---:|
| F | 0C | 0F |
| E | 0B | 0F |
| D | 0A | 0F |
| C | 09 | 0F |
| B | 08 | 0E |
| A | 07 | 0D |
| 9 | 06 | 0C |
| 8 | 05 | 0B |
| 7 | 04 | 0A |
| 6 | 03 | 09 |
| 5 | 03 | 08 |
| 4 | 03 | 07 |
| 3 | 03 | 06 |
| 2 | 03 | 05 |
| 1 | 03 | 04 |

## Notes

- Setting the interval to `0x0000` turns off the device (this may actually be causing a divide-by-zero crash).
- If all speed values are 0, no button updates are sent.
- The device supports 15 discrete speed levels (0-F nibble values).

## Sources

- [GitHub Issue](https://github.com/buttplugio/stpihkal/issues/80)
- [Buttplug implementation](https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server/src/device/protocol_impl/lovenuts.rs)
