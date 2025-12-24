const blogPluginExports = require("@docusaurus/plugin-content-blog");

const defaultBlogPlugin = blogPluginExports.default;

async function blogPluginExtended(...pluginArgs) {
  const blogPluginInstance = await defaultBlogPlugin(...pluginArgs);

  const pluginOptions = pluginArgs[1];

  return {
    // Add all properties of the default blog plugin so existing functionality is preserved
    ...blogPluginInstance,
    /**
     * Override the default `contentLoaded` hook to access blog posts data
     */
    contentLoaded: async function (params) {
      const { content, actions } = params;

      // Get the 5 latest blog posts
      const recentPostsLimit = 5;
      const recentPosts = [...content.blogPosts].splice(0, recentPostsLimit);

      async function createRecentPostModule(blogPost, index) {
        return {
          // Inject the metadata you need for each recent blog post
          metadata: {
            title: blogPost.metadata.title,
            description: blogPost.metadata.description,
            date: blogPost.metadata.date,
            permalink: blogPost.metadata.permalink,
            frontMatter: blogPost.metadata.frontMatter,
          },
        };
      }

      actions.setGlobalData({
        default: {
          homePageBlogMetadata: {
            blogTitle: pluginOptions.blogTitle,
            blogDescription: pluginOptions.blogDescription,
            totalPosts: content.blogPosts.length,
            totalRecentPosts: recentPosts.length,
          },
          recentPosts: await Promise.all(
            recentPosts.map(createRecentPostModule),
          ),
        },
      });

      // Call the default overridden `contentLoaded` implementation
      return blogPluginInstance.contentLoaded(params);
    },
  };
}

module.exports = {
  ...blogPluginExports,
  default: blogPluginExtended,
};
