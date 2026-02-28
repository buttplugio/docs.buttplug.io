#!/usr/bin/env bash
# Syncs device-config-v4 protocol YAML files from the sibling buttplug repo
# into data/device-config/ for use by the remark-device-config plugin.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

SOURCE_DIR="$REPO_ROOT/../buttplug/crates/buttplug_server_device_config/device-config-v4/protocols"
DEST_DIR="$REPO_ROOT/data/device-config"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: buttplug repo not found at $REPO_ROOT/../buttplug"
  echo "Clone the buttplug repo as a sibling directory first."
  exit 1
fi

mkdir -p "$DEST_DIR"
rm -rf "$DEST_DIR"/*
cp "$SOURCE_DIR"/*.yml "$DEST_DIR"/

FILE_COUNT=$(ls -1 "$DEST_DIR"/*.yml 2>/dev/null | wc -l | tr -d ' ')
echo "Synced $FILE_COUNT device config files to $DEST_DIR"
