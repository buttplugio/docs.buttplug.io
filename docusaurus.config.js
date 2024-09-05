// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'buttplug.io',
  staticDirectories: ['examples', 'static'],
  tagline: 'Intimate Haptics Control Standard and Library',
  url: 'https://buttplug.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'Nonpolynomial Labs, LLC', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    'docusaurus-plugin-matomo',
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Meta image for twitter card
      image: 'img/logo.png',
      navbar: {
        title: 'BUTTPLUG.IO',
        logo: {
          alt: 'Buttplug.io Logo',
          src: 'img/logo.png',
        },
        items: [
          /*
          {
            href: '/',
            label: "Apps & Games",
            position: "left"
          },
          */
          {
            type: "doc",
            docId: "dev-guide/index",
            label: "Dev Guide",
            position: "left"
          },
          {
            type: "doc",
            docId: "spec/index",
            label: "Protocol Spec",
            position: "left"
          },
          {
            type: "doc",
            docId: "stpihkal/index",
            label: "Device Protocols",
            position: "left"
          },
          /*
          {
            href: '/',
            label: "Support",
            position: "left"
          },
          */
          {
            href: 'https://patreon.com/qdot',
            label: 'Patreon',
            position: 'right',
          },
          {
            href: 'https://github.com/buttplugio/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Buttplug Developer Guide',
                to: 'https://docs.buttplug.io/docs/dev-guide/',
              },
              {
                label: 'Buttplug Protocol Spec',
                to: 'https://docs.buttplug.io/docs/spec/',
              },
              {
                label: 'Sex Toy Protocols I Have Known And Loved',
                to: 'https://docs.buttplug.io/docs/stpihkal/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discourse Forum',
                href: 'https://discuss.buttplug.io',
              },
              {
                label: 'Discord',
                href: 'https://discord.buttplug.io',
              },
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/buttplugio',
              },
              {
                label: 'Mastodon',
                href: 'https://buttplug.zone/@buttplugio',
              },
              {
                label: 'Bluesky',
                href: 'https://bsky.app/profile/buttplug.io',
              },
            ],
          },          
          {
            title: 'More',
            items: [
              {
                label: 'Nonpolynomial Blog',
                to: 'https://nonpolynomial.com/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/buttplugio',
              },
              {
                label: 'Youtube',
                href: 'https://youtube.buttplug.io',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Nonpolynomial. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['python', 'csharp', 'rust', 'powershell'],
      },
      matomo: {
        matomoUrl: 'https://nonpolynomial.matomo.cloud/',
        siteId: '9',
        phpLoader: 'matomo.php',
        jsLoader: 'matomo.js',
      },
    }),
};

module.exports = config;
