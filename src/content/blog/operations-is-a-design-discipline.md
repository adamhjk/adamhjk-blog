---
title: Operations Is a Design Discipline
description: Reliability is not a postscript to software design. It is one of the design constraints that matters most.
pubDate: 2026-03-25
---

Software teams often talk about operations as if it begins after the "real work" is done. Build the thing, ship the thing, and then let someone else keep it alive.

That story has always been false.

Operations is not what happens after design. **Operations is part of design.** The questions that matter most in production are design questions:

- How will this fail?
- How will a human understand what it is doing?
- What can be changed safely while it is live?
- What assumptions are we embedding into the system that won’t survive contact with reality?

A team that treats operability as a first-class property tends to make better software. The interfaces are clearer. The boundaries are more explicit. The invariants are easier to reason about. The blast radius of mistakes gets smaller.

The opposite pattern is also common. A product accumulates incidental complexity, then tries to patch over it with dashboards, handoffs, and process. That usually does not work for long. If the system is hard to operate, there is usually something true but inconvenient hiding in the design itself.

Durable systems do not emerge from wishful thinking. They emerge from the steady craft of building software that can be understood, changed, and repaired by ordinary humans under ordinary pressure.
