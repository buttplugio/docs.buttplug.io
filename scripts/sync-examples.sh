#!/bin/bash
#
# Syncs example code from client library repos into the docs repo.
# Assumes client repos are in the parent directory (../buttplug, ../buttplug-js, etc.)
#
# Usage: ./scripts/sync-examples.sh
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCS_ROOT="$(dirname "$SCRIPT_DIR")"
EXAMPLES_DIR="$DOCS_ROOT/examples/v4"

# Parent directory containing client repos
CLIENT_REPOS_DIR="$(dirname "$DOCS_ROOT")"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Create examples directory structure
mkdir -p "$EXAMPLES_DIR/rust"
mkdir -p "$EXAMPLES_DIR/javascript"
mkdir -p "$EXAMPLES_DIR/typescript"
mkdir -p "$EXAMPLES_DIR/csharp"
mkdir -p "$EXAMPLES_DIR/dart"

# Write a manifest header
write_manifest() {
    local lang="$1"
    local manifest="$EXAMPLES_DIR/$lang/SYNC_MANIFEST.md"
    cat > "$manifest" << EOF
# Synced Examples - $lang

These examples are synced from the upstream client library.
**Do not edit directly** - changes will be overwritten on next sync.

Last synced: $(date -u +"%Y-%m-%d %H:%M:%S UTC")

## Source
EOF
}

# Sync Rust examples
sync_rust() {
    local src_dir="$CLIENT_REPOS_DIR/buttplug/examples/src/bin"
    local dest_dir="$EXAMPLES_DIR/rust"

    if [[ ! -d "$src_dir" ]]; then
        log_warn "Rust examples not found at $src_dir"
        return
    fi

    log_info "Syncing Rust examples from $src_dir"

    write_manifest "rust"

    # Get git info from source repo
    local git_sha=""
    if [[ -d "$CLIENT_REPOS_DIR/buttplug/.git" ]]; then
        git_sha=$(cd "$CLIENT_REPOS_DIR/buttplug" && git rev-parse --short HEAD)
        echo "- Repository: buttplug (Rust)" >> "$dest_dir/SYNC_MANIFEST.md"
        echo "- Commit: $git_sha" >> "$dest_dir/SYNC_MANIFEST.md"
        echo "- Path: examples/src/bin/" >> "$dest_dir/SYNC_MANIFEST.md"
    fi

    echo -e "\n## Files\n" >> "$dest_dir/SYNC_MANIFEST.md"

    # Copy each .rs file (excluding device_tester which is a dev tool, not an example)
    for file in "$src_dir"/*.rs; do
        if [[ -f "$file" ]]; then
            local basename=$(basename "$file")

            # Skip files that aren't really examples
            if [[ "$basename" == "device_tester.rs" ]]; then
                log_info "  Skipping $basename (dev tool, not example)"
                continue
            fi

            cp "$file" "$dest_dir/"
            echo "- \`$basename\`" >> "$dest_dir/SYNC_MANIFEST.md"
            log_info "  Copied $basename"
        fi
    done
}

# Sync TypeScript examples from buttplug-js
sync_typescript() {
    local src_dir="$CLIENT_REPOS_DIR/buttplug-js/js/examples/node"
    local dest_dir="$EXAMPLES_DIR/typescript"

    if [[ ! -d "$src_dir" ]]; then
        log_warn "TypeScript examples not found at $src_dir (not yet created in upstream)"

        cat > "$dest_dir/SYNC_MANIFEST.md" << EOF
# Synced Examples - TypeScript

No examples directory exists in buttplug-js yet.

When examples are added to \`buttplug-js/js/examples/node/\`, run this script to sync them.
EOF
        return
    fi

    log_info "Syncing TypeScript examples from $src_dir"

    write_manifest "TypeScript"

    # Get git info from source repo
    local git_sha=""
    if [[ -d "$CLIENT_REPOS_DIR/buttplug-js/.git" ]]; then
        git_sha=$(cd "$CLIENT_REPOS_DIR/buttplug-js" && git rev-parse --short HEAD)
        echo "- Repository: buttplug-js (TypeScript)" >> "$dest_dir/SYNC_MANIFEST.md"
        echo "- Commit: $git_sha" >> "$dest_dir/SYNC_MANIFEST.md"
        echo "- Path: js/examples/node/" >> "$dest_dir/SYNC_MANIFEST.md"
    fi

    echo -e "\n## Files\n" >> "$dest_dir/SYNC_MANIFEST.md"

    # Copy TypeScript files
    for file in "$src_dir"/*.ts; do
        if [[ -f "$file" ]]; then
            local basename=$(basename "$file")
            cp "$file" "$dest_dir/"
            echo "- \`$basename\`" >> "$dest_dir/SYNC_MANIFEST.md"
            log_info "  Copied $basename"
        fi
    done
}

# Sync JavaScript examples (placeholder - we now use TypeScript)
sync_javascript() {
    local dest_dir="$EXAMPLES_DIR/javascript"

    # JavaScript examples are now superseded by TypeScript examples
    # Keep stub files for backwards compatibility with docs that reference them
    cat > "$dest_dir/SYNC_MANIFEST.md" << EOF
# JavaScript Examples

JavaScript examples have been superseded by TypeScript examples.
See the \`typescript/\` directory for the current examples.

The TypeScript examples can be run directly with ts-node and also serve
as a reference for JavaScript usage (the API is the same).
EOF
    log_info "JavaScript examples placeholder updated (see typescript/ for real examples)"
}

# Sync C# examples (placeholder for when they exist)
sync_csharp() {
    local src_dir="$CLIENT_REPOS_DIR/buttplug-csharp/examples"
    local dest_dir="$EXAMPLES_DIR/csharp"

    if [[ ! -d "$src_dir" ]]; then
        log_warn "C# examples not found at $src_dir (not yet created in upstream)"

        cat > "$dest_dir/SYNC_MANIFEST.md" << EOF
# Synced Examples - C#

No examples directory exists in buttplug-csharp yet.

When examples are added to \`buttplug-csharp/examples/\`, run this script to sync them.
EOF
        return
    fi

    log_info "Syncing C# examples from $src_dir"
    write_manifest "csharp"
}

# Sync Dart examples (placeholder for when they exist)
sync_dart() {
    local src_dir="$CLIENT_REPOS_DIR/buttplug-dart/example"
    local dest_dir="$EXAMPLES_DIR/dart"

    if [[ ! -d "$src_dir" ]]; then
        log_warn "Dart examples not found at $src_dir (not yet created in upstream)"

        cat > "$dest_dir/SYNC_MANIFEST.md" << EOF
# Synced Examples - Dart

No example directory exists in buttplug-dart yet.

When examples are added to \`buttplug-dart/example/\`, run this script to sync them.
EOF
        return
    fi

    log_info "Syncing Dart examples from $src_dir"
    write_manifest "dart"
}

# Main
log_info "Starting example sync..."
log_info "Docs root: $DOCS_ROOT"
log_info "Client repos directory: $CLIENT_REPOS_DIR"
echo ""

sync_rust
sync_typescript
sync_javascript
sync_csharp
sync_dart

echo ""
log_info "Sync complete! Examples are in $EXAMPLES_DIR"
