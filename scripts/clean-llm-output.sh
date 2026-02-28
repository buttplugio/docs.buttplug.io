#!/usr/bin/env bash
#
# Post-build cleanup for docusaurus-plugin-llms output.
# Fixes JSX remnants, resolves raw-loader imports, converts admonitions,
# and normalizes formatting in LLM output files.
#
set -euo pipefail

BUILD_DIR="${1:-build}"
DOCS_DIR="docs"

LLM_FILES=(
  "$BUILD_DIR/llms.txt"
  "$BUILD_DIR/llms-full.txt"
  "$BUILD_DIR/llms-spec.txt"
  "$BUILD_DIR/llms-dev-guide.txt"
)

# Verify build directory exists
if [[ ! -d "$BUILD_DIR" ]]; then
  echo "Error: Build directory '$BUILD_DIR' not found. Run 'yarn build' first." >&2
  exit 1
fi

# --- Step 2a: Build import map and resolve code examples ---

declare -A IMPORT_MAP

# Scan all .mdx files for raw-loader imports
while IFS= read -r line; do
  # Match: import VarName from '!!raw-loader!/path/to/file';
  if [[ "$line" =~ ^import[[:space:]]+([a-zA-Z_][a-zA-Z0-9_]*)[[:space:]]+from[[:space:]]+[\'\"]!!raw-loader!(/[^\'\"]+)[\'\"] ]]; then
    varname="${BASH_REMATCH[1]}"
    filepath="${BASH_REMATCH[2]}"
    # Strip leading slash — paths are relative to project root
    filepath="${filepath#/}"
    IMPORT_MAP["$varname"]="$filepath"
  fi
done < <(grep -rh "raw-loader" "$DOCS_DIR" 2>/dev/null || true)

echo "Found ${#IMPORT_MAP[@]} raw-loader imports"

for f in "${LLM_FILES[@]}"; do
  [[ -f "$f" ]] || continue

  tmpfile=$(mktemp)

  # Process line by line for CodeBlock replacement
  while IFS= read -r line || [[ -n "$line" ]]; do
    # Match <CodeBlock language="X">{VarName}</CodeBlock>
    if [[ "$line" =~ \<CodeBlock[[:space:]]+language=\"([^\"]+)\"\>\{([a-zA-Z_][a-zA-Z0-9_]*)\}\</CodeBlock\> ]]; then
      lang="${BASH_REMATCH[1]}"
      varname="${BASH_REMATCH[2]}"
      if [[ -n "${IMPORT_MAP[$varname]+x}" ]]; then
        filepath="${IMPORT_MAP[$varname]}"
        if [[ -f "$filepath" ]]; then
          echo "\`\`\`${lang}"
          cat "$filepath"
          echo ""
          echo "\`\`\`"
        else
          echo "<!-- File not found: $filepath -->"
          echo "$line"
        fi
      else
        echo "$line"
      fi
    else
      echo "$line"
    fi
  done < "$f" > "$tmpfile"

  mv "$tmpfile" "$f"
done

# --- Steps 2b-2e: sed-based transformations ---

for f in "${LLM_FILES[@]}"; do
  [[ -f "$f" ]] || continue

  # 2b: Convert TabItem/Tabs JSX to plain labels
  sed -i '' \
    -e 's/<TabItem[^>]*label="\([^"]*\)"[^>]*>/**\1:**/g' \
    -e '/<\/TabItem>/d' \
    -e '/<Tabs[^>]*>/d' \
    -e '/<\/Tabs>/d' \
    "$f"

  # 2c: Convert admonition syntax
  # Opening markers: :::type Title → > **Type: Title**
  sed -i '' \
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
    "$f"

  # 2d: Fix double-slash URLs
  sed -i '' 's|buttplug\.io//|buttplug.io/|g' "$f"

  # 2e: Collapse 3+ consecutive blank lines to 2
  awk '
    /^$/ { blank++; next }
    { if (blank > 0) { for (i = 0; i < (blank > 2 ? 2 : blank); i++) print ""; blank = 0 }; print }
    END { if (blank > 0) { for (i = 0; i < (blank > 2 ? 2 : blank); i++) print "" } }
  ' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
done

echo "LLM output cleanup complete."
