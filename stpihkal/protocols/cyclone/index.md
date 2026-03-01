---
title: Cyclone X10 Protocol
brand: cyclone
transport: usb
---

# Cyclone X10 Protocol

## Introduction

The Rends Cyclone X10 is a USB HID rotating onahole. It connects as a raw USB HID device. The original protocol documentation is at [waffle1999.com](http://www.waffle1999.com/onahole/source.html). Commands are raw HID writes (not report-based).

The device has a battery and may also be USB-powered. On battery power, speed is limited to 0–5.

## USB Identification

```
Vendor ID:  0x0483
Product ID: 0x5750
```

## Command Format

Raw write to device handle (16 bytes):

```
00 3C 30 31 35 32 XX YY 30 ZZ 30 01 02 03 68 3E
```

| Byte | Field | Values | Description |
|------|-------|--------|-------------|
| 6 (`data[6]`) | `XX` | `0x30` + 0–1 | Pause flag: `0x30`=running, `0x31`=paused |
| 7 (`data[7]`) | `YY` | `0x30` + 0–10 | Speed: `0x30`=0 (min), `0x3A`=10 (max); battery limits to 0–5 |
| 9 (`data[9]`) | `ZZ` | `0x30` + 0–9 | Mode: `0x30`=forwards, `0x31`=backwards, `0x32`–`0x39`=patterns |

## Notes

- All ASCII-offset values: base `0x30` (ASCII `'0'`).
- Reads may block writes — avoid concurrent read/write.
- The 臨界点 (Rinkaiten) device uses identical HID protocol but has 3 vibration motors instead of a rotator. Pattern behavior differs per the manufacturer but the hardware is indistinguishable at the HID API level.
- Battery status may be reported via a read immediately after write, but this has not been confirmed.

## Sources

- [GitHub Issue (stpihkal#31)](https://github.com/buttplugio/stpihkal/issues/31)
- [Original documentation](http://www.waffle1999.com/onahole/source.html)
