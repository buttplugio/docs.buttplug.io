#!/usr/bin/env bash
#
# Post-build cleanup for docusaurus-plugin-llms output.
# Fixes JSX remnants, resolves raw-loader imports, converts admonitions,
# and normalizes formatting in LLM output files.
#
# Compatible with bash 3.2+ (macOS) and GNU/Linux (CI).
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
BUILD_DIR="${1:-$PROJECT_DIR/build}"
DOCS_DIR="$PROJECT_DIR/docs"

LLM_FILES=(
  "$BUILD_DIR/llms.txt"
  "$BUILD_DIR/llms-full.txt"
  "$BUILD_DIR/llms-spec.txt"
  "$BUILD_DIR/llms-dev-guide.txt"
  "$BUILD_DIR/llms-stpihkal.txt"
  "$BUILD_DIR/llms-blog.txt"
)

# Verify build directory exists
if [[ ! -d "$BUILD_DIR" ]]; then
  echo "Error: Build directory '$BUILD_DIR' not found. Run 'yarn build' first." >&2
  exit 1
fi

# --- Step 2a: Build import map and resolve code examples ---

# Use a temp file as a key-value store (bash 3.2 lacks associative arrays)
IMPORT_MAP=$(mktemp)
trap "rm -f '$IMPORT_MAP'" EXIT

# Scan all .mdx files for raw-loader imports
grep -rh "raw-loader" "$DOCS_DIR" 2>/dev/null | while IFS= read -r line; do
  # Extract varname and filepath using sed
  varname=$(echo "$line" | sed -n 's/^import[[:space:]]*\([a-zA-Z_][a-zA-Z0-9_]*\)[[:space:]]*from.*/\1/p')
  filepath=$(echo "$line" | sed -n "s/.*!!raw-loader!\([^'\"]*\).*/\1/p")
  if [[ -n "$varname" && -n "$filepath" ]]; then
    # Strip leading slash
    filepath="${filepath#/}"
    echo "${varname}=${filepath}" >> "$IMPORT_MAP"
  fi
done

import_count=$(wc -l < "$IMPORT_MAP" | tr -d ' ')
echo "Found $import_count raw-loader imports"

# Function to look up a varname in the import map
lookup_import() {
  grep "^${1}=" "$IMPORT_MAP" 2>/dev/null | head -1 | cut -d= -f2-
}

for f in "${LLM_FILES[@]}"; do
  [[ -f "$f" ]] || continue

  tmpfile=$(mktemp)

  # Replace CodeBlock references with inlined file contents in a single awk pass
  # Uses string functions instead of capture groups for BSD awk compatibility
  awk -v import_map="$IMPORT_MAP" -v project_dir="$PROJECT_DIR" '
    BEGIN {
      while ((getline mapline < import_map) > 0) {
        idx = index(mapline, "=")
        if (idx > 0) {
          key = substr(mapline, 1, idx - 1)
          val = substr(mapline, idx + 1)
          imports[key] = val
        }
      }
      close(import_map)
    }
    /<CodeBlock[[:space:]].*language="[^"]*".*<\/CodeBlock>/ {
      line = $0
      # Extract language
      sub(/.*language="/, "", line)
      lang = line
      sub(/".*/, "", lang)
      # Extract varname from {VarName}</CodeBlock>
      line = $0
      sub(/.*\{/, "", line)
      sub(/\}<\/CodeBlock>.*/, "", line)
      varname = line
      if (varname in imports) {
        resolved = project_dir "/" imports[varname]
        if ((getline testline < resolved) > 0) {
          close(resolved)
          printf "```%s\n", lang
          while ((getline fileline < resolved) > 0) print fileline
          close(resolved)
          printf "\n```\n"
        } else {
          print "<!-- File not found: " imports[varname] " -->"
          print
        }
      } else {
        print
      }
      next
    }
    { print }
  ' "$f" > "$tmpfile"

  mv "$tmpfile" "$f"
done

# --- Steps 2b-2e: sed-based transformations ---

for f in "${LLM_FILES[@]}"; do
  [[ -f "$f" ]] || continue

  # 2b: Convert TabItem/Tabs JSX to plain labels
  sed -i.bak \
    -e 's/<TabItem[^>]*label="\([^"]*\)"[^>]*>/**\1:**/g' \
    -e '/<\/TabItem>/d' \
    -e '/<Tabs[^>]*>/d' \
    -e '/<\/Tabs>/d' \
    "$f" && rm -f "$f.bak"

  # 2c: Convert admonition syntax
  sed -i.bak \
    -e 's/^:::tip \(.*\)/> **Tip: \1**/g' \
    -e 's/^:::warning \(.*\)/> **Warning: \1**/g' \
    -e 's/^:::info \(.*\)/> **Info: \1**/g' \
    -e 's/^:::note \(.*\)/> **Note: \1**/g' \
    -e 's/^:::caution \(.*\)/> **Caution: \1**/g' \
    -e 's/^:::danger \(.*\)/> **Danger: \1**/g' \
    -e 's/^:::tip$/> **Tip**/g' \
    -e 's/^:::warning$/> **Warning**/g' \
    -e 's/^:::info$/> **Info**/g' \
    -e 's/^:::note$/> **Note**/g' \
    -e 's/^:::caution$/> **Caution**/g' \
    -e 's/^:::danger$/> **Danger**/g' \
    -e '/^:::$/d' \
    "$f" && rm -f "$f.bak"

  # 2d: Fix double-slash URLs
  sed -i.bak 's|buttplug\.io//|buttplug.io/|g' "$f" && rm -f "$f.bak"

  # 2e: Collapse 3+ consecutive blank lines to 2
  awk '
    /^$/ { blank++; next }
    { if (blank > 0) { for (i = 0; i < (blank > 2 ? 2 : blank); i++) print ""; blank = 0 }; print }
    END { if (blank > 0) { for (i = 0; i < (blank > 2 ? 2 : blank); i++) print "" } }
  ' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
done

echo "LLM output cleanup complete."
