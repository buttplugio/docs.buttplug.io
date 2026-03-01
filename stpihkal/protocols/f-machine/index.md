---
title: F-Machine
brand: f-machine
---

# F-Machine

## Overview

F-Machine is a UK sex toy company producing motorised fucking machines and accessories. Their product lines include the **Gigolo** (thrusting machine), the **Tremblr** (male milking machine), and the **Alpha** (variable depth thrusting machine).

Older devices shipped with RF remote control only. When those models were later updated to add Bluetooth LE support, the BLE-capable variants were released under the same name with a **"BT-R"** suffix (e.g. Tremblr → Tremblr BT-R). Devices introduced after the BLE transition, which never had an RF-only predecessor, do not carry the BT-R suffix (e.g. Alpha). All BLE-enabled models also ship with an RF Remote. The RF and BLE protocols are entirely different.

## Common BLE Patterns

BLE devices advertise with a `FM-` prefix (e.g. `FM-T`, `FM-G`, `FM-A`) and share a single 18-byte command structure with a CRC-8 checksum on service `0xfff0`.

## Devices

### Older RF Only Devices

*These devices have no BLE support and cannot be used directly with this project.*

| Device | BLE Name | Protocol Page | Features |
|--------|----------|---------------|----------|
| Gigolo | N/A | [F-Machine RF Protocol](f-machine-rf.md) | Power, Speed |
| Tremblr | N/A | [F-Machine RF Protocol](f-machine-rf.md) | Power, Speed, Suction |

### Newer BLE-Enabled Devices

| Device | BLE Name | Protocol Page | Features |
|--------|----------|---------------|----------|
| Tremblr BT-R | `FM-T` | [F-Machine BLE Protocol](f-machine-ble.md) | Power, Speed, Suction |
| Gigolo BT-R | `FM-G` | [F-Machine BLE Protocol](f-machine-ble.md) | Power, Speed |
| Alpha | `FM-A` | [F-Machine BLE Protocol](f-machine-ble.md) | Power, Speed, Thrust Depth |
