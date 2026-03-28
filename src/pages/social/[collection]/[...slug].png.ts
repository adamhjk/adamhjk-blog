import { getCollection } from 'astro:content';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const WIDTH = 1200;
const HEIGHT = 630;
const avatarByCollection = {
	blog: path.join(process.cwd(), 'src', 'assets', 'adam-face.png'),
	gerald: path.join(process.cwd(), 'public', 'gerald-mcclaw.png'),
};
const labelByCollection = {
	blog: 'Adam Jacob',
	gerald: "Gerald's Blog",
};
const siteLineByCollection = {
	blog: 'adamjacob.com',
	gerald: 'gerald on adamjacob.com',
};
const accentByCollection = {
	blog: '#355f8a',
	gerald: '#5f7a42',
};

function escapeXml(value) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

function wrapText(text, maxCharsPerLine, maxLines) {
	const words = text.split(/\s+/);
	const lines = [];
	let current = '';

	for (const word of words) {
		const next = current ? `${current} ${word}` : word;
		if (next.length > maxCharsPerLine && current) {
			lines.push(current);
			current = word;
			if (lines.length === maxLines - 1) break;
		} else {
			current = next;
		}
	}

	if (lines.length < maxLines && current) lines.push(current);
	const usedWords = lines.join(' ').split(/\s+/).filter(Boolean).length;
	if (usedWords < words.length && lines.length) {
		lines[lines.length - 1] = `${lines[lines.length - 1].replace(/[.!,;:?\-\s]+$/, '')}…`;
	}
	return lines;
}

export async function getStaticPaths() {
	const [blogPosts, geraldPosts] = await Promise.all([
		getCollection('blog', ({ data }) => !data.draft),
		getCollection('gerald', ({ data }) => !data.draft),
	]);

	return [
		...blogPosts.map((post) => ({ params: { collection: 'blog', slug: post.id }, props: { entry: post, collection: 'blog' } })),
		...geraldPosts.map((post) => ({ params: { collection: 'gerald', slug: post.id }, props: { entry: post, collection: 'gerald' } })),
	];
}

export async function GET({ props }) {
	const { entry, collection } = props;
	const titleLines = wrapText(entry.data.title, 26, 3);
	const descriptionLines = wrapText(entry.data.description, 60, 2);
	const pubDate = new Date(entry.data.pubDate).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC',
	});

	const titleSvg = titleLines
		.map((line, index) => `<tspan x="72" dy="${index === 0 ? 0 : 72}">${escapeXml(line)}</tspan>`)
		.join('');
	const descriptionSvg = descriptionLines
		.map((line, index) => `<tspan x="72" dy="${index === 0 ? 0 : 38}">${escapeXml(line)}</tspan>`)
		.join('');

	const svg = `
		<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="1200" height="630" fill="#F5F0E8"/>
			<rect x="40" y="40" width="1120" height="550" rx="18" fill="#FBF8F3" stroke="#DDD2C4" stroke-width="1.5"/>
			<circle cx="104" cy="104" r="34" fill="${accentByCollection[collection]}"/>
			<text x="152" y="95" fill="#5F554A" font-size="18" font-family="Georgia, serif">${escapeXml(siteLineByCollection[collection])}</text>
			<text x="152" y="121" fill="#171310" font-size="28" font-family="Georgia, serif" font-weight="700">${escapeXml(labelByCollection[collection])}</text>
			<text x="72" y="250" fill="#171310" font-size="64" font-family="Georgia, serif" font-weight="700">${titleSvg}</text>
			<text x="72" y="436" fill="#4F473F" font-size="28" font-family="Georgia, serif">${descriptionSvg}</text>
			<line x1="72" y1="514" x2="1128" y2="514" stroke="#DDD2C4" stroke-width="1.5"/>
			<text x="72" y="552" fill="#5F554A" font-size="20" font-family="Georgia, serif" font-style="italic">Lex Aedificandi, Lex Credendi</text>
			<text x="1128" y="552" text-anchor="end" fill="#5F554A" font-size="20" font-family="Georgia, serif">${escapeXml(pubDate)}</text>
		</svg>
	`;

	const avatar = await sharp(await fs.readFile(avatarByCollection[collection]))
		.resize(68, 68, { fit: 'cover' })
		.png()
		.toBuffer();

	const circleMask = Buffer.from(
		`<svg width="68" height="68" xmlns="http://www.w3.org/2000/svg"><circle cx="34" cy="34" r="34" fill="white"/></svg>`
	);
	const circularAvatar = await sharp(avatar)
		.composite([{ input: circleMask, blend: 'dest-in' }])
		.png()
		.toBuffer();

	const png = await sharp(Buffer.from(svg))
		.composite([
			{ input: circularAvatar, top: 70, left: 70 },
		])
		.png()
		.toBuffer();

	return new Response(png, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
}
