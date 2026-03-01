---
title: CowGirl
brand: cowgirl
transport: btle
config_ref: cowgirl.yml
config_identifier: null
---

# CowGirl

## Introduction

The CowGirl is a premium riding-style device with independent vibration and rotation motors. A special edition called "The Unicorn" uses the same BLE protocol. Both are manufactured by CowGirl.

## BLE Profile

```yaml
ble_names: ["THE COWGIRL", "THE UNICORN"]
services:
  - uuid: "0000fe00-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000fe01-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Vibration and rotation control"
```

## Device Configuration

<!-- Auto-populated from device-config-v4 at build time -->

## Commands

### Vibrate and Rotate

A single 4-byte command controls both the vibration and rotation motors simultaneously. The Buttplug implementation always sends `0x00` for the first byte and `0x01` (constant pattern) for the second.

**Format:**

```
0xAA 0xBB 0xCC 0xDD
```

| Byte | Description | Range |
|------|-------------|-------|
| `0xAA` | Unknown | `0x00`-`0x02` |
| `0xBB` | Pattern | `0x00`-`0x06` (see below) |
| `0xCC` | Vibration speed | `0x00`-`0xFF` (effective max ~`0x90`) |
| `0xDD` | Rotation speed | `0x00`-`0xFF` (effective max ~`0x90`) |

**Pattern values:**

| Value | Pattern |
|-------|---------|
| `0x00` | Off |
| `0x01` | Constant |
| `0x02`-`0x06` | Unknown patterns |

## Notes

- The maximum effective speed is around `0x90` (144). Values above this do not increase speed further.
- The first byte's function is unknown; the Buttplug implementation always sends `0x00`.
- Both The CowGirl and The Unicorn use identical protocols.

## Sources

- [GitHub Issue](https://github.com/buttplugio/stpihkal/issues/100)
- [Buttplug implementation](https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server/src/device/protocol_impl/cowgirl.rs)
