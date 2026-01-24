#!/usr/bin/env python3
"""
JSON Schema Validation Script for Buttplug Protocol Documentation

Extracts JSON examples from markdown files and validates them against
the official Buttplug JSON Schema.
"""

import argparse
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

try:
    from jsonschema import Draft7Validator
    from referencing import Registry, Resource
    from referencing.jsonschema import DRAFT7
except ImportError:
    print("Error: Required libraries not installed.")
    print("Run: pip install -r scripts/requirements.txt")
    sys.exit(1)


# Files where validation failures should be treated as warnings
WARNING_FILES = {"deprecated.md"}


@dataclass
class JsonExample:
    """Represents a JSON example extracted from markdown."""
    file_path: str
    line_number: int
    section: str
    content: str
    raw_json: str


@dataclass
class ValidationResult:
    """Result of validating a single JSON example."""
    example: JsonExample
    valid: bool
    error_message: Optional[str] = None
    parse_error: bool = False
    skipped: bool = False
    skip_reason: Optional[str] = None
    warning: bool = False  # True if this is a warning (not a hard failure)


# Patterns that indicate placeholder/template JSON that shouldn't be validated
PLACEHOLDER_PATTERNS = [
    r'"MessageType"\s*:',
    r'"MessageType2"\s*:',
    r'"MessageField\d*"',
    r'"MessageValue\d*"',
    r'"Message\d+Field\d*"',
    r'"Message\d+Value\d*"',
]


def is_placeholder_json(json_str: str) -> bool:
    """Check if JSON contains placeholder patterns that indicate it's a template."""
    for pattern in PLACEHOLDER_PATTERNS:
        if re.search(pattern, json_str):
            return True
    return False


def is_warning_file(file_path: str) -> bool:
    """Check if the file should have its failures treated as warnings."""
    return Path(file_path).name in WARNING_FILES


def extract_section_name(content: str, line_number: int) -> str:
    """Extract the nearest section header before the given line."""
    lines = content.split('\n')
    for i in range(min(line_number - 1, len(lines) - 1), -1, -1):
        line = lines[i].strip()
        if line.startswith('#'):
            # Remove markdown header markers and return the title
            return re.sub(r'^#+\s*', '', line)
    return "Unknown Section"


def extract_json_examples(file_path: Path) -> list[JsonExample]:
    """Extract all JSON code blocks from a markdown file."""
    examples = []

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all ```json ... ``` blocks
    pattern = r'```json\s*\n(.*?)```'

    for match in re.finditer(pattern, content, re.DOTALL):
        json_content = match.group(1).strip()

        # Calculate line number
        start_pos = match.start()
        line_number = content[:start_pos].count('\n') + 1

        # Get section name
        section = extract_section_name(content, line_number)

        examples.append(JsonExample(
            file_path=str(file_path),
            line_number=line_number,
            section=section,
            content=json_content,
            raw_json=json_content
        ))

    return examples


def load_schema(schema_path: Path) -> tuple[dict, Registry]:
    """Load the JSON schema and create a registry for $ref handling."""
    with open(schema_path, 'r', encoding='utf-8') as f:
        schema = json.load(f)

    # Create a resource and registry for handling $ref references
    # The schema uses internal references like #/components/ClientId
    resource = Resource.from_contents(schema, default_specification=DRAFT7)
    registry = Registry().with_resource("", resource)

    return schema, registry


