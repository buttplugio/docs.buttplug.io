---
title: We-Vibe
slug: we-vibe-protocol
brand: we-vibe
transport: btle
config_ref: wevibe.yml
config_identifier: null
---

# We-Vibe

## Introduction

We-Vibe devices use a shared BLE protocol across their product line. All models communicate via a single service with control and info characteristics, using 8-byte packets.

## BLE Profile

```yaml
ble_names: ["4 Plus", "bloom", "classic", "ditto", "gala", "jive", "nova", "pivot", "rave", "sync", "verge", "wish"]
services:
  - uuid: "f000bb03-0451-4000-b000-000000000000"
    characteristics:
      - uuid: "f000c000-0451-4000-b000-000000000000"
        properties: [write]
        role: tx
        description: "Control characteristic (8 bytes)"
      - uuid: "f000b000-0451-4000-b000-000000000000"
        properties: [read]
        role: rx
        description: "Info characteristic (8 bytes)"
```

## Device Configuration

<!-- Auto-populated from device-config-v4 at build time -->

## Commands

### Motor Control

The control characteristic takes 8 bytes, as follows:

```
0f PP 00 XY 00 0Z 00 00
```

| Byte | Description | Range |
|------|-------------|-------|
| 0x0f | Header | Fixed |
| PP | Vibration pattern | See pattern table |
| 0x00 | Padding | Fixed |
| X | Internal motor intensity | 0x0–0xF |
| Y | External motor intensity | 0x0–0xF |
| 0x00 | Padding | Fixed |
| Z | Motor on/off bits | 0x00–0x03 |
| 0x00 | Padding | Fixed |

**Motor on/off bits (byte 6, last two bits):**

| Value | Meaning |
|-------|---------|
| `0x03` | Both motors on |
| `0x02` | Internal motor on |
| `0x01` | External motor on |
| `0x00` | Both motors off |

**Vibration patterns:**

| Code | Name |
|------|------|
| `0x00` | Off |
| `0x03` | Vibrate |
| `0x04` | Peak |
| `0x05` | Pulse |
| `0x06` | Echo |
| `0x07` | Wave |
| `0x08` | Tide |
| `0x0e` | Surf |
| `0x0f` | Bounce |
| `0x10` | Massage |
| `0x11` | Tease |
| `0x12` | Crest |
| `0x13` | Chachacha |
| `0x14` | Step |
| `0x15` | Ramp |
| `0x16` | Tempo |
| `0x17` | Heartbeat |

### Info Characteristic

Reading the info characteristic returns 8 bytes:

```
01 PP ZZ ZZ ?? WW XY MM
```

| Byte | Description | Range |
|------|-------------|-------|
| 0x01 | Header | Fixed |
| PP | Vibration pattern | Current pattern |
| ZZ ZZ | Battery level | 0x0000 (0%) – 0xFFFF (100%) |
| ?? | Unknown | |
| WW | Temperature | Degrees Fahrenheit |
| X | Internal motor intensity | Current value |
| Y | External motor intensity | Current value |
| MM | Device model | See model table |

**Device models:**

| Code | Name | Motors | BLE Name |
|------|------|--------|----------|
| `0x00` | Default dual-motor | 2 | default |
| `0x02` | Jive | 1 | jive |
| `0x10` | Gala | 2 | gala |
| `0x20` | Verge | 1 | verge |
| `0x30` | Pivot | 1 | pivot |
| `0x35` | Classic | 2 | classic |
| `0x40` | Ditto | 1 | ditto |
| `0x45` | We-Vibe | 2 | cougar / 4plus |
| `0x50` | Sync | 2 | sync |
| `0x60` | Bloom | 1 | bloom |
| `0x70` | Nova | 2 | nova |
| `0x80` | Wish | 1 | wish |
| `0x90` | Rave | 1 | rave |

## Notes

- A motor intensity of zero does not turn the motor off. Use pattern `0x00` or the motor on/off bits.
- The Vector and Moxie devices [use a different protocol](https://github.com/buttplugio/stpihkal/issues/20#issuecomment-539400857).

## Sources

- [We-Vibe working notes](https://gist.github.com/bnm12/fcdcef291a500bf51cef734aa1830e4d)
- [LabNotes: Reverse Engineering Sex Toys](https://mascherari.press/p/bff24725-f435-4e88-91de-16dafd95dc8c/)
- [Buttplug We-Vibe implementation](https://github.com/buttplugio/buttplug-rs/blob/master/buttplug/src/device/protocol/wevibe.rs)
