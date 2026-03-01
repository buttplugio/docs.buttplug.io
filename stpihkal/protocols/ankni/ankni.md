---
title: Ankni Candy Protocol
brand: ankni
transport: btle
config_ref: ankni.yml
---

# Ankni Candy Protocol

## Introduction

The Ankni Candy requires a CRC16-based authentication handshake before accepting vibration commands. The Roselex jump egg has been confirmed to use the same protocol.

## BLE Profile

```yaml
ble_names:
  - "DSJM"
services:
  - uuid: "0000fe00-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000fe01-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command/handshake write endpoint"
      - uuid: "0000fe02-0000-1000-8000-00805f9b34fb"
        properties: [notify]
        role: rx
        description: "Response/handshake read endpoint"
```

## Initialization / Handshake

Before sending control commands a two-packet exchange must complete.

**Step 1 — host sends fixed packet:**

```
01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 00 00
```

**Step 2 — CRC handshake:**

The device replies with a packet of the form:

```
01 02 YY YY YY YY YY YY YY YY YY YY YY YY YY YY YY YY 00 00
```

The host must then send:

```
01 02 XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX 00 00
```

Where `XX` is the high byte and `YY` is the low byte of a CRC16/XModem checksum computed over `0x01` followed by the **reversed** device MAC address.

CRC parameters:
- Algorithm: CRC16/XModem
- Init: `0x0000`
- Poly: `0x1021`

**Example:**

```
MAC:              11:22:33:44:55:66
Reversed MAC:     66 55 44 33 22 11
CRC16 input:      01 66 55 44 33 22 11
CRC16 output:     06F1
→ XX = 06, YY = F1
```

The device responds with `01` in byte 3 on success, or `00` if the handshake fails.

**Getting the MAC address:**

The reversed MAC is available from:
- Bluetooth manufacturer data (the device will have exactly one manufacturer key)
- ATT characteristic `0x2f50` (UUID `00002a50-0000-1000-8000-00805f9b34fb`)

## Commands

### Control

```
03 12 XX 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
```

Where `XX`:
- `0x00` = off
- `0x01`–`0x03` = speed levels
- `0x04`–`0x0a` = patterns

## Notes

- A second Roselex firmware revision exists that does not respond to the handshake. These devices may also contain an invalid (non-6-byte) MAC in manufacturer data and device characteristics.

## Sources

- [GitHub Issue (stpihkal#141)](https://github.com/buttplugio/stpihkal/issues/141)
- [Buttplug implementation (ankni.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/ankni.rs)
