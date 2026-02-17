---
title: "What's qDot Up To This Week? (2025-07-28 Edition)"
date: 2025-07-28
authors: [qdot]
---
Exciting new features!

# Buttplug
Work continues on trying to get the next version of Buttplug out to the world! Work is split between two areas of focus right now

<!--truncate-->

- Documentation and building things with the API to make sure it's sane

  - Documentation can be found at [https://beta.docs.buttplug.io](https://beta.docs.buttplug.io). Currently the new spec is redone, as is the dev guide up to the "how to use the API" portion. For anyone that wants to help with the project, letting me know if the documentation makes sense is a huge help!

  - For building things, I'm implementing a native HTTP/REST server! This'll ship in Intiface Engine and most likely Intiface Central, to make it easier to build Buttplug apps quickly without having to go through websockets (json parsing will be optional in some cases too).

  - Getting extra features due to things I find in the API builds too, as I figure out things that might be handy. For instance, we've now got the ability to reverse the min/max points of position-based stroking/thrusting devices, as well as disabling features of a toy.

- [Fixing issues with devices I broke while converting protocols.](https://github.com/buttplugio/buttplug/issues/765)

Both of these initiatives are going well, if a bit slowly as I have to stop to fix things, do my dayjob, etc... What was a hope in getting this shipped by the end of July is now end of August, but I'd rather not rush it.

That said...

# Intiface Central
Just because I don't have a full release done yet doesn't mean I don't want people trying things! I'm hoping to start posting pre-release alpha builds of Intiface Central v3 in the near future. I still need to add some extra UI to work with our new features, but once that's done I'll throw a desktop (and possibly sideloadable APK?) on our github and will post here about it.

Unfortunately I think we're going to limp into Intiface Central v3 with the current UI mostly intact. I'm hoping to spend the rest of the year concentrating on updating that and adding features once this project is done.

# Everything Else

- Someone built [quake3 buttplug](https://github.com/er2off/ioq3-buttplug)

- Getting multiple projects working on the "keypress-to-buttplug" dream: [VibeMapper](https://github.com/LivingTh1ng/VibeMapper), [Buttplug_AHK](https://github.com/Cramonty/Buttplug_AHK)

That's in for now. Until next update, Keep Buttpluggin'!

- qDot
