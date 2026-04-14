---
title: Laziness, Impatience, and Hubris
description: "How Larry Wall's virtues of a Perl programmer inspire me in this era of engineering"
pubDate: 2026-04-14
---

Perl 5 was the first programming language I really *knew*. In a very real sense, Larry Wall taught me how to program through his writing and Perl's community. Larry's 3 virtues of a Perl programmer continue to inspire me as I explore more deeply how to [build the machine that builds the machine](https://www.adamhjk.com/blog/as-we-build-so-we-believe/) (or put another way, make AI into my SDLC, rather than having AI *in* my SDLC.)  

Bryan Cantrill recently brought Larry's 3 virtues of a computer programmer to mind for me in his post [“the peril of laziness lost”](https://bcantrill.dtrace.org/2026/04/12/the-peril-of-laziness-lost/). In it, Bryan asserts that:

> The problem is that LLMs inherently **lack the virtue of laziness**. Work costs nothing to an LLM. LLMs do not feel a need to optimize for their own (or anyone’s) future time, and will happily dump more and more onto a layercake of garbage. Left unchecked, LLMs will make systems larger, not better — appealing to perverse vanity metrics, perhaps, but at the cost of everything that matters.

He then goes on to call us all to use LLMs in the service of our own virtuous laziness:

> to yield a simpler, more powerful system that serves not just ourselves, but the generations of software engineers to come after us.

I haven’t talked to Bryan about how they use LLMs/Agents at Oxide - but from reading things like [Using LLMs at Oxide](https://rfd.shared.oxide.computer/rfd/0576#_llms_as_programmers) and years of knowing him, I feel safe in saying Bryan is a very pragmatic member of [camp two](https://www.adamhjk.com/blog/communication-breakdown/) (camp 1 are the “AI Nopers”, camp 2 are folks with “AI in my SDLC”, and camp 3 are “the machine that builds the machine”, or “AI is my SDLC”. )  He’s calling all of us to not sacrifice what we know makes for good software on the alter of false velocity, and I would guess that his prescription for how to do that is to wield this new tool with caution and care, safe in the confines of engineering as we’ve all understood it for so long. 

I think Bryan doesn’t go far enough in thinking through what Larry’s virtues mean for us today. They call us to build the machines that build the machine - to join camp 3 - to wield this new capability in its fullest expression, and to explore what that means for our craft. They're a call to more exploration and bold action - not to the pragmatic middle. Let’s take each of Larry’s virtues in turn:

## Laziness

> The quality that makes you go to great effort to reduce overall energy expenditure. It makes you write labor-saving programs that other people will find useful, and then document what you wrote so you don’t have to answer so many questions about it. Hence, the first great virtue of a programmer.

The energy expenditure of writing software with AI agents is dramatically lower than it has ever been in software development. Historically, you only got close to this level of laziness by using a library - Rails, for example, made all of us lazier web developers! But now it’s even lower - with very little thought or prompting, we can will into existence essentially any software we want. 

Larry included the idea that they would be programs *other people find useful*, and this is a vital clue in how to think about the changing craft of software engineering. This is an expression of *external quality* - programs that do something useful, where utility is defined as *solving the users problem* in ways they find satisfying. 

In his post, Bryan lays in to [Garry Tan, CEO of Y Combinator](https://www.ycombinator.com/people/garry-tan), for the amount of slop that is present on [Garry's List](https://garryslist.org/) - 78k lines of code filled with digressions, dead ends, boilerplate and terror. He also throws a little shade on the fact that dtrace, one of the great marvels of software engineering, is only 68k lines of code. He then attributes this to the fact that Garry’s agent lacked laziness!

Due respect to Bryan, but no. Garry achieved the virtue of laziness in spades. Garry's List, for all the insanity - worked just fine, for Garry and the people his website served. It solved his problem! We (those of us who understand the craft, Bryan included) can find a million ways it lacks beauty, could use some serious refactoring - but those are measure of *internal quality* - they only matter if Garry, or his users, suffer from them because the software stops being “labor saving” or “useful” (or in domain driven design terms, no longer “supple to requirements”).  None of which I suspect Garry believed it to be. 

Laziness calls us to build the quickest path to our solution that doesn't cause more work in the future. Historically that path was basically always to find the right design, the perfect balanced abstraction (just enough, not too much - like all great Perl things, balance was the way.) Today? You can go a long way with an agent carrying the load for you before the wrong abstraction comes back to haunt you. 

To quote Bryan again:

> our finite time **forces** us to develop crisp abstractions in part because we don’t want to waste our (human!) time on the consequences of clunky ones. The best engineering is always borne of constraints, and the constraint of our time places limits on the cognitive load of the system that we’re willing to accept. This is what drives us to make the system _simpler_, despite its essential complexity.

The agents ability to handle “bad” code, to continue to extend it long past the threshold where a human programmers cognitive load allows, is not in itself a call for restraint. Garry isn’t suffering under the cognitive load of his website containing an entire boilerplate rails app. He gives a fuck! Because he’s lazy (in the Larry Wall sense,) and unlike if Garry had to deal with this mess by hand, he gets to ignore it all. Why? Garry’s agent understands how it works, slop and all. Anything he needs to know about it, or change, he can do by asking the agent to explain it, or make a plan to change it. He’s perfectly embodied the virtue of Laziness.

Elsewhere in the Camel book, Larry clarifies Laziness:

> The vice is about the avoidance of immediate work. The virtue is about the avoidance of future work.

When Larry wrote the Camel book, the threshold between doing the expedient thing in the near term versus the right thing in the long term was much tighter than it is today. Not only can we generate the code faster, we can delay the need to deal with a bad (or missing) abstraction for much longer before the brittleness overwhelms us, because the Agent deals with it, rather than us. 

In a world where the AI Agent lives inside your SDLC, and you have other people who are trying to work with you - doing this is disastrous. Garry isn’t lying about his ability to generate code, and at that rate nobody can understand what's changed but Garry (and even he only can understand it in terms of the outcomes, and perhaps a bit of the overall shape.) This is why perspective matters in the AI conversation. From a camp 2 perspective, we need to reign in the chaos represented by 37k lines a day, because what it produces could never possibly be good enough - and because we could never keep up with it if it did.

But when you look at it from the virtue of laziness - the answer is to move towards the machine that builds the machine. Provide guidance in the form of skills - software architecture, design, accessibility, code review, etc. Use adversaries to review plans in addition to the code that is produced. Use external user acceptance testing to ensure the product itself doesn't degrade, and make it safe to refactor. These things are more work today than just piling ever more code into a code base. But they mean the code that is generated by the underlying AI Agents is much better: more understandable, more reliable. It's also much faster to generate than doing it by hand, and a team can understand what is going on - perhaps not at the level of the source code, but certainly at the level of the architecture, and at the level of the machine that builds the machine. 

As my friend [Paul Stack says - the vibes don't scale](https://stack72.dev/the-vibes-dont-scale/). The virtue of laziness compels us to build the machine that builds the machine. 

## Impatience 

> The anger you feel when the computer is being lazy. This makes you write programs that don’t just react to your needs, but actually anticipate them. Or at least that pretend to. Hence, the second great virtue of a programmer.

I see this virtue everywhere in using AI agents for software development. You see it in the emergence of [adaptive primitives](https://www.adamhjk.com/blog/adaptive-building-blocks/) - at the rate that we can generate software, *not* being able to adapt the program to your needs means that you likely will just replace the program altogether. Here is Larry again:

> Impatience is that nasty feeling you get when the computer is doing what it wants instead of what you want.

This is the perfect distillation of why engineers get annoyed with AI Agent use - nothing could more literally embody this experience than an AI Agent destroying *your* code base with ignorant, terrible code. Luckily, Larry goes on:
 
> Or, more correctly, when the programmer on the other side of the software chose the wrong default settings, made a poor GUI, or doesn’t give you access to this data. You’ve experienced it enough to not inflict the same pain on other programmers, turning your frustration with your wasted time into a benefit for other people.

This is where the virtue of Impatience also compels us clearly to build the machine that builds the machine, and to construct it out of adaptive primitives. We define the rules by which our agents work, by which code is acceptable, and how the product should perform. Given the rate we can build software in this fashion, we essentially never need to suffer under "the wrong default settings, a poor GUI, or no access to data". We can just route around it like damage.

Just doing this with slop, without the machine that builds the machine, just piles on the risk. It adds more and more software whose shape you can't understand to the pile you already have. But if we guide the architecture? If we can be clear about what good requirements and outcomes look like? Suddenly our impatience is a virtue again. The design of the machine helps the agents to anticipate our needs (what good looks like, across many dimensions). Our capacity is so much higher, so we are never beholden to a bad library, poor default, or lack of access to data. We can also put that capacity *into the machine itself*, ensuring better outcomes for the team as a whole. 

## Hubris

> Hubris is the sense that, with the right tools, you can do just about anything. It’s all a Simple Matter of Programming, right? It’s also the thing that’s likely to make you fly too close to the Sun.

I think nothing in the history of software development has contributed to unbridled hubris like AI Agents. We all know someone with a lifetime of domain experience in something other than software who gets a-hold of Claude Code and declares they basically can do what we do now. Until, of course, they start talking about how the "models are getting dumber", and "every time it fixes a bug it causes 5 more". The wings always melt eventually, even if it happens shockingly later in the software development process than it used to. 

Here is Larry talking about Hubris again:

> Excessive pride, the sort of thing for which Zeus zaps you. Also the quality that makes you write (and maintain) programs that other people won’t want to say bad things about. Hence, the third great virtue of a programmer.

Larry's definition of hubris isn't just about motivating us to reach for ever greater heights for its own sake - it's also about wanting *other programmers and our users* to love what we've built. It's hubris that makes us want to build something transcendant. It isn't enough to just get something into the world. It has to be *seen to be good* by the people we purport to serve, both internally and externally.

This version of hubris is dear to me. Anyone who has worked with me for long knows that I really care about building things that are good - both in their design and how they feel. Not everyone always agrees with my sense of how to do that. Plenty of people didn't like Chef - but many others did. System Initiative was overloaded with hubris - a bold re-imagining of everything about automation, which in the end very few of you actually liked - and those who *did* like it frequently named the raw chutzpah of the thing as a primary reason. When Bryan first pitched me Oxide over a burrito in the Mission, I was on his side immediately - in no small part because I loved the fucking hubris of it. I still do. 

Hubris is the ultimate motivator for figuring out how to build the machine that builds the machine. With the right tools, we can do just about anything. That's more true today than it has ever been in software. The question isn't can we anymore. It's *how* can we do that in a way that causes *other programmers and our users* to love what we build. The machine that builds the machine is a new category of software altogether, and it is beautiful on its own terms. We will build it because our hubris demands it, and we will make it great because if it isn't great, nobody will care. We'll just be alone with our melted wings. 

## Closing

I don't think the future is pumping out slop until our software breaks under its own weight. Garry Tan would eventually have realized something was off with his ability to build Garry's List. It also isn't locking AI Agents in to our existing, comfortable SDLC - because the Agents will continue to produce code at a rate we don't understand and cannot review, they will do so effectively for a while, and software development will devolve into endless rounds of mostly meaningless code review and recrimination.  

Instead, Larry's virtues compel me to build the machine that builds the machine. My laziness compels me to build guidance and ubiquitous testing in, so that I don't trade near in velocity for long term scalability, while letting the agents take care of most of the implementation. My impatience helps me to add the adversaries I need to ensure our code is architecturally sound, and works the way our products and users demand - and it will ensure I never need to suffer under a bad abstraction or inflexible primitive ever again. Ultimately, it is my hubris that drives me forward - a world where AI Agents sacrifice everything beautiful about software engineering is a bleak one I refuse to exist in.  Instead I choose to see it as an opportunity to design and build primitives that allow me to build an entire generation of software differently than I did before.  

I don't know about you, but I like the fucking hubris of it.

