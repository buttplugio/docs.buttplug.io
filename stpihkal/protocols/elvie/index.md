---
title: Elvie Trainer Protocol
brand: elvie
transport: btle
---

# Elvie Trainer Protocol

## Introduction

The Elvie Trainer is a BLE pelvic floor trainer that reads pressure via polling (no notify). The device requires several squeezes to wake up before it will accept a connection, and may need multiple connection retries.

## BLE Profile

```yaml
ble_names:
  - "???"
services:
  - uuid: "0a09fff0-dcac-7001-ed03-030502030401"
    characteristics:
      - uuid: "0a09fff1-dcac-7001-ed03-030502030401"
        properties: [read]
        role: rx
        description: "Pressure data (polled)"
```

## Sensor Data

The characteristic is read in a polling loop (not notify). The response is a byte array; byte 5 (index 5, the 6th byte) contains the pressure value.

Observed range: approximately 9–21.

```python
from bluepy.btle import Peripheral, UUID

p = Peripheral(mac_address)
svc = p.getServiceByUUID(UUID("0a09fff0-dcac-7001-ed03-030502030401"))
ch = svc.getCharacteristics(UUID("0a09fff1-dcac-7001-ed03-030502030401"))[0]

while True:
    print(ch.read()[5])
```

## Notes

- Device requires several squeezes before it will accept a BLE connection.
- Multiple connection retries may be needed.
- Whether pressure values wider than a single byte are available has not been confirmed.
- BLE advertisement name is unknown.

## Sources

- [GitHub Issue (stpihkal#109)](https://github.com/buttplugio/stpihkal/issues/109)
