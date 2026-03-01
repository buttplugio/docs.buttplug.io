# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation site for Buttplug (buttplug.io), an intimate haptics control protocol and library. Built with Docusaurus 3.

## Commands

```bash
yarn install    # Install dependencies
yarn start      # Start dev server (hot reload)
yarn build      # Build static site to ./build
yarn typecheck  # Run TypeScript type checking
yarn test       # Run plugin tests (node:test)
```

## Documentation Structure

- **docs/** - Current version (Spec v4) documentation
  - **spec/** - Protocol specification (message formats, types)
  - **dev-guide/** - Developer guide (architecture, tutorials, cookbook)
- **versioned_docs/version-spec-v3/** - Spec v3 documentation (frozen)
- **stpihkal/** - Device protocol documentation (separate docs plugin)
  - **protocols/\<brand\>/**: Protocol docs organized by brand (e.g., `lovense/lovense.md`)
  - **protocols/\_template.md**, **protocols/\_brand-template.md**: Templates for new entries
  - **contributing.md**: Contributor guide for adding new protocols
- **blog/** - Dev blog posts

Version switching is configured in `docusaurus.config.js`. Currently `lastVersion: "spec-v3"` means v3 is default; change to `current` when v4 is ready.

## Examples

Examples are versioned separately from docs:
- **examples/v3/** - Manually maintained v3 examples (Rust, JS, C#, Python, Twine)
- **examples/v4/** - Synced from upstream client repos

Run `./scripts/sync-examples.sh` to sync v4 examples from sibling directories (../buttplug, ../buttplug-js, etc.).

Examples are imported into MDX using raw-loader:
```javascript
import RustExample from '!!raw-loader!/examples/v4/rust/connection.rs';
```

## Device Config Data

Run `./scripts/sync-device-config.sh` to sync device configuration YAML from `../buttplug-device-config/`. The `remark-device-config` plugin (`plugins/remark-device-config.js`) injects this data into STPIHKAL protocol docs at build time.

## Key Configuration Files

- `docusaurus.config.js` - Site config, version settings, plugins
- `sidebars.js` - Main docs sidebar structure
- `sidebarsStpihkal.js` - STPIHKAL section sidebar
- `custom-blog-plugin.js` - Custom blog plugin wrapper
- `plugins/remark-device-config.js` - Remark plugin injecting device config into STPIHKAL docs

## Static Directories

Both `examples/` and `static/` are configured as static directories in docusaurus.config.js.
