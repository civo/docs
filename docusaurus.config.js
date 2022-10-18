// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const allDocHomesPaths = [
  '/docs/',
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Civo Documentation',
  tagline: 'The Cloud Native Service Provider',
  url: 'https://3439bd42-d622-41f7-8c82-85b142d2a30d.lb.civo.com',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'civo', // Usually your GitHub org/user name.
  // projectName: 'documentation', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      'client-redirects',
      /** @type {import('@docusaurus/plugin-client-redirects').Options} */
      ({
        fromExtensions: ['html'],
        createRedirects(routePath) {
          // Redirect to /docs from /docs/introduction, as introduction has been
          // made the home doc
          if (allDocHomesPaths.includes(routePath)) {
            return [`${routePath}/intro`];
          }
          return [];
        }
      }),
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://git.civo.com/documentation/docusaurus-poc/-/tree/master/',
        },
        blog: false,
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
          src: 'img/logo.svg',
        },
        items: [
          {
            to: 'https://github.com/civo/docs',
            position: 'right',
            className: 'navbar-github-link',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Company',
            items: [
              {
                label: 'About',
                to: 'https://www.civo.com/about',
              },
              {
                label: 'Partners',
                to: 'https://www.civo.com/partners',
              },
              {
                label: 'Legal',
                to: 'https://www.civo.com/legal',
              },
              {
                label: 'Newsroom',
                to: 'https://www.civo.com/newsroom',
              },
              {
                label: 'Careers',
                to: 'https://www.civo.com/careers',
              },
            ],
          },
          {
            title: 'Products',
            items: [
              {
                label: 'Kubernetes',
                to: 'https://www.civo.com/kubernetes',
              },
              {
                label: 'Compute',
                to: 'https://www.civo.com/compute',
              },
              {
                label: 'Pricing',
                to: 'https://www.civo.com/pricing',
              },
              {
                label: 'Load balancers',
                to: 'https://www.civo.com/load-balancers',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Academy',
                to: 'https://www.civo.com/academy',
              },
              {
                label: 'API',
                to: 'https://www.civo.com/api',
              },
              {
                label: 'Tutorials',
                to: 'https://www.civo.com/learn',
              },
              {
                label: 'Blog',
                to: 'https://www.civo.com/blog',
              },
            ],
          },
          {
            title: 'Contact',
            items: [
              {
                label: 'Support',
                to: 'https://www.civo.com/contact',
              },
              {
                label: 'Sales',
                to: 'https://www.civo.com/sales',
              },
              {
                label: 'Status',
                to: 'https://status.civo.com',
              },
            ],
          },
          {
            title: 'Socials',
            items: [
              {
                label: 'LinkedIn',
                to: 'https://il.linkedin.com/company/civocloud',
              },
              {
                label: 'Facebook',
                to: 'https://www.facebook.com/civocloud',
              },
              {
                label: 'Twitter',
                to: 'https://twitter.com/CivoCloud',
              },
              {
                label: 'GitHub',
                to: 'https://github.com/civo',
              },
            ],
          },
        ],
        copyright: `© Civo ${new Date().getFullYear()}. All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
    }),
};

module.exports = config;
