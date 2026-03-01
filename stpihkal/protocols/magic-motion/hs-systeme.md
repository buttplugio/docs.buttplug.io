---
title: HS Systeme Magic Motion Protocol
brand: magic-motion
transport: btle
---

# HS Systeme Magic Motion Protocol

## Introduction

The HS Systeme "Magic Motion" (branded `MM-Sexmaschine`) is a BLE-connected sex machine with a device-specific PIN code printed on a label. It requires a handshake before accepting speed commands.

Note: Despite the "Magic Motion" in the brand name, this appears to be unrelated to the MagicMotion vibrator brand.

## BLE Profile

```yaml
ble_names:
  - "MM-Sexmaschine NNNNN"
services:
  - uuid: "1420054f3d-5d4f-e989-c908-e5e8447b81"
    description: "Handshake service"
    characteristics:
      - uuid: "22f82ec8c7-8043-4db2-ab5a-bce3d78b9d"
        properties: [write]
        role: tx
        description: "PIN submission"
  - uuid: "892a01480c-db4f-59a5-bede-421617f8f4"
    characteristics:
      - uuid: "06866f8a81-484d-98ac-3a80-7a5bad1934"
        properties: [read]
        role: rx
        description: "Handshake result"
  - uuid: "ce4e811e0c-0147-dbb0-523a-dcd2225495"
    characteristics:
      - uuid: "7e0e41c1bf-5142-479b-cf7c-23ceb32d94"
        properties: [write]
        role: tx
        description: "Speed control"
```

Note: UUIDs in the issue appear to be truncated (missing leading zeros). Full 128-bit UUIDs are not confirmed.

## Handshake

1. Write the 5-character PIN code printed on the device label as ASCII, followed by a null terminator (`0x00`), to the PIN submission characteristic.
2. Read the handshake result characteristic. Response is either `fail` (padded with null bytes) or `okay` (padded with null bytes).

## Speed Control

After successful handshake, write to the speed control characteristic:

```
[5-char PIN as ASCII] [speed byte 0x00–0xFF]
```

Send the ASCII PIN code followed immediately by the speed value.

## Notes

- The device name includes a 5-digit identifier: `MM-Sexmaschine NNNNN`.
- Despite sharing "Magic Motion" in the name, this is not related to the MagicMotion vibrator brand.

## Sources

- [GitHub Issue (docs.buttplug.io#37)](https://github.com/buttplugio/docs.buttplug.io/issues/37)
