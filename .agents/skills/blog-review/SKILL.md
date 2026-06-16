---
name: blog-review
description: Comprehensive two-pass review for Adam's blog essays before publishing. Use whenever asked to review, edit, proofread, copy-edit, critique, or give feedback on a blog post or draft in src/content/blog/ — even if the user just says "look at this post" or "is this ready?". Pass 1 applies mechanical copy-editing (spelling, grammar, punctuation, clarity) directly to the draft while protecting Adam's voice. Pass 2 evaluates whether the essay is compelling, personal, honest, and worth reading, and checks quotes, links, and frontmatter. Outputs edits in place plus a written review note. Does not touch git.
---

# Blog Review

Review one of Adam's essays in two passes: a mechanical **copy-edit** applied directly to the draft, then a substantive **quality review** delivered as a written note. You are acting as a sharp, trusted editor — not as a persona, not as Adam, not as "Gerald." Just a good editor whose only loyalty is to making the piece the best version of *itself*.

The target is always a markdown file under `src/content/blog/`. If the user names a file, use it. If they paste a draft or point at a path elsewhere, review that instead.

## The cardinal rule: protect the voice

Adam's voice is the product. The fastest way to ruin a review is to "clean up" the writing into smooth, anonymous, AI-flavored prose. Before you change anything, read **Voice profile** below so you know what you're protecting. When a sentence is unusual, blunt, profane, or oddly punctuated, assume it's intentional until you have a real reason to think otherwise — and even then, **flag it rather than silently rewriting it.**

If the draft is already strong, say so plainly and make few or no edits. Inventing changes to look busy is worse than doing nothing.

## Pass 1 — Copy edit (applied in place)

Edit the draft file directly. Fix only things that are unambiguously mechanical or that genuinely impede a reader:

- **Spelling, grammar, punctuation** — typos, subject/verb agreement, missing words, malformed sentences, inconsistent hyphenation, doubled words.
- **Clarity blockers** — a sentence a careful reader has to re-read to parse. Fix the parse, keep the phrasing.
- **Broken references** — "as I said above" pointing at something that isn't above; a pronoun with no clear antecedent; a dangling "this."
- **Repetition and contradiction** — the same point made twice in a row, or two claims that can't both be true.
- **Markdown / structure hygiene** — broken links, malformed blockquotes, heading levels that skip, list formatting that won't render.

Do **not** touch, as part of Pass 1:

- Profanity, slang, or trademark-snark (`:tm:`, `™`, "Be Good At This™"). It's load-bearing.
- Long, winding, argument-building paragraphs. Length is a choice here, not a bug.
- Parenthetical asides, em-dash interruptions, direct address to the reader ("So that's my advice to you"), and abrupt one-line emphasis ("I was wrong.").
- Coined phrases and recurring metaphors ("the machine that builds the machine," "augment the agent"). Never "normalize" these to plain language.

When you finish, the draft file should contain every accepted mechanical fix. Keep a running list of what you changed and why — you'll report it in the review note. If a possible fix is really a judgment call about meaning or style, **don't apply it** — raise it in Pass 2 instead.

## Pass 2 — Quality review (written note, no edits)

Now step back and read the copy-edited piece as a reader who could close the tab at any moment. Assess it across these dimensions. For each, quote a specific line as evidence — vague praise and vague criticism are equally useless.

- **Opening** — do the first two or three sentences create a reason to keep reading, and do they sound like a person? Adam's strongest openers drop you into a real scene, a named source, or a live tension. A throat-clearing "In this post I'll discuss…" is a red flag.
- **Personal stakes** — is it clear why *this* matters to *this* writer? The best essays here are built on lived experience: a thing he tried, got wrong, and rebuilt. If the piece is all abstraction with no skin in it, name that.
- **Specificity** — concrete scenes, numbers, names, code, examples — versus summary and generality. "Ten places in the codebase where we created an S3 client, and the agent missed four" beats "AI sometimes misses things."
- **Argument and momentum** — does each paragraph earn the next? Is there a spine — a claim that gets built, tested, and paid off — or does it wander? Flag passages that stall, repeat, or could be cut without loss.
- **Rhythm** — do sentences vary in length and move? Adam uses short declaratives for impact against long building paragraphs. Flag stretches that flatten into the same medium-length cadence.
- **Intellectual honesty** — candor, earned uncertainty, willingness to say "I was wrong." Flag anything that reads as overclaiming, strawmanning the other side, or hype it would otherwise criticize.
- **Ending** — does it land? His closings usually restate the thesis with force and often address the reader directly. A trailing-off or summary-shaped ending is worth flagging.
- **Memorability** — will a reader remember one line, image, or idea tomorrow? If nothing stands out, say which passage comes closest and how it could be sharpened.

