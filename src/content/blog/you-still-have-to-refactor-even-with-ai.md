---
title: You still have to refactor, even with AI
description: "Engineering with AI Agents doesn't mean you get to skip the fundamentals"
pubDate: 2026-03-29
---

A common refrain I see bouncing around on the internet goes something like this: AI agents build shitty, buggy software, and people who say they don’t are delusional or just ignorant of what it takes to Be Good At This™. To be fair, the reverse is also flying around too — that if you aren’t using AI agents to do this work, you’re obviously not a good engineer, or are delusional, or just ignorant. It’s a tough time to be on the internet all around.

The fallacy in this argument is that it presumes AI removes the need for humans to engineer the software. It doesn’t. Instead, it moves our perspective about how we engineer software from one grounded in the code to one grounded in architecture and the difficulty of implementing new features. We already have a word for the moment when the current shape of the software stops serving the work: refactoring, and you still have to do it, even with AI.

In the early stages of agent use, I used the agent to augment my existing workflow. I skipped past spicy autocomplete entirely, because I could type fast enough and I knew what I wanted. But a year or a year and a half ago, things got good enough that I was trying to build prototypes of ever more complex software. My experience was that when I did that, it would inevitably fall apart under its own weight. It wrote enough slop that eventually it collapsed into an incoherent, unmaintainable mess.

It’s such an obvious conclusion that when I reached it, I was certain I had seen through the hype beast to the reality on the other side. To be quite honest, I felt better about the whole thing, because I had found a place where the machine fell down. I’m sympathetic to folks who think this way. I thought this way too for a good while.

I was wrong. It turns out that because I was still thinking of the agent as augmenting *me*, it underperformed in comparison. Of course it did. I’ve been doing this for my entire life, and I knew exactly what I wanted, and how I wanted it. But that framing is wrong. My job as an engineer now is to *augment the agent*.

I have software I want to see in the world. Because I am a software developer, I have a solid perspective on how I want that software to be put together. The job is to build the machine that allows the agent to produce software that meets my requirements — not by trying to trick a non-deterministic ball of math into making the decisions I would make correctly up front, but by layering in ever more systems that reinforce and guide the agent into creating outcomes I’m pleased with. The machine that builds the machine.

Here is a recent example. I needed to use DigitalOcean’s S3-compatible object storage as a backend for Swamp. The initial implementation didn’t allow me to configure the endpoint for S3. So I fired up Claude, told it what I wanted, and it got to work. Then I did some manual testing and, lo and behold, found that it was super brittle. Why? Well, it turns out there were ten different places in the codebase where we created an S3 client — and the agent missed four of them.

So what do you do? You tell the agent to refactor. I found a seam where the code was simply factored wrong. Once I knew about the seam, I could fix it, just like always. The difference is the rate of speed at which this loop occurs. Because the agent can produce so much software so fast, the refactoring loop also tightens. The architecture change loop also tightens.

When I hooked those loops up to my existing software development process, though, they didn’t work because that process was predicated on my understanding the code. How do I know what to refactor if I don’t encounter the helpful friction of the system being a pain in the ass to edit? How do my peers keep up with the rate of change? They cannot.

But if you break that process and instead rebuild it around augmenting the agent, it becomes more straightforward. Do I need to update the architecture skill so it points out that these patterns are a problem? Do I need to add an adversarial code review every day looking for simple DRY refactors, let it run autonomously, and trust my external black-box tests to ensure that the refactor doesn’t break the product?

What humans encounter is what they’ve always encountered: the software was too difficult, or too brittle, to change. In domain-driven design lingo, it was not supple to requirements. Rather than using that as evidence for why agents can’t write good code, try shifting your mindset to one where your job is to guide the agents toward better outcomes over time. Refine the machine that builds the machine.

Just because an AI agent wrote the software doesn’t mean you no longer have to perform the fundamentals of good software engineering. You do. You just have to do them faster and allow your expertise to become the thing that augments the agent, rather than the other way around. You have to think more about architecture. You have to be more committed to refactoring. You need to build more adversarial loops to ensure you feed good inputs, and get high quality outputs. My job now is to augment the agent, so that the agent produces the software I want, at the quality I desire, toward the outcomes I wish. The fundamentals are the fundamentals. They're just happening faster with AI Agents.
