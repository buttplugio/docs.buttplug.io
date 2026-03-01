---
title: Lelo Ida Wave
brand: lelo
transport: btle
---

# Lelo Ida Wave

## Introduction

The Lelo Ida Wave is a BLE-controlled couples' vibrator with both vibration and internal "waving" motion motors. It uses a pairing procedure shared with the Lelo F1s v2.

## BLE Profile

```yaml
ble_names: ["IdaWave"]
services:
  - uuid: "0000fff0-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000fff1-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Setting control"
      - uuid: "0000fff2-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Remote control (motor commands)"
  - uuid: "00000a00-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "00000a11-0000-1000-8000-00805f9b34fb"
        properties: [read, write, notify]
        role: tx/rx
        description: "Security/pairing (V2 only)"
      - uuid: "00000a01-0000-1000-8000-00805f9b34fb"
        properties: [read]
        description: "MAC address"
      - uuid: "00000a02-0000-1000-8000-00805f9b34fb"
        properties: [read]
        description: "Serial number"
      - uuid: "00000a03-0000-1000-8000-00805f9b34fb"
        properties: [read]
        description: "Chip ID"
      - uuid: "00000a0a-0000-1000-8000-00805f9b34fb"
        properties: [read]
        description: "Battery voltage"
```

## Pairing

The Ida Wave uses the same pairing strategy as the Lelo F1s v2:

1. On power-on, the device advertises itself
2. Read from `0x0a11` — if the response is `1`, the device is already paired
3. If a previously stored passphrase exists, write it to `0x0a11`, then read back — if `1`, pairing is restored
4. If the response is `0`, subscription-based pairing is needed:
   - Subscribe to notifications on `0x0a11`
   - The user must press the power button on the device
   - On button press, a passphrase is sent via notification on `0x0a11`
   - Write the received passphrase back to `0x0a11`
   - The device should then respond with `1` (paired)

## Commands

### Stop All

Stops all motors.

**Write to `0xFFF2`:**

```
0x0A 0x01
```

### Motor Control

Controls the vibration and internal wave motors independently.

**Write to `0xFFF2`:**

```
0x0A 0x12 MM 0x08 0x00 0x00 0x00 0x00 HH LL
```

| Byte | Description | Range |
|------|-------------|-------|
| `0x0A` | Command prefix | Fixed |
| `0x12` | Motor control command | Fixed |
| `MM` | Motor select | `0x01` = external vibe, `0x02` = internal wiggler |
| `0x08` | Unknown | Fixed |
| `0x00 0x00 0x00 0x00` | Unknown padding | Fixed |
| `HH` | Max speed | `0x00`-`0x64` |
| `LL` | Min speed | `0x00`-`0x64` |

**Examples:**

- Stop everything: `0x0A 0x01`
- External vibe at full speed: `0x0A 0x12 0x01 0x08 0x00 0x00 0x00 0x00 0x64 0x00`
- Internal wiggler at full speed: `0x0A 0x12 0x02 0x08 0x00 0x00 0x00 0x00 0x64 0x00`

## Notes

- No Buttplug implementation exists yet.
- No device-config YAML exists yet.
- The pairing procedure is shared with the Lelo F1s v2.
- Motor select value `0x01` controls the external vibration motor, `0x02` controls the internal waving/wiggling motor.

## Sources

- [GitHub Issue](https://github.com/buttplugio/stpihkal/issues/165)
