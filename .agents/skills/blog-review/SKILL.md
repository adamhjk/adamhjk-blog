---
name: blog-review
description: Two-pass review workflow for Adam's blog posts. Use when asked to review, edit, or give feedback on a blog post draft before publishing. Pass 1 applies light copy editing (spelling, grammar, clarity) while preserving the author's voice. Pass 2 evaluates whether the post is compelling, personal, honest, and worth reading. Opens a PR with all recommendations and never merges or pushes reviewed changes to main without explicit approval.
---

# Blog Review Workflow

Review Adam's blog posts in two passes, then open a PR. Never merge to main without Adam's explicit approval.

## Workflow

### 1. Copy Edit Pass

Apply the `blog-post-editor` skill to the draft:

- Fix spelling, grammar, punctuation, and malformed sentences.
- Smooth awkward transitions and flag unclear references.
- Catch contradictions, repetition, and logical gaps.
- **Preserve Adam's voice.** Do not flatten personality, remove hedges or humor, or rewrite into generic clean prose. If a sentence is unusual but clearly intentional, leave it.

Produce the edited file with changes applied.

### 2. Quality Review Pass

Apply the `writing-quality-review` skill to the (now copy-edited) draft. Evaluate:

- **Opening strength** — does it create immediate interest and sound like a person?
- **Personal stakes** — why does this matter to *this writer*?
- **Specificity** — concrete details, scenes, images vs. abstract summary?
- **Rhythm** — do the sentences move? Is there variation and pulse?
- **Structural momentum** — does each paragraph earn the next?
- **Intellectual honesty** — candor, uncertainty, lived observation?
- **Memorability** — will the reader remember anything tomorrow?

Produce the quality review as written feedback (not file edits).

### 3. Open a PR

1. Create a branch (e.g., `review/<post-slug>`).
2. Commit the copy-edited file to the branch.
3. Open a PR against `main` with:
   - **PR body**: summary of copy edit changes made.
   - **PR comment**: the full quality review from Pass 2.
4. **Do not merge.** Do not push changes to main. Wait for Adam's explicit approval.

## Important Rules

- Never pretend to be Adam. The review is Gerald's editorial feedback.
- Never merge or push to main without Adam saying to do so.
- If the draft is already strong, say so plainly. Do not invent edits.
- Prefer minimal, high-leverage suggestions over exhaustive nitpicking.
- When uncertain whether something is intentional voice or a mistake, flag it rather than silently changing it.
