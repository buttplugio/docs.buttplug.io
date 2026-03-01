---
title: MaxPro Rabbit Vibrator Protocol
brand: maxpro
transport: btle
config_ref: maxpro.yml
---

# MaxPro Rabbit Vibrator Protocol

## Introduction

The MaxPro rabbit vibrator uses a 10-byte BLE command with an additive checksum in the last byte. Protocol was originally documented from a TypeScript implementation in buttplug-js.

## BLE Profile

```yaml
ble_names:
  - "???"
services:
  - uuid: "???"
    characteristics:
      - uuid: "???"
        properties: [write]
        role: tx
        description: "Command endpoint"
```

## Commands

### Vibration

```
55 04 07 ff ff 3f VV 5f VV CRC
```

Where:
- `VV` = speed value (appears at bytes 6 and 8)
- `CRC` = additive checksum: sum of bytes 0–8 modulo 256

Speed range: `0x00`–`0xff`.

## Notes

- BLE advertisement name and service/characteristic UUIDs are not documented in the source issue.
- The original JavaScript implementation can be found in buttplug-js (link in issue is now defunct; refer to the Rust implementation).

## Sources

- [GitHub Issue (stpihkal#36)](https://github.com/buttplugio/stpihkal/issues/36)
- [Buttplug implementation (maxpro.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/maxpro.rs)
