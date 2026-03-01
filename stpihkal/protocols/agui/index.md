---
title: AGUI Angel's Wing
brand: agui
transport: usb
---

# AGUI Angel&apos;s Wing

## Introduction

The AGUI Angel's Wing is a USB HID device with embedded motion sensors (accelerometer, gyroscope, magnetometer), temperature sensor, and force sensors. Multiple hardware versions exist (V1.8 and V2.0+).

## USB Details

- **VID:** `0x0522`
- **PID:** `0x1450`
- **Interface:** USB HID
- **Read buffer size:** 65 bytes

## Commands

### Start Device (V1.8)

Initializes the device for reading sensor data.

**Write:**

```
0x87 0xAA 0xAA 0x06 0xF1 0xD2
```

If started successfully, read responses will begin with `0x55 0xAA 0xAA`.

### Start Device (V2.0+)

V2.0 uses a serial AT command mode before falling back to V1.8-style communication.

**Sequence:**

1. Send `+++CMD` to enter command mode
2. Send `AT+ROLE=C\r\n` to enter master mode
3. Send `AT+SCAN=?\r\n` to scan for devices (read with 15-second timeout until "end" found)
4. Device ID prefix is "AGUI"
5. Send `AT+CONNECT=<id>\r\n` to connect
6. Fall back to V1.8 start command: `0x87 0xAA 0xAA 0x06 0xF1 0xD2`

### Sensor Data Format

Read responses contain packed sensor data with a checksum:

| Offset | Size | Description |
|--------|------|-------------|
| 3 | 1 | Packet length |
| 4 | 1 | Product ID (low) |
| 5 | 1 | Product ID (high) |
| 6 | 1 | Version (low) |
| 7 | 1 | Version (high) |
| 8-11 | 4 | Serial number (big-endian) |
| 16-17 | 2 | Accelerometer X (signed, /16384 for g) |
| 18-19 | 2 | Accelerometer Y |
| 20-21 | 2 | Accelerometer Z |
| 22-23 | 2 | Temperature (raw, formula: `(16.53 + raw/340) * 10 / 10`) |
| 24-25 | 2 | Gyroscope X |
| 26-27 | 2 | Gyroscope Y |
| 28-29 | 2 | Gyroscope Z |
| 32-33 | 2 | Magnetometer X (little-endian, &times; 0.15) |
| 34-35 | 2 | Magnetometer Y |
| 36-37 | 2 | Magnetometer Z |
| 38 | 1 | Force sensor 1 (inverted: `1 - value/255`) |
| 39 | 1 | Force sensor 2 |
| 40 | 1 | Force sensor 3 |
| 41 | 1 | Force sensor 4 |
| 42 | 1 | Force sensor 5 |
| 43 | 1 | Force sensor 6 |

**Checksum validation:** Sum bytes from the start of the packet to `length - 1`; the last byte of the packet should equal this sum.

## Notes

- Two hardware versions exist (V1.8 and V2.0+) with different initialization sequences.
- V2.0 adds AT command mode for device discovery before falling back to V1.8 binary protocol.
- No Buttplug implementation exists yet.
- No device-config YAML exists yet.

## Sources

- [GitHub Issue](https://github.com/buttplugio/stpihkal/issues/176)
