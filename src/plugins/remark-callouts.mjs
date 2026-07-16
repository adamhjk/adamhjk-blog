import { visit } from 'unist-util-visit';

// Container directives (`:::tip`) that become callout asides. The value is the
// default label; `:::tip[Custom title]` overrides it per-use. Shared with the
// RSS feed, which renders the same syntax through markdown-it.
export const CALLOUTS = {
	note: 'Note',
	info: 'Info',
	tip: 'Tip',
	warning: 'Warning',
};

/** Replace a directive node with the literal source text it was parsed from. */
function restoreLiteralText(node, index, parent, source) {
	const { start, end } = node.position ?? {};
	if (start?.offset == null || end?.offset == null) return;
	parent.children[index] = {
		type: 'text',
		value: source.slice(start.offset, end.offset),
	};
}

/**
 * Turns `:::tip` / `:::info` / `:::note` / `:::warning` container directives
 * into styled `<aside>` callouts.
 *
 * remark-directive also claims the inline (`:name`) and leaf (`::name`) forms,
 * and it does so in the tokenizer — so ordinary prose like "11:30 PM" or a
 * "3:1" ratio parses as a directive and, with no handler, gets dropped from the
 * output entirely. Callouts only ever need the block-level `:::` form, so every
 * inline and leaf directive is restored to the literal text it came from. Only
 * container directives are treated as callouts.
 */
export function remarkCallouts() {
	return (tree, file) => {
		const source = String(file.value);

		visit(tree, (node, index, parent) => {
			if (parent == null || index == null) return;

			if (node.type === 'textDirective' || node.type === 'leafDirective') {
				restoreLiteralText(node, index, parent, source);
				return;
			}

			if (node.type !== 'containerDirective') return;

			const defaultLabel = CALLOUTS[node.name];
			if (!defaultLabel) {
				// Most likely a typo (`:::tipp`). Left as-is so the prose survives,
				// but flagged, since the rendered result is a silently unstyled block.
				console.warn(
					`[remark-callouts] Unknown directive ":::${node.name}" in ${file.path ?? 'markdown'} ` +
						`(line ${node.position?.start?.line ?? '?'}). Expected one of: ${Object.keys(CALLOUTS).join(', ')}.`,
				);
				return;
			}

			// `:::tip[Custom title]` parses the bracketed text as a paragraph child
			// tagged with directiveLabel. Pull it out of the body and use it as the
			// heading, otherwise fall back to the directive's default label.
			let labelChildren = [{ type: 'text', value: defaultLabel }];
			const body = [...node.children];
			if (body[0]?.data?.directiveLabel) {
				labelChildren = body.shift().children;
			}

			node.children = [
				{
					type: 'paragraph',
					data: {
						hName: 'p',
						hProperties: { className: ['callout-label'] },
					},
					children: labelChildren,
				},
				...body,
			];

			node.data = {
				...node.data,
				hName: 'aside',
				hProperties: {
					className: ['callout', `callout-${node.name}`],
					role: 'note',
				},
			};
		});
	};
}
