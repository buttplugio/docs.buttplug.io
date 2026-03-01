---
title: Louviva Bella Protocol
brand: louviva
transport: btle
---

# Louviva Bella Protocol

## Introduction

The Louviva Bella is a BLE vibrator with 9 modes (0–8 patterns) and a manual control mode. A handshake of some kind is required before commands will work — the official app must connect first; direct connection without it may not work.

## BLE Profile

```yaml
ble_names:
  - "Bella"
services:
  - uuid: "0000aa70-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000aa71-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Mode command"
      - uuid: "0000aa72-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Speed control (manual mode only)"
  - uuid: "0000aa10-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000aa11-0000-1000-8000-00805f9b34fb"
        properties: [read, notify]
        role: rx
        description: "Status read"
```

## Commands

### Mode Command (characteristic `0xaa71`)

```
XX B7
```

| `XX` | Effect |
|------|--------|
| `0x00` | Off |
| `0x01`–`0x08` | Pattern modes 1–8 |
| `0x09` | Manual speed control mode |

### Speed Control (characteristic `0xaa72`, manual mode only)

Single byte: `0x00`–`0xFF`

- `0x00` = off
- `0xFF` = maximum speed

## Notes

- A handshake is required before commands work. If the app connects first, subsequent direct connections may function.
- The nature of the handshake is unknown.

## Sources

- [GitHub Issue (stpihkal#47)](https://github.com/buttplugio/stpihkal/issues/47)
