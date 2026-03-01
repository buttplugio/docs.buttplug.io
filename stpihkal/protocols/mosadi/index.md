---
title: MOSADI / CSP Protocol
brand: mosadi
transport: btle
---

# MOSADI / CSP Protocol

## Introduction

MOSADI and related brands (HACKBUTEER, RIGEE, BALA, VENUZI, VIROLL, DITO, LAVA) are products of CSP. They share a common BLE protocol. Commands consist of a command code byte followed by command-specific data. Commands must be sent periodically (approximately every 100 ms).

## Device Table

| Model | BT Name | Motor Count | Device ID | Model Number |
|-------|---------|-------------|-----------|--------------|
| HACKBUTEER | hqs | 3 | 1 | CST0201 |
| RIGEE | rigee | 2 | 3 | CST0205 |
| MOSADI | ihole | 2 | 4 | CST0501 |
| BALA | bala | 3 | 5 | CST0202 |
| VENUZI | venuzi | 2 | 7 | CST0208 |
| VIROLL | viroll | 2 | 9 | CST0208 |
| DITO | vernuz_ivy | 2 | 10 | CST0207 |
| DITO | vernuz_amy | 1 | 11 | CST0203 |
| DITO | vernuz_aima | 1 | 12 | CST0203 |
| DITO | vernuz_ann | 1 | 13 | CST0203 |
| LAVA | lava | 2 | 14 | CST0301 |

## BLE Profile

```yaml
ble_names:
  - "ihole"
  - "hqs"
  - "rigee"
  - "bala"
  - "venuzi"
  - "viroll"
  - "vernuz_ivy"
  - "vernuz_amy"
  - "vernuz_aima"
  - "vernuz_ann"
  - "lava"
services:
  - uuid: "0000ffe0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ffe1-0000-1000-8000-00805f9b34fb"
        properties: [write, notify]
        role: both
        description: "Command write / response notify"
  - uuid: "0000fff0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "???  (under fff0)"
        description: "Additional characteristics — purpose unknown"
  - uuid: "0000180f-0000-1000-8000-00805f9b34fb"
    description: "Battery Service"
```

## Commands

Commands are sent to the `0xffe1` characteristic. They must be sent periodically (~100 ms interval).

### Suspend / Mode Select

```
B3 XX
```

`XX` = mode byte. Observed: `0x06`, `0x0C`. Valid range appears to be `0x00`–`0x0C`.

### Vibrate / Pattern

```
B7 XX YY ...
```

- `XX`: Unknown; observed as `0x06` or `0x0C` (may relate to motor count or device ID)
- `YY`: Pattern line number, `0x00`–`0xFE`

Full vibration packet format includes additional bytes not yet fully decoded.

## Notes

- Commands must be sent periodically (not just once); interval ~100 ms.
- The Suspend command `0xB3` may function as both a mode selector and a keep-alive.
- Multiple brands share identical protocol — the device is identified by BT name and device ID.
- The App used for reverse engineering is "4fun-cst" (`com.fun4.hackbuteer`).

## Sources

- [GitHub Issue (stpihkal#39)](https://github.com/buttplugio/stpihkal/issues/39)
