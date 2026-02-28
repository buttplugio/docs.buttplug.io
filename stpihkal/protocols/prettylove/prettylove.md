---
title: Prettylove
brand: prettylove
transport: btle
config_ref: prettylove.yml
config_identifier: null
---

# Prettylove

## Introduction

Prettylove devices are BLE-controlled vibrators that advertise as "Aogu BLE" devices. They use a simple single-service BLE protocol.

## BLE Profile

```yaml
ble_names: ["Aogu BLE *"]
services:
  - uuid: "0000fff0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000fff2-0000-1000-8000-00805f9b34fb"
        properties: [write-without-response, write]
        role: tx
        description: "Control characteristic"
      - uuid: "0000ffe2-0000-1000-8000-00805f9b34fb"
        properties: [read, write, notify]
        role: rx
        description: "Info characteristic"
```

## Device Configuration

<!-- Auto-populated from device-config-v4 at build time -->

## Commands

### Info Characteristic Format

To trigger a notification or select the value to read, it is necessary to write `VOLT` (`0x564F4C54`) or `WNDS` (`0x574E4453`) to the characteristic first.

The format for read values is

```
0xAA 0xBB 0xCC 0xDD
```

If `BB` and `CC` are zero, then `AA` is the *battery level* as a percentage (0-100).

If `CC` is `0x40`, then `AABB` is the *product value* and `DD` is the *UI value*.

| Product | Product Value | UI Value |
|---------|---------------|----------|
| Jefferson | `0000` | `0B` |

### Control Characteristic Format

Control bytes are as follows:

```
0xAA 0xBB
```

Generally, `AA` is always `00` and `BB` controls the device. The exact meaning depends on the product.

| Value | Description |
|-------|-------------|
| `FF` | Disable all functions |
| `00` | Disable all vibrations |
| `01`-`0C` | Start various vibration patterns |
| `6E` | Disable electro shocks |
| `6F` | Enable electro shocks |
| `70` | Increase intensity of electro shocks |
| `71` | Reduce intensity of electro shocks |
| `C9`-`DC` | Trigger short vibration, where `C9` is the weakest and `DC` is the strongest |

## Notes

- Devices advertise as "Aogu BLE" with a wildcard suffix.
- The control characteristic accepts 8 bytes; only the first two are significant.
- Also known as "AB Shutter3" in some firmware versions.

## Sources

- [Buttplug implementation](https://github.com/buttplugio/buttplug-rs)
