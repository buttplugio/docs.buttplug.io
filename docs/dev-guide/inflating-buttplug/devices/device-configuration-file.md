# Device Configuration

When run with no configuration, Buttplug has no information about any devices and won't actually do anything. As this is a device control library, that situation is not ideal.

There are a few ways to two device configurations to buttplug:

- Via the API
- Via the configuration files

While configuration files will be the way this is done 99% of the time, both methods will be covered here.

## Configuring Devices via the Device Setup API

:::info Rust Only section

As this requires working with the Buttplug Server, the content covered in this section is currently only available via the Rust implementation of buttplug

:::

:::warning Not Yet Written

Skipping writing this section for now so I can get the file sections written up. I highly doubt anyone uses this anyways.

:::

## Configuring Devices via the Device Configuration File

:::caution Feature Not Standardized

The following feature is an aspect of the Buttplug Reference implementation, and is not part of the specification for the protocol. Therefore, this information may change in relation to revisions of the Buttplug Library rather than the protocol specification.

:::

:::caution Work In Progress

The configuration file format (currently version 5) and its JSON Schemas are under active development, and this page describes them as of `buttplug_server_device_config` 12.0.1. Expect fields, defaults and loading behavior to change between library releases, possibly without a major version bump of the file format.

In particular, the schemas are currently **permissive**: keys they don't declare are accepted and ignored, but the loader logs a warning for each one. That warning period exists so that files can be fixed before a future version starts **rejecting** undocumented keys. If your logs show `Ignoring undocumented key` warnings, treat them as future errors.

Files written for older formats (version 4 and earlier, with `messages`/`ScalarCmd` blocks) will not load.

:::

:::caution Section Incomplete

This section covers the file format and how the files are loaded, but doesn't go into the identifier values each protocol reports, or how features map onto each protocol's device commands.

:::

In lieu of having to change source code every time a new device needs to be added, the Rust implementation of the Buttplug Server has a utility system for loading device configurations from a JSON file. This is known as the Device Configuration File, or DCF.

The DCF is the main source of truth for device configuration in Buttplug, and as such, is stored with the source code. It is meant for **developers adding support for commercially available devices** to the library. If you're setting up a DIY build or a device only you have, you want the [User Device Configuration File](#customizing-devices-via-user-device-configuration-files) instead.

For human readability and ease of editing, the DCF is written as one YAML file per protocol:

