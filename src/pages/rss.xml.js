import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE } from '../consts';

const parser = new MarkdownIt();

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
