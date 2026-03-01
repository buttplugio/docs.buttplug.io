---
title: HEY! Bracelet Protocol
brand: hey
transport: btle
---

# HEY! Bracelet Protocol

## Introduction

The HEY! Bracelet is a Bluetooth LE wearable that provides vibration output and touch/squeeze sensor input. Protocol information comes from two issues: one from direct hardware testing (stpihkal#161) and one from code inspection (stpihkal#106). The BLE name may be advertised in uppercase (`HEY! BRACELET`) or mixed case.

## BLE Profile

```yaml
ble_names:
  - "HEY! Bracelet"
  - "HEY! BRACELET"
services:
  - uuid: "edfec62e-9910-0bac-5241-d8bda6932a2f"
    characteristics:
      - uuid: "2d86686a-53dc-25b3-0c4a-f0e10c8dee20"
        properties: [write, read]
        role: tx
        description: "Squeeze / vibration output"
      - uuid: "2d86686a-53dc-25b3-0c4a-f0e10c8dee21"
        properties: [notify]
        role: rx
        description: "Touch sensor"
      - uuid: "2d86686a-53dc-25b3-0c4a-f0e10c8dee22"
        properties: [write]
        role: tx
        description: "Mode control"
      - uuid: "2d86686a-53dc-25b3-0c4a-f0e10c8dee23"
        properties: [read]
        role: rx
        description: "Charge status"
```

## Commands

### Mode Control (characteristic `...dee22`)

| Value | Effect |
|-------|--------|
| `01` | Normal operating mode |
| `02` | Power off (re-enable by plugging into power) |

Setting mode to `01` on connect appears to be optional.

### Squeeze / Vibration Output (characteristic `...dee20`)

Sending `0x64` first appears required. After that, any value triggers the squeeze actuator. The last written value can be read back.

From code inspection: the characteristic accepts a single byte in the range `0x01`–`0xFF`; the app loops through incrementing values, wrapping from `0xFF` back to `0x01`.

### Touch Sensor (characteristic `...dee21`, notify)

Returns 2 bytes on touch:

| Byte | Description |
|------|-------------|
| Byte 0 | Running count of long touches (resets on power off) |
| Byte 1 | Touch position: observed values `01`, `03`, `05`, `07` |

Touch position encoding is not fully understood; may be bitmapped zones or sequential positions.

### Charge Status (characteristic `...dee23`)

Returns `00` when read. Meaning of non-zero values is unknown.

## Notes

- stpihkal#106 was from code inspection only (untested). stpihkal#161 was from direct hardware testing.
- The service UUID `edfec62e-...` appears in issue #106 as an "unknown characteristic" but issue #161 clarifies it as the service UUID.
- Touch sensor subscription is required before the squeeze output works.

## Sources

- [GitHub Issue (stpihkal#161)](https://github.com/buttplugio/stpihkal/issues/161)
- [GitHub Issue (stpihkal#106)](https://github.com/buttplugio/stpihkal/issues/106)
