import { visit } from 'unist-util-visit';

/**
 * Wraps every Markdown table in a `<div class="table-wrap">` so wide tables can
 * scroll on their own instead of forcing the whole article to scroll sideways.
 * Markdown emits a bare <table>, so there is otherwise no element to hang the
 * overflow container on.
 */
export function remarkTableWrap() {
	return (tree) => {
		const wrapped = new WeakSet();

		visit(tree, 'table', (node, index, parent) => {
			if (parent == null || index == null || wrapped.has(node)) return;
			// The traversal descends into the wrapper and finds this table again;
			// the set keeps it from being wrapped over and over.
			wrapped.add(node);

			parent.children[index] = {
				type: 'tableWrap',
				data: {
					hName: 'div',
					hProperties: { className: ['table-wrap'] },
				},
				children: [node],
			};
		});
	};
}
