---
title: "What's qDot Up To This Week? (2020-04-13 Edition)"
date: 2020-04-14
---
Coming at you a day late because...

# Buttplug
I just released buttplug-rs v0.2.1 (v0.2.0 was missing an updated README so I had to do a quick point release after)!

<!--truncate-->

This includes:

 - XInput access on windows
 - Test devices/manager for building self contained tests
 - More server functionality, including backward compat
 - The start of user device configuration, which puts us one step closer to being able to integrate DIY toys and making serial port hardware usable again

Now that that's done, I'm hoping to start getting intiface-cli-rs building regularly, and will add a "beta" option to Intiface Desktop so people can try it out. I suspect it'll be crashy as hell for a while, as there's still WAY more panics in the library than there should be, but we're getting closer to me only having to update one codebase for new features! Yay!

If you're curious about what's coming up soon, I've created a feature tracking board that's a little more readable than the Zenhub I had been pointing people to:

[https://github.com/orgs/buttplugio/projects/1](https://github.com/orgs/buttplugio/projects/1)

# Teledildonics Livestream
I'm hoping to finish up the Teledildonics Livestream with Part 4 sometime later this week. It'll be an overview of the 1:1 teledildonics system I built on Glitch, which is available on glitch and github now:

[https://glitch.com/edit/](https://glitch.com/edit/)#!/qdot-simple-teledildonics-app

[https://github.com/qdot/simple-teledildonics-app](https://github.com/qdot/simple-teledildonics-app)

I've had a few testers so far, and it seems to be working decently for people!

That's it for now, as the Buttplug v0.2.1 release has eaten most of my past week.

Until next time, Keep Buttpluggin'!

- qDot
