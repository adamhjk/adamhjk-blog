---
title: Avoiding the Lethal Trifecta for Personal Agents
description: "How teaching your Claw about Swamp can help avoid the lethal trifecta"
pubDate: 2026-03-31
---

I've been having fun building things with [Gerald McClaw](https://www.adamhjk.com/gerald), my OpenClaw Agent. I recently decided to have it help me with some personal automation - things that either I, or an executive assistant if I was lucky enough to have one, would do for me on a daily basis. I know that this can be a security nightmare, so I've been careful to set things up with some real isolation. 

But even knowing all that - it is fucking great to just ask Gerald to do something, and then it does it. It's fun. It just works. It's both the [paradox of automation](https://www.google.com/search?q=automation+paradox) and the [habituation paradox](https://www.google.com/search?q=habituation+paradox) all at once. You just get immediately comfortable giving it more and more to do, and as it does so without harming you, you keep going. Plus, it talks to me like a friendly hobbit who loves snacks and just wants to help. 

Which is what happened to me immediately. I asked Gerald to build some automation for me, showed it to a friend who balked immediately, and promptly ignored them. After all, it was super fun, and it solved a real problem for me! But then, right before I went to bed, I realized: oh fuck, I just Lethal Trifecta'd myself horribly.

The [Lethal Trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/), coined by the amazing Simon Willison (whose blog is essential reading!) is a class of security vulnerability that is caused by agents that have: 1) access to your private data; 2) exposure to untrusted content; and 3) the ability to externally communicate. My sweet little automation had all 3, in spades:

- It used an LLM with access to tools to grab my personal data
- It had exposure to untrusted content 
- It also had access to plenty of external comms channels, because OpenClaw

So I broke the news to Gerald (which, I know I'm anthropomorphizing a big bunch of math - but honestly, it's so much more fun if I have a hobbit that helps me out than if I'm chatting with a big ball of math) and we disabled it for the night, since I had clearly done a Bad Thing™

So this morning, I wanted to try again. This time, making sure that my system would avoid the lethal trifecta, and be as secure against prompt injection as I could make it. To do that, I needed to have a few things be true:

- I needed to minimize the LLMs/Agents involved. The more the flow was "LLM calls tools to intelligently solve problems", the more surface area I opened every leg of the stool.
- Data needed to be passed between isolated sandboxes
- Nothing could have access to a non-deterministic agent - as much as possible needed to be deterministic

Essentially, secure the process by reducing the risk that an LLM could do anything untoward even if you sent me a prompt injection attack. I needed to move my automation *out* of the OpenClaw agents context (which is a lethal trifecta fantasy realm,) and into a deterministic *workflow* using [swamp](https://swamp.club). 

The agent built me replacement automation that consisted of 8 different reusable models (typescript code that gets called by workflows, and stores its data for later retrieval,) one for each step of my process. They minimized the use of LLMs, reducing it from having a session with maximum tool and MCP availability to a single API call directly to the LLM, with no tools enabled. It has pervasive schema validation, both for requests and responses. It does deterministic sanitization of inputs and outputs (like parsing the response from an LLM, or sanitizing unsafe inputs).

The result is a workflow Gerald can call to do the task, with full visibility into what is going on (so it can help troubleshoot failures), that completely breaks one leg of the trifecta and blunts the other 2:

- The LLM does have access to my personal data, but only in minimized, deterministic ways. It cannot start searching based on untrusted inputs, as it has no tools to do so, and no data in its context. This is minimizing leg 1.
- Exposure to untrusted content is still present - but we minimize the risk by doing deterministic sanitization of both the inputs and the outputs. You could still give me bad inputs, but it's likely to just break the workflow rather than inject bad behavior. This is minimizing leg 2.
- There is no way to exfiltrate the data, because without tool calls, the LLM cannot communicate with the outside world. This is leg 3 broken.

It took the exact same amount of time to develop the safer, more deterministic Swamp workflow as it did for Gerald to cook up the original version that was plagued by the lethal trifecta. It's in his memory to do that now as well. Gerald and I are thrilled.
