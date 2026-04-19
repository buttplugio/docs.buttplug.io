# Lovense Game Mode (Standard API)

## Introduction

Lovense Game Mode is a local HTTP API exposed by the Lovense Remote mobile app. It allows games, visual novels, and other applications to discover and control Lovense toys connected to the app over the local network.

In the Lovense Remote app, this feature is called "Game Mode" and is found under Discover > Game Mode. In Lovense's developer documentation, it is referred to as the "Standard API". Both names describe the same protocol.

## Transport

Game Mode supports two transport options. Both require the game and the Lovense Remote app to be on the same local network.

### HTTP (Port 20010)

Plain HTTP on port 20010. The base URL is:

```
http://{ip}:20010
```

### HTTPS (Port 30010)

HTTPS on port 30010, using a Lovense-operated wildcard domain for TLS. The IP address is converted to a dashed format and appended to `lovense.club`:

```
https://{ip-dashed}.lovense.club:30010
```

For example, `192.168.1.100` becomes:

```
https://192-168-1-100.lovense.club:30010
```

Lovense operates wildcard DNS for `*.lovense.club` that resolves the dashed IP back to the original address. This allows the Lovense Remote app to serve a valid CA-signed certificate for local network connections, avoiding self-signed certificate warnings.

### Request Format

All commands are sent as HTTP POST requests to the `/command` endpoint:

```
POST {base_url}/command
Content-Type: application/json
```

An optional `X-platform` header can be included with the application name.

## Setup

1. The user opens the Lovense Remote app and navigates to Discover > Game Mode
2. The user enables Game Mode, which starts the local HTTP server
3. The user provides their local IP address to the game
4. The game constructs the base URL and begins sending commands

An alternative connection flow exists using QR codes and a callback URL via `api.lovense-api.com/api/lan/getQrCode`, but this requires registering as a Lovense developer and is outside the scope of this document.

## Commands

All commands are JSON objects sent via POST to `/command`. Every command includes a `command` field identifying the operation. Most commands also accept a `toy` parameter (a toy ID string, or omitted to target all connected toys). Lovense Remote app v7.71.0 and later accept arrays of toy IDs for the `toy` parameter.

### GetToys

Returns a list of all toys currently connected to the Lovense Remote app, including their capabilities and status.

_Request Example_
```json
{
  "command": "GetToys"
}
```

_Response Example_
```json
{
  "code": 200,
  "data": {
    "toys": {
      "ca771e9552be": {
        "id": "ca771e9552be",
        "name": "ferri",
        "status": "1",
        "battery": 86,
        "nickName": "",
        "version": "",
        "shortFunctionNames": ["v"],
        "fullFunctionNames": ["Vibrate"]
      },
      "286847ae60ca": {
        "id": "286847ae60ca",
        "name": "lush",
        "status": "1",
        "battery": 100,
        "nickName": "",
        "version": "4",
        "shortFunctionNames": ["v"],
        "fullFunctionNames": ["Vibrate"]
      }
    }
  },
  "type": "OK"
}
```

The `toys` object is keyed by toy ID. Each toy entry includes:

| Field | Description |
|-------|-------------|
| `id` | Unique identifier for the toy |
| `name` | Model name (lowercase) |
| `nickName` | User-assigned name, if any |
| `status` | Connection status (`"1"` = connected) |
| `battery` | Battery percentage (0-100) |
| `version` | Firmware version string |
| `shortFunctionNames` | Array of short function codes (e.g. `["v", "r"]`) |
| `fullFunctionNames` | Array of full function names (e.g. `["Vibrate", "Rotate"]`) |

The `shortFunctionNames` correspond to the action codes used in the [Lovense BLE protocol](/stpihkal/protocols/lovense/).

### GetToyName

A simplified variant of GetToys that returns only toy names.

_Request Example_
```json
{
  "command": "GetToyName"
}
```

_Response Example_
```json
{
  "code": 200,
  "data": ["Domi", "Nora"],
  "type": "OK"
}
```

### Function

Sends a direct control command to one or more toys. This is the primary command for real-time toy control.

_Request Example_
```json
{
  "command": "Function",
  "action": "Vibrate:10",
  "timeSec": 5,
  "toy": "ff922f7fd345",
  "apiVer": 1
}
```

_Response Example_
```json
{
  "code": 200,
  "type": "ok"
}
```

**Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `command` | Yes | `"Function"` |
| `action` | Yes | Action string (see table below) |
| `timeSec` | Yes | Duration in seconds. `0` = run indefinitely. Otherwise must be >= 1 |
| `toy` | No | Toy ID. Omit to target all connected toys |
| `loopRunningSec` | No | Loop active duration in seconds (must be > 1) |
| `loopPauseSec` | No | Loop pause duration in seconds (must be > 1) |
| `stopPrevious` | No | `1` (default) = stop previous commands before executing. `0` = stack with previous commands |
| `apiVer` | Yes | `1` |

**Action Types:**

The `action` string combines an action name with a strength value, e.g. `"Vibrate:10"` or `"Thrusting:15"`.

| Action | Range | Description |
|--------|-------|-------------|
| `Vibrate` | 0-20 | Vibration motor speed |
| `Rotate` | 0-20 | Rotation motor speed |
| `Pump` | 0-3 | Air pump level |
| `Thrusting` | 0-20 | Thrusting actuator speed |
| `Fingering` | 0-20 | Fingering actuator speed |
| `Suction` | 0-20 | Suction actuator level |
| `Depth` | 0-3 | Depth control level |
| `Stroke` | 0-100 | Stroke position. Must be used together with Thrusting. Minimum difference of 20 between min and max values, otherwise ignored |
| `Oscillate` | 0-20 | Oscillation actuator speed |
| `All` | 0-20 | Set all supported actuators to the same level |
| `Stop` | n/a | Stop all actuators |

When `stopPrevious` is `0`, commands stack. For example, sending `Vibrate:10` followed by `Rotate:20` with `stopPrevious: 0` results in both vibration and rotation running simultaneously. With `stopPrevious: 1` (default), the second command would stop vibration before starting rotation.

To stop all actions on a toy:

_Request Example_
```json
{
  "command": "Function",
  "action": "Stop",
  "timeSec": 0,
  "toy": "ff922f7fd345",
  "apiVer": 1
}
```

### Preset

Plays one of four built-in vibration patterns.

_Request Example_
```json
{
  "command": "Preset",
  "name": "pulse",
  "timeSec": 9,
  "toy": "ff922f7fd345",
  "apiVer": 1
}
```

_Response Example_
```json
{
  "code": 200,
  "type": "ok"
}
```

**Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `command` | Yes | `"Preset"` |
| `name` | Yes | Pattern name: `pulse`, `wave`, `fireworks`, or `earthquake` |
| `timeSec` | Yes | Duration in seconds. `0` = run indefinitely |
| `toy` | No | Toy ID. Omit to target all connected toys |
| `apiVer` | Yes | `1` |

### Pattern

Sends a custom vibration pattern defined as a sequence of strength values played at a fixed interval.

_Request Example_
```json
{
  "command": "Pattern",
  "rule": "V:1;F:v,r;S:1000#",
  "strength": "20;20;5;20;10",
  "timeSec": 5,
  "toy": "ff922f7fd345",
  "apiVer": 2
}
```

_Response Example_
```json
{
  "code": 200,
  "type": "ok"
}
```

**Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `command` | Yes | `"Pattern"` |
| `rule` | Yes | Pattern rule string (see format below) |
| `strength` | Yes | Semicolon-separated strength values (max 50 values) |
| `timeSec` | Yes | Duration in seconds. `0` = run indefinitely |
| `toy` | No | Toy ID. Omit to target all connected toys |
| `apiVer` | Yes | `2` |

**Rule String Format:**

```
V:1;F:{functions};S:{interval_ms}#
```

| Component | Description |
|-----------|-------------|
| `V:1` | Protocol version (always `1`) |
| `F:` | Comma-separated function codes to control. Leave blank after `F:` to target all functions. Codes: `v` (vibrate), `r` (rotate), `p` (pump), `t` (thrusting), `f` (fingering), `s` (suction), `d` (depth), `o` (oscillate) |
| `S:` | Interval between strength values in milliseconds (must be > 100) |

The `strength` values for rotation and pump will automatically correspond to the vibration strength values.

### PatternV2

An advanced pattern system with millisecond-precision timing using keyframe arrays. PatternV2 has four sub-operations: Setup, Play, Stop, and SyncTime.

Prior to Lovense Remote v7.71.0, PatternV2 was limited to Solace Pro toys only. From v7.71.0 onward, it is available for all toys.

