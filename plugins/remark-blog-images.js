// @ts-check
/**
 * Remark plugin: wraps standalone blog images in <figure> elements
 * with optional <figcaption> from alt text.
 *
 * A "standalone image" is a paragraph that contains exactly one image node
 * and nothing else (no surrounding text).
 *
 * Emits mdxJsxFlowElement nodes so the MDX compiler (Docusaurus v3+) can
 * handle them correctly — raw `html` nodes are rejected by the MDX pipeline.
 */

const { visit, SKIP } = require("unist-util-visit");

/** @type {import('unified').Plugin} */
function remarkBlogImages() {
  return (tree) => {
    visit(tree, "paragraph", (node, index, parent) => {
      if (!parent || index == null) return;

      // Only handle paragraphs with exactly one child that is an image
      if (node.children.length !== 1 || node.children[0].type !== "image") {
        return;
      }

      const img = node.children[0];
      const { alt } = img;

      // Keep the original image node so Docusaurus's default remark plugins
      // can resolve the relative URL and handle asset imports normally.
      const figureChildren = [img];

      // <figcaption>alt text</figcaption> — only if alt is non-empty
      if (alt) {
        figureChildren.push({
          type: "mdxJsxFlowElement",
          name: "figcaption",
          attributes: [],
          children: [{ type: "text", value: alt }],
        });
      }

      // <figure>...</figure>
      const figureNode = {
        type: "mdxJsxFlowElement",
        name: "figure",
        attributes: [],
        children: figureChildren,
      };

      // Replace the paragraph node with the figure element
      parent.children.splice(index, 1, figureNode);

      return SKIP;
    });
  };
}

module.exports = remarkBlogImages;
