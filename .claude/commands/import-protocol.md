# Import Protocol Documentation from GitHub Issue

Import a single STPIHKAL protocol documentation page from a GitHub issue.

## Input

Arguments: `$ARGUMENTS`

The argument should be one of:
- A GitHub issue URL (e.g., `https://github.com/buttplugio/stpihkal/issues/149`)
- A repo shorthand + number (e.g., `stpihkal#149` or `docs.buttplug.io#46`)
- Just an issue number (assumes `buttplugio/stpihkal` repo)

## Workflow

### Step 1: Resolve the issue

Parse the argument to determine repo and issue number. Fetch the issue with:
```
gh issue view <number> -R buttplugio/<repo> --json title,body,comments,labels,state
```

If the issue is closed or doesn't look like protocol documentation, warn and confirm before proceeding.

### Step 2: Check the import manifest

Read `data/import-manifest.json` and find the entry matching this repo + issue number. If found, use its `brand`, `slug`, `config_ref`, `rust_impl`, and `confidence` fields. If the entry has `skip: true`, warn and confirm.

If no manifest entry exists, infer brand and slug from the issue title.

### Step 3: Load data sources

**Device config YAML** (if `config_ref` exists):
- Read `data/device-config/<config_ref>`
- Extract: BLE names, services (UUIDs), characteristics (UUIDs, properties), features (vibrate/rotate/linear/etc), configurations/identifiers

**Rust protocol implementation** (if `rust_impl` exists):
- Read `../buttplug/crates/buttplug_server/src/device/protocol_impl/<rust_impl>`
- Extract: command byte sequences, checksums, init sequences, any protocol-specific logic

### Step 4: Determine output location

- Brand slug from manifest or inferred from title
- Protocol slug from manifest or slugified from protocol name
- Output path: `stpihkal/protocols/<brand>/<slug>.md`

Check if the brand directory exists. If not, create it with an `index.md`.

### Step 5: Generate the protocol page

Use the template structure from `stpihkal/protocols/_template.md`. Follow these rules:

**Frontmatter:**
```yaml
---
title: <Protocol/Device Name>
brand: <brand-slug>
transport: btle
config_ref: <file>.yml      # omit if no config match
config_identifier: null      # or specific identifier
---
```

Remove `draft: true` — imported pages should be published.

**Introduction:** Write 1-2 sentences from the issue description. What is the device, who makes it.

**BLE Profile:** Build a YAML code block from the device-config YAML (authoritative for names/UUIDs) supplemented by issue details for characteristic roles/descriptions. Use `???` for unknown values. Format:
```yaml
ble_names: ["Name1", "Name2"]
services:
  - uuid: "0000fff0-..."
    characteristics:
      - uuid: "0000fff1-..."
        properties: [write]
        role: tx
        description: "Command endpoint"
```

**Device Configuration:** Do NOT include this section. The remark plugin does not currently inject content, so the section would be empty.

**Pairing:** Include only if the issue mentions pairing procedures. Otherwise omit the section entirely.

**Commands:** Extract from the issue body and comments. For each command:
- Heading with command name
- Description
- Byte format in a code block (use backtick fences, NOT indented)
- Byte table if enough detail exists
- Response format if known

If the issue has hex dumps but no clear command structure, put them in a code block under a "Raw Data" or descriptive heading with notes about what they might do.

**Notes:** Include any quirks, firmware differences, unknowns. Use `???` for missing info.

**Sources:** Always include:
- Link to the GitHub issue
- Link to the Rust implementation on GitHub (if `rust_impl` exists): `https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server/src/device/protocol_impl/<rust_impl>`
- Any other sources mentioned in the issue

### Step 6: MDX safety

Before writing the file, ensure:
- All `<` and `>` outside of code blocks are escaped as `&lt;` and `&gt;`
- Hex values are always inside code blocks or inline code
- No bare JSX-like syntax outside code blocks
- No unescaped curly braces `{` `}` outside code blocks

### Step 7: Create brand directory if needed

If the brand directory doesn't exist:
1. Create `stpihkal/protocols/<brand>/index.md` with:
```yaml
---
title: <Brand Name>
brand: <brand-slug>
---
```
And a minimal overview + devices table.

### Step 8: Update brand index

Read the brand's `index.md` and add the new protocol to the Devices table. If no table exists yet, create one.

### Step 9: Write the file

Write the protocol page to `stpihkal/protocols/<brand>/<slug>.md`.

### Step 10: Verify build

Run `yarn build` and check for errors. If the build fails, fix the issue (usually MDX escaping problems).

### Step 11: Commit

Stage only the files you created/modified and commit:
```
docs: add <protocol-name> protocol documentation

Fixes <issue-url>
```

### Step 12: Comment on the issue

Post a comment on the GitHub issue:
```
gh issue comment <number> -R buttplugio/<repo> --body "Protocol documentation has been added at stpihkal/protocols/<brand>/<slug>.md in the docs.buttplug.io repo."
```

## Edge Cases

- **No config match**: Omit `config_ref` from frontmatter, omit Device Configuration section, note in Sources that no device-config exists yet
- **No Rust impl**: Omit Rust-sourced details, note in Sources
- **Low-quality issue** (bare hex dumps, minimal info): Create a stub page with `???` markers, put available hex in Notes or a "Raw Data" section
- **Issue is about updating existing docs** (not creating new): Read the existing doc, make the requested changes instead of creating a new page
- **Non-BLE protocol** (serial, USB): Set `transport` appropriately, skip BLE Profile section, no `config_ref`
- **Multiple protocols in one issue**: Create separate pages for each, or a single page if they're variants of the same protocol
