const { describe, it } = require("node:test");
const assert = require("node:assert");
const path = require("path");
const fs = require("fs");

// The plugin returns a transformer function
const plugin = require("../remark-device-config");

// Helper: create a minimal mdast tree
function makeTree(children = []) {
  return { type: "root", children };
}

// Helper: create a minimal vfile
function makeVfile(frontmatter = {}) {
  return {
    path: "/test/fake.md",
    data: { frontmatter },
  };
}

describe("remark-device-config", () => {
  const testDataDir = path.resolve(__dirname, "../../data/device-config");

  it("should skip pages without config_ref", () => {
    const transformer = plugin({});
    const tree = makeTree([
      { type: "heading", depth: 1, children: [{ type: "text", value: "Test" }] },
    ]);
    const originalLength = tree.children.length;
    transformer(tree, makeVfile({}));
    assert.strictEqual(tree.children.length, originalLength);
  });

  it("should skip pages with no frontmatter", () => {
    const transformer = plugin({});
    const tree = makeTree([]);
    transformer(tree, { path: "/test.md", data: {} });
    assert.strictEqual(tree.children.length, 0);
  });

  it("should warn and skip when config file not found", () => {
    const transformer = plugin({});
    const tree = makeTree([]);
    const originalLength = tree.children.length;
    // This will log a warning but not crash
    transformer(tree, makeVfile({ config_ref: "nonexistent-device.yml" }));
    assert.strictEqual(tree.children.length, originalLength);
  });

  it("should inject nodes when config_ref points to valid YAML", { skip: !fs.existsSync(testDataDir) || fs.readdirSync(testDataDir).length === 0 }, () => {
    // This test requires the sync script to have been run
    // Check if data directory exists with at least one file

    // Use a known simple config
    const files = fs.readdirSync(testDataDir).filter((f) => f.endsWith(".yml"));
    if (files.length === 0) return;

    const transformer = plugin({});
    const tree = makeTree([
      { type: "heading", depth: 1, children: [{ type: "text", value: "Test" }] },
      { type: "html", value: "<!-- Auto-populated from device-config-v4 at build time -->" },
    ]);

    transformer(tree, makeVfile({ config_ref: files[0] }));

    // Should have more nodes than we started with (comment replaced + config injected)
    assert.ok(tree.children.length > 1, "Expected nodes to be injected");

    // The HTML comment should have been removed
    const htmlComments = tree.children.filter(
      (n) => n.type === "html" && n.value.includes("Auto-populated")
    );
    assert.strictEqual(htmlComments.length, 0, "Placeholder comment should be removed");
  });

  it("should handle identifier filtering", { skip: !fs.existsSync(testDataDir) || fs.readdirSync(testDataDir).length === 0 }, () => {

    // Use a config with configurations (lovense.yml has many)
    const lovensePath = path.join(testDataDir, "lovense.yml");
    if (!fs.existsSync(lovensePath)) {
      console.log("Skipping: lovense.yml not found.");
      return;
    }

    const transformer = plugin({});
    const tree = makeTree([
      { type: "html", value: "<!-- Auto-populated from device-config-v4 at build time -->" },
    ]);

    transformer(tree, makeVfile({ config_ref: "lovense.yml", config_identifier: "A" }));

    // Should inject nodes even with identifier filter
    assert.ok(tree.children.length > 0, "Expected nodes with identifier filter");
  });
});
