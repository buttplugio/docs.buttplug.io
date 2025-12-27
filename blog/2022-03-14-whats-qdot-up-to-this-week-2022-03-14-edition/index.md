---
title: "What's qDot Up To This Week? (2022-03-14 Edition)"
date: 2022-03-14
---
Our long national nightmare is... well, not exactly *over*, but...

**Buttplug**

<!--truncate-->

Ok apparently Patreon removed the header font choice for posts so things are gonna look a little weird this week.

Anyways, after 6 weeks and god only knows how many refactors, the new device configuration system for Buttplug is done! It even has a few tests! This will allow us to build more capabilities for device setup and configuration on a per-device basis. In the first version of this release, you'll be able to:

 - Make device allow/deny lists
 - Set device movement limits (This has been what is holding up fucking machine support, so we'll hopefully have hismith support now!)
 - Get the same device index for a device repeatably

I've still got some work to do around the rest of the library to make sure this is supported properly, but the fact that it's done is cause enough for celebration, 'cause for a while there it was looking like that was never going to happen.

**Intiface Desktop**

With the config stuff done, I'll now need to add UI so that it can actually be accessed. I'll be doing this in the next version of the egui Intiface Desktop release, which I'm working on now. This will most likely also move that application from Alpha to Beta phases, and I'll be adding a webpage for it on the Intiface domain to start pushing it for usage more while starting to deprecate the Electron based application.

That's it for this update. Until next week, Keep Buttpluggin'!

- qDot