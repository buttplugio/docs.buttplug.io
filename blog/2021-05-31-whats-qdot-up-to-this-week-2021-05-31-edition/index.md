---
title: "What's qDot Up To This Week? (2021-05-31 Edition)"
date: 2021-05-31
---
Welp, at least I managed another May update before the month was over...

# Intiface Desktop
After getting the Lovense Connect code into Buttplug and releasing v4 of the library in the first couple of days of May, a whole bunch of fuck all has happened since. I got absolutely crushed with some non-Buttplug work that meant I had no energy to work on things for most of the month. Luckily, due to the long weekend in the US, I've gotten a tiny bit of time to recover.

<!--truncate-->

First order of business right now is updating Intiface Desktop to work with Buttplug-rs v4. This means:

 - Adding the ability to select Device Communication Managers, which really just means "You can say whether or not you want to connect to bluetooth devices or HID devices or gamepads or whatever". This will at some point become "say whether you want to only connect to/completely ignore certain devices", but that's still a little ways in the future. This was in service of...
 - Adding support for the Lovense Connect Service, which is now going to be the first opt-in feature of Buttplug. Since this requires calling out over the network to Lovense's services, it's up to users to turn this on for themselves, the library does not do it by default. This UI is part of the first feature.
 - Adding a device panel! You can now run what is basically a newer, slimmer, more useful version of Buttplug Playground, right in Intiface Desktop! This is just the first feature of the Device Panel, which will also includes the aforementioned allow/deny lists, as well as simulated devices in the hopefully near future.
 - Removing support for SSL connections, since those were removed from the core library. We'll let users handle proxying if they need that now.

Most of this work was finished today, all I need to do now is make a tutorial video of all the new features, then v21 will be out sometime this week.

# Buttplug
After that, I've got a ton of cleanup and merge work to do around Buttplug. This includes:

 - Consolidating repos, yet again. I'm going to collapse the buttplug-rs repo to just be buttplug, with the device config, spec, etc all in a single monorepo.
 - Buttplug-rs-ffi will just turn into buttplug-ffi too, making Rust our core implementation.
 - We have both Java (full FFI) and native Node (client only for the moment) FFIs sitting in PRs waiting for me to review, planning to get to those in the next week or so.
 - I need to start merging the new async version of btleplug, as that merge is holding up the actual release of v1 of that library.
 - Trying to get async HID support in, in order to bring back RealTouch support as well as bring in things like the Nintendo Joycon.
 - And after all that, hoping to finally consider WebRTC work for mobile/remote connections.

# Other Stuff
Lots of work happening with 3rd parties now!

 - FarmD ([https://patreon.com/softscale)](https://patreon.com/softscale)) have released a new public version of their VR dragon fucking game, with Buttplug support
 - Dominatrix Simulator ([https://www.patreon.com/deviantdev)](https://www.patreon.com/deviantdev)) are working on integration now, and should have a new beta out soon with Buttplug support
 - In Heat ([https://github.com/Furimanejo/In-Heat),](https://github.com/Furimanejo/In-Heat),) a new Overwatch energy bar tracker with Buttplug integration, was released

So things are definitely staying busy!

That's it for now. Hopefully back to weekly updates. Until next week, Keep Buttpluggin'!

- qDot
