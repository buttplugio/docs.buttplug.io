---
title: Vibease Protocol
brand: vibease
transport: btle
---

# Vibease Protocol

## Introduction

The Vibease is a BLE vibrator with an encrypted, fragmented communication protocol. Packets are XOR-scrambled using hardcoded keys, Base64-encoded, and then fragmented into 16-byte chunks for transmission.

## BLE Profile

```yaml
services:
  - uuid: "DE3A0001-7100-57EF-9190-F1BE84232730"
    characteristics:
      - uuid: "803C3B1F-D300-1120-0530-33A62B7838C9"
        properties: [read, write_without_response, notify]
        role: both
        description: "cmd_read (notify) and cmd_write (write) — same UUID, different property"
      - uuid: "00002a4d-0000-1000-8000-00805f9b34fb"
        description: "Alternative characteristic on some devices"
```

## Encryption

### Keys

```python
KEY1 = "2iYNPjW9ptZj6L7snPfPWIH5onzQ0V1p".encode("ascii")
KEY2 = "4sRewsha3G54ZqEcjr9Iadexd1sKB8vr".encode("ascii")
```

A third key `KEY_HS` is received from the device during initial handshake.

- `KEY_TX` (host → device): `KEY_HS` (truncated by 1 byte)
- `KEY_RX` (device → host): `KEY2` (on tested device)

### Scramble / Descramble

Offset-by-one XOR method. `Scramble()` is used before transmission; `Descramble()` after reception.

### Base64 Encoding

After scrambling, payloads are encoded with standard Base64.

## Packet Fragmentation

Long Base64-encoded payloads are split into 16-byte chunks with ASCII framing:

| Chunk | Format |
|-------|--------|
| First (short payload) | `$DDDDDDDDDDDDDDDD!` or `%DDDDDDDDDDDDDDDD!` |
| First (long payload) | `*DDDDDDDDDDDDDDDD>` |
| Middle chunks | `<DDDDDDDDDDDDDDDD>` |
| Last chunk | `<DDDDDDD!` |

Prefix `$` vs `%` vs `*` rules are not fully documented.

## Connection Handshake

1. Connect to the device.
2. Discover the service and `cmd_read`/`cmd_write` characteristics.
3. Enable notifications on `cmd_read`.
4. Write to `cmd_write`: `$aGk=!` (bytes `24 61 47 6b 3d 21`).
5. Three notifications arrive in sequence (the handshake exchange, including the device's `KEY_HS`).
6. After handshake, `KEY_TX = KEY_HS[:-1]` (truncate last byte).

## Notes

- BLE advertisement name is not documented.
- `KEY_TX` and `KEY_RX` assignment may differ between device models — one known device uses `KEY_TX=KEY_HS`, `KEY_RX=KEY2`.
- Motion sensor streaming has not been successfully enabled.

## Sources

- [GitHub Issue (stpihkal#67)](https://github.com/buttplugio/stpihkal/issues/67)
