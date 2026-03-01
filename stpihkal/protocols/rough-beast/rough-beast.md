---
title: Rough Beast Protocol
brand: rough-beast
transport: btle
---

# Rough Beast Protocol

## Introduction

Rough Beast fucking machines use the Tuya Smart Life app and the Tuya BLE SDK. The BLE communication is obfuscated using the Tuya protocol stack. Tuya device-side source code is available and could be used to derive the protocol.

## BLE Profile

```yaml
ble_names:
  - "TY"
```

Full service and characteristic UUIDs have not been documented. The device uses the Tuya BLE SDK; refer to the Tuya documentation for the generic protocol structure.

## Notes

- The Tuya SDK source used is the `telink_kite_ble_sdk_v3.4.0_20190816` variant.
- Communication is obfuscated but not encrypted in an unknown way — the Tuya SDK source may allow full protocol reconstruction.
- The app icon shown in Tuya Smart Life is the "smart neck massager" demo icon.
- Protocol commands are not yet documented.

## Sources

- [GitHub Issue (stpihkal#157)](https://github.com/buttplugio/stpihkal/issues/157)
- [Tuya BLE SDK source](https://github.com/TuyaInc/tuya_ble_sdk_Demo_Project_tlsr8253)
