---
title: TryFun
brand: tryfun
transport: btle
---

# TryFun

## Introduction

TryFun is the international brand of TryJoy (广州探悦科技, "Lovappen"), a Chinese manufacturer of interactive BLE toys. Devices ship under several advertising-name schemes: `TRYFUN-ONE` (Yuan series), and `TF-*` / `DK-*` prefixed names for later models (Meta 2, Black Hole series, Rock, PT series, etc.).

**Brand history**: the hardware line originates from 春风 (TRYFUN), NetEase's original intimacy brand (est. 2017). The smart-device line was marketed as 春风元力 ("Chunfeng Yuanli") with a companion app of the same name. In early 2026 the original team spun the app operation out into 心跳元力 ("Heartbeat Yuanli" — the "dokidoki" branding): the 春风元力 app was retired around February 2026 and 心跳元力 took over with an essentially identical feature set, continuing to support the same device series (心跳 / 元力 / 黑洞 / 千面). The `BH*` model names map to the 黑洞 ("Black Hole") series, matching the upstream config names. Protocols described on this page span the transition.

Two distinct protocol families are known:

- **"yxlone"** — TRYFUN-ONE / TF-SPRAY (service `0xFF10`), a 5-byte framed protocol. Documented below from an earlier community capture, with corrections/annotations from vendor-app reverse engineering.
- **"dokidoki"** — all `TF-*` / `DK-*` models (service `0xFFAC`), a length-prefixed multi-command protocol. Documented below from vendor-app reverse engineering, hardware-verified on DK-META2 and TF-ROCK.

