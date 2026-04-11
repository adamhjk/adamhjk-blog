import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { marked } from 'marked';
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		customData: `<language>en-us</language><managingEditor>${SITE_AUTHOR}</managingEditor>`,
		items: await Promise.all(
			posts.map(async (post) => ({
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.pubDate,
				link: `/blog/${post.id}/`,
				content: post.body ? await marked.parse(post.body) : undefined,
			})),
		),
	});
}
