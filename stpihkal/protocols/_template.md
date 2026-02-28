---
draft: true
title: <Device/Protocol Name>
brand: <brand-slug>
transport: btle
config_ref: <file>.yml
config_identifier: null  # set to specific identifier string, or null for all
---

# <Device/Protocol Name>

## Introduction

Brief description: what the device is, who makes it, any notable history.

## BLE Profile

```yaml
ble_names: ["<NAME>"]
services:
  - uuid: "<service-uuid>"
    characteristics:
      - uuid: "<char-uuid>"
        properties: [write]
        role: tx
        description: "Command endpoint"
      - uuid: "<char-uuid>"
        properties: [notify]
        role: rx
        description: "Response/notification endpoint"
```

## Device Configuration

<!-- Auto-populated from device-config-v4 at build time -->

## Pairing

(If applicable) Description of any special pairing or initialization procedure.

## Commands

### <Command Name>

<Description of what the command does.>

**Format:**
```
0xAA 0xBB 0xCC
```

| Byte | Description | Range |
|------|-------------|-------|
| 0xAA | Command ID  | Fixed |
| 0xBB | Parameter   | 0x00-0x64 |
| 0xCC | Checksum    | Sum of prior bytes mod 256 |

**Response:**
```
0xOK
```

### <Next Command>
...

## Notes

Any quirks, undocumented behavior, firmware version differences, or caveats.

## Sources

- [GitHub Issue](link to the issue this was imported from)
- [Buttplug implementation](link to protocol implementation in buttplug-rs)
- Any other reverse-engineering sources
