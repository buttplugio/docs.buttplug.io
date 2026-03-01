---
title: Shockspot Protocol
brand: shockspot
transport: serial
---

# Shockspot Protocol

## Introduction

The Shockspot fucking machine connects via USB using an FTDI chip (RS-232 at 19200 baud). The protocol is plain-text ASCII hex strings. The device uses FTDI Chip-ID for authentication, with a hardcoded whitelist of valid chip IDs in the official software.

## Serial Settings

```
Baud Rate: 19200
Data Bits: 8
Parity: None
Stop Bits: 1
Handshake: None
Received Bytes Threshold: 1
```

## Protocol

Commands are sent as ASCII hex strings (e.g., `"01050407FF00F0"`).

### Example Commands

From the official application source (pastebin references in issue):

```
01050407FF00F0
```

Full command structure:
- Commands encode position and speed as ASCII hex.
- The device receives plain text over the serial port.

Full command format has not been fully documented. Source code from the official application shows the command construction but was only partially shared.

## Notes

- The official software is poorly written: heavy use of sleeps, bad error handling.
- Authentication uses FTDI Chip-ID whitelisting — not cryptographic.
- The FTDI chip is identifiable via `FTDIChip-ID` enumeration.

## Sources

- [GitHub Issue (stpihkal#85)](https://github.com/buttplugio/stpihkal/issues/85)
