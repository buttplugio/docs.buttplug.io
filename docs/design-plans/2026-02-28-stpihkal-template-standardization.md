# STPIHKAL Protocol Documentation Template Standardization

## Summary

Standardize STPIHKAL protocol documentation into a brand-directory structure with structured YAML BLE profile blocks, auto-injected device config data from buttplug's device-config-v4 via a build-time remark plugin, and consistent human-readable markdown sections for commands and protocol details. Covers template design, data pipeline, sidebar restructuring, and migration path for existing docs.

## Definition of Done

**Primary deliverable:** A standardized documentation template for STPIHKAL protocol entries that uses (1) structured YAML frontmatter/blocks containing machine-parseable BLE GATT data cross-referenced with the buttplug device-config-v4 YAML, and (2) human-readable markdown sections for protocol details, commands, and notes. Template organized by brand (directory per brand with index + sub-pages per protocol).

**Success criteria:** The template is concrete enough that someone (human or LLM) can take any GitHub issue from buttplugio/stpihkal or buttplugio/docs.buttplug.io (protocol-tagged) and produce a correctly-formatted doc page. Existing stpihkal docs have a clear migration path to the new format.

**Out of scope:** Actually importing the ~124 issues (separate project). Full standardization of non-BLE protocol types (light touch only). Changes to the buttplug device-config-v4 YAML format itself.

## Glossary

- **STPIHKAL**: "Sex Toy Protocols I Have Known And Loved" — the reverse-engineering documentation section of buttplug.io
- **device-config-v4**: YAML configuration files in the buttplug repo (`buttplug/crates/buttplug_server_device_config/device-config-v4/protocols/`) defining BLE names, service UUIDs, characteristic endpoints, and device features for ~137 protocols
- **GATT profile**: Generic Attribute Profile — the BLE service/characteristic hierarchy used by devices
- **tx/rx**: Transmit/receive characteristic roles — tx is written to (commands), rx is read/notified from (responses)
- **config_ref**: Frontmatter field linking a doc page to its corresponding device-config-v4 YAML file
- **remark plugin**: A Docusaurus markdown processor plugin that transforms content at build time

## Architecture

### Directory Structure

```
stpihkal/
  protocols/
    <brand>/
      index.md              # Brand page: intro, shared BLE patterns, device table
      <protocol-name>.md    # Protocol details: GATT profile, commands, notes
    ...
  firmware/                 # Existing, light-touch update
  network/                  # Existing, light-touch update
  video-encoding-formats/   # Existing, light-touch update
  index.md                  # Existing landing page
```

Every brand gets its own directory, even single-protocol brands, for consistency. The directory name is the brand in lowercase kebab-case (e.g., `we-vibe/`, `hot-octopuss/`).

### Data Pipeline

1. **Sync script** (`scripts/sync-device-config.sh`) copies `../buttplug/crates/buttplug_server_device_config/device-config-v4/protocols/` into `data/device-config/` in this repo. Added to the existing `sync-examples.sh` or as a separate script called alongside it.

2. **Remark plugin** (`plugins/remark-device-config.js`) runs at build time:
   - Reads the `config_ref` and `config_identifier` fields from page frontmatter
   - Loads the corresponding YAML from `data/device-config/`
   - Injects a "Device Configuration" section with: BLE names, advertised services, service/characteristic map, device features (vibrate/rotate/oscillate with value ranges), and per-device configuration table
   - Renders as both a human-readable table and a machine-parseable YAML code block

3. **Frontmatter** connects each page to its config:
   ```yaml
   config_ref: svakom.yml           # file in data/device-config/
   config_identifier: null          # null = show defaults + all configs
                                    # or specific identifier like "ERIKA"
   ```

### Protocol Page Template

```markdown
---
title: <Device/Protocol Name>
brand: <brand-slug>
transport: btle          # btle | serial | network | usb
config_ref: <file>.yml   # device-config-v4 reference
config_identifier: null  # specific device identifier, or null for all
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
        properties: [write]          # read, write, write-without-response, notify
        role: tx                     # tx, rx, rxblebattery, etc.
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
```

### Brand Index Page Template

```markdown
---
title: <Brand Name>
brand: <brand-slug>
---

# <Brand Name>

## Overview

Brief brand introduction: manufacturer info, general product line.

## Common BLE Patterns

(If applicable) Shared patterns across the brand's protocols:
- BLE name prefixes/patterns
- Common service UUID patterns
- Shared protocol conventions (e.g., all Lovense toys use semicolon-delimited string commands)

## Devices

| Device | BLE Name | Protocol Page | Features |
|--------|----------|---------------|----------|
| <Name> | <BLE>    | [Link](page)  | Vibrate, Rotate, etc. |
```

### Sidebar Configuration

