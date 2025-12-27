---
title: Whats Qdot Up To This Week 2023 11 27 Edition
date: 2023-11-27
---
Scrubbing away technical debt

### Buttplug and Intiface Engine
Back when I built Intiface Central, I didn't really do much work on adapting the layers below it. I just kinda made Buttplug and Intiface Engine (the first user layer on top of Buttplug, which handles things like setting up the engine, running our command line interface, etc... Central sits on top of Engine and provides the GUI) work with the new Central setup.

<!--truncate-->

This is now officially *getting in the way*.

Back when we had Intiface Desktop, Engine used to run as a separate program, so it could upgrade outside of Desktop (like whenever I wanted to add new hardware without changing the GUI). Unfortunately, that model doesn't work with Central, where we also have to run on phones, and phones don't let you start new processes.

So I spent my holiday break starting to clean up Engine to work with the new world where it compiles directly into Intiface Central. This work is ongoing, but it should mean hopefully fewer crashes and better reporting of errors in the future.

Unfortunately it's really boring to talk about though.

### Intiface Central
Because I also needed to implement new features to keep myself sane, *modes* have started development in Central. In the next release, there will be two *modes* the app can run in:

 - Engine, which is what it does now
 - Repeater, which allows Intiface to work as a proxy to... another version of Intiface somewhere else. So like, if you're on desktop but you want to use your phone as your hardware controller, but you also want to play a movie through a webpage that will control the toy, you need an proxy to hop through so the webpage on your desktop can talk to intiface on your phone. Now Intiface on the desktop can be that proxy. This is handy for situations like the web (already mentioned) as well as older Buttplug programs that expect everything to be running on the same machine.

The repeater feature is nice, but even better is that this will allow me to add even more modes, with the next hopefully being a teledildonics service layer. When that'll get done, I have no idea, but it's nice to finally be in striking distance of it!

### Everything Else

 - Next version of Intiface Central will hopefully also have crowdfunding credits, so everyone at the $5 or above level, be watching for messages soon, as this is an opt-in deal.
 - Someone built a [Lethal Company Buttplug Mod](https://thunderstore.io/c/lethal-company/p/LethalPlugging/LethalVibrations/) if you're one of those cool kids playing the current cool kid game.
 - Construction starts on my flooded work area tomorrow, hoping to be back in soon!

That's it for now. Until next time, keep Buttpluggin'!

- qdot