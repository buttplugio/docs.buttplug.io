---
title: Theragun Protocol
brand: theragun
transport: btle
---

# Theragun Protocol

## Introduction

Theragun Generation 4 devices use a common BLE service for speed control. The protocol uses a checksum byte and RPM-based speed control for Theragun devices, or discrete speed levels for Wave devices.

## Device Table

| ID | Name | Type | Min Firmware | Speed Range |
|----|------|------|-------------|-------------|
| `pro` | Pro | Theragun | 2.1.6 | 0–3616 RPM |
| `elite` | Elite | Theragun | 2.1.6 | 0–3616 RPM |
| `prime` | Prime | Theragun | 2.0.4 | 0–3584 RPM |
| `fr01` | Wave Roller | Roller | 1.0.5 | 150, 275, 350, 415, 470 RPM |
| `WaveSolo` | Wave Solo | Roller | ??? | 1920, 2520, 3120 RPM |
| `WaveDuo` | Wave Duo | Roller | ??? | 30, 45, 65, 80, 100 RPM |

## BLE Profile

```yaml
ble_names:
  - "Pro"
  - "Elite"
  - "Prime"
  - "fr01"
  - "WaveSolo"
  - "WaveDuo"
services:
  - uuid: "0xffe0"
    characteristics:
      - uuid: "0xffe1"
        properties: [notify]
        role: rx
        description: "Response / status"
      - uuid: "0xffe2"
        properties: [write]
        role: tx
        description: "Command"
```

## Commands

### Checksum

```java
byte checksum(byte[] a, int offset, int length) {
    int sum = 0;
    for (int i = 0; i < length; i++) {
        sum += a[i + offset];
    }
    return (byte)(sum & 255);
}
```

### Set Speed

Written with response to `0xffe2`:

```java
// 7-byte packet (mode == 1, i.e. Theragun devices)
byte[] arr = new byte[7];
arr[0] = (byte)0xAA;
arr[2] = 0x01;
arr[3] = 0x03;
arr[4] = (byte)((65280 & rpm) >> 8);  // RPM high byte
arr[5] = (byte)(rpm & 255);            // RPM low byte
arr[6] = 0x03;
arr[1] = checksum(arr, 2, 5);          // checksum of bytes 2..6

// 4-byte packet (mode != 1, i.e. Wave devices)
byte[] arr = new byte[4];
arr[0] = (byte)0xAA;
arr[2] = 0x01;
arr[3] = 0x03;
arr[1] = checksum(arr, 2, 2);
```

### Request Firmware Version

Written without response:

```
AA 20 20 00
```

### Firmware Version Response

From the Rx characteristic notification (write-with-response also triggers this):

```
[...] arr[12] << 8 | arr[13]  -> version integer
major = version / 100
minor = (version % 100) / 10
patch = version % 10
```

Response byte 2 (`arr[2]`) value `0x20` (32 decimal) indicates a version response packet.

## Notes

- `0xffe0`/`0xffe1`/`0xffe2` are 16-bit short-form UUIDs.
- RPM values for Wave devices are discrete fixed levels, not continuous.
- The `prime` device was previously identified as `liv2` in older firmware.

## Sources

- [GitHub Issue (stpihkal#127)](https://github.com/buttplugio/stpihkal/issues/127)
