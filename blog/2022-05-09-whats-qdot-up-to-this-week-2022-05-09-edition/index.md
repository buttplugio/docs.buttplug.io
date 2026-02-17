---
title: "What's qDot Up To This Week? (2022-05-09 Edition)"
date: 2022-05-09
authors: [qdot]
---
Family emergency over, finally, and slowly but surely returning to life as normal...

**Buttplug**

<!--truncate-->

Work has resumed on Buttplug v6. Right now I'm documenting the work I've done so far, as the portion of the library that deals with device configuration (how we know what devices we can connect to and what protocols to speak to them) has become ridiculously complex. So much so that if I walk away from it for more than a couple of weeks, I can possibly lose track of where I was in it. Documenting it has just made this complexity even more obvious, as it's hard to state in complete sentences how it works, but I'm doing my best to just get down what I can and come back to it to refactor later.

Once that's done and working, I'll be implementing the LevelCmd command, which will give us the promised extensions to fucking machines, device sensor reading for some input devices like pressure sensors, etc... That will be another large bit of work since any messages will be translated to/deprecated around that, but in the end we should have a much cleaner system.

**Intiface Desktop and Mobile**

With the successful porting of Buttplug to Android, there's now a major question of how much work should be put into the new Rust-based Intiface Desktop. It's mostly feature complete next to the Electron version, but just needs a few more updates to work with v6. I'm probably going to try to keep new features as minimal as possible, then start concentrating on actually producing the Android/iOS based apps, which will possibly free us of many of the issues we have with bluetooth connections on desktops (as well as pairing across multiple machines).

No ETA on when mobile apps will start happening. I have an extremely minimal Android app with one button that just scans for devices currently, but there's a ton of work to do at the FFI level to handle exposing server APIs and what not, which we'll need for mobile apps. I also still need to work up a Swift FFI layer for iOS first.

Anyways, that's where things stand for now. Hoping both updates and development will speed up now that I'm not busy with Life Stuff.

Until next week, Keep Buttpluggin'!

- qDot