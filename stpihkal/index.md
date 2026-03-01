---
description: Sex Toy Protocols I Have Known And Loved
---

# Sex Toy Protocols I Have Known And Loved

A Sex Tech Reverse Engineering Love Story.

## Organization

Protocol documentation is organized by brand. Each brand has its own section containing:

- **Brand overview** — manufacturer info, common BLE patterns, device table
- **Protocol pages** — detailed reverse-engineered protocol documentation with BLE profiles, commands, and notes

Device configuration data (BLE names, service UUIDs, features, value ranges) is auto-populated from the [buttplug device-config-v4](https://github.com/buttplugio/buttplug) at build time.

## Contributing

See the protocol page template at `protocols/_template.md` for the standardized format. Each new protocol doc should include:

1. Frontmatter with `config_ref` pointing to the device-config-v4 YAML
2. A BLE Profile section with structured YAML
3. Commands with byte-level format documentation
4. Sources linking to the original reverse-engineering work

## License

Copyright Nonpolynomial Labs LLC 2017-2026

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