def validate_json_example(
    example: JsonExample,
    schema: dict,
    registry: Registry,
    strict: bool = False
) -> ValidationResult:
    """Validate a single JSON example against the schema."""

    # Check if failures for this file should be warnings
    treat_as_warning = is_warning_file(example.file_path)

    # Check for placeholder patterns
    if is_placeholder_json(example.content):
        if strict:
            return ValidationResult(
                example=example,
                valid=False,
                error_message="Placeholder pattern detected in strict mode",
                skipped=False,
                warning=treat_as_warning
            )
        return ValidationResult(
            example=example,
            valid=True,
            skipped=True,
            skip_reason="Placeholder/template JSON"
        )

    # Try to parse the JSON
    try:
        parsed_json = json.loads(example.content)
    except json.JSONDecodeError as e:
        return ValidationResult(
            example=example,
            valid=False,
            error_message=f"JSON parse error: {e}",
            parse_error=True,
            warning=treat_as_warning
        )

    # Validate against the schema
    # The schema expects an array of message objects
    validator = Draft7Validator(schema, registry=registry)

    errors = list(validator.iter_errors(parsed_json))

    if errors:
        # Format the first error for display
        error = errors[0]
        path = " -> ".join(str(p) for p in error.absolute_path) if error.absolute_path else "root"
        error_msg = f"{error.message} (at {path})"

        return ValidationResult(
            example=example,
            valid=False,
            error_message=error_msg,
            warning=treat_as_warning
        )

    return ValidationResult(
        example=example,
        valid=True
    )


def format_text_output(results: list[ValidationResult], verbose: bool = False) -> str:
    """Format validation results as human-readable text."""
    lines = []

    passed = sum(1 for r in results if r.valid and not r.skipped)
    failed = sum(1 for r in results if not r.valid and not r.warning)
    warnings = sum(1 for r in results if not r.valid and r.warning)
    skipped = sum(1 for r in results if r.skipped)

    lines.append("=" * 60)
    lines.append("Buttplug Spec JSON Validation Report")
    lines.append("=" * 60)
    lines.append("")
    lines.append(f"Total examples: {len(results)}")
    lines.append(f"  Passed: {passed}")
    lines.append(f"  Failed: {failed}")
    lines.append(f"  Warnings: {warnings}")
    lines.append(f"  Skipped: {skipped}")
    lines.append("")

    # Group results by file
    files = {}
    for result in results:
        file_path = result.example.file_path
        if file_path not in files:
            files[file_path] = []
        files[file_path].append(result)

    # Show failures first (errors, not warnings)
    if failed > 0:
        lines.append("-" * 60)
        lines.append("FAILURES:")
        lines.append("-" * 60)

        for file_path, file_results in files.items():
            failed_results = [r for r in file_results if not r.valid and not r.warning]
            if failed_results:
                lines.append(f"\n{Path(file_path).name}:")
                for result in failed_results:
                    lines.append(f"  Line {result.example.line_number} [{result.example.section}]:")
                    if result.parse_error:
                        lines.append(f"    PARSE ERROR: {result.error_message}")
                    else:
                        lines.append(f"    VALIDATION ERROR: {result.error_message}")
                    if verbose:
                        # Show first 200 chars of the JSON
                        preview = result.example.content[:200]
                        if len(result.example.content) > 200:
                            preview += "..."
                        lines.append(f"    JSON: {preview}")

    # Show warnings
    if warnings > 0:
        lines.append("")
        lines.append("-" * 60)
        lines.append("WARNINGS (deprecated messages - not blocking):")
        lines.append("-" * 60)

        for file_path, file_results in files.items():
            warning_results = [r for r in file_results if not r.valid and r.warning]
            if warning_results:
                lines.append(f"\n{Path(file_path).name}:")
                for result in warning_results:
                    lines.append(f"  Line {result.example.line_number} [{result.example.section}]:")
                    if result.parse_error:
                        lines.append(f"    PARSE WARNING: {result.error_message}")
                    else:
                        lines.append(f"    VALIDATION WARNING: {result.error_message}")
                    if verbose:
                        # Show first 200 chars of the JSON
                        preview = result.example.content[:200]
                        if len(result.example.content) > 200:
                            preview += "..."
                        lines.append(f"    JSON: {preview}")

    # Show skipped if verbose
    if verbose and skipped > 0:
        lines.append("")
        lines.append("-" * 60)
        lines.append("SKIPPED:")
        lines.append("-" * 60)

        for file_path, file_results in files.items():
            skipped_results = [r for r in file_results if r.skipped]
            if skipped_results:
                lines.append(f"\n{Path(file_path).name}:")
                for result in skipped_results:
                    lines.append(f"  Line {result.example.line_number} [{result.example.section}]: {result.skip_reason}")

    lines.append("")
    lines.append("=" * 60)

    if failed > 0:
        lines.append("RESULT: FAILED")
    elif warnings > 0:
        lines.append("RESULT: PASSED (with warnings)")
    else:
        lines.append("RESULT: PASSED")

    lines.append("=" * 60)

    return "\n".join(lines)


