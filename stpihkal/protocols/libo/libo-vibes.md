---
title: LiBo Vibration Protocol
brand: libo
transport: btle
config_ref: libo-vibes.yml
---

# LiBo Vibration Protocol

## Introduction

Most LiBo (and Sistalk-branded) devices use a shared BLE service for vibration control. Speed and pattern are sent as a single byte. Some devices have a secondary characteristic for suction. The ELLE/Whale and Shark devices use different command structures; see their respective protocol pages.

Covered devices: Lottie, LuLu, LaLa, Carlos, Lina, Adel, Lily, Lucy, Karen, Sistalk MonsterPub.

## BLE Profile

```yaml
ble_names:
  - "XiaoLu"
  - "LuXiaoHan"
  - "SuoYinQiu"
  - "BaiHu"
  - "MonsterPub"
  - "Gugudai"
  - "Yuyi"
  - "LuWuShuang"
  - "LiBo"
  - "QingTing"
services:
  - uuid: "00006000-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "00006001-0000-1000-8000-00805f9b34fb"
        properties: [write_without_response]
        role: tx
        description: "Vibration speed/pattern"
      - uuid: "00006002-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Secondary channel (suction — LaLa, Carlos only)"
  - uuid: "00006050-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "00006051-0000-1000-8000-00805f9b34fb"
        properties: [notify, read]
        role: rx
        description: "Pressure / battery level"
  - uuid: "00006070-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "00006071-0000-1000-8000-00805f9b34fb"
        properties: [notify, read]
        role: rx
        description: "Battery level (Karen only)"
```

## Commands

### Vibration / Pattern (`0x6001`)

Send a single byte:

- `0x00`–`0x64` = speed (continuous vibration)
- `0x65`–`0x6c` = pattern index

### Suction / Secondary Channel (`0x6002`)

For LaLa and Carlos suction control:

- `0x00`–`0x03` = suction intensity patterns

Some devices (notably Sistalk MonsterPub) do not stop completely on `0x00` to `0x6001` alone — also send `0x00` to `0x6002` to fully stop.

### Pressure / Battery (`0x6051`)

Read or subscribe. Returns 1 byte: `0x64` = 100%.

**Karen exception:** Uses `0x6050`/`0x6051` for pressure (4 bytes, meaning unknown) and `0x6070`/`0x6071` for battery.

## Notes

- Karen (SuoYinQiu) has no vibration motor; only pressure sensing.
- MonsterPub Gen 2 devices require an authentication handshake before accepting commands. See [docs.buttplug.io#19](https://github.com/buttplugio/docs.buttplug.io/issues/19) for the auth protocol details.
- The MonsterPub Gen 2 auth involves reading from characteristic `0x8001`, selecting a 4-byte key based on the first byte, XOR-ing the challenge bytes against the key, and sending a 15-byte response.

## Sources

- [GitHub Issue (stpihkal#48)](https://github.com/buttplugio/stpihkal/issues/48)
- [GitHub Issue (stpihkal#49 — MonsterPub)](https://github.com/buttplugio/stpihkal/issues/49)
- [GitHub Issue (docs.buttplug.io#19 — MonsterPub Gen 2 auth)](https://github.com/buttplugio/docs.buttplug.io/issues/19)
- [Buttplug implementation (libo_vibes.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/libo_vibes.rs)
- [Buttplug implementation (monsterpub.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/monsterpub.rs)
