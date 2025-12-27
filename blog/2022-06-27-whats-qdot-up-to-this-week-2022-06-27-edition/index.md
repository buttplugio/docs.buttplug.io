---
title: Whats Qdot Up To This Week 2022 06 27 Edition
date: 2022-06-27
---
ALL HAIL SCALARCMD

### Buttplug
Buttplug development is back on track! After one last overhaul of part of the configuration system (for those keeping count, that's the 8th time I've had to do a major refactor on it this year. But this'll be the last one. Really. Maybe. I think), I've finally moved to adding new messages to the Buttplug protocol.

<!--truncate-->

First up is ScalarCmd, which is what used to be known as LevelCmd, but Scalar sounded mathy-er so I went with that. This will allow us to convey information about devices that take a single, static value. Currently the only way we can send that information is via VibrateCmd, but there are devices like fucking machines (which oscillate at a set speed), the Lovense Max Air Bladder (which constricts to a certain level), etc that don't actually vibrate, so we needed to either add new messages for those, or just make a new message that conveys this setting in general. Ended up going with the second one because it'll be easy to add on in the future.

The work to integrate this throughout the library is happening now. Once that's done, I'll be moving on to Sensor messages, will which allow input of different types. We're mostly concentrating on pressure for the moment (kegelcizers, Nogasm/Edge-o-matic, etc), but could also manage information for other sensors like temperature, accelerometers, etc... Still figuring out exactly how this will work, but those two messages will be the big additions for Buttplug v6.

Once I have something to Beta, I'll let everyone on patreon know. :)

### Intiface Desktop/Mobile
I've started working on some of the new Flutter code for Intiface Desktop/Mobile. Due to the amount of new features coming in Buttplug v6, it'll need to ship with a new version of Intiface, and while the Rust version was coming along, the Mobile part is just too good to pass up, so Flutter it is.

That's it for now. Until next week, Keep Buttpluggin'!

- qDot