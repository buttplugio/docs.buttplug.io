---
title: Syncbot Protocol
brand: syncbot
transport: btle
---

# Syncbot Protocol

## Introduction

The Syncbot is a BLE-connected automated masturbator. It uses a single characteristic for both Tx and Rx. The data bytes (stroke, rotation, grip) are XOR-encrypted with a key embedded in each packet.

## BLE Profile

```yaml
ble_names:
  - "V"
services:
  - uuid: "0000ffe0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ffe1-0000-1000-8000-00805f9b34fb"
        properties: [write, notify]
        role: both
        description: "Command and response"
```

## Tx Message Format

All messages are 19 bytes.

### Connection Initialization

```
f0 c8 2c 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 e4
```

### Command Submission

Example: `f0 c9 57 51 95 fd 21 00 c2 57 d1 c2 97 60 00 00 00 00 b7`

| Byte | Field | Description |
|------|-------|-------------|
| 0 | Signature | Always `0xF0` |
| 1 | Signature | Always `0xC9` |
| 2 | Stroke (encrypted) | `0` (pull) – `255` (push) |
| 3 | Rotation (encrypted) | `0` (CCW) – `255` (CW); `128` = neutral |
| 4 | Grip (encrypted) | `38` (CCW) – `216` (CW); `128` = neutral |
| 5 | Unused (encrypted) | ??? |
| 6 | Checksum 1 | Sum of unencrypted bytes 2–5 |
| 7–13 | Encryption key + metadata | See encryption section |
| 14–17 | Null | Always `0x00` |
| 18 | Checksum 2 | Sum of bytes 0–17 mod 256 (including encrypted values) |

### Encryption

Bytes 2–5 are XOR-encrypted. The encryption key is transmitted alongside the data in bytes 7–13 (exact positions unclear). Each packet can be decrypted independently using its embedded key.

## Rx Message Format

| Byte | Description |
|------|-------------|
| 0–6 | ??? |
| 7 | Status flags (bit 6 from MSB may indicate power source connection) |
| 8 | Null? |
| 9 | Frame ID |
| 10–17 | ??? |
| 18 | Checksum (sum of bytes 0–17 mod 256) |

## Notes

- Checksum 1 (byte 6) uses unencrypted values; checksum 2 (byte 18) uses encrypted values.
- Grip range is asymmetric around neutral (38–216 vs expected 0–255).
- Power source detection via byte 7 status flags has not been confirmed.

## Sources

- [GitHub Issue (docs.buttplug.io#42)](https://github.com/buttplugio/docs.buttplug.io/issues/42)