#### Setup

Defines a sequence of position keyframes. Must be called before Play.

_Request Example_
```json
{
  "command": "PatternV2",
  "type": "Setup",
  "actions": [
    { "ts": 0, "pos": 0 },
    { "ts": 1000, "pos": 100 },
    { "ts": 2000, "pos": 0 },
    { "ts": 3000, "pos": 100 },
    { "ts": 4000, "pos": 0 }
  ],
  "apiVer": 1
}
```

_Response Example_
```json
{
  "code": 200,
  "type": "ok"
}
```

| Field | Description |
|-------|-------------|
| `ts` | Timestamp in milliseconds relative to start. Must be > previous value. Maximum 7,200,000 (2 hours) |
| `pos` | Strength/position level, 0-100 |

#### Play

Starts playback of a previously configured pattern.

_Request Example_
```json
{
  "command": "PatternV2",
  "type": "Play",
  "toy": "ff922f7fd345",
  "startTime": 0,
  "offsetTime": 300,
  "apiVer": 1
}
```

_Response Example_
```json
{
  "code": 200,
  "type": "ok"
}
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `toy` | No | Toy ID. Omit to target all toys |
| `startTime` | No | Start position in milliseconds (0-7,200,000). Default: 0 |
| `offsetTime` | No | Client-server time offset in milliseconds (0-15,000). Default: 0 |
| `timeMsTotal` | No | Total running time in milliseconds (must be > 100) |

#### Stop

Stops a running PatternV2 sequence.

_Request Example_
```json
{
  "command": "PatternV2",
  "type": "Stop",
  "toy": "ff922f7fd345",
  "apiVer": 1
}
```

#### SyncTime

Synchronises the client clock with the Lovense Remote app to calculate the offset for accurate playback timing.

The recommended procedure is:

1. Record `T1` (current time in milliseconds)
2. Send the SyncTime command
3. Record `T2` (current time after response)
4. Calculate `offsetTime = T2 - T1`
5. Pass this value as `offsetTime` when calling Play

_Request Example_
```json
{
  "command": "PatternV2",
  "type": "SyncTime",
  "apiVer": 1
}
```

### Position

Moves a stroker toy to a specific position. Currently only supported by the Solace Pro.

_Request Example_
```json
{
  "command": "Position",
  "value": "38",
  "toy": "ff922f7fd345",
  "apiVer": 1
}
```

_Response Example_
```json
{
  "code": 200,
  "type": "ok"
}
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `command` | Yes | `"Position"` |
| `value` | Yes | Position as a string, `"0"` to `"100"` |
| `toy` | No | Toy ID. Omit to target all toys |
| `apiVer` | Yes | `1` |

The stroker continues moving for approximately 300ms after a command is received. New commands sent during this window execute immediately. Higher command frequency produces smoother movement. The stroker takes 1-2 seconds to reach speed from rest. For pre-programmed position sequences, PatternV2 is recommended over rapid Position commands.

## Error Codes

All responses include a `code` field. Successful responses return `200`.

| Code | Meaning |
|------|---------|
| 200 | OK |
| 400 | Invalid Command |
| 401 | Toy Not Found |
| 402 | Toy Not Connected |
| 403 | Toy Doesn't Support This Command |
| 404 | Invalid Parameter |
| 500 | HTTP Server Not Started or Disabled |
| 506 | Server Error |

## Version History

| Version | Changes |
|---------|---------|
| v7.71.0+ | `toy` parameter accepts arrays of IDs. PatternV2 available for all toys (previously Solace Pro only) |

## Server API (Cloud Fallback)

Lovense also operates a cloud-based API at:

```
POST https://api.lovense-api.com/api/lan/v2/command
```

This accepts the same command format as the local API, with additional authentication parameters (`token`, `uid`). It routes commands through Lovense's servers to the user's Lovense Remote app, and does not require the game and app to be on the same network. Use of this endpoint requires a Lovense developer account.

## Sources

- Lovense RenPy Plugin v1.2 (unobfuscated Python SDK)
- [Lovense Standard API Documentation](https://developer.lovense.com/docs/standard-solutions/standard-api.html)
- [Lovense Ren'Py Plugin Documentation](https://developer.lovense.com/docs/game-engine-plugins/ren-py-plugin.html)
