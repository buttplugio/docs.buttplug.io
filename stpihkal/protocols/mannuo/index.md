---
title: ManNuo
brand: mannuo
transport: btle
config_ref: mannuo.yml
config_identifier: null
---

# ManNuo

## Introduction

ManNuo (also branded as "MANO PRODUCT") manufactures BLE-controlled vibrators. Devices advertise under generic BLE names including "Sex Toys", "LXCDVP", and "MANO PRODUCT".

## BLE Profile

```yaml
ble_names: ["Sex Toys", "Sex toys", "LXCDVP", "MANO PRODUCT"]
services:
  - uuid: "0000fff0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000fff1-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
      - uuid: "0000fff4-0000-1000-8000-00805f9b34fb"
        properties: [notify]
        role: rx
        description: "Response/notification endpoint"
```

## Commands

### Vibrate

Controls the vibration speed directly.

**Format:**

```
0xAA 0x55 0x06 0x01 0x01 XX YY ZZ SS
```

| Byte | Description | Range |
|------|-------------|-------|
| `0xAA` | Header byte 1 | Fixed |
| `0x55` | Header byte 2 | Fixed |
| `0x06` | Length | Fixed |
| `0x01` | Command group | Fixed |
| `0x01` | Subcommand | Fixed |
| `XX` | Mode (1 = direct speed) | `0x01` |
| `YY` | Pattern/submode | `0x01` for direct speed |
| `ZZ` | Speed | `0x00`-`0xFA` |
| `SS` | Checksum (XOR) | Computed |

The checksum is computed by XORing all preceding bytes:

```
checksum = 0;
for each byte b in [0xAA, 0x55, 0x06, 0x01, 0x01, XX, YY, ZZ]:
    checksum = checksum ^ b
```

### Shutdown

Stops the device.

**Format:**

```
0xAA 0x55 0x06 0x01 0x01 0x01 0x01 0xFA SS
```

Uses the same format as Vibrate with `XX=0x01`, `YY=0x01`, `ZZ=0xFA`.

### Patterns

Activates a built-in vibration pattern.

**Format:**

```
0xAA 0x55 0x06 0x01 0x01 0x01 PP 0xFA SS
```

| Byte | Description | Range |
|------|-------------|-------|
| `PP` | Pattern number | `0x00`-`0x0A` |

## Sources

- [GitHub Issue](https://github.com/buttplugio/stpihkal/issues/149)
- [Buttplug implementation](https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server/src/device/protocol_impl/mannuo.rs)
