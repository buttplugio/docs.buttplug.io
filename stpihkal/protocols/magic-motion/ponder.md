---
title: MagicMotion Ponder Protocol
brand: magic-motion
transport: btle
---

# MagicMotion Ponder Protocol

## Introduction

The MagicMotion Ponder is a BLE-connected vibrator. The protocol shares the same VT Command Service as other Magic Motion devices. Only min/max command captures have been provided.

## BLE Profile

Refer to the [Magic Motion Protocol](magic-motion.md) page for the shared service UUID (`78667579-7b48-43db-b8c5-7928a6b0a335`) and write characteristic (`78667579-a914-49a4-8333-aa3c0cd8fedc`).

## Commands

### Max Intensity (captured)

```
15 ff 04 0a 64 64 00 04 0a 64 64 01 04 08 64 64 00 04 08 64 64 01
```

### Min Intensity (captured)

```
15 ff 04 0a 1e 1e 00 04 0a 00 00 01 04 08 00 64 00 04 08 00 64 01
```

## Notes

- Command structure appears to be a multi-motor packet. The exact byte-field breakdown has not been fully decoded.
- BLE advertisement name is not documented.

## Sources

- [GitHub Issue (docs.buttplug.io#46)](https://github.com/buttplugio/docs.buttplug.io/issues/46)