- The YAML sources live in [`crates/buttplug_server_device_config/device-config/protocols/`](https://github.com/buttplugio/buttplug/tree/master/crates/buttplug_server_device_config/device-config/protocols). **These are the files to edit.**
- On build, they are combined into a single JSON file, checked against [the DCF JSON Schema](https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server_device_config/device-config/buttplug-device-config-schema-v5.json), and compiled into the library. If any protocol changed, the build also bumps the minor version in `device-config/version.yaml`, which becomes the DCF's version.
- The compiled JSON (`build-config/buttplug-device-config-v5.json`) is a build artifact; don't edit it by hand. Applications can supply a newer copy at runtime; Intiface Central, for instance, downloads the latest from `https://intiface-engine-device-config.intiface.com/buttplug-device-config-v5.json`.

### Protocol Files

The DCF is indexed by device protocols. Each protocol gets its own YAML file, whose name (minus `.yml`) is the protocol name. The name must match a protocol implementation in the library, or devices matching it are ignored.

Each protocol file contains up to three sections, all optional: `communication`, `defaults` and `configurations`.

### Communication Specifiers

- Key for communication specifiers is `communication`. (Older versions of this format called these
  identifiers, and used the connection types as top level protocol keys.)
- `communication` is a list. Each entry is an object with exactly one key, naming the connection
  type. There may be multiple entries in a single protocol, as some protocols support toys that work
  on multiple Device Communication Managers (DCMs) (i.e. the manufacturer makes toys that connect
  over bluetooth or USB and uses a similar control protocol over both, etc...).
- These sections define how devices that implement this protocol should be found by a DCM.
  Bluetooth LE specifiers list device names and service/characteristic info, Serial specifiers list
  port names and baud rates, USB and HID specifiers use VID/PID pairings.
- Some specialized systems do not have anything to match on. For instance, the SDL gamepad
  connection system will simply find all compatible gamepads connected to the system, and therefore
  only needs a placeholder specifier, `sdl-gamepad: { exists: true }`.
- Unknown connection types are skipped with a warning rather than failing the load, so a file can
  include connection types that a given library version doesn't know about. A known connection type
  with an invalid body is an error.

| Type | Fields | A device matches when |
| --- | --- | --- |
| `btle` | `names` (required, list of strings), `services` (required, map of service UUID to a map of endpoint name to characteristic UUID), `manufacturer_data` (list of `company` and optional `data` bytes), `advertised_services` (list of UUIDs) | Its advertised name is in `names`, or matches a `names` entry ending in `*` as a prefix, or its manufacturer data or advertised services match. |
| `hid`, `usb` | `pairs`: list of `vendor_id`/`product_id` | Any pair matches. |
| `serial` | `port`, `baud_rate`, `data_bits`, `stop_bits`, `parity` (one character), all required | The port name matches. Only `port` and `baud_rate` are currently used; ports are always opened as 8/N/1. |
| `websocket` | `name` | The `identifier` sent in the device's handshake matches exactly. No wildcards. |
| `simulated` | `names` | The archetype name matches. In the DCF, these names are the list of valid simulated device archetypes. |
| `sdl-gamepad`, `lovense_connect_service` | `exists` (boolean, required, value ignored) | Always; the DCM handles discovery itself. |

Endpoint names for `btle` services are `command`, `firmware`, `rx`, `rxaccel`, `rxblebattery`, `rxblemodel`, `rxpressure`, `rxtouch`, `tx`, `txmode`, `txshock`, `txvibrate`, `txvendorcontrol`, `whitelist`, and `generic0` through `generic31`. Only the first `btle` entry in a protocol is used to map services to endpoints.

### Default Configurations

- Key for default configurations is `defaults`.
- Defaults denote what name should be assigned, and features available, for a device that we cannot
  detect more info on. For instance, it can be assumed that all Lovense devices will react to a
  single vibrator command, even if there is no information available about exactly which type of
  Lovense device it is. Therefore the name is set to _Lovense Device_ and the features can be set
  to a single _vibrate_ output with a range of _0_ to _20_. This means that, if a new Lovense
  device is released and the Buttplug Library and/or its configurations have not been updated yet,
  the library will still at least support some features of the toy.
- For some devices/protocols, there is no identifying information available. Therefore the
  `defaults` section is used to set capabilities for all devices that use that protocol, and no
  custom configurations are given.

A device definition, whether in `defaults` or `configurations`, has these keys:

| Key | Required | Description |
| --- | --- | --- |
| `name` | Yes | Device name shown to clients. |
| `id` | Yes | UUID for this definition. User configurations refer to it, so it must be unique and should never change once released. |
| `features` | No | List of [features](#features). |
| `message_gap_ms` | No | Minimum milliseconds between writes to the device. Without it, the connection type's default is used: 75ms for Bluetooth LE (except WebBluetooth) and the Lovense dongle, none for others. |
| `protocol_variant` | No | Selects a sub-mode of the protocol implementation. Currently only read by the `svakom`, `vorze-sa` and `sdl-gamepad` protocols. |

Here's an example of a simple device/protocol configuration. The manufacturer Aneros only puts out a single toy that Buttplug supports, the _Vivi_ prostate massager. Therefore, we know that any hardware with the bluetooth name of `Massage Demo` and the specific services/characteristics setup listed will be a _Vivi_, and so we can just use a `defaults` section that defines the 2 controllable motors. This is `protocols/aneros.yml`:

```yaml
defaults:
  name: Aneros Vivi
  features:
  - description: Perineum Vibrator
    id: a980bc1a-5554-4293-a75f-6d17bf25ebee
    output:
      vibrate:
        value:
        - 0
        - 127
    index: 0
  - description: Internal Vibrator
    id: 811d7d6e-6a75-4925-943a-a06042223e3a
    output:
      vibrate:
        value:
        - 0
        - 127
    index: 1
  id: f023f0f4-6629-469e-84c4-171ed4939f3d
communication:
- btle:
    names:
    - Massage Demo
    services:
      0000ff00-0000-1000-8000-00805f9b34fb:
        tx: 0000ff01-0000-1000-8000-00805f9b34fb
```

### Custom Configurations

- Key for custom configurations is `configurations`.
- Custom Configurations provide name and feature information for a specific device type. Each one
  lists the protocol-reported values it applies to in `identifier`. A configuration without
  `identifier` loads, but can never be selected.
- Information from the `defaults` section is inherited here: `features`, `message_gap_ms` and
  `protocol_variant` are copied from `defaults` when a configuration leaves them out. `name` and
  `id` are always the configuration's own. Note that `features` is inherited as a whole: a
  configuration that lists any features replaces the entire default feature list.
- Extending the Lovense example from above, the Lovense protocol implementation has a way to
  detect the identifier for a device. The Edge Prostate Massager has 2 motors available: an
  internal vibrator and a perineum vibrator. Knowing that, a custom configuration can be added
  with the Edge identifer (in this case, _P_ is the identifer for the Edge in the Lovense
  Protocol). This block will provide the specific name (_Lovense Edge_) and specific feature
  information (2 _vibrate_ outputs) to provide control methods for all device components.

A condensed example of `protocols/lovense.yml` is provided below as an example of customized
configurations:

```yaml
defaults:
  name: Lovense Device
  features:
  - id: 3f7a25a5-df21-42ca-bf9f-d1c52df1f37e
    output:
      vibrate:
        value: [0, 20]
    index: 0
  - description: battery Level
    id: 14bd7637-13ed-49ba-9eb9-9c8ba9abec20
    input:
      battery:
        value: [[0, 100]]
        command: [Read]
    index: 1
  id: d3b1219a-aafe-4257-9d5d-3979b5da3c9a
configurations:
# For lovense, our identifiers are the letters returned from the
# DeviceType query sent on initialization.
- identifier:
  - B
  name: Lovense Max
  features:
  - description: Vibrator
    id: d9c9b4a7-008e-4182-b28c-0984af970c32
    output:
      vibrate:
        value: [0, 20]
    index: 0
  - description: Air Pump
    id: fed393a9-3ac6-4924-859d-5cb4ae059cea
    output:
      constrict:
        value: [0, 3]
    index: 1
  id: 99024e29-c0ed-4c26-aede-e0db0679eae5
- identifier:
  - P
  name: Lovense Edge
  features:
  - id: cb286b22-998b-4420-82f3-84e8d39db6b5
    output:
      vibrate:
        value: [0, 20]
    index: 0
  - id: c8b72e1d-d7d4-4417-8cbc-e6c0f435889a
    output:
      vibrate:
        value: [0, 20]
    index: 1
  - description: battery Level
    id: 66b31efb-3bd9-4e3a-9972-88c66e9fca28
    input:
      battery:
        value: [[0, 100]]
        command: [Read]
    index: 2
  id: 2e309985-6bbf-4b75-866f-76d845b3ce42
communication:
- btle:
    names:
    - LVS-*
    - LOVE-*
    services:
      50300001-0024-4bd4-bbd5-a6920e4c5653:
        tx: 50300002-0024-4bd4-bbd5-a6920e4c5653
        rx: 50300003-0024-4bd4-bbd5-a6920e4c5653
```

### Features

Each entry in `features` describes one controllable or readable part of the device, and becomes a feature in the client's device information. These are written the same way in the DCF and in [UDCF configurations](#udcf-protocol-extensions).

| Key | Required | Description |
| --- | --- | --- |
| `index` | Yes | Feature index exposed to clients. Some protocols also use it to pick the device's channel or axis. |
| `id` | Yes | UUID for this feature. User configurations refer to it, so it must be unique and should never change once released. |
| `description` | No | Human readable description. Defaults to empty. |
| `output` | No | Map of output type to properties. At most one entry per type. |
| `input` | No | Map of input type to properties. At most one entry per type. |
| `feature_settings` | No | Protocol-specific settings. Currently only `alt_protocol_index`, which no protocol reads yet. |

Unlike most of the file, `output` and `input` are strict: an unknown output or input type is a load error.

**Output types** (see [OutputType](../../../spec/output.md#outputtype) for what each does):

| Type | Properties |
| --- | --- |
| `vibrate`, `rotate`, `oscillate`, `constrict`, `temperature`, `led`, `spray` | `value` (required range), `disabled` (default `false`) |
| `position` | `value` (required range), `disabled`, `reverse_position` (both default `false`) |
| `hw_position_with_duration` | `value` (required position range), `duration` (required range, in milliseconds), `disabled`, `reverse_position` (both default `false`) |

Ranges are written as two element lists, `[start, end]`. The number of steps exposed to clients is `end`. A negative `start`, as in `[-20, 20]` for some rotators, marks a bidirectional output with steps on both sides of 0.

**Input types** (see [InputType](../../../spec/input.md#inputtype)) are `battery`, `rssi`, `button`, `pressure`, `depth` and `position`. Each has:

- `value`: a list of ranges, one per value the sensor reports.
- `command`: a list of the supported commands, from `Read`, `Subscribe` and `Unsubscribe`.

### Documented But Unused Keys

Some keys appear in real files, or in older versions of the schema, but are ignored by the loader. They are declared in the schemas so that they don't trigger warnings, and are listed here so nobody expects them to do something:

- `$schema`, at the top level of either file.
- `description` on an output, e.g. `oscillate` in `protocols/ossm.yml`. Put feature text in the feature's own `description`.
- `identifier` in a protocol's `defaults`. Defaults apply to every identifier that has no configuration.
- `expected_length` in `btle` `manufacturer_data`. Matching only uses `data`.
- In the UDCF: `name` on a device's `config`, and `defaults` in a protocol extension. The latter still has to be a valid definition, or the file fails to load.

## Customizing Devices via User Device Configuration Files

While the DCF is good for configuration global information about devices in order to connect them, there is information that a user might want to add for their specific instance. Specifications for protocols that are context specific like Serial port names, customized device names for situations where multiple of the same device may be used, limited to the maximum power output, etc... For this situation, there is the User Device Configuration File (UDCF).

The UDCF allows customizations on protocols and custom device configurations. It **does not allow** for additions of new protocols, only refinement of or additions to already supported protocols.

If you're building your own device, the UDCF is where it belongs. Rather than inventing a protocol, have your device speak [TCode](https://github.com/multiaxis/TCode-Specification), the open protocol used by the OSR-2/SR-6 and many other DIY builds, which Buttplug supports as the `tcode-v03` protocol. The [examples below](#udcf-protocol-extensions) all use it.

:::caution Work In Progress

Everything in the cautions above applies to the UDCF too, with its own [JSON Schema](https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server_device_config/device-config/buttplug-user-device-config-schema-v5.json). In addition:

- The UDCF is mostly written by applications, not people. Intiface Engine rewrites it every time a device connects (when given a user config path), and Intiface Central also rewrites it after every settings change. Hand edits survive only as far as the loader understands them, and keys it ignores, including `$schema`, are dropped on the next save.
- Device entries are tied to device addresses, which are platform specific (Bluetooth addresses differ between operating systems, for instance), so a UDCF generally can't be copied between machines.
- Several mistakes in device entries don't fail the load: the entry is silently dropped and disappears on the next save. See [How Configuration Files Are Loaded](#how-configuration-files-are-loaded).
- If Intiface Central fails to load either file, it currently deletes **both** the DCF and the UDCF and starts over from the built-in configuration. Back up your UDCF before editing it by hand.

:::

The UDCF has the same `version` block as the DCF, with everything else under `user_configs`:

```json
{
  "version": { "major": 5, "minor": 57 },
  "user_configs": {
    "protocols": { ... },
    "devices": [ ... ],
    "simulated_devices": [ ... ]
  }
}
```

All three keys under `user_configs` are optional. When the UDCF is saved, `version` is set to the version of the library's built-in DCF.

### UDCF Protocol Extensions

:::caution Section Incomplete

This section covers the file format, with examples for TCode devices. A full walkthrough for specific DIY setups, such as the OSR-2/SR-6, is still to come.

:::

`protocols` maps protocol names to extensions with the same shape as a DCF protocol, minus `defaults`:

- `communication` entries tell Buttplug how to find your device. They are **added** alongside the protocol's specifiers from the DCF; nothing in the DCF is replaced.
- `configurations` entries add new device types to the protocol. Unlike in the DCF, nothing is inherited from the protocol's `defaults`, so each one must be complete. A configuration with the same identifier as one in the DCF **replaces** it.

The DCF's `tcode-v03` protocol only knows about a single axis device, and only looks for it on a serial port literally named `default`. Everything else has to come from the UDCF.

#### Example: TCode Device Over Serial

To have Buttplug look for a TCode device on serial port `COM3` (on Linux and macOS, use the device path, such as `/dev/ttyUSB0`), add a `serial` specifier:

```json
{
  "version": { "major": 5, "minor": 57 },
  "user_configs": {
    "protocols": {
      "tcode-v03": {
        "communication": [
          {
            "serial": {
              "port": "COM3",
              "baud_rate": 115200,
              "data_bits": 8,
              "stop_bits": 1,
              "parity": "N"
            }
          }
        ]
      }
    }
  }
}
```

The device gets the DCF's _TCode v0.3 (Single Linear Axis)_ definition: one linear axis, `L0`. Intiface Central can write this entry for you, from the serial device settings.

#### Example: TCode Device Over the Websocket Device Manager

Devices without a serial connection, such as ones on WiFi, can connect to the [Websocket Device Manager](websocket-device-manager.mdx) (WSDM) instead. Add a `websocket` specifier with a name of your choosing:

```json
{
  "version": { "major": 5, "minor": 57 },
  "user_configs": {
    "protocols": {
      "tcode-v03": {
        "communication": [
          { "websocket": { "name": "tcode-stroker" } }
        ]
      }
    }
  }
}
```

The device must then send that name as its `identifier` in the WSDM handshake. Its `address` should be a string that stays the same between connections, since the UDCF stores per-device settings under it:

```json
{
  "identifier": "tcode-stroker",
  "address": "my-stroker-01",
  "version": 0
}
```

Intiface Central can also write this entry for you, from the websocket device settings. The WSDM itself has to be enabled in the server for the device to be able to connect.

#### Example: Adding a Second Axis

The DCF only describes a single axis TCode device. To use a second linear axis, add a configuration describing the whole device, under the identifier the protocol will report for it. For `tcode-v03`, that's the serial port name, or the WSDM handshake `identifier`:

```json
{
  "version": { "major": 5, "minor": 57 },
  "user_configs": {
    "protocols": {
      "tcode-v03": {
        "communication": [
          {
            "serial": {
              "port": "COM3",
              "baud_rate": 115200,
              "data_bits": 8,
              "stop_bits": 1,
              "parity": "N"
            }
          }
        ],
        "configurations": [
          {
            "identifier": ["COM3"],
            "name": "TCode v0.3 (Two Linear Axes)",
            "id": "0f3c8a52-6d1e-4b7a-9c2f-8e5d4a3b2c10",
            "message_gap_ms": 20,
            "features": [
              {
                "index": 0,
                "description": "Stroke (L0)",
                "id": "5b2e7c91-3a4d-4f68-b1e2-7c9d0a8f6e35",
                "output": {
                  "position": { "value": [0, 999] },
                  "hw_position_with_duration": { "value": [0, 999], "duration": [0, 99999] }
                }
              },
              {
                "index": 1,
                "description": "Surge (L1)",
                "id": "c4d8e2a7-9b1f-4e3c-a5d6-2f7e8b9c0d14",
                "output": {
                  "hw_position_with_duration": { "value": [0, 999], "duration": [0, 99999] }
                }
              }
            ]
          }
        ]
      }
    }
  }
}
```

- `tcode-v03` sends `hw_position_with_duration` commands to the linear axis matching the feature's `index`: feature 0 drives `L0`, feature 1 drives `L1`, feature 2 drives `L2`.
- `position` commands always drive `L0` (and `R0`), whatever the feature, so only give `position` to feature 0.
- Generate fresh UUIDs for `id` on the configuration and on each feature.
- Nothing is inherited from the DCF, so `message_gap_ms` has to be restated here. The DCF uses 20ms (50Hz); without it, a serial device gets no message gap at all.

:::caution Configurations Are Not Saved

Configurations added in the UDCF are loaded, but are currently **not written back** when the UDCF is saved, and Intiface Engine saves it as soon as a device connects. In practice, this example works for one session: the save drops the configuration, the device's entry in `devices` is left pointing at a definition that no longer exists, and on the next start the device is back to a single axis. Until that's fixed, the configuration has to be added back before each session.

:::

:::caution Existing Devices Keep Their Definition

If the device has connected before, its entry in `devices` still points at the single axis definition, and [takes precedence](#how-devices-are-matched) over the new configuration. Remove that entry (in Intiface Central, by removing the device's configuration) so the device picks up the new one.

:::

### UDCF Device Customizations

In addition to connection identifiers, users can change or add device customizations on top of what is provided in the DCF. Unlike the custom configurations in the DCF which pertain to a type of devices, these customizations are per-specific-device.

Each connected device gets an entry in `devices` the first time it's seen, and applications edit those entries to customize it. Here's the entry for the serial TCode device from the first example, renamed and with its stroke limited and reversed:

```json
"devices": [
  {
    "identifier": {
      "protocol": "tcode-v03",
      "identifier": "COM3",
      "address": "COM3"
    },
    "config": {
      "id": "3e9f5b27-8c4a-4d1e-9a6b-7f2c0d8e1a54",
      "base_id": "5c1195a5-a2e4-4643-bd47-8cb3a1e067f4",
      "features": [
        {
          "id": "b7a4c2e9-1d3f-4e8a-b5c6-9d0e2f4a6b81",
          "base_id": "afa1e63e-b6c7-4519-8faa-68cefe197a31",
          "output": {
            "position": { "value": [100, 900], "disabled": false, "reverse": true },
            "hw_position_with_duration": { "value": [100, 900], "disabled": false, "reverse": true }
          }
        }
      ],
      "user_config": {
        "display_name": "OSR-2",
        "allow": false,
        "deny": false,
        "index": 0,
        "message_gap_ms": 20
      }
    }
  }
]
```

- `identifier` names one physical device: its `protocol`, the `identifier` the protocol reported for it, and its `address`. For `tcode-v03`, both are the serial port name, or the WSDM handshake's `identifier` and `address`. `identifier` can be `null` for protocols that don't report one.
- `config.base_id` is the `id` of the definition this device is based on: from the DCF's `defaults` or `configurations`, or from a configuration in the UDCF.
- `config.features` must have exactly one entry per feature of that definition, each pointing at the base feature with `base_id`. Customizations can only adjust outputs; the index, description and inputs always come from the definition.

Feature `output` entries are all optional, and output types left out keep the definition's values:

| Output type | Properties |
| --- | --- |
| `vibrate`, `rotate`, `oscillate`, `constrict`, `temperature`, `led`, `spray` | `value`, `disabled` |
| `position` | `value`, `disabled`, `reverse` |
| `hw_position_with_duration` | `value`, `duration`, `disabled`, `reverse` |

Here `value` and `duration` limit the range the device actually uses. They must sit within 0 and the definition range's `end`, with `start` no greater than `end`. Leaving them out uses the full range. Note the reversal key is `reverse` here, but `reverse_position` in the DCF.

`user_config` holds the per-device settings:

| Key | Required | Description |
| --- | --- | --- |
| `index` | Yes | Device index given to clients. Kept stable across connections; new devices get the lowest unused index. |
| `display_name` | No | Name shown alongside the device name. |
| `allow` | No | If **any** device has `allow` set, only allowed devices can connect. Defaults to `false`. |
| `deny` | No | Denied devices never connect, regardless of `allow`. Defaults to `false`. |
| `message_gap_ms` | No | Minimum milliseconds between writes to this device. |

:::caution Message Gap Is Not Inherited

`message_gap_ms` in `user_config` **replaces** the definition's value rather than falling back to it. If it's left out, the device gets its connection type's default instead: 75ms for Bluetooth LE (except WebBluetooth) and the Lovense dongle, and **no gap at all** for others, including serial and websocket devices, which can flood a TCode device. When a device's entry is first created, the definition's value is copied into it, which also means later DCF changes to `message_gap_ms` don't reach devices already in the UDCF.

:::

`allow` and `deny` are matched on the device's address only, regardless of protocol.

### UDCF Simulated Devices

`simulated_devices` creates devices that exist only in software, for testing without hardware:

```json
"simulated_devices": [
  { "identifier": "simulated-stroker", "display_name": "Test Stroker", "address": "simulated:9b0c1f2e-6a1d-4c1e-8f7a-2d3b4c5e6f70" }
]
```

- `identifier` is the archetype to simulate. It must be one of the names under the DCF's `simulated` protocol (currently `simulated-1vibe`, `simulated-2vibe`, `simulated-oscillator`, `simulated-rotator` and `simulated-stroker`), or the whole UDCF fails to load.
- `address` is generated as `simulated:` followed by a random UUID if left out. It must be unique, or the whole UDCF fails to load.
- `display_name` is optional, and is used when the device's entry in `devices` is first created.

## How Configuration Files Are Loaded

:::caution Work In Progress

This describes the Rust reference implementation as of `buttplug_server_device_config` 12.0.1, and is likely to change.

:::

Both files go through the same steps when loaded:

1. **Undocumented key check.** The file is checked against a strict copy of its schema, in which every object only allows the keys the schema declares. Each extra key is logged as a warning, for example `Ignoring undocumented key '/user_configs/protocols/tcode-v03/communication/0/serial/foo' in user device configuration. Future versions may reject it.` Nothing is rejected in this step.
2. **Validation and parsing.** The file is validated against its schema, then parsed. Malformed JSON, wrong types, missing required keys, and unknown output or input types reject the whole file.
3. **Version check.** `version.major` must match the library's built-in major version (`5`).

The DCF is then loaded:

- If no DCF is supplied, the one built into the library is used.
- Each protocol's `communication` specifiers are registered.
- `defaults` is registered as the definition for any device of that protocol whose identifier has no configuration.
- Each entry in `configurations` gets the defaults filled in, and is registered once for each string in its `identifier` list.

Then the UDCF, if one was supplied:

- `communication` specifiers are registered alongside the DCF ones for the same protocol.
- `configurations` are registered as definitions, replacing any DCF configuration with the same protocol and identifier.
- Each entry in `devices` is matched to the definition whose `id` equals its `base_id`, and its customizations are applied. Entries that don't line up are **silently dropped**, with an error in the logs at most: an unknown `base_id`, a feature count that differs from the definition, a feature `base_id` that doesn't exist, or a `value`/`duration` range out of bounds.
- `simulated_devices` entries are checked against the DCF's archetypes and for duplicate addresses. Either problem rejects the whole UDCF.

### How Devices Are Matched

When a device is discovered, Buttplug picks a protocol for it, and then a definition.

**Picking a protocol:**

1. If the device's address is denied, or there is an allow list it isn't on, it's ignored.
2. Its connection details are compared against every protocol's specifiers, UDCF first and then DCF. The UDCF and DCF lists are compared separately, so a device found through a UDCF specifier connects using the UDCF's details, such as its baud rate.
3. The first matching protocol that the device can connect with is used. If two DCF protocols match the same device, which one wins is not defined.
4. The protocol identifies the device, giving its protocol, identifier and address. Protocols without their own identification step, `tcode-v03` included, report the hardware's name: the serial port name, the WSDM handshake `identifier`, or the Bluetooth advertised name.

**Picking a definition.** The first of these that exists is used, and nothing is merged between them:

1. An entry in `devices` with the same protocol, identifier **and** address.
2. A configuration (UDCF, else DCF) for the protocol and identifier.
3. The protocol's `defaults`.

If none exists, the device fails to connect. If the device had no entry in `devices`, one is created from the definition, with the next free device index. Intiface Engine saves the UDCF when the device connects, if it was given a UDCF path.

This order means a device's entry **pins its definition**: once a device has an entry, it keeps the definition it was created from, even if a better match is added to the DCF or UDCF later. Remove the entry to have the device matched again.

**What is merged, and what is replaced:**

| Where | Merged | Replaced |
| --- | --- | --- |
| Communication specifiers | UDCF entries are added alongside the DCF's | Nothing |
| DCF `defaults` into DCF `configurations` | `protocol_variant` and `message_gap_ms` are filled in when the configuration leaves them out | `features` as a whole list, if the configuration has any; `name` and `id` are always the configuration's |
| UDCF `configurations` | Nothing; they must be complete | A DCF configuration with the same protocol and identifier |
| A device entry onto its definition | Outputs, per output type: the entry's settings where it has them, the definition's otherwise | `display_name`, `index`, `allow`, `deny`, and `message_gap_ms` (even when left out) |

A device entry's limits are re-applied to its definition every time the UDCF loads, so most DCF changes still reach existing devices: names, full ranges, inputs, and new output types. The exceptions are `message_gap_ms`, which was copied into the entry, and any change in the definition's number of features or their `id`s, which drops the entry, along with its customizations.

## Experimenting with DCF and UDCF Changes

To try out changes without rebuilding the library, pass your own files to [Intiface Engine](https://intiface.com/engine):

- `--device-config-file <path>` replaces the built-in DCF with the given file.
- `--user-device-config-file <path>` loads the given UDCF, and saves changes back to it. A missing file is created.

Adding a `$schema` key pointing at the matching schema lets editors that support JSON Schema, such as VS Code, check your file as you type. Then watch the engine's logs for `Ignoring undocumented key` warnings, and for errors about dropped device entries.