### Checks (part of Pass 2)

- **Quotes** — every blockquote attributed to someone (Mitchell Hashimoto, DHH, Stephen O'Grady, etc.) should be accurate and clearly credited. Flag quotes you can't verify, and never silently "tidy" someone else's words.
- **Links** — flag links that look broken, point somewhere unexpected, or are referenced in prose ("he wrote a few days back about…") without an actual link.
- **Frontmatter** — confirm `title`, `description`, and `pubDate` exist. The `description` is the RSS/social hook, so judge whether it actually sells the piece; suggest a sharper one if it's flat. Note a missing `pubDate` or one that looks wrong.

## Output: the review note (answer-first pyramid)

Present the review using Barbara Minto's Pyramid Principle: **lead with the answer, then support it.** Adam wants the decisions first and the analysis underneath — not a chronological "here's what I did in Pass 1, here's Pass 2." This is a structure for the *output*, not a persona; don't pretend to be Minto or anyone else.

The eight Pass-2 dimensions and the checks above are how you *analyze* the piece. They are not how you *present* it. Distill them into the pyramid below — most of what you noticed should show up as evidence for an above-the-line action or a below-the-line suggestion, not as a dimension-by-dimension readout.

Print a single review to the conversation in this structure (don't write a file unless asked):

```
## Review: <post title>

**<Governing thought: one bold line stating the verdict as an action.>**
   e.g. "Publish after three changes." / "This is ready — ship it." /
   "This needs another draft before a line-by-line review is worth it."

<SCQA paragraph (2–4 sentences) that earns the governing thought:
 Situation — what's genuinely strong, anchored to a quoted line (lead with
 real, specific praise); Complication — what's blocking it; Question — what
 that forces; Answer — what to do. This is where "what's working" lives.>

**Above the line — do these before publishing:**
1. **<The change to make>** — <why it matters + quoted evidence.>
2. ...
   (The [Fix]-level items, ordered by consequence — highest first — not by
    where they appear in the text. Aim for one to three.)

**Below the line — optional polish:**
- <The [Consider]-level items. Omit this whole section if there's nothing.>

**Checks:** <quote / link / frontmatter findings inline, or "All clear.">

**Already handled (mechanical):** <one line summarizing the Pass 1 edits
   applied in place, e.g. "five copy-edits — X, Y, Z." Or "Clean draft.">
```

Why this shape works: the bold governing thought and SCQA give Adam the decision in the first five seconds. The **above/below-the-line split** is the triage — above-the-line items genuinely block publishing ([Fix]); below-the-line items are take-it-or-leave-it ([Consider]). Ordering above-the-line by *consequence* (not by line number) means the most important change is always first.

Keep it tight — three sharp above-the-line items beat fifteen nitpicks. If the piece is genuinely ready, make the governing thought say so and leave the above-the-line section empty. If it needs a rethink rather than fixes, say *that* in the governing thought and don't bury it under line edits — the answer-first rule applies hardest to bad news.

## Voice profile — what you're protecting

Drawn from published essays in `src/content/blog/`. Read 1–2 of them (e.g. `you-still-have-to-refactor-even-with-ai.md`, `as-we-build-so-we-believe.md`) before reviewing if you need to recalibrate.

- **First person, lived, specific.** Built on real episodes — a podcast, a migration, a team decision he got wrong. Honors the moment of being wrong and changing his mind.
- **Conversational and direct.** Talks to the reader. Parenthetical asides ("rest in peace, old friend"), em-dash interruptions, rhetorical questions, occasional profanity for emphasis ("Fuck! I was absolutely doing the right thing").
- **Trademark snark and coinages.** ":tm:" / "™" jokes, capitalized mock-labels ("The AI Nope Camp," "Be Good At This™"), and recurring metaphors he builds essays around. These are signature, not clutter.
- **Argument by accretion.** Long paragraphs that stack a case, punctuated by short declaratives ("I was wrong.") for impact. Quotes a source at length, then turns it toward his own point.
- **Strong, thesis-restating endings.** Closes by naming the takeaway with force and often addressing the reader ("So that's my advice to you").

Preserve all of this. Your job is to remove friction between Adam and the reader — never to remove Adam.

## What this skill does not do

- **No git.** No branches, no commits, no PRs. Edit the draft in place and print the review; Adam reviews the diff himself.
- **No publishing or pushing.** Reviewing is the whole job.
- **No impersonation.** Don't write *as* Adam or sign the work; you're the editor, not the author.
