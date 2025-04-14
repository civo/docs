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

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'content',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/civo/docs/tree/main/',
          showLastUpdateTime: true,
        },
        blog: false,
        googleTagManager: {
          containerId: process.env.GTAG_MANAGER_ID || 'undefined',
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
          href: 'https://www.civo.com/',
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
                label: 'Case studies',
                to: 'https://www.civo.com/case-studies',
              },
              {
                label: 'White papers',
                to: 'https://www.civo.com/white-papers',
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
                label: 'Brand assets',
                to: 'https://www.civo.com/brand-assets',
              },
              {
                label: 'Careers',
                to: 'https://careers.civo.com/',
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
            title: 'Solutions',
            items: [
              {
                label: 'Startup solutions',
                to: 'https://www.civo.com/startups',
              },
              {
                label: 'Small and mid-market',
                to: 'https://www.civo.com/small-mid-market',
              },
              {
                label: 'SaaS companies',
                to: 'https://www.civo.com/saas',
              },
              {
                label: 'CI/CD and testing',
                to: 'https://www.civo.com/ci-testing',
              },
              {
                label: 'Move to Kubernetes',
                to: 'https://www.civo.com/move-to-kubernetes',
              },
              {
                label: 'Consultancy',
                to: 'https://www.civo.com/kubernetes-consultancy',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Docs',
                to: 'https://www.civo.com/docs',
              },
              {
                label: 'Tutorials',
                to: 'https://www.civo.com/learn',
              },
              {
                label: 'API',
                to: 'https://www.civo.com/api',
              },
              {
                label: 'Academy',
                to: 'https://www.civo.com/academy',
              },
              {
                label: 'Developers',
                to: 'https://www.civo.com/developers',
              },
              {
                label: 'Meetups',
                to: 'https://www.civo.com/meetups',
              },
              {
                label: 'Blog',
                to: 'https://www.civo.com/blog',
              },
              {
                label: 'Ambassadors',
                to: 'https://www.civo.com/ambassadors',
              },
              {
                label: 'KubeQuest',
                to: 'https://www.civo.com/kubequest',
              },
              {
                label: 'Write for us',
                to: 'https://www.civo.com/write-for-us',
              },
              {
                label: 'Developer demo program',
                to: 'https://www.civo.com/demo-program',
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
      algolia: {
        appId: 'I038LYZI81',
        apiKey: '936b54a2e9acd8e2a6a60c0de9e713ad',
        indexName: 'civo',
        contextualSearch: true, // Show contextual search results
        searchParameters: {}, // Additional search parameters
      },
    }),
};

module.exports = config;
