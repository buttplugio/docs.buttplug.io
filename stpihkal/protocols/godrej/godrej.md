---
title: Godrej Aer Smart Matic Protocol
brand: godrej
transport: btle
---

# Godrej Aer Smart Matic Protocol

## Introduction

The Godrej Aer Smart Matic is a Bluetooth LE automatic air freshener. It uses a Nordic UART-like service layout with two characteristics for bidirectional communication.

## BLE Profile

```yaml
ble_names:
  - "Smart Matic"
services:
  - uuid: "6E400000-B5A3-F393-E0A9-E50E24DCCA9E"
    characteristics:
      - uuid: "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
        properties: [write]
        role: rx
        description: "Command write"
      - uuid: "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"
        properties: [notify]
        role: tx
        description: "Response notifications"
```

## Commands

### Stop Interval

```
bf 62 6d 54 18 6a 62 6d 4e 18 9c 62 73 53 f5 ff
```

### Spray Now

```
bf 62 6d 54 18 68 62 6d 4e 18 9a 62 72 49 00 ff
```

## Notes

- Command structure is not fully understood. The differences between stop and spray commands are subtle (bytes 5, 9, 11, 12, 13 differ).
- The device is an air freshener, not an adult toy, but was submitted for documentation as it uses a controllable actuator over BLE.

## Sources

- [GitHub Issue (stpihkal#163)](https://github.com/buttplugio/stpihkal/issues/163)
