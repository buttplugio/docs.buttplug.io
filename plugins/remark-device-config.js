// @ts-check

/**
 * Remark plugin that injects device configuration data from device-config-v4 YAML
 * into STPIHKAL protocol documentation pages at build time.
 *
 * Reads `config_ref` and `config_identifier` from frontmatter:
 * - config_ref: filename in data/device-config/ (e.g., "svakom.yml")
 * - config_identifier: null (show all configs) or specific identifier string
 *
 * Injects a "Device Configuration" section with:
 * - BLE names and advertised services
 * - Service/characteristic map
 * - Device features (vibrate/rotate/oscillate with value ranges)
 * - Per-device configuration table
 * - Raw YAML code block for machine parsing
 */

const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const plugin = (options) => {
  const dataDir = path.resolve(__dirname, "..", "data", "device-config");

  return (ast, vfile) => {
    const frontmatter = vfile.data.frontmatter;
    if (!frontmatter || !frontmatter.config_ref) {
      return;
    }

    const configPath = path.join(dataDir, frontmatter.config_ref);
    if (!fs.existsSync(configPath)) {
      console.warn(
        `[remark-device-config] Config file not found: ${configPath} (referenced by ${vfile.path})`
      );
      return;
    }

    let config;
    try {
      config = yaml.load(fs.readFileSync(configPath, "utf8"));
    } catch (err) {
      console.warn(
        `[remark-device-config] Failed to parse ${configPath}: ${err.message}`
      );
      return;
    }

    const identifier = frontmatter.config_identifier || null;
    const nodes = buildDeviceConfigNodes(config, identifier);

    // Find the "Device Configuration" HTML comment placeholder or append after BLE Profile
    const insertIndex = findInsertionPoint(ast);
    ast.children.splice(insertIndex, 0, ...nodes);
  };
};

/**
 * Find where to insert the device config section.
 * Looks for an HTML comment <!-- Auto-populated from device-config-v4 at build time -->
 * or a heading containing "Device Configuration".
 * Falls back to end of document.
 */
function findInsertionPoint(ast) {
  for (let i = 0; i < ast.children.length; i++) {
    const node = ast.children[i];
    // Look for the placeholder comment
    if (node.type === "html" && node.value.includes("Auto-populated from device-config-v4")) {
      // Remove the comment and insert at its position
      ast.children.splice(i, 1);
      return i;
    }
    // Look for an empty "Device Configuration" heading
    if (
      node.type === "heading" &&
      node.children &&
      node.children.some(
        (c) => c.type === "text" && c.value === "Device Configuration"
      )
    ) {
      // Insert after this heading
      return i + 1;
    }
  }
  // Fallback: append at end
  return ast.children.length;
}

/**
 * Build mdast nodes for the device configuration section.
 */
