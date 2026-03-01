---
title: VibCrafter
brand: vibcrafter
transport: btle
config_ref: vibcrafter.yml
config_identifier: null
---

# VibCrafter

## Introduction

VibCrafter devices use AES-encrypted BLE communication with a challenge-response authentication handshake before accepting text-based commands for dual motor intensity, patterns, heat, and light control.

## BLE Profile

```yaml
ble_names:
  - "be gentle"
services:
  main:
    uuid: 53300051-0060-4BD4-BBE5-A6920E4C5663
    characteristics:
      tx: 53300052-0060-4BD4-BBE5-A6920E4C5663
      rx: 53300053-0060-4BD4-BBE5-A6920E4C5663
```

All communication is AES-encrypted using the key `jdk#Cra%f5Vib28r`.

## Authentication

Authentication must be completed before any control commands are accepted.

1. Send to Tx: `Auth:????????;` (replace `????????` with 8 random characters)
2. Receive from Rx: `XXXX:YYYYYY;`
3. Compute SHA256 of `YYYYYY`
4. Take the first 4 characters of the uppercase hex digest as `ZZZZ`
5. Send to Tx: `Auth:ZZZZ;`
6. Receive from Rx: `OK;`

## Commands

All commands are ASCII strings sent after successful authentication.

### Query Commands

| Command | Description |
|---------|-------------|
| `GetMotor;` | Query motor state |
| `GetLight;` | Query light state |
| `GetHeat;` | Query heat state |
| `GetVer;` | Query firmware version |
| `Battery;` | Query battery level |

### Set Motor Intensity

```
MtInt:XXYY;
```

- `XX` — motor 1 intensity: `00`–`99`
- `YY` — motor 2 intensity: `00`–`99`

### Stop Motors

```
MPZZ00000000
```

### Pattern Mode

Patterns are activated by name via JSON payload. Named patterns include: `shockwave`, `swing`, `lightning`, and others.

## Sources

- [docs.buttplug.io Issue #26](https://github.com/buttplugio/docs.buttplug.io/issues/26)
- [Buttplug Rust implementation](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/vibcrafter.rs)
