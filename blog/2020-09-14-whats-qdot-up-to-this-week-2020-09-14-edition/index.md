---
title: "What's qDot Up To This Week? (2020-09-14 Edition)"
date: 2020-09-14
---
Trying to figure out what's next!

### Intiface/Intiface Rust CLI/Buttplug
For those of you that have joined since like, May 2019: Welcome to the normal development cycle!

<!--truncate-->

The work on buttplug-rs over the past year has been a bit anomalous, in that it was ONLY working on the library. As of last week, that library is now out and used by people running Intiface Desktop, so now instead of updating one piece of software at a time, I'm usually updating 3.

I'll either find some issue in Intiface Desktop that traces all the way back to the core Buttplug library, or add something to Buttplug that needs UI threaded up through Desktop. If either happens, I have to go all the way down the stack and back up, so it's usually 2-3 releases happening at a time.

As I sent a quick note about last week, I finally brought Intiface Desktop up to date. Almost all of its dependencies were 18+ months old, so it took a bit of work to get right, and this is also the first version where (at least on windows) you can switch between engines (Rust or C#, Rust is default). Things went... a little sideways with the first couple of releases last week, as I didn't test as throughly as I should've and had issues with certificates for people using SSL websockets, but everything seems to be fixed up now, as well as having a single new feature (connected device listing on the server status page).

Along the way, I also fixed some bugs in Intiface CLI RS and buttplug-rs, so the hope is that things will be fairly stable for the next week or two.

### What's Next?
The image attached to this post is an exercise I do every so often when starting a new phase of a project. I'll sit down with a piece of paper and a pen, and write down everything I can think of that I still want/need to do that's been sitting in my head. No reference to bug databases, project logs, etc, just want to see what all I've been holding as important. Afterwards, I'll take that list and compare it to what's in the issues sections of repos, kanban boards, etc.

In this case, I ended up with... a lot. This doesn't even cover missing toy protocol implementations, which I specifically left out because it's not really a project level thing. I'm gonna be working through turning all of these ideas into bigger epics this week, then comparing against what's in the system otherwise.

My expectations is that the next goal is to reduce code surface, which means continuing to work on ports like C#, JS, and Python so I can shut down the full implementation repos and have everything sitting on rust. This will massively reduce the number of places I have to pay attention to new issues coming in, which was a big goal of the rust project anyways. 

I'd also REALLY like to get a simple WebRTC teledildonics system built and hooked into Intiface Desktop. That's probably about a month's worth of work, but it'd mean user-to-user teledildonics capabilities for anyone who could hit a STUN server (and didn't have to deal with symmetric NAT).

After that... not sure. I know people def want a new Syncydink (possibly with encoder since the death of JFS), but that's a big project that's not super toy related so I might see if I can just organize that instead of doing it myself. Also wanna get Unreal bindings done, as I have a couple of game developers poking me about it.

If you have any feelings about what you'd like to see me work on, as usual, leave comments, or message me privately if you'd like. :)

That's it for this week, back to planning! Until next week, keep buttpluggin'!

- qDot