# Iterations

## 1. Shared structure and content simplification
- Replaced one-off page shells with a shared base layout, stripped the homepage down to the writing list, and reduced decorative framing.
- Accessibility/design check: simpler hierarchy, fewer navigation decisions, and a predictable shell improve orientation. This leans on classic web design: obvious links, narrow reading measure, and content first.

## 2. Dark mode support
- Added theme tokens, automatic dark mode via `prefers-color-scheme`, and a manual light/dark toggle that remembers the choice.
- Accessibility/design check: dark mode is optional rather than forced, contrast stays high in both themes, and the toggle uses a real button with clear state.

## 3. Writing list refinement
- Turned the homepage and writing page into plain dated lists with calmer spacing and clearer metadata.
- Accessibility/design check: scanning is easier because titles, dates, and descriptions are consistently structured. This follows older index-page patterns where the list itself is the interface.

## 4. About and post cleanup
- Tightened the about page copy and simplified post presentation so the writing carries the visual weight.
- Accessibility/design check: less visual noise improves comprehension, and stronger spacing between title, summary, and body supports readable chunking.

## 5. Final polish
- Added focus states, skip link, reduced-motion respect, better code/block styling, and a gentler footer/header rhythm.
- Accessibility/design check: keyboard use is now visible, motion preferences are respected, and the UI feels closer to classic human-interface principles: legible, quiet, and unsurprising.
