---
title: Whats Qdot Up To This Week 2021 10 25 Edition
date: 2021-10-25
---
It's ADHD time, apparently...

### Buttplug
Having learned a couple of new tricks in developing the new Intiface Desktop, I've taken a bit of a break from it to use that knowledge on Buttplug. I've now added a new IPC connector using Named Pipes/Unix Domain Sockets that should be way nicer for devs that don't care about remote connectivity to the Buttplug Server. I'm also currently sweeping through the library and doing a bunch of error handling cleanup to try and avoid future issues with crashes, as we've been getting a lot of reports lately. Finally, I'll be updating the library to btleplug v0.9, which should fix some issues on Linux.

<!--truncate-->

With most of that out of the way, I'm hopefully going to release Buttplug v5.1. After that, I'm planning to work on the next version of the message spec and adding in LevelCmd, which will make it much easier to start adding new devices or filling in functionality we've been missing (like the Max air bladder).

### Intiface Desktop
Things have slowed down a bit here, mostly because I've been busy otherwise and it's easier to pick up the non-GUI stuff in the places where I have time. That said, I'm still hoping to get a demo out to patrons soon!

### New Hardware (Either Just Released or Coming Soon)

 - Lovense ([https://lovense.buttplug.io)](https://lovense.buttplug.io)) released the Hyphy, which is an electric toothbrush lookin' thing.
 - Lovense will be releasing the Gush, which is their penis wrap similar to the Hot Octopuss Pulse, as well as a fucking machine I can't remember the name of, before the end of the year, so keep an eye out for those.
 - Kiiroo ([https://kiiroo.buttplug.io)](https://kiiroo.buttplug.io)) released the Hot Octopuss Pulse Solo Interactive (almost like Lovense knew they were gonna do this...). It's a $179 version of a toy I wasn't super into when it was $99 and not connected. But, if you like the Pulse, lemme know! I'd be curious to hear positive comments on it.
 - Kgoal (formerly Minna) will be releasing a "kegelcizer for men" next month. Basically it's a button you sit on. [https://www.kgoal.com/products/kgoal-boost-kegel-trainer-for-men](https://www.kgoal.com/products/kgoal-boost-kegel-trainer-for-men)

As always, we'll be trying to get support for all of this hardware into the library as soon as we can after release.

Anyways, that's it for now. Until next week, Keep Buttpluggin'!

- qDot