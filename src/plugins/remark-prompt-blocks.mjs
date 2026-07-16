import { visit } from 'unist-util-visit';

const PROMPT_LANG = 'prompt';

/**
 * Renders ```prompt fences as prompt blocks rather than source code.
 *
 * Shiki has no `prompt` grammar, so these fences fall back to plaintext: the
 * language is dropped from the output (leaving nothing to style against) and
 * the block still gets Shiki's hard-coded theme background, which ignores the
 * site palette. Handling the fence here keeps it out of Shiki entirely, so the
 * block can follow the page theme and wrap like the prose it is.
 */
export function remarkPromptBlocks() {
	return (tree) => {
		visit(tree, 'code', (node, index, parent) => {
			if (parent == null || index == null) return;
			if (node.lang !== PROMPT_LANG) return;

			parent.children[index] = {
				type: 'promptBlock',
				data: {
					hName: 'div',
					hProperties: { className: ['prompt-block'] },
				},
				children: [
					{
						type: 'promptLabel',
						data: {
							hName: 'p',
							hProperties: { className: ['prompt-label'] },
						},
						children: [{ type: 'text', value: 'Prompt' }],
					},
					{
						type: 'promptBody',
						data: {
							hName: 'pre',
							hProperties: { className: ['prompt-body'] },
						},
						// A text child keeps escaping in mdast-util-to-hast's hands, and
						// <pre> keeps the fence's own line breaks.
						children: [{ type: 'text', value: node.value }],
					},
				],
			};
		});
	};
}
