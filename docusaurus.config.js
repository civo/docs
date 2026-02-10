// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Civo Documentation',
  tagline: 'The Cloud Native Service Provider',
  url: 'https://www.civo.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'docusaurus/img/favicon.ico',
  trailingSlash: false,

  themes: [
    "docusaurus-theme-search-typesense",
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'content',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/civo/docs/tree/main/',
          showLastUpdateTime: true,
        },
        blog: false,
        googleTagManager: {
          containerId: process.env.GTAG_MANAGER_ID || "undefined",
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'Civo Logo',
          src: 'docusaurus/img/logo.svg',
          href: 'https://www.civo.com/'
        },
        items: [
          {
            to: 'https://github.com/civo/docs',
            position: 'right',
            className: 'navbar-github-link',
          },
        ],
      },
      footer: {},
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },


    typesense: {
      typesenseCollectionName: 'civo-docs',
      typesenseServerConfig: {
        nodes: [
          {
            host: 'typesense.konstruct.io',
            port: 443,
            protocol: 'https',
          },
        ],
        // readonly key, safe for source code and browsers
        apiKey: 'Q6vQFYOPwD6vSxcbeEqDY3gYE4ezPH1c',
      },
      contextualSearch: true,
    },
  }),
};




module.exports = config;