def format_json_output(results: list[ValidationResult]) -> str:
    """Format validation results as JSON."""
    output = {
        "summary": {
            "total": len(results),
            "passed": sum(1 for r in results if r.valid and not r.skipped),
            "failed": sum(1 for r in results if not r.valid and not r.warning),
            "warnings": sum(1 for r in results if not r.valid and r.warning),
            "skipped": sum(1 for r in results if r.skipped)
        },
        "results": []
    }

    for result in results:
        entry = {
            "file": result.example.file_path,
            "line": result.example.line_number,
            "section": result.example.section,
            "valid": result.valid,
            "skipped": result.skipped,
            "warning": result.warning
        }
        if result.error_message:
            entry["error"] = result.error_message
        if result.skip_reason:
            entry["skip_reason"] = result.skip_reason
        output["results"].append(entry)

    return json.dumps(output, indent=2)


def main():
    parser = argparse.ArgumentParser(
        description="Validate JSON examples in Buttplug spec documentation against the JSON schema."
    )
    parser.add_argument(
        "--schema",
        required=True,
        type=Path,
        help="Path to the Buttplug JSON schema file"
    )
    parser.add_argument(
        "--docs-dir",
        type=Path,
        default=Path("./docs/spec"),
        help="Path to the spec documentation directory (default: ./docs/spec)"
    )
    parser.add_argument(
        "--file",
        type=Path,
        help="Validate a single markdown file instead of the entire directory"
    )
    parser.add_argument(
        "--output",
        choices=["text", "json"],
        default="text",
        help="Output format (default: text)"
    )
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Fail on placeholder patterns instead of skipping them"
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Show more details including skipped examples and JSON previews"
    )

    args = parser.parse_args()

    # Validate schema path
    if not args.schema.exists():
        print(f"Error: Schema file not found: {args.schema}", file=sys.stderr)
        sys.exit(1)

    # Load schema
    try:
        schema, registry = load_schema(args.schema)
    except json.JSONDecodeError as e:
        print(f"Error: Failed to parse schema: {e}", file=sys.stderr)
        sys.exit(1)

    # Determine which files to validate
    if args.file:
        if not args.file.exists():
            print(f"Error: File not found: {args.file}", file=sys.stderr)
            sys.exit(1)
        md_files = [args.file]
    else:
        if not args.docs_dir.exists():
            print(f"Error: Docs directory not found: {args.docs_dir}", file=sys.stderr)
            sys.exit(1)
        md_files = sorted(args.docs_dir.glob("*.md"))

    if not md_files:
        print("No markdown files found to validate.", file=sys.stderr)
        sys.exit(1)

    # Extract and validate all JSON examples
    all_results = []

    for md_file in md_files:
        examples = extract_json_examples(md_file)
        for example in examples:
            result = validate_json_example(example, schema, registry, strict=args.strict)
            all_results.append(result)

    # Output results
    if args.output == "json":
        print(format_json_output(all_results))
    else:
        print(format_text_output(all_results, verbose=args.verbose))

    # Exit with appropriate code (only hard failures count, not warnings)
    failed = sum(1 for r in all_results if not r.valid and not r.warning)
    sys.exit(1 if failed > 0 else 0)


if __name__ == "__main__":
    main()
