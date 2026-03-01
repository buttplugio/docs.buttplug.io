---
title: WeToy MiNa
brand: wetoy
transport: btle
config_ref: wetoy.yml
config_identifier: null
---

# WeToy MiNa

## Introduction

The WeToy MiNa is a BLE-controlled vibrator manufactured by WeToy. It advertises as "WeToy".

## BLE Profile

```yaml
ble_names: ["WeToy"]
services:
  - uuid: "0000fff0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000fff3-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
```

## Device Configuration

<!-- Auto-populated from device-config-v4 at build time -->

## Commands

### Initialization / Stop

Sent on connection to initialize the device. Also stops all vibration.

**Format:**

```
0x80 0x03
```

This command is sent automatically by the Buttplug implementation during protocol initialization.

### Vibrate

Controls the vibration speed. Three discrete speed levels are available.

**Format:**

```
0xB2 XX
```

| Byte | Description | Range |
|------|-------------|-------|
| `0xB2` | Command ID | Fixed |
| `XX` | Speed level | `0x00`-`0x02` (speeds 1-3) |

### Patterns

Activates a built-in vibration pattern.

**Format:**

```
0xB2 XX
```

| Byte | Description | Range |
|------|-------------|-------|
| `0xB2` | Command ID | Fixed |
| `XX` | Pattern number | `0x03`-`0x08` |

### Boost

Activates a boost/turbo mode.

**Format:**

```
0xB2 0x13
```

This is equivalent to sending `0x2B 0x02`.

## Notes

- The device only supports 3 discrete speed levels, not a continuous range.
- The Tx characteristic UUID is `0xFFF3` (note: the issue lists `0xFF3` which appears to be a typo).

## Sources

- [GitHub Issue](https://github.com/buttplugio/stpihkal/issues/167)
- [Buttplug implementation](https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server/src/device/protocol_impl/wetoy.rs)
