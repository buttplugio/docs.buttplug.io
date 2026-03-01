---
title: Mizz Zee
brand: mizzzee
transport: btle
config_ref: mizzzee.yml
config_identifier: null
---

# Mizz Zee

## Introduction

Mizz Zee manufactures BLE-controlled vibrators including the "Pill" and "Bosom Vibrator". There are at least two hardware versions with different protocols. V1 devices advertise as "NFY008" and V2 devices advertise as "XHT".

## BLE Profile

### V1 (NFY008)

```yaml
ble_names: ["NFY008"]
services:
  - uuid: "0000eea0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000eea1-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
```

### V2 (XHT)

```yaml
ble_names: ["XHT"]
services:
  - uuid: "0000eea0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ee01-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
```

## Commands

### Vibrate (V1)

**Format:**

```
0x69 0x96 0x03 0x03 0x01 XX YY
```

| Byte | Description | Range |
|------|-------------|-------|
| `0x69 0x96` | Header | Fixed |
| `0x03 0x03 0x01` | Unknown | Fixed |
| `XX` | Mode | `0x01` = on, `0x00` = off |
| `YY` | Speed | `0x00`-`0x44` (effective max; app sends up to `0x59`) |

### Vibrate (V2)

**Format:**

```
0x69 0x96 0x04 0x02 XX 0x2C XX
```

| Byte | Description | Range |
|------|-------------|-------|
| `0x69 0x96` | Header | Fixed |
| `0x04 0x02` | Unknown | Fixed |
| `XX` | Speed (appears twice) | `0x00` = off, `0x01`-`0x64` = on + speed |
| `0x2C` | Unknown separator | Fixed |

## Notes

- V1 and V2 share the same service UUID (`0xEEA0`) but use different Tx characteristic UUIDs.
- The effective maximum speed on V1 seems to be around `0x44` (68 decimal) even though the app sends up to `0x59`.
- The device-config lists max vibrate value as 68 for V1.

## Sources

- [GitHub Issue](https://github.com/buttplugio/stpihkal/issues/136)
- [Buttplug implementation](https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server/src/device/protocol_impl/mizzzee.rs)
