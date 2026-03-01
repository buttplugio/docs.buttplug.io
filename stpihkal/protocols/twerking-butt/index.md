---
title: Twerking Butt
brand: twerking-butt
transport: btle
config_ref: twerkingbutt.yml
config_identifier: null
---

# Twerking Butt

## Introduction

The Twerking Butt device (sold under the BODIKANG brand) is a novelty motorized sex toy with twerking/thrusting motion, audio reactivity, pattern playback, and temperature sensing. It is controlled over BLE using 16-byte structured packets.

## BLE Profile

```yaml
ble_names:
  - BODIKANG
  - Twerking Butt
  - TwerkingButt
services:
  main:
    uuid: 00000a60-0000-1000-8000-00805f9b34fb
    characteristics:
      tx: 00000a66-0000-1000-8000-00805f9b34fb
      rx: 00000a67-0000-1000-8000-00805f9b34fb
```

## Packet Format

All command packets are 16 bytes. The first 3 bytes form a header; remaining bytes are command-specific (zero-padded).

```
[ Logo, DeviceId, Command, data...(13 bytes) ]
```

- `Logo` — always `0xA6`
- `DeviceId` — `0x61` for TwerkingButt, `0x62` for Masturband
- `Command` — see below

## Commands

### Bind / Unbind

Sent after connecting to establish a session.

```
[0xA6, DeviceId, 0x07, 0x01, 0x00, ...]  # Bind
[0xA6, DeviceId, 0x07, 0x02, 0x00, ...]  # Unbind
```

### Get Device Info

```
[0xA6, DeviceId, 0x0A, 0x00, ...]
```

### Firmware Update

```
[0xA6, DeviceId, 0x31, 0x00, ...]
```

### Start Twerk Mode

```
[0xA6, DeviceId, 0x11, speed, speed, 0x00, ...]
```

`speed` is the twerk motor speed (repeated twice for the two motor bytes).

### Stop Twerk Mode

```
[0xA6, DeviceId, 0x10, 0x02, 0x00, ...]
```

### Pattern Mode

```
[0xA6, DeviceId, 0x11, 0x08, pattern, 0x00, ...]
```

`pattern` ranges from `0x00` to `0x09`.

### Start Audio Mode

```
[0xA6, DeviceId, 0x12, 0x00, ...]
```

### Stop Audio Mode

```
[0xA6, DeviceId, 0x13, 0x00, ...]
```

## Notifications

The device sends motor status and temperature data via the Rx characteristic. Subscribe to notifications on `00000a67-...` to receive these reports.

## Sources

- [STPIHKAL Issue #69](https://github.com/buttplugio/stpihkal/issues/69)
