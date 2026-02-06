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
                label: 'Pricing',
                to: 'https://www.civo.com/pricing',
              },
              {
                label: 'Case studies',
                to: 'https://www.civo.com/case-studies',
              },
              {
                label: 'Navigate Events',
                to: 'https://www.civo.com/navigate',
              },
              {
                label: 'White papers',
                to: 'https://www.civo.com/white-papers',
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
              {
                label: 'Tech Junction',
                to: 'https://www.civo.com/tech-junction',
              },
            ],
          },
          {
            title: 'Public Cloud',
            items: [
              {
                label: 'Kubernetes',
                to: 'https://www.civo.com/public-cloud/kubernetes',
              },
              {
                label: 'Compute',
                to: 'https://www.civo.com/public-cloud/compute',
              },
              {
                label: 'Databases',
                to: 'https://www.civo.com/databases',
              },
              {
                label: 'Load balancers',
                to: 'https://www.civo.com/load-balancers',
              },
              {
                label: 'Block storage',
                to: 'https://www.civo.com/features/block-storage',
              },
            ],
          },
          {
            title: 'Private Cloud',
            items: [
              {
                label: 'CivoStack Enterprise',
                to: 'https://www.civo.com/civostack-enterprise',
              },
              {
                label: 'FlexCore',
                to: 'https://www.civo.com/flexcore',
              },
              {
                label: 'VMware for service providers',
                to: 'https://www.civo.com/vmware-service-providers',
              },
              {
                label: 'VMware alternative',
                to: 'https://www.civo.com/vmware-alternative',
              },
              {
                label: 'VMware migration tool',
                to: 'https://www.civo.com/vmware-migration-tool',
              },
              {
                label: 'UK Sovereign Cloud',
                to: 'https://www.civo.com/uk-sovereign-cloud',
              },
              {
                label: 'India Sovereign Cloud',
                to: 'https://www.civo.com/india',
              },
            ],
          },
          {
            title: 'CivoAI',
            items: [
              {
                label: 'Cloud GPU',
                to: 'https://www.civo.com/ai/cloud-gpu',
              },
              {
                label: 'Kubernetes GPU',
                to: 'https://www.civo.com/ai/kubernetes',
              },
              {
                label: 'Compute GPU',
                to: 'https://www.civo.com/ai/compute',
              },
              {
                label: 'relaxAI',
                to: 'https://www.relax.ai/',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Ambassadors',
                to: 'https://www.civo.com/ambassadors',
              },
              {
                label: 'API documentation',
                to: 'https://www.civo.com/api',
              },
              {
                label: 'Blog',
                to: 'https://www.civo.com/blog',
              },
              {
                label: 'Civo Academy',
                to: 'https://www.civo.com/academy',
              },
              {
                label: 'Civo documentation',
                to: 'https://www.civo.com/docs',
              },
              {
                label: 'Civo GitHub repo',
                to: 'https://github.com/civo',
              },
              {
                label: 'Cloud native A to Z',
                to: 'https://www.civo.com/blog/kubernetes-and-cloud-native-az-guide',
              },
              {
                label: 'Civo Marketplace',
                to: 'https://www.civo.com/marketplace',
              },
              {
                label: 'Meetups',
                to: 'https://www.civo.com/meetups',
              },
              {
                label: 'Tutorials',
                to: 'https://www.civo.com/learn',
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
        copyright: `© Civo ${new Date().getFullYear()}. All rights reserved. | <a href="https://www.civo.com/legal" class="copyright-link">Legal</a> | <a href="https://www.civo.com/legal/terms" class="copyright-link">Terms & Conditions</a> | <a href="https://www.civo.com/legal/privacy" class="copyright-link">Privacy Policy</a> | <a href="https://www.civo.com/legal/cookie" class="copyright-link">Cookies</a> | <a href="https://www.civo.com/legal/data-processing-agreement" class="copyright-link">Data Processing Agreement</a>`,
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



