---
title: JEUSN Protocol
brand: jeusn
transport: btle
---

# JEUSN Protocol

## Introduction

JEUSN vibrators have vibration, oscillation, and heating channels. Speed values are in the range 0–19. Sending a command to one channel stops the other channel.

## BLE Profile

```yaml
ble_names:
  - "JEU-Lush13F-XT(BLE)"
  - "JEU-Lush13E-XT"
services:
  - uuid: "53300001-0023-4bd4-bbd5-a6920e4c5653"
    characteristics:
      - uuid: "53300003-0023-4bd4-bbd5-a6920e4c5653"
        properties: [write]
        role: tx
        description: "Command"
```

## Commands

Speed range: `XX` = `0x00`–`0x13` (0–19).

### Control All Channels

```
fd 8b db ad 95 3c 30 XX [0x9d - XX]
```

Last byte is `0x9d - XX` (checksum).

### Control Vibrator Only

```
fd 8b db ad 85 3b 30 XX [0x8e - XX]
```

Last byte is `0x8e - XX`.

### Control Oscillation Only

```
fd 8b db ad 75 3a 30 XX [0x7f - XX]
```

Last byte is `0x7f - XX`.

### Turn Heater Off

```
fd 8b db ad 65 3f 35 00 6f
```

### Turn Heater On

```
fd 8b db ad 65 3f 35 01 6e
```

## Notes

- The first 4 bytes (`fd 8b db ad`) do not appear to affect behavior.
- Sending a per-channel command stops the other channel — there is no known way to control vibrator and oscillator simultaneously with separate speeds.
- Last byte is a checksum: `constant - XX`.

## Sources

- [GitHub Issue (docs.buttplug.io#38)](https://github.com/buttplugio/docs.buttplug.io/issues/38)