> **Attribution**: the vendor-app reverse engineering and on-device verification in this page come from an independent clean-room analysis of the official macOS vendor app (心跳元力 v0.9.0, [download](https://dokidoki.lovappen.cn/download.html)), cross-checked on real hardware (DK-META2 2026-10-26, TF-ROCK 2026-10-27) with a byte-level BLE probe. The vendor app is the reference implementation; no vendor code was used or reproduced.

Devices known to date (13 models, from the vendor app):

| Model (advertising name) | Protocol | Capabilities (sub-commands) |
|---|---|---|
| TRYFUN-ONE | yxlone | thrust `0x07`, spin `0x08`, work control `0x03` |
| TF-/DK-META2 | dokidoki | vibrate `0x08`, linear `0x0B`, rotate `0x0E` |
| TF-/DK-META2SE | dokidoki | linear `0x0B`, rotate `0x0E` |
| TF-/DK-PTPRO | dokidoki | vibrate `0x09`*, suction `0x12`* |
| TF-/DK-BH2PRO | dokidoki | vibrate `0x09`, linear `0x0C` |
| TF-/DK-BHPRO | dokidoki | linear `0x27` |
| TF-/DK-BHSE | dokidoki | linear `0x0C` |
| TF-/DK-BHMAX | dokidoki | linear `0x0C` |
| TF-/DK-PT3 | dokidoki | rotate `0x0F`, suction `0x10`* |
| TF-/DK-ROCK | dokidoki | heat `0x05`, vibrate `0x09`* |
| TF-/DK-SPRING | dokidoki | vibrate `0x09`* |
| TF-/DK-BHPLUS | dokidoki | vibrate `0x09`, linear `0x0C` |
| TF-/DK-SOULMT | dokidoki | vibrate `0x09`, suction `0x12` |

\* = requires a two-write arming sequence, see [Command sequences](#command-sequences).

No BLE pairing or authentication is required — any central device can connect and write commands.

## Protocol 1: "yxlone" (TRYFUN-ONE / TF-SPRAY)

### BLE Profile

```yaml
ble_names:
  - "TRYFUN-ONE"
services:
  - uuid: "0000ff10-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000fff1-0000-1000-8000-00805f9b34fb"
        properties: [write, notify]
        role: tx/rx
        description: "Command and response endpoint"
```

A notify service `0xFF12` (characteristic `0xFF14`) is used by the vendor app for command ACKs.

### Command Structure

```
AA NN MM VV ZZ
```

Where:
- `AA` = header byte, always `0xAA`
- `NN` = number of data bytes (`0x01` or `0x02`)
- `MM` = mode byte (see table below)
- `VV` = value byte
- `ZZ` = checksum: `0xFF - (NN + MM + VV)`

### Mode Table

| Mode | `MM` | `VV` range | Notes |
|------|------|-----------|-------|
| Work control | `0x03` | see discrepancy note | |
| Heat | `0x06` | `0x01` on, `0x02` off | unverified against vendor app |
| Thrust | `0x07` | `0x00`–`0x09` speed | |
| Spin | `0x08` | `0x00`–`0x09` speed | |
| Pattern | `0x09` | `0x01`–`0x05` | |

### Example Commands

```
# Heat on
aa 02 06 01 f9

# Heat off
aa 02 06 00 fa

# Thrust speed 1
aa 02 07 01 f8

# Thrust speed 9
aa 02 07 09 f0

# Spin speed 0 (stop)
aa 02 08 00 f8

# Spin speed 9
aa 02 08 09 ef

# Pause
aa 02 03 00 fd

# Restart
aa 02 03 01 fc

# Pattern 1
aa 02 09 01 f6

# Pattern 5
aa 02 09 05 f2
```

### Notes and discrepancies (2026-10-26)

- `aa 01 02 fe` (one of the two "unknown commands" in the original capture) is the **keep-alive heartbeat**: the vendor app sends it every 2 s while connected.
- **Work-control discrepancy**: the original capture lists `0x00` = restart, `0x01` = pause, but the vendor app sends `0x03 0x01` to **start** the motors and `0x03 0x00` to stop them, and requires `0x03 0x01` before any non-zero thrust/spin level. The two sources disagree; treat as unresolved until arbitrated on hardware.
- The vendor app quantizes thrust/spin to levels 1–9 and uses an 8-step interleaved stop sequence on exit.
- Vendor app heat support in the yxlone profile has not been observed (the `0x06` heat command above comes from the original capture only).

## Protocol 2: "dokidoki" (TF-\* / DK-\* models)

### BLE Profile

```yaml
ble_names: ["TF-*", "DK-*"]
services:
  - uuid: "0000ffac-0000-1000-8000-00805f9b34fb"
    characteristics:
      - uuid: "0000ffb5-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint (write with response; also used for heartbeats)"
      - uuid: "0000ffb7-0000-1000-8000-00805f9b34fb"
        properties: [write]
        role: tx
        description: "Command endpoint (write without response; preferred for motion commands)"
      - uuid: "0000ffb8-0000-1000-8000-00805f9b34fb"
        properties: [notify]
        role: rx
        description: "Device status notifications and heartbeat acknowledgements"
```

### Frame Format

```
[id] [0x02] [0x00] [len] [payload...] [ck]
```

| Byte | Description |
|------|-------------|
| `id` | Packet id, cycles 1..15 per connection |
| `0x02` | App-request command type |
| `0x00` | Fragmentation flags (single-packet frames use `0x00`) |
| `len` | Payload length + 1 (payload plus trailing checksum) |
| `payload` | Flat `[sub-command, value, ...]` pairs; multiple pairs per frame allowed |
| `ck` | `(0x100 - Σ payload bytes) & 0xFF` |

The device periodically pushes a status notification mirroring the current channel levels and echoes/acknowledges heartbeats.

### Keep-alive / heartbeat

Sub-command `0xEF` (value `0x01`, write with response) every 2 s. **The firmware does not stop outputs when the heartbeat stops** — verified on DK-META2 and TF-ROCK (outputs ran for minutes without heartbeats). Treat it as a link keep-alive, not a safety mechanism.

### META2 family (vibrate `0x08`, linear `0x0B`, rotate `0x0E`)

- Values are `0..100` directly; rotate supports direction, with negatives encoded as `(255 + v) & 0xFF` (e.g. −50 → `0xCD`).
- The buttplug-rs `tryfun-meta2` implementation prepends a `[21 05]` payload prefix. On-device testing showed the firmware accepts **both** framed forms (with and without the prefix), so either is usable.
- Upstream's rotate sign transform produces directions inverted relative to the vendor app (fixed in buttplug PR #979): vendor +50 → `0x32`, vendor −50 → `0xCD`.

### ROCK (heat `0x05`, vibrate `0x09`)

- Vibrate: the vendor app maps its 0–100% range to bytes `0..50` (`min(50, v/2)`); the device's status notification reports a nonlinear gear level (byte 25 → gear 3, byte 50 → gear 4).
- Heat: sub-command `0x05`, binary toggle — `0x01` on / `0x00` off, no intermediate levels. Verified on hardware: indicator lights immediately, status notification echoes `05 01`/`05 00`, and an undecoded countdown-like counter in the status frame decrements every ~2 s while heating.
- Stop: the vendor app sends `[07 02] [05 00]` (vibration mode release + heat off). A plain `[09 00]` zero frame also stops vibration (leaving the motor mode register armed), but does not turn heat off.

### Command sequences

Some models require a two-write arming sequence before the level command:

| Model | Action | Sequence (value = target) |
|---|---|---|
| TF-/DK-PTPRO | vibrate | `[07 01]` → `[09 value]` |
| TF-/DK-PTPRO | suction | `[10 01]` → `[12 value]` |
| TF-/DK-PT3 | suction | `0`: `[10 00]`; else `[0F 00]` → `[10 01]` |
| TF-/DK-ROCK | vibrate | `0`: `[07 02]`; else `[09 value]` (value 0–50) |
| TF-/DK-SPRING | vibrate | `0`: `[07 02]`; else `[08 0B]` → `[09 value]` |

Multiple `[sub-command, value]` pairs can also be packed into a single frame.

### Stop sequences

The vendor app sends model-specific stop sequences rather than bare zero frames:

- PTPRO: `[07 00] [10 00] [09 00] [12 00]`
- ROCK: `[07 02] [05 00]`
- SPRING: `[07 02] [09 00]`
- Models with `0xFF` defined: `[FF 00]` (PT3, BH2PRO, BHPRO, BHSE, BHMAX, BHPLUS, SOULMT)
- META2 / META2SE: zero each channel individually

## Notes

- No pairing/auth: any central can connect; the vendor app and a third-party client must not be connected simultaneously.
- Heat (ROCK) maps naturally onto the spec's `Temperature` output type (binary `[0,1]` range).

## Sources

- Independent reverse engineering of the official macOS vendor app 心跳元力 v0.9.0 ([download](https://dokidoki.lovappen.cn/download.html)), hardware-verified on DK-META2 (2026-10-26) and TF-ROCK (2026-10-27).
- Brand history (春风元力 → 心跳元力 transition): [smzdm community post](https://post.smzdm.com/p/am9x4vd4), [Sohu article](https://www.sohu.com/a/861624034_121798711), [App Store listing](https://apps.apple.com/cn/app/id6756336237).
- [GitHub Issue (stpihkal#175)](https://github.com/buttplugio/stpihkal/issues/175) — original yxlone capture.
- [buttplug implementations (tryfun*.rs)](https://github.com/buttplugio/buttplug/tree/master/crates/buttplug_server/src/device/protocol_impl)
