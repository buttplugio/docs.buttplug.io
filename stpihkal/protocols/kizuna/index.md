---
title: KIZUNA SMART Protocol
brand: kizuna
transport: btclassic
config_ref: kizuna.yml
---

# KIZUNA SMART Protocol

## Introduction

The KIZUNA SMART uses classic Bluetooth RFCOMM (serial over BT 2.x), not BLE. Commands are single ASCII characters terminated with `\r\n`.

## Transport

- **Protocol:** RFCOMM (Bluetooth Classic / BT 2.x)
- **Device name:** `KIZUNA SMART`

## Commands

### Query State

```
?\r\n
```

The app always sends `?` before any other command. The device responds with:

```
?00\r
```

This is the only command confirmed to produce a device response.

### Speed

Send a single ASCII digit character followed by `\r\n`:

```
0\r\n  (stop)
1\r\n
...
9\r\n  (max speed)
```

### Mode

Send a single ASCII letter followed by `\r\n`:

```
a\r\n  (mode 1)
b\r\n
...
i\r\n  (mode 9)
```

## Notes

- This is a Bluetooth Classic RFCOMM device, not Bluetooth LE. Connection handling differs from BLE devices.
- The app sends `?` as an initialisation command before issuing speed or mode commands.

## Sources

- [GitHub Issue (stpihkal#108)](https://github.com/buttplugio/stpihkal/issues/108)
- [Buttplug implementation (kizuna.rs)](https://github.com/buttplugio/buttplug/blob/master/buttplug/src/server/device/protocol/kizuna.rs)
