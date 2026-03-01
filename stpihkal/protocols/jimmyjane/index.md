---
title: JimmyJane Form 1 Protocol
brand: jimmyjane
transport: btle
---

# JimmyJane Form 1 Protocol

## Introduction

The JimmyJane Form 1 does not have a phone app. Instead, it uses a dedicated BLE remote ("FORM REMOTE"). The remote's BLE protocol is documented here. The data format encodes pattern, power level, and mode in a 5-byte packet.

## BLE Profile

```yaml
ble_names:
  - "FORM REMOTE"
services:
  - uuid: "000f301-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "000f402-0000-1000-8000-00805f9b34fb"
        properties: [notify]
        role: rx
        description: "Remote button state"
```

## Packet Format

```
AA YB 04 0Y CC
```

Where:

- `A` = Pattern byte (high nibble of byte 0)
- `Y` = Power level (appears in both byte 1 and byte 3)
- `B` = Power byte (low nibble of byte 1)
- `CC` = State byte (byte 4)

### Off State

```
20 Y0 04 0Y 89
```

### On State

| Field | Values | Description |
|-------|--------|-------------|
| `A` (byte 0 high nibble) | `0x00`–`0x04` | Pattern selection |
| `B` (byte 1 low nibble) | `0x11`–`0xY5` | Power level |
| `CC` (byte 4) | `0x3C` | Pattern change |
| `CC` (byte 4) | `0x8F` | Power change |

Observed byte 4 values on long hold or double click: `0x02`, `0x0D`, `0x8F`, `0x95`.

### Tease Mode

Pattern `0x04` enters tease mode. Holding `+` and `-` for 1.5 seconds while in tease mode enters tease configuration:

- Byte 0 becomes `0x34`
- `Y` cycles through `0x01`–`0x05` (5 tease sub-modes)

## Notes

- This documents the BLE remote, not a direct connection to the Form 1 itself.
- Service/characteristic UUIDs in the issue appear to be truncated (missing leading zeros) — they may be non-standard.

## Sources

- [GitHub Issue (stpihkal#71)](https://github.com/buttplugio/stpihkal/issues/71)
