---
title: InnoTek FieldPro Protocol
brand: innotek
transport: rf
---

# InnoTek FieldPro Protocol

## Introduction

The InnoTek FieldPro is a dog training e-collar that communicates via 27.145 MHz FM FSK radio with forward error correction. It is not a Bluetooth device. Transmission requires precise timing with no jitter; a Si5351 clock chip with dual PLLs is used to generate the carrier frequencies for `0` and `1` bits.

This is a general-purpose RF e-stim device documented for completeness.

## RF Specification

- Frequency: 27.145 MHz FM FSK
- Forward error correction: yes
- Jitter tolerance: very low — requires hardware clock switching (e.g., Si5351)

## Packet Format

Packets are sent twice (two identical copies). Each packet contains:

- Preamble (14 ms)
- Device ID field
- Command field
- Error correction bytes
- Balancing bytes
- Spacer / trailer

```
// Example packet (bit array, two copies):
preamble: 0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,0,0,1,1,1
// ID:       1,1,0,1,0,1,0,1,1,1,1,0,0,1,0,0,0,0,0
// command:  0,1,1,0,0,0,0,0,1,0,0,1,1,1,0,1,1,1,1
// ecc+bal:  0,1,0,0,1,1,1,0,0,1,1,0,0,0,0
// spacer:   0,0,0,0,0,0,0,0,1
```

Full packet (C array):

```c
byte packet[] = {
  // Packet 1
  0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,0,0,1,1,1,  // preamble (14ms)
  1,1,0,1,0,1,0,1,1,1,1,0,0,1,0,0,0,0,0,        // ID + ecc
  0,1,1,0,0,0,0,0,1,0,0,1,1,1,0,1,1,1,1,        // command + ecc + bal
  0,1,0,0,1,1,1,0,0,1,1,0,0,0,0,                // command + ecc + bal
  0,0,0,0,0,0,0,0,1,                             // spacer
  // Packet 2 (identical)
  0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,0,1,1,1,
  1,1,0,1,0,1,0,1,1,1,1,0,0,1,0,0,0,0,0,
  0,1,1,0,0,0,0,0,1,0,0,1,1,1,0,1,1,1,1,
  0,1,0,0,1,1,1,0,0,1,1,0,0,0,0,
  0,0,0,0,0,0,0,0
};
```

## Notes

- This is a dog training collar, not an adult device, but is documented as a controllable e-stim device.
- Full ID and command bit field encoding is not documented beyond the packet example.

## Sources

- [GitHub Issue (stpihkal#64)](https://github.com/buttplugio/stpihkal/issues/64)
