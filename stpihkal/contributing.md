---
title: Contributing Protocol Documentation
sidebar_position: 1
---

# Contributing Protocol Documentation

This guide explains how to add new device protocol documentation to STPIHKAL.

## Quick Start

1. Create a brand directory (if it doesn't exist): `stpihkal/protocols/<brand-slug>/`
2. Copy `stpihkal/protocols/_template.md` into the brand directory
3. Fill in the template with protocol details
4. Add `config_ref` frontmatter if a device-config-v4 YAML exists for this device
5. Build and verify: `yarn build`

## Directory Structure

```text
stpihkal/protocols/
  <brand-slug>/
    index.md              # Brand overview page
    <protocol-name>.md    # Protocol details page
```

- **Brand slug**: lowercase kebab-case (e.g., `we-vibe`, `hot-octopuss`)
- Every brand gets its own directory, even single-protocol brands
- The `index.md` serves as the brand landing page in the sidebar

## Creating a Brand Directory

### 1. Brand Index Page

Create `stpihkal/protocols/<brand>/index.md`:

```yaml
---
title: <Brand Name>
brand: <brand-slug>
---
```

Include:
- **Overview**: Brief brand introduction
- **Common BLE Patterns**: Shared patterns (name prefixes, service UUIDs, protocol conventions)
- **Devices table**: Links to individual protocol pages

### 2. Protocol Page

Copy `stpihkal/protocols/_template.md` and fill in each section.

**Required frontmatter:**

```yaml
---
title: <Device/Protocol Name>
brand: <brand-slug>
transport: btle          # btle | serial | network | usb
config_ref: <file>.yml   # device-config-v4 YAML filename (if exists)
config_identifier: null  # specific device identifier, or null for all
---
```

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Display name for the page |
| `brand` | Yes | Brand slug (matches directory name) |
| `transport` | Yes | Communication type: `btle`, `serial`, `network`, or `usb` |
| `config_ref` | No | Filename in `data/device-config/` (e.g., `svakom.yml`) |
| `config_identifier` | No | Specific device identifier, or `null` for all devices |

### config_ref and config_identifier

The `config_ref` field links to a device-config-v4 YAML file. When set, the build system automatically injects a **Device Configuration** section with BLE names, service maps, features, and device variants.

- Set `config_ref` to the YAML filename (just the filename, not a path)
- Set `config_identifier` to `null` to show all device configurations
- Set `config_identifier` to a specific identifier (e.g., `"ERIKA"`) to show only that device's config

To find if a YAML exists for your device, check `data/device-config/` after running the sync script.

## Template Sections

### BLE Profile (BLE devices only)

Include a structured YAML code block documenting the BLE GATT profile:

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

This block is human-authored from reverse engineering. It complements (but doesn't replace) the auto-injected Device Configuration section.

### Device Configuration

Add this placeholder comment where you want the auto-generated content:

```html
<!-- Auto-populated from device-config-v4 at build time -->
```

The remark plugin replaces this with tables and data from the device-config-v4 YAML.

### Commands

Document each command with:
1. Description of what the command does
2. Byte format (hex notation)
3. Byte table with description and valid ranges
4. Response format (if applicable)

### Handling Incomplete Information

Use these conventions for unknown or unconfirmed data:

- Use `???` or `unknown` in YAML blocks for unknown values
- Label unconfirmed commands with **(Unconfirmed)** in the heading
- Add caveats in the Notes section about data quality
- Link to the GitHub issue for ongoing reverse engineering

## Data Pipeline

### Syncing Device Config Data

Run the sync script to copy device-config-v4 YAML from the sibling buttplug repo:

```bash
./scripts/sync-device-config.sh
```

This copies YAML files from `../buttplug/crates/buttplug_server_device_config/device-config-v4/protocols/` into `data/device-config/`. The data directory is gitignored.

### Build Verification

Always verify after adding or modifying docs:

```bash
yarn build
```

Check the console for `[remark-device-config]` messages confirming your `config_ref` was found and processed.

## Importing from GitHub Issues

Many protocols are documented in GitHub issues at [buttplugio/stpihkal](https://github.com/buttplugio/stpihkal/issues). When importing:

1. Create the brand directory and index page
2. Extract BLE details (names, UUIDs, characteristics) into the BLE Profile YAML block
3. Extract command bytes into the Commands section with byte tables
4. Link the original issue in the Sources section
5. Mark any unconfirmed information appropriately
6. Check for a matching device-config-v4 YAML and set `config_ref`

## Non-BLE Protocols

For serial, USB, or network protocols:
- Set `transport` appropriately in frontmatter
- Skip the BLE Profile section
- No `config_ref` (device-config-v4 only covers BLE currently)
- Document the communication protocol (baud rate, packet format, etc.) in the Commands section
