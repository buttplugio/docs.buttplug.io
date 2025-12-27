---
title: "What's qDot Up To This Week? (2018-09-07 Edition)"
date: 2018-09-10
---
Being in pain, mostly. But in a good way. But not in THAT good way.When I started working on Buttplug in earnest back in April 2017,  I kinda figured that I'd get a little obsessed with working on it and maybe go slightly off my workout schedule.

I proceeded to basically not leave my computer chair for like 16 months.

<!--truncate-->

Luckily we just got a new gym right near where I live so I'm trying to actually leave the house and be healthy, but that's kinda fucked up my coding schedule since I'm kinda busy being exhausted and complaining about how everything hurts and I want to die.

BUT.

That doesn't mean nothing got done! Since I rewrote the C# client code, I'm now seeing how the changes feel via writing examples for it. This gives me a chance to refine the code and document it at the same time. Most of this work is happening at [https://github.com/buttplugio/buttplug-csharp/tree/client-examples.](https://github.com/buttplugio/buttplug-csharp/tree/client-examples.) There is now a Buttplug.Examples namespace, where I'm adding example CLI executables with heavily commented code. Like, multiple paragraphs per line.

My hope is that once I get these finished, I can use the comments as frameworks for writing examples in other languages, and compile all of these examples into a new, actually useful version of the Buttplug Developer Guide.

Once that's done, I have multiple people asking for new Serial Port code, so that they can connect homebrew hardware to Buttplug. This will also allow us to support other estim controllers like the 2B (I have one sitting on my desk right now!), and USB serial connectors like the lovense and vorze dongles. After that, I'm hoping to call v0.3.0 of the C# done and maybe move up the stack a bit to looking at GUI issues and apps.

Thanks again for your continued support!