import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { CALLOUTS } from '../plugins/remark-callouts.mjs';

const parser = new MarkdownIt();

// The feed renders raw Markdown through markdown-it rather than Astro's remark
// pipeline, so it needs its own handler for `:::tip` — without one, the fences
// would reach subscribers as literal ":::tip" text. Callouts become blockquotes
// here: feeds carry no stylesheet, and sanitize-html strips the classes an
// <aside> would need anyway, whereas readers style blockquotes natively.
for (const [name, defaultLabel] of Object.entries(CALLOUTS)) {
	parser.use(container, name, {
		// The default validator splits on whitespace, which fails to match the
		// `:::tip[Custom title]` label form.
		validate: (params) => {
			const info = params.trim();
			return info === name || info.startsWith(`${name}[`);
		},
		render: (tokens, idx) => {
			const token = tokens[idx];
			if (token.nesting !== 1) return '</blockquote>\n';
			const label = token.info.trim().slice(name.length).replace(/^\[|\]$/g, '');
			return `<blockquote><p><strong>${parser.utils.escapeHtml(label || defaultLabel)}</strong></p>\n`;
		},
	});
}

export async function GET(context) {
	const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		customData: `<language>en-us</language><managingEditor>${SITE_AUTHOR}</managingEditor>`,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
			content: post.body
				? sanitizeHtml(parser.render(post.body), {
						allowedTags: sanitizeHtml.defaults.allowedTags.concat([
							'img',
							'iframe',
						]),
						allowedAttributes: {
							...sanitizeHtml.defaults.allowedAttributes,
							iframe: [
								'src',
								'width',
								'height',
								'title',
								'frameborder',
								'allow',
								'allowfullscreen',
								'referrerpolicy',
							],
						},
					})
				: undefined,
		})),
	});
}
