---
title: Pavlok-S Protocol
brand: pavlok
transport: btle
---

# Pavlok-S Protocol

## Introduction

The Pavlok 2 and 3 (S series) are BLE wearables that deliver vibration, audible beeps, and electric zaps as aversive stimuli. Protocol applies to firmware 5.4.73+ (6.x.x included); older firmware uses a fixed `0xFA` duration value instead of the calculated value.

## Protocol Negotiation

To confirm the device is an S-series Pavlok, read the Model Number String and verify it contains "Pavlok-S":

```yaml
services:
  - uuid: "0000180a-0000-1000-8000-00805f9b34fb"
    description: "Device Information"
    characteristics:
      - uuid: "00002a24-0000-1000-8000-00805f9b34fb"
        description: "Model Number String — must contain 'Pavlok-S'"
```

## BLE Profile

```yaml
services:
  - uuid: "156e1000-a300-4fea-897b-86f698d74461"
    characteristics:
      - uuid: "00001001-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Vibrate"
      - uuid: "00001002-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Beep"
      - uuid: "00001003-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Zap"
      - uuid: "00001004-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "LED"
```

## Commands

### Vibration and Beep Packet

Written to the Vibrate (`0x1001`) or Beep (`0x1002`) characteristic:

```
RR 0c II TA TO
```

| Field | Description |
|-------|-------------|
| `RR` | Repeats: `0x80` + repeat count (e.g., `0x81` = 1 repeat) |
| `0c` | Constant, unknown purpose |
| `II` | Intensity: 0–100 |
| `TA` | Time Active (duration on): calculated for firmware 5.4.73+, `0xFA` for older firmware |
| `TO` | Time Off (duration off between repeats): calculated for firmware 5.4.73+, `0xFA` for older firmware |

### Zap Packet

Written to the Zap (`0x1003`) characteristic:

```
RR II
```

| Field | Description |
|-------|-------------|
| `RR` | Repeats: `0x80` + repeat count (e.g., `0x81` = 1 repeat) |
| `II` | Intensity: ??? |

## Time calculation

Calculation for time, for firmware versions 5.4.73 and later:

```java
public static int timeCodeForPavlok2(long timeCode) {
  if (timeCode > 10000L) {
    return 62;
  } else if (timeCode >= 3000L) {
    return (int)((timeCode - 3000L) / 500L) | 48;
  } else if (timeCode >= 1000L) {
    return (int)((timeCode - 1000L) / 100L) | 32;
  } else {
    return timeCode >= 200L ? (int)((timeCode - 200L) / 50L) | 16 : (int)(timeCode / 10L) | 0;
  }
}

```

Default value fed in is `0x280L`/`640L`, which results in `0x18`/`24`
The app hard-codes this value, however, it can be freely varied and will work accordingly.

## Sample messages

- Vibrate at 30% intensity 1 time for default duration: write `0x810c1e1818` to `00001001-0000-1000-8000-00805f9b34fb`
- Zap at 50% intensity twice: write `0x8232` to `00001003-0000-1000-8000-00805f9b34fb`

## Notes

- The Pavlok 3 exposes additional characteristics beyond the four documented here (RTC alarm, battery, etc.) but only the stimuli characteristics are relevant for actuation.
- LED characteristic (`0x1004`) format is not documented in the issue.
- This is a general-purpose behavior-change wearable, not an adult device.

## Sources

- [GitHub Issue (stpihkal#137)](https://github.com/buttplugio/stpihkal/issues/137)
