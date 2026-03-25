import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const entrySchema = ({ image }) =>
	z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.optional(image()),
	});

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: entrySchema,
});

const gerald = defineCollection({
	loader: glob({ base: './src/content/gerald', pattern: '**/*.{md,mdx}' }),
	schema: entrySchema,
});

export const collections = { blog, gerald };
