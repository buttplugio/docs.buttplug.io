---
title: Fredorch Rotary
brand: fredorch
transport: btle
config_ref: fredorch-rotary.yml
config_identifier: null
---

# Fredorch Rotary

## Introduction

The Fredorch Rotary (M1 series) is a BLE-controlled rotary sex machine with speed and motor control, pattern playback, and a structured packet protocol requiring a login handshake before accepting commands.

## BLE Profile

```yaml
ble_names:
  - "M1_*"   # suffix varies per device
services:
  main:
    uuid: 0x0000ae10-0000-1000-8000-00805f9b34fb
    characteristics:
      tx: 0x0000ae01-0000-1000-8000-00805f9b34fb
      rx: 0x0000ae02-0000-1000-8000-00805f9b34fb
```

## Packet Format

All packets follow this structure:

```
[ 0x55, length-2, data..., checksum, 0xaa ]
```

- `length-2` — total packet length minus 2 (excludes the first `0x55` and final `0xaa`)
- `checksum` — `255 & (sum of all bytes between the first and last byte, exclusive)`

## Initialization

### Login Packet

```
0x55 0x03 0x99 0x9c 0xaa
```

### Password Packet

Default password is `000000`:

```
0x55 0x09 0x21 0x00 0x00 0x00 0x00 0x00 0x00 0x2a 0xaa
```

## Commands

### Speed Control

| Command | Code |
|---------|------|
| Speed up (`S+`) | `0x01` |
| Speed down (`S-`) | `0x02` |
| Motor up (`M+`) | `0x03` |
| Motor down (`M-`) | `0x05` |
| Stop | `0x24` |
| Power toggle | `0x1f` |

### Pattern Mode

```
0x16 XX
```

- `XX` — pattern index: `0x00`–`0x13` (0–19)

Changing speed while a pattern is active disables the pattern and returns to manual speed control.

## Sources

- [docs.buttplug.io Issue #15](https://github.com/buttplugio/docs.buttplug.io/issues/15)
- [Buttplug Rust implementation](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/fredorch_rotary.rs)
