---
title: Patoo
brand: patoo
transport: btle
config_ref: patoo.yml
config_identifier: null
---

# Patoo

## Introduction

Patoo manufactures BLE-controlled devices built on the TI SimpleLink SensorTag development platform. Products include a vibrating carrot, a cup stroker, an insertable rotating device, and others. Devices advertise with model-specific prefixes (PTVEA, PBT, PCS, PHT).

## BLE Profile

```yaml
ble_names: ["PTVEA*", "PBT*", "PCS*", "PHT*"]
services:
  - uuid: "f000aa64-0451-4000-b000-000000000000"
    characteristics:
      - uuid: "f000aa65-0451-4000-b000-000000000000"
        properties: [write]
        role: txmode
        description: "Mode control"
      - uuid: "f000aa68-0451-4000-b000-000000000000"
        properties: [write]
        role: tx
        description: "Command endpoint"
```

### Additional Services (Carrot/Devil)

```yaml
# Pressure sensor
  - uuid: "f000aa40-0451-4000-b000-000000000000"
    characteristics:
      - uuid: "f000aa41-0451-4000-b000-000000000000"
        properties: [notify]
        description: "Pressure reading (Pascals)"
      - uuid: "f000aa42-0451-4000-b000-000000000000"
        properties: [write]
        description: "Sensor control (0x01=on, 0x00=off)"
      - uuid: "f000aa43-0451-4000-b000-000000000000"
        properties: [write]
        description: "Sensor interval"

# Accelerometer
  - uuid: "f000aa80-0451-4000-b000-000000000000"
    characteristics:
      - uuid: "f000aa81-0451-4000-b000-000000000000"
        properties: [notify]
        description: "Movement data"
      - uuid: "f000aa82-0451-4000-b000-000000000000"
        properties: [write]
        description: "Movement control"
      - uuid: "f000aa83-0451-4000-b000-000000000000"
        properties: [write]
        description: "Movement interval"
```

## Commands

### Vibrate

**Mode:** Write `0x01` to `txmode` (`0xAA65`) to enable vibrate mode.

**Speed:** Write to `tx` (`0xAA68`):

```
XX
```

| Byte | Description | Range |
|------|-------------|-------|
| `XX` | Speed | `0x00`-`0x64` (0-100) |

### Rotate (Devil/PBT only)

**Mode:** Write `0x04` to `txmode` (`0xAA65`) to enable rotate mode.

Speed control is the same as vibrate.

## Notes

- The device is built on the TI SimpleLink SensorTag platform and exposes many TI-standard service UUIDs.
- Writing `0x01` to the OAD Reset characteristic restarts the device into update mode. **Do not do this** — the firmware update implementation is incomplete and there is no way to reboot back to normal mode.
- The PBT (Devil) model has dual motors.
- BLE names use wildcard prefixes (e.g., "PTVEA2601" matches "PTVEA\*").

## Sources

- [GitHub Issue](https://github.com/buttplugio/stpihkal/issues/81)
- [Buttplug implementation](https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server/src/device/protocol_impl/patoo.rs)
