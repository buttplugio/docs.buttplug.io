---
title: Whats Qdot Up To This Week 2019 08 05 Edition
date: 2019-08-05
---
You get a release, and you get a release, and everybody gets a release!

Except Syncydink. Again.

<!--truncate-->

### Buttplug / Intiface / Web Components
Most of the work over the past couple of weeks has been finishing up the device configuration work I started earlier this year.

To make a short story long:

We started getting requests for support for the WeVibe Vector. Now, we already support WeVibe stuff, and AFAIK the Vector would have the same protocol as the rest of it. With the new device configuration work I'd done, this was supposed to mean I could just change a text file, Intiface Desktop/Javascript would update, and everything would "just work".

Except that I like half-finished it. I figured out the file format, made the file, built it into our code libraries, but never got to the point where you could load a file from outside the library.

The past couple of weeks have been spent fixing that. Now, everything can load an external device config file. Hell, YOU can load it if you want! It's at

[https://buttplug-device-config.buttplug.io](https://buttplug-device-config.buttplug.io)

This means that, if companies add new toys that use a protocol we've already implemented, we can hopefully just add some info to this file and web apps, intiface desktop, etc will "just work" with no code changes required. Of course, if it's a new toy that we've never seen before, then code is still required, but there are a lot of brands that rarely if ever change their firmware, so this makes life easier in that case.

I've made releases of Buttplug C#/JS, Intiface Desktop, and the Vue Components (updated Buttplug Playground too) that all incorporate this. Syncydink still needs to be brought up to the new Vue Component, so that'll still take a bit. Soon tho. I hope.

### What's Next

 - Still need to finish the Intiface Tutorial
 - Titan 1.1 owners are yelling at me for support (gotta figure out protocol changes)
 - People building their own hardware are yelling at me for support (via building a generic protocol so DIY integration with buttplug is easy, but this is still a rather complex deal overall from my development side)
 - Still need to finish buttplug-py
 - Wanna finish up first round of WebRTC connectors soon because TELEDILDONICS

Unfortunately I'm also rather addicted to Hollow Knight right now which is eating a lot of my time, so we'll see how much actually gets done. :)

Until next week, Keep Buttpluggin'!

- qDot