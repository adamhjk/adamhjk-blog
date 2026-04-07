---
title: Communication Breakdown
description: "Talking with Stephen O'Grady about AI and building the machine that builds the machine"
pubDate: 2026-04-07
---

[Stephen O'Grady](https://redmonk.com/team/stephen-ogrady/) is one of the founders of RedMonk, an analyst firm that spends time actually understanding what developers are doing and why. We've known each other a long time now, and I hopped on his podcast to talk about our path to building [swamp.club](https://swamp.club) in an AI Maximalist way, and what that makes me think about the industry.

<iframe width="560" height="315" src="https://www.youtube.com/embed/l0F9thZG3dI?si=nzOfHccoQkKuTEJs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

I won't summarize the whole thing here - you can always just click Play and get the whole thing. But I want to pull on a thread that we talked about in the beginning - the three emerging camps of peoples relationships to AI. This sits right at the heart of my own tension right now - I'm trying to stay on the frontier, discovering that patterns that work and that don't. At the same time, I'm thinking about my peers, and the impact of these changes on them and on our profession. I feel like I'm loosing my ability to even talk to some folks, and it stresses me out.

I see 3 different camps of people emerging:

## Camp 1: The AI Nope Camp

This is the camp filled with folks who have tried using AI/LLMs, and rejected it. Sometimes it's because they tried it and it didn't work out. Sometimes it's because they've done the Math :tm:, and simply don't believe that systems built with AI will ever approach stability. Sometimes it's because of the social and political implications. Mix in the incredibly annoying level of hype, marketing, and stress in the world generally - and they just nope out. They're over it. 

I admit that my approach to talking to this camp has not always been effective. At first I approached it like an argument on Old Twitter - drop a mildly inflammatory bomb, see who reacts, then try and find your way to a rational conversation. This certainly works for step one of that procedure still - say something super maximalist and you will absolutely bring out the camp 1 folks. What you won't ever reach is any kind of rational conversation. I think that's because both sides are starting from *way* different beginning conditions. 

I'm trying to communicate differently with this camp now. I'm trying to drop fewer inflammatory bombs, and do less prognosticating about what I think the future implications are. Instead I'm trying to just rely on my own personal, first hand experience. That seems to be helping - at least the conversations aren't grinding into an absolute halt. Time will tell.

## Camp 2: The AI in my SDLC Camp

These folks are the ones who have started using AI Agents within their existing SDLC. They usually work at companies that produce real working software for real customers with real revenue. They work on teams that are usually 10+ people (the organizational scaling on 10 to thousands is a big jump, but their SDLCs oddly don't change all that much until you reach really wild scale.) 

In this camp you find the folks who all have stories about how AI did something great for them, made them more productive in a particular way, and then inevitably had it fail them in other ways (usually by having someone else point a slop cannon at the code base, and have the quality degrade quickly.) These are reasonable people having reasonable times with a new technology.

The downside is that the AI Agent can, and will, produce software at a rate that no team can keep up with or understand. The guard-rails that keep the team working together, the process that allows them to plan, the points of control that management have over the teams direction and work - all break down in the face of unfettered AI Agents. This might lead a small number of these folks to join camp 3 - but the vast majority wind up falling into a kind of begrudging acceptance and level headed advice like "you are still responsible for all the code you commit" or "you need to review every line still". 

Communicating with this camp is easy enough - they have existing constraints they have to live in, and you have to respect that. They have real products to build, real customers to serve, and real teams to manage. The best of them are doing deep, practical, empathetic work to try and guide their organizations along the path. 

## Camp 3: The Machine that Builds the Machine Camp

Here you find the folks who are exploring the frontier of whats possible. They have thrown their existing SDLCs out the window. When faced with the problems of how to coordinate their effort, how to understand how the code base is changing, how to keep the product stable in the face of such a high velocity of change - their answer is to keep building the machine that builds the machine. 

To be in this camp today you almost certainly have a small team - less than 10 people (and I honestly struggle to imagine doing it well with 10.) Not only is the product you are producing changing rapidly, but the *way you produce it* is also adapting at a similar rate. You've removed all of the guard-rails in the SDLC - you've changed how you plan, how you test, how you review, how you ship, and how you fix bugs. New patterns emerge all the time, work for a while, and then get replaced by a more efficient one. This happens sometimes daily.

Communicating with camp 3 can be frustrating, because it's a constantly moving target. If you're in camp 1 or 2, you're looking for specifics - and all camp 3 offers you is anecdotes, good vibes, and hand-waving at how it will ever work for your complexity or scale. This is why I'm trying to embrace [Lex Aedificandi, Lex Credendi](https://www.adamhjk.com/blog/as-we-build-so-we-believe/) - if I want to learn what I think, and communicate it well to anyone else, I can only do it from a place of what I've built and understood myself. Otherwise it just veers off into a jousting match of hypotheticals.

## Why we need to talk to each other

My coach asked me this question when I brought up my anxiety about not being able to talk anymore with my peers on these topics: "why is this your job?"

After I sorted through the parts that are all about my ego, I was left with a simpler true thing: because I like building great systems that people use to solve problems. I don't know how to do that if I don't understand the problems people are having, or what technology is coming to change our lives. I believe that eventually, all of us will be building the machine that builds the machine.

I need to talk to other people in camp 3 because that's how these problems get solved. The frontier explores in parallel. Eventually the patterns that work emerge, and the folks who have seen them start talking to each other, and giving them names (like Continuous Delivery, or DevOps, or Agile.) This is how we as a group learn.

I need to talk to camp 2 people because it is their constraints that camp 3 must eventually rise to meet. I don't know how we refactor a working software development organization to be building the machine that builds the machine. I don't know how you are going to communicate to an auditor that you have four-eyed compliance when all of the eyes are robots. I don't know how to teach a software engineer that understands their craft from the bottom up, and not the top down, how to get comfortable with this way of working. Those answers won't come from camp 3 alone - they come from camp 3 talking to camp 2!

I need to talk to camp 1 because any process of change like this causes pain. We are real people with real feelings, and like it or not our professions and how we perform them are huge parts of our identities. These are the people who are most clear about where the harms land. For better or worse, I want to minimize that pain. I think some of it is unavoidable - the change has already happened to the industry, it's just not evenly distributed, for example. But a lot of it is avoidable. We don't have to build armed camps that shout at each other over the barricades. If I don't keep trying to talk to camp 1, then that's what will happen - I'll loose touch with those people, their needs and their thoughts, and the odds that what I build next causes more harm then it needs - either by accident of design or by callous disregard for the implications - will increase, and that's not what I want.

I'm still learning how to communicate my own experiences in building the machine that builds the machine. I'm also still learning how to listen to folks whose experiences aren't like mine, so that I do a better job of understanding their point of view, and can incorporate it into the work that I'm doing. I'm grateful to Stephen and the RedMonk crew for engaging in that conversation with me, and with the rest of the industry.

I hope I can come talk to you in whatever camp you find yourself in. :)
