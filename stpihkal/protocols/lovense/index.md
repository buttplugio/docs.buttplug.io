---
title: Lovense
brand: lovense
---

# Lovense

## Overview

Lovense is a major manufacturer of BLE-controlled intimate devices. Their product line includes vibrators, rotating toys, oscillating devices, and linear actuators. All devices share a common text-based command protocol using semicolon-delimited ASCII strings over BLE.

## Common BLE Patterns

- BLE name prefixes: `LVS-` (newer) and `LOVE-` (older Bluetooth 2.0)
- Semicolon-delimited ASCII string commands (e.g., `Vibrate:10;`)
- Multiple service UUIDs depending on device generation
- Manufacturer data with company ID `620`

## Devices

See the [Lovense protocol page](lovense.md) for the full command reference. Individual device variants and their features are documented in the auto-generated Device Configuration section on that page.