Update `sidebarsStpihkal.js` to support the new brand-directory structure. The `autogenerated` directive already handles nested directories, so the primary change is that the "Protocols and Memory Layouts" category will now show brand folders instead of flat files.

```javascript
{
  type: "category",
  label: "Protocols",
  items: [
    {
      type: "autogenerated",
      dirName: "protocols",
    },
  ],
}
```

Docusaurus autogenerated sidebars will create categories for each brand directory automatically, using the `index.md` as the category landing page.

## Existing Patterns

### Current doc format (varies wildly)
- **Lovense** (`lovense.md`): Rich prose, inline UUIDs, command list with examples — most complete existing doc at ~630 lines
- **We-Vibe** (`wevibe.md`): Terse, byte-level command format, device model table — good density
- **Kiiroo Onyx 2** (`kiiroo-onyx-2.md`): Stub pointing to Fleshlight Launch docs
- Others: Mix of quality levels

### device-config-v4 format
Each YAML file has:
- `defaults`: name, features (output types like vibrate/rotate/oscillate with value ranges), ID
- `configurations`: per-device overrides keyed by identifier
- `communication`: BLE definition with names, advertised_services, services (with tx/rx/etc. endpoints)

### GitHub issue format
Inconsistent but typically contains: BLE name, service UUID, characteristic UUID(s), command bytes with parameter descriptions. Some have pairing procedures, encryption details, or API endpoints.

## Implementation Phases

### Phase 1: Data Pipeline Setup
- Create `scripts/sync-device-config.sh` to copy device-config-v4 YAML into `data/device-config/`
- Add `data/device-config/` to `.gitignore` (synced, not committed)
- Create the remark plugin skeleton (`plugins/remark-device-config.js`)
- Update `docusaurus.config.js` to register the plugin
- Commit

### Phase 2: Template and Remark Plugin
- Implement the remark plugin: parse frontmatter `config_ref`, load YAML, inject device config section
- Create the protocol page template as a reference file (`stpihkal/protocols/_template.md`)
- Create the brand index page template (`stpihkal/protocols/_brand-template.md`)
- Write tests for the remark plugin (loads YAML, injects correctly, handles missing config gracefully)
- Commit

### Phase 3: Migrate Existing Docs — Pilot
- Migrate 2-3 existing docs to the new format as proof of concept:
  - Lovense (complex, multi-device brand with rich existing doc)
  - We-Vibe (medium complexity, good byte-level format)
  - One simple single-protocol brand (e.g., Cowgirl from stpihkal issue #100)
- Restructure into brand directories
- Validate build, sidebar rendering, and auto-injected device config
- Commit

### Phase 4: Sidebar and Navigation Updates
- Update `sidebarsStpihkal.js` if needed beyond autogenerated behavior
- Update `stpihkal/index.md` to reflect new organization
- Verify sidebar renders brand categories correctly
- Commit

### Phase 5: Migrate Remaining Existing Docs
- Migrate all remaining existing `stpihkal/protocols/*.md` files to brand directories
- Apply new template format to each
- Update cross-references between docs (e.g., Kiiroo Onyx 2 → Fleshlight Launch)
- Commit per brand or per batch

### Phase 6: Documentation for Contributors
- Write a contributor guide explaining how to add new protocol docs
- Include instructions for: creating brand directory, using the template, referencing device-config-v4, writing commands section
- This guide serves as the "spec" for the future ~124-issue import project
- Commit

## Additional Considerations

### LLM Consumption
The YAML code blocks in the BLE Profile section are specifically designed for LLM parsing. The structured format with consistent field names (`ble_names`, `services`, `uuid`, `properties`, `role`) creates a predictable schema that LLMs can extract data from reliably. The device-config-v4 auto-injection provides additional structured data (features, value ranges) without manual maintenance.

### Handling Incomplete Information
Many GitHub issues have incomplete data (e.g., unknown byte meanings, untested commands). The template should accommodate this with:
- `???` or `unknown` markers in YAML blocks
- "Unconfirmed" labels on commands
- Notes section for caveats about data quality

### Non-BLE Protocols
Existing non-BLE docs (serial, e-stim, network) get a light-touch update:
- Move into brand directories following the same structure
- Add frontmatter with `transport: serial` (or `usb`, `network`, etc.)
- Keep their existing content format, applying the general section structure (Introduction, Protocol/Commands, Notes, Sources) where it fits
- No YAML BLE profile block (not applicable)

### Breaking Changes
- All existing `stpihkal/protocols/<name>.md` URLs will change to `stpihkal/protocols/<brand>/<name>`
- Docusaurus can handle redirects via `@docusaurus/plugin-client-redirects` if needed
- Internal cross-references (e.g., Kiiroo Onyx 2 → Fleshlight Launch) must be updated
