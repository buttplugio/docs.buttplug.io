---
title: Whats Qdot Up To This Week 2021 01 17 Edition
date: 2022-01-17
---
One more featuring myself to death...

### Intiface Desktop
Intiface Desktop Beta 2 is pretty close to done! Lots of bugfixes, polishing and layout tweaks, but the big addition this time is going to be...

<!--truncate-->

**THE RETURN OF THE DEVICE SIMULATOR**

Yes! After 3 years of saying "yeah I'll get around to it", there's now a device simulator in Intiface Desktop Rust Beta! No longer do you have to use hardware to test the library! 

It allows you to create devices with vibrators, rotators, and stroking elements, and connect/disconnect them as you please!

I honestly can't believe I waited this long to put this together, as it makes testing things MUCH easier.

The other major addition is going to be the News panel. This will just be a panel that will pull news from a site so I can update people about new hardware support and apps within Intiface, instead of depending on them to watch the buttplug twitter account.

### Buttplug
Getting the device simulator going has actually required a surprising amount of updates to Buttplug, most of which are way under the hood, but I'll be releasing a new version of the library this week because they're important changes. This includes finally removing all *unsafe* blocks from the code, as they didn't need to be there in the first place and were vestiges of me not knowing what I was doing 2.5 years ago.

### Everything Else

 - There's a new audio-to-vibration app that uses Rust and egui! It's currently Windows only and very alpha, but definitely something to watch! [https://github.com/Shadlock0133/music-vibes](https://github.com/Shadlock0133/music-vibes)

That's pretty much it for right now. Expect Intiface Desktop Beta 2 out this week! Until next week, Keep Buttpluggin'! 

- qDot