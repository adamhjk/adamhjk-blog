// @ts-check

import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import astroD2 from 'astro-d2';
import { defineConfig } from 'astro/config';

// astro-d2 (through at least v0.11) registers its remark plugin via the
// deprecated top-level `markdown.remarkPlugins` option. Astro 6 warns about
// this and will remove it in a future major. Until astro-d2 migrates upstream,
// wrap the integration so its deprecated `updateConfig({ markdown: {
// remarkPlugins } })` call is translated into the supported
// `markdown.processor: unified({ remarkPlugins })` form. gfm/smartypants are
// left unset so they fall back to Astro's resolved defaults.
function useProcessorApi(integration) {
	const setup = integration.hooks['astro:config:setup'];
	if (!setup) return integration;
	return {
		...integration,
		hooks: {
			...integration.hooks,
			'astro:config:setup': (options) =>
				setup({
					...options,
					updateConfig(config) {
						const markdown = config?.markdown;
						// Only rewrite the deprecated plugin options, and never clobber a
						// processor that's already been configured.
						if (
							!markdown ||
							markdown.processor ||
							!(
								markdown.remarkPlugins ||
								markdown.rehypePlugins ||
								markdown.remarkRehype
							)
						) {
							return options.updateConfig(config);
						}
						const {
							remarkPlugins,
							rehypePlugins,
							remarkRehype,
							...restMarkdown
						} = markdown;
						return options.updateConfig({
							...config,
							markdown: {
								...restMarkdown,
								processor: unified({
									remarkPlugins,
									rehypePlugins,
									remarkRehype,
								}),
							},
						});
					},
				}),
		},
	};
}

export default defineConfig({
	site: 'https://www.adamhjk.com',
	integrations: [
		useProcessorApi(
			astroD2({
				experimental: {
					useD2js: true,
				},
			}),
		),
		mdx(),
		sitemap(),
	],
});
