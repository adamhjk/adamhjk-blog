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
const kickerByCollection = {
	blog: 'Adam Jacob',
	gerald: "Gerald's Blog",
};
const authorLineByCollection = {
	blog: 'adamjacob.com',
	gerald: 'gerald on adamjacob.com',
};
const accentByCollection = {
	blog: '#1f6feb',
	gerald: '#6f8f4e',
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
	const titleLines = wrapText(entry.data.title, 24, 3);
	const descriptionLines = wrapText(entry.data.description, 52, 3);
	const pubDate = new Date(entry.data.pubDate).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC',
	});

	const titleSvg = titleLines
		.map((line, index) => `<tspan x="72" dy="${index === 0 ? 0 : 78}">${escapeXml(line)}</tspan>`)
		.join('');
	const descriptionSvg = descriptionLines
		.map((line, index) => `<tspan x="72" dy="${index === 0 ? 0 : 42}">${escapeXml(line)}</tspan>`)
		.join('');

	const svg = `
		<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="bg" x1="600" y1="0" x2="600" y2="630" gradientUnits="userSpaceOnUse">
					<stop stop-color="#F7F4EE"/>
					<stop offset="1" stop-color="#EFE6D6"/>
				</linearGradient>
			</defs>
			<rect width="1200" height="630" rx="30" fill="url(#bg)"/>
			<rect x="24" y="24" width="1152" height="582" rx="24" stroke="rgba(20,17,15,0.12)"/>
			<circle cx="94" cy="92" r="22" fill="${accentByCollection[collection]}"/>
			<text x="130" y="86" fill="#6C6257" font-size="22" font-family="Atkinson Hyperlegible, system-ui, sans-serif" font-weight="700" letter-spacing="3">${escapeXml(kickerByCollection[collection].toUpperCase())}</text>
			<text x="130" y="114" fill="#8A7F73" font-size="20" font-family="Atkinson Hyperlegible, system-ui, sans-serif">${escapeXml(authorLineByCollection[collection])}</text>
			<text x="72" y="210" fill="#14110F" font-size="68" font-family="Atkinson Hyperlegible, system-ui, sans-serif" font-weight="700" letter-spacing="-2">${titleSvg}</text>
			<text x="72" y="438" fill="#4A433B" font-size="30" font-family="Atkinson Hyperlegible, system-ui, sans-serif">${descriptionSvg}</text>
			<line x1="72" y1="552" x2="1128" y2="552" stroke="rgba(20,17,15,0.12)"/>
			<text x="72" y="586" fill="#6C6257" font-size="22" font-family="Atkinson Hyperlegible, system-ui, sans-serif">Lex Aedificandi, Lex Credendi</text>
			<text x="1128" y="586" text-anchor="end" fill="#6C6257" font-size="22" font-family="Atkinson Hyperlegible, system-ui, sans-serif">${escapeXml(pubDate)}</text>
		</svg>
	`;

	const avatar = await sharp(await fs.readFile(avatarByCollection[collection]))
		.resize(112, 112, { fit: 'cover' })
		.png()
		.toBuffer();

	const png = await sharp(Buffer.from(svg))
		.composite([
			{
				input: avatar,
				top: 36,
				left: 1052,
			},
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
