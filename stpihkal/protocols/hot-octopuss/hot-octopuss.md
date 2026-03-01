---
title: Hot Octopuss Pulse Solo Interactive Protocol
brand: hot-octopuss
transport: btle
---

# Hot Octopuss Pulse Solo Interactive Protocol

## Introduction

The Hot Octopuss Pulse Solo Interactive is a BLE-connected male masturbator. Speed control is sent to the Tx characteristic. The device may also feed back state via the Rx characteristic.

## BLE Profile

```yaml
ble_names:
  - "Pulse Interactive"
services:
  - uuid: "00001900-0000-1000-8000-00805F9B34FB"
    characteristics:
      - uuid: "00001902-0000-1000-8000-00805F9B34FB"
        properties: [write]
        role: tx
        description: "Speed control"
      - uuid: "00001903-0000-1000-8000-00805F9B34FB"
        properties: [notify]
        role: rx
        description: "Status feedback"
```

## Commands

### Speed Control

```
01 XX
```

Where `XX` is:

| Value | Effect |
|-------|--------|
| `0x01`–`0x06` | Speed levels 1–6 |
| `0x07`–`0x09` | Pattern modes |

## Notes

- Whether the Rx characteristic actually provides feedback has not been confirmed.
- Speed and pattern ranges are preliminary and may not be exhaustive.

## Sources

- [GitHub Issue (stpihkal#147)](https://github.com/buttplugio/stpihkal/issues/147)
