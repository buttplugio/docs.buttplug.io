// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
const remarkDeviceConfig = require("./plugins/remark-device-config");

/** @type {import('@docusaurus/types').Config} */
const config = {
  headTags: [
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' } },
    { tagName: 'link', attributes: {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap',
    }},
  ],
  title: "buttplug.io",
  staticDirectories: ["examples", "static"],
  tagline: "Buttplug: Intimate Haptics Control Protocol and Library",
  url: "https://buttplug.io",
  baseUrl: "/",
  onBrokenAnchors: "warn",
  onBrokenLinks: "warn",
  favicon: "img/logo.png",
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'Nonpolynomial Labs, LLC', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          path: "docs",
          // Uncomment this block to slam to v4 when done.
          lastVersion: "current",
          versions: {
            current: { label: "Spec v4.0" },
            "spec-v3": { label: "Spec v3.0" },
          },
        },
        /*
        blog: {
          blogTitle: 'Buttplug.io Dev Blog',
          blogDescription: 'Mistakes as long reads',
          postsPerPage: 10,
        }, */
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    // Use custom blog plugin
    [
      "./custom-blog-plugin",
      {
        id: "blog",
        routeBasePath: "blog",
        path: "./blog",
        blogTitle: "Buttplug.io Dev Blog",
        blogDescription: "Mistakes as long reads",
        postsPerPage: 10,
        blogSidebarCount: "ALL",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "stpihkal",
        path: "stpihkal",
        routeBasePath: "stpihkal",
        sidebarPath: "./sidebarsStpihkal.js",
        beforeDefaultRemarkPlugins: [
          remarkDeviceConfig,
        ],
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        createRedirects(existingPath) {
          // Redirect old /docs/stpihkal/... paths to /stpihkal/...
          if (existingPath.startsWith("/stpihkal")) {
            return ["/docs" + existingPath];
          }
          return undefined;
        },
        redirects: [
          // Migrated protocol pages: old flat URL → new brand directory URL
          { from: "/stpihkal/protocols/lovense", to: "/stpihkal/protocols/lovense/lovense" },
          { from: "/stpihkal/protocols/wevibe", to: "/stpihkal/protocols/we-vibe/we-vibe" },
          { from: "/stpihkal/protocols/prettylove", to: "/stpihkal/protocols/prettylove/prettylove" },
          { from: "/stpihkal/protocols/bkk", to: "/stpihkal/protocols/bkk/bkk" },
          { from: "/stpihkal/protocols/erostek-et232", to: "/stpihkal/protocols/erostek/erostek-et232" },
          { from: "/stpihkal/protocols/erostek-et312b", to: "/stpihkal/protocols/erostek/erostek-et312b" },
          { from: "/stpihkal/protocols/estim-systems-2b", to: "/stpihkal/protocols/estim-systems/estim-systems-2b" },
          { from: "/stpihkal/protocols/f-machine", to: "/stpihkal/protocols/f-machine/f-machine" },
          { from: "/stpihkal/protocols/fleshlight-launch", to: "/stpihkal/protocols/fleshlight/fleshlight-launch" },
          { from: "/stpihkal/protocols/imtoy", to: "/stpihkal/protocols/imtoy/imtoy" },
          { from: "/stpihkal/protocols/kiiroo-bootloader", to: "/stpihkal/protocols/kiiroo/kiiroo-bootloader" },
          { from: "/stpihkal/protocols/kiiroo-onyx-2", to: "/stpihkal/protocols/kiiroo/kiiroo-onyx-2" },
          { from: "/stpihkal/protocols/kiiroo-onyx-pearl-1", to: "/stpihkal/protocols/kiiroo/kiiroo-onyx-pearl-1" },
          { from: "/stpihkal/protocols/mysteryvibe", to: "/stpihkal/protocols/mysteryvibe/mysteryvibe" },
          { from: "/stpihkal/protocols/nobra", to: "/stpihkal/protocols/nobra/nobra" },
          { from: "/stpihkal/protocols/oriori-ball", to: "/stpihkal/protocols/oriori/oriori-ball" },
          { from: "/stpihkal/protocols/possible_kiss", to: "/stpihkal/protocols/possible-kiss/possible-kiss" },
          { from: "/stpihkal/protocols/petrainer", to: "/stpihkal/protocols/petrainer/petrainer" },
          { from: "/stpihkal/protocols/petroom", to: "/stpihkal/protocols/petroom/petroom" },
          { from: "/stpihkal/protocols/sportdog-sd400", to: "/stpihkal/protocols/sportdog/sportdog-sd400" },
          { from: "/stpihkal/protocols/tcode", to: "/stpihkal/protocols/tcode/tcode" },
          { from: "/stpihkal/protocols/vibratissimo", to: "/stpihkal/protocols/vibratissimo/vibratissimo" },
          { from: "/stpihkal/protocols/vorze-sa", to: "/stpihkal/protocols/vorze/vorze-sa" },
        ],
      },
    ],
    "docusaurus-plugin-matomo",
    [
      'docusaurus-plugin-llms',
      {
        logLevel: 'verbose',
        // Options here
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        docsDir: 'docs',
        title: 'Buttplug',
        description: 'Spec and developer guide for Buttplug.io',
        includeBlog: false,
        ignoreFiles: [
          'device-configurations.md',
          'modding.md',
        ],
        // Content cleaning options
        excludeImports: true,
        // Generate individual markdown files following llmstxt.org specification
        generateMarkdownFiles: true,
        // Control documentation order
        includeOrder: [
          'spec/*',
          'dev-guide/*',
          'dev-guide/intro/*',
          'dev-guide/architecture/*',
          'dev-guide/writing-buttplug-applications/*',
          'dev-guide/cookbook/*',
          'dev-guide/inflating-buttplug/*',
          'dev-guide/appendices/*',
        ],
        includeUnmatchedLast: true,
        // Custom LLM files for specific documentation sections
        customLLMFiles: [
          {
            filename: 'llms-spec.txt',
            includePatterns: ['spec/**/*.md'],
            fullContent: true,
            title: 'Buttplug API Spec',
            description: 'Complete reference for Buttplug API'
          },
          {
            filename: 'llms-dev-guide.txt',
            includePatterns: ['dev-guide/**/*.md'],
            fullContent: true,
            title: 'Buttplug Developer Guide',
            description: 'Developer Guide with tutorials for multiple languages'
          }
        ],
      },
    ]
  ],
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  themes: ["@docusaurus/theme-mermaid"],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Respect OS light/dark preference; user can still toggle manually
      colorMode: {
        respectPrefersColorScheme: true,
      },
      // Meta image for twitter card
      image: "img/logo.png",
      navbar: {
        title: "BUTTPLUG.IO",
        logo: {
          alt: "Buttplug.io Logo",
          src: "img/logo.png",
        },
        items: [
          {
            to: "blog",
            label: "Blog",
            position: "left",
          },
          {
            type: "doc",
            docId: "dev-guide/index",
            label: "Dev Guide",
            position: "left",
          },
          {
            type: "doc",
            docId: "spec/index",
            label: "Protocol Spec",
            position: "left",
          },
          {
            type: "doc",
            docId: "index",
            docsPluginId: "stpihkal",
            label: "STPIHKAL (Device Protocols)",
            position: "left",
          },
          {
            type: "docsVersionDropdown",
            position: "left",
            //dropdownItemsAfter: [{ to: "/versions", label: "All versions" }],
            //dropdownActiveClassDisabled: true,
          },
          /*
          {
            href: '/',
            label: "Support",
            position: "left"
          },
          */
          {
            href: "https://awesome.buttplug.io/",
            label: "Apps & Games List",
            position: "right",
          },
          {
            href: "https://intiface.com/",
            label: "Intiface",
            position: "right",
          },
          {
            href: "https://patreon.com/qdot",
            label: "Patreon",
            position: "right",
          },
          {
            href: "https://github.com/buttplugio/",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Discourse Forum",
                href: "https://discuss.buttplug.io",
              },
              {
                label: "Discord",
                href: "https://discord.buttplug.io",
              },
              {
                label: "Reddit (r/buttplugio)",
                href: "https://reddit.com/r/buttplugio",
              },
            ],
          },
          {
            title: "Social",
            items: [
              {
                label: "Bluesky",
                href: "https://bsky.app/profile/buttplug.io",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/buttplugio",
              },
              {
                label: "Mastodon",
                href: "https://buttplug.zone/@buttplugio",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Intiface Applications",
                href: "https://intiface.com",
              },
              {
                label: "Supported Apps & Games List",
                href: "https://awesome.buttplug.io",
              },
              {
                label: "GitHub",
                href: "https://github.com/buttplugio",
              },
              {
                label: "Youtube",
                href: "https://youtube.buttplug.io",
              },
              {
                label: "Tiktok",
                href: "https://tiktok.com/@buttplugio",
              },
            ],
          },
          {
            title: "Friends",
            items: [
              {
                label: "Xtoys",
                href: "https://xtoys.com",
              },
              {
                label: "Kinky Makers",
                href: "https://kinkymakers.com",
              },
              {
                label: "TempestVR",
                href: "https://patreon.com/tempestvr",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Nonpolynomial Labs, LLC. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["python", "csharp", "rust", "powershell"],
      },
      matomo: {
        matomoUrl: "https://nonpolynomial.matomo.cloud/",
        siteId: "2",
        phpLoader: "matomo.php",
        jsLoader: "matomo.js",
      },
    }),
  future: {
    experimental_faster: true,
    v4: true,
  },
};

module.exports = config;
