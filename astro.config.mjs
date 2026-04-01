// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import astroD2 from 'astro-d2';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://www.adamhjk.com',
	integrations: [
		astroD2({
			experimental: {
				useD2js: true,
			},
		}),
		mdx(),
		sitemap(),
	],
});
