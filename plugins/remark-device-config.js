// @ts-check

/**
 * Remark plugin that injects device configuration data from device-config-v4 YAML
 * into STPIHKAL protocol documentation pages at build time.
 *
 * Reads `config_ref` and `config_identifier` from page frontmatter, loads the
 * corresponding YAML from data/device-config/, and injects a "Device Configuration"
 * section into the markdown AST.
 *
 * Phase 1: Skeleton only — logs when it encounters pages with config_ref.
 * Full implementation in Phase 2.
 */

const plugin = (options) => {
  return (ast, vfile) => {
    const frontmatter = vfile.data.frontmatter;
    if (!frontmatter || !frontmatter.config_ref) {
      return;
    }

    // Phase 1: skeleton — just log that we found a page with config_ref
    console.log(`[remark-device-config] Found config_ref: ${frontmatter.config_ref} in ${vfile.path}`);
  };
};

module.exports = plugin;
