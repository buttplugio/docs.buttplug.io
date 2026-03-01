---
title: Aneros Vivi Protocol
brand: aneros
transport: btle
config_ref: aneros.yml
---

# Aneros Vivi Protocol

## Introduction

The Aneros Vivi is a Bluetooth LE dual-motor massager. It supports independent speed control for two motors as well as pattern playback.

## BLE Profile

```yaml
ble_names:
  - "Massage Demo"
services:
  - uuid: "0000ff00-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ff01-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint"
```

## Commands

### Motor Speed Control

```
FX YY
```

Where:
- `X` = motor selector: `0x1` = outer motor, `0x2` = inner motor
- `YY` = speed `0x00`–`0x7f`

Examples:

```
# Outer motor at speed 0x40
f1 40

# Inner motor at speed 0x20
f2 20

# Outer motor off
f1 00
```

### Pattern Control

```
f4 ZZ
```

Where `ZZ` is the pattern number. Range is approximately `0x00`–`0x08` (exact upper bound unconfirmed).

## Notes

- A pulse option may exist controlled by a bit on the MSB of the command byte, but this has not been confirmed.
- Exact pattern count (upper bound of `ZZ`) is unverified — `0x08` is approximate.

## Sources

- [GitHub Issue (stpihkal#75)](https://github.com/buttplugio/stpihkal/issues/75)
- [Buttplug implementation (aneros.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/aneros.rs)