function buildDeviceConfigNodes(config, identifier) {
  const nodes = [];
  const comm = config.communication && config.communication[0];
  const btle = comm && comm.btle;

  if (!btle) {
    nodes.push(paragraph("No BLE configuration data available."));
    return nodes;
  }

  // BLE Names
  if (btle.names && btle.names.length > 0) {
    nodes.push(heading(3, "BLE Names"));
    nodes.push(
      paragraph(btle.names.map((n) => inlineCode(n)).join(", "))
    );
  }

  // Advertised Services
  if (btle.advertised_services && btle.advertised_services.length > 0) {
    nodes.push(heading(3, "Advertised Services"));
    nodes.push(list(btle.advertised_services.map((s) => inlineCode(s))));
  }

  // Service/Characteristic Map
  if (btle.services) {
    nodes.push(heading(3, "Service & Characteristic Map"));
    const serviceEntries = Object.entries(btle.services);
    for (const [serviceUuid, chars] of serviceEntries) {
      nodes.push({
        type: "heading",
        depth: 4,
        children: [
          { type: "text", value: "Service " },
          { type: "inlineCode", value: serviceUuid },
        ],
      });
      const rows = Object.entries(chars).map(([role, charUuid]) => [
        role,
        charUuid,
      ]);
      nodes.push(
        table(["Role", "Characteristic UUID"], rows)
      );
    }
  }

  // Device Features (from defaults or filtered config)
  const features = getFeatures(config, identifier);
  if (features && features.length > 0) {
    nodes.push(heading(3, "Device Features"));
    const featureRows = [];
    for (const feat of features) {
      if (feat.output) {
        for (const [type, spec] of Object.entries(feat.output)) {
          const range = spec.value ? `${spec.value[0]}–${spec.value[1]}` : "N/A";
          featureRows.push([
            feat.description || `Feature ${feat.index}`,
            type,
            range,
          ]);
        }
      }
      if (feat.input) {
        for (const [type, spec] of Object.entries(feat.input)) {
          const range =
            spec.value && spec.value[0]
              ? `${spec.value[0][0]}–${spec.value[0][1]}`
              : "N/A";
          featureRows.push([
            feat.description || `Feature ${feat.index}`,
            `${type} (input)`,
            range,
          ]);
        }
      }
    }
    nodes.push(table(["Feature", "Type", "Value Range"], featureRows));
  }

  // Per-device configurations table
  if (config.configurations && config.configurations.length > 0) {
    const configs = identifier
      ? config.configurations.filter((c) => {
          const ids = Array.isArray(c.identifier)
            ? c.identifier
            : [c.identifier];
          return ids.includes(identifier);
        })
      : config.configurations;

    if (configs.length > 0) {
      nodes.push(heading(3, "Device Configurations"));
      const configRows = configs.map((c) => {
        const ids = Array.isArray(c.identifier)
          ? c.identifier.join(", ")
          : c.identifier || "";
        const featureTypes = (c.features || config.defaults.features || [])
          .filter((f) => f.output)
          .flatMap((f) => Object.keys(f.output))
          .join(", ");
        return [c.name || "", ids, featureTypes || "default"];
      });
      nodes.push(
        table(["Device", "Identifier", "Features"], configRows)
      );
    }
  }

  // Raw YAML code block for machine parsing
  nodes.push(heading(3, "Raw Configuration"));
  nodes.push(
    paragraph("Machine-readable device configuration data:")
  );
  const yamlContent = identifier
    ? yaml.dump(filterConfigByIdentifier(config, identifier))
    : yaml.dump(config);
  nodes.push(codeBlock("yaml", yamlContent));

  return nodes;
}

/**
 * Get features for a specific identifier or defaults.
 */
function getFeatures(config, identifier) {
  if (identifier && config.configurations) {
    const match = config.configurations.find((c) => {
      const ids = Array.isArray(c.identifier)
        ? c.identifier
        : [c.identifier];
      return ids.includes(identifier);
    });
    if (match && match.features) {
      return match.features;
    }
  }
  return config.defaults && config.defaults.features
    ? config.defaults.features
    : [];
}

/**
 * Filter config to a specific identifier for YAML dump.
 */
function filterConfigByIdentifier(config, identifier) {
  const filtered = { ...config };
  if (config.configurations) {
    filtered.configurations = config.configurations.filter((c) => {
      const ids = Array.isArray(c.identifier)
        ? c.identifier
        : [c.identifier];
      return ids.includes(identifier);
    });
  }
  return filtered;
}

// --- mdast node constructors ---

function heading(depth, textOrInline) {
  if (typeof textOrInline === "string") {
    return { type: "heading", depth, children: [{ type: "text", value: textOrInline }] };
  }
  // Already an inline node (from inlineCode)
  return { type: "heading", depth, children: [textOrInline] };
}

function paragraph(textOrInline) {
  if (typeof textOrInline === "string") {
    return { type: "paragraph", children: [{ type: "text", value: textOrInline }] };
  }
  // Could be a string with inline nodes already embedded — treat as raw text
  return { type: "paragraph", children: [{ type: "text", value: String(textOrInline) }] };
}

function inlineCode(value) {
  return { type: "inlineCode", value: String(value) };
}

function list(items) {
  return {
    type: "list",
    ordered: false,
    children: items.map((item) => ({
      type: "listItem",
      children: [
        {
          type: "paragraph",
          children: [typeof item === "string" ? { type: "text", value: item } : item],
        },
      ],
    })),
  };
}

function table(headers, rows) {
  const headerRow = {
    type: "tableRow",
    children: headers.map((h) => ({
      type: "tableCell",
      children: [{ type: "text", value: h }],
    })),
  };
  const dataRows = rows.map((row) => ({
    type: "tableRow",
    children: row.map((cell) => ({
      type: "tableCell",
      children: [{ type: "text", value: String(cell) }],
    })),
  }));
  return {
    type: "table",
    align: headers.map(() => null),
    children: [headerRow, ...dataRows],
  };
}

function codeBlock(lang, value) {
  return { type: "code", lang, value: value.trimEnd() };
}

module.exports = plugin;
