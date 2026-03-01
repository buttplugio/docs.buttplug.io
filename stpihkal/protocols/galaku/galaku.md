---
title: Galaku
brand: galaku
transport: btle
config_ref: galaku.yml
config_identifier: null
---

# Galaku

## Introduction

Galaku is a large brand with many product variants spanning vibrators, wearables, panty vibes, and other intimate devices. Multiple BLE protocol variants exist across the product line, and BLE advertisement names vary by model.

## Notes

Due to the breadth of Galaku's product catalog, full protocol documentation for all variants is tracked in the [GitHub issue](https://github.com/buttplugio/docs.buttplug.io/issues/24). That issue contains reverse-engineering notes for numerous device families.

The Galaku Panty Vib (`WB-TDD`) uses the Mu Se/Love Spouse protocol — see the [Mu Se](../muse/muse.md) page for details.

## Sources

- [docs.buttplug.io Issue #24](https://github.com/buttplugio/docs.buttplug.io/issues/24)
- [Buttplug implementation](https://github.com/buttplugio/buttplug/blob/master/crates/buttplug_server/src/device/protocol_impl/galaku.rs)
