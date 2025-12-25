// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "buttplug.io",
  staticDirectories: ["examples", "static"],
  tagline: "Buttplug: Intimate Haptics Control Protocol and Library",
  url: "https://buttplug.io",
  baseUrl: "/",
  onBrokenAnchors: "warn",
  onBrokenLinks: "warn",
  favicon: "img/favicon.ico",

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
      },
    ],
    "docusaurus-plugin-matomo",
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
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
            docId: "dev-guide/v4/index",
            label: "Dev Guide v4",
            position: "left",
          },
          {
            type: "doc",
            docId: "spec/v4/index",
            label: "Protocol Spec v4",
            position: "left",
          },
          {
            type: "doc",
            docId: "stpihkal/index",
            label: "STPIHKAL (Device Protocols)",
            position: "left",
          },
          /*
          {
            href: '/',
            label: "Support",
            position: "left"
          },
          */
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
            title: "Docs",
            items: [
              {
                label: "Buttplug Developer Guide v4",
                to: "/docs/dev-guide/v4/",
              },
              {
                label: "Buttplug Protocol Spec v4",
                to: "/docs/spec/v4/",
              },
              {
                label: "STPIHKAL (Device Protocols)",
                to: "/docs/stpihkal/",
              },
            ],
          },
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
                label: "Reddit",
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
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Nonpolynomial. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["python", "csharp", "rust", "powershell"],
      },
      matomo: {
        matomoUrl: "https://nonpolynomial.matomo.cloud/",
        siteId: "9",
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
