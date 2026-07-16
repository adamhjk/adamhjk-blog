// @ts-check

import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import astroD2 from 'astro-d2';
import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import { remarkCallouts } from './src/plugins/remark-callouts.mjs';
import { remarkPromptBlocks } from './src/plugins/remark-prompt-blocks.mjs';
import { remarkTableWrap } from './src/plugins/remark-table-wrap.mjs';

// remark-directive parses the `:::name` syntax; remarkCallouts turns the
// subset we care about into <aside> callouts. Order matters — the parser has
// to run first.
const extraRemarkPlugins = [
	remarkDirective,
	remarkCallouts,
	remarkTableWrap,
	remarkPromptBlocks,
];

// astro-d2 (through at least v0.11) registers its remark plugin via the
// deprecated top-level `markdown.remarkPlugins` option. Astro 6 warns about
// this and will remove it in a future major. Until astro-d2 migrates upstream,
// wrap the integration so its deprecated `updateConfig({ markdown: {
// remarkPlugins } })` call is translated into the supported
// `markdown.processor: unified({ remarkPlugins })` form. gfm/smartypants are
// left unset so they fall back to Astro's resolved defaults.
//
// `ownPlugins` are appended to that same processor. They have to travel through
// here rather than through a top-level `markdown.remarkPlugins`: once this
// wrapper sets `markdown.processor`, Astro ignores `markdown.remarkPlugins`
// entirely, so plugins configured that way would be dropped without warning.
function useProcessorApi(integration, ownPlugins = []) {
	const setup = integration.hooks['astro:config:setup'];
	if (!setup) return integration;
	return {
		...integration,
		hooks: {
			...integration.hooks,
			'astro:config:setup': async (options) => {
				let injected = false;
				await setup({
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
						injected = true;
						return options.updateConfig({
							...config,
							markdown: {
								...restMarkdown,
								processor: unified({
									remarkPlugins: [...(remarkPlugins ?? []), ...ownPlugins],
									rehypePlugins,
									remarkRehype,
								}),
							},
						});
					},
				});
				// This wrapper only gets a processor to piggyback on if the wrapped
				// integration actually took the deprecated path above. If that ever
				// stops happening, fail loudly rather than shipping a site whose
				// callouts silently render as stray `:::tip` text. `preview` only
				// serves an existing build, so nothing configures markdown there and
				// there is nothing to check.
				const rendersMarkdown =
					options.command === 'build' || options.command === 'dev';
				if (rendersMarkdown && ownPlugins.length > 0 && !injected) {
					throw new Error(
						`useProcessorApi: "${integration.name}" no longer configures markdown via the deprecated ` +
							'remarkPlugins option, so remark plugins passed to this wrapper were never applied. ' +
							'Move them to `markdown.processor: unified({ remarkPlugins })` in astro.config.mjs.',
					);
				}
			},
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
			extraRemarkPlugins,
		),
		mdx(),
		sitemap(),
	],
});
