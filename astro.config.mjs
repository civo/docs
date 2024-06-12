import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: ' https://fafa-188-28-217-37.ngrok-free.app',
	trailingSlash: 'never',
	integrations: [
		starlight({
			title: 'Civo Docs',
			favicon: './src/assets/favicon.ico',
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: true,
			},
			customCss: [
				// Fontsource files for to regular and semi-bold font weights.
				'@fontsource-variable/inter/index.css',
				'./src/styles/custom.css',
			  ],
			editLink: {
				baseUrl: 'https://github.com/civo/docs/edit/main/docs/',
			}, 
			social: {
				github: 'https://github.com/civo/docs',
				twitter: 'https://twitter.com/civocloud',
				linkedin: 'https://www.linkedin.com/company/civocloud',
				facebook: 'https://www.facebook.com/civocloud',
				instagram: 'https://www.instagram.com/civocloud',
			},
			sidebar: [
				{
					label: 'Overview',
					autogenerate: { directory: 'overview' },
					collapsed: true,
				},
				{
					label: 'Account',
					autogenerate: { directory: 'account' },
					collapsed: true,
				},
				{
					label: 'Compute',
					autogenerate: { directory: 'compute' },
					collapsed: true,
				},
				{
					label: 'Database',
					autogenerate: { directory: 'database' },
					collapsed: true,
				},
				{
					label: 'Kubernetes',
					autogenerate: { directory: 'kubernetes' },
					collapsed: true,
				},
				{
					label: 'Machine Learning',
					autogenerate: { directory: 'machine-learning' },
					collapsed: true,
				},
				{
					label: 'Networking',
					autogenerate: { directory: 'networking' },
					collapsed: true,
				},
				{
					label: 'Object Stores',
					autogenerate: { directory: 'object-stores' },
					collapsed: true,
				},
				{
					label: 'FAQs',
					autogenerate: { directory: 'faq' },
					collapsed: true,
				},
				{ label: 'Civo API documentation', link: 'https://www.civo.com/api' },
			],
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en', // lang is required for root locales
				},
			},
			head: [
				{
					tag: "meta",
					attrs: {property: "og:image", content: "/cover.png"}
				},
				{
					tag: "script",
					attrs: {type: "application/ld+json"},
					content: `{ "@context": "https://schema.org", "@type": "Organization", "name": "Civo", "url": "https://www.civo.com/", "logo": "https://www.civo.com/images/civo-structured-data-logo.png", "address": { "@type": "PostalAddress", "streetAddress": "Units H, J & K, Gateway 1000, Whittle way", "addressLocality": "Stevenage", "postalCode": "SG1 2FP", "addressCountry": "GB" }, "sameAs": [ "https://www.linkedin.com/company/civo-cloud", "https://x.com/civocloud", "https://www.youtube.com/civocloud", "https://www.facebook.com/civocloud" ]}`
				}
			]
		}),
	],
});
