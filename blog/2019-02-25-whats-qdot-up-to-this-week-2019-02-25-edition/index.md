---
title: "What's qDot Up To This Week? (2019-02-25 Edition)"
date: 2019-02-25
authors: [qdot]
---
Being sick for at least half of it. :(

But, that doesn't mean work isn't happening!

<!--truncate-->

There's been a ton of work on bringing Buttplug JS inline with Buttplug C#, with the end goal of being able to use either engine under the new GUI frontend. Finished up lots of work on that this week, and Buttplug JS is now far more resilient and easier to build than it has been in the past. This means we now have "native" servers on Windows/Mac/Linux, versus requiring using sometimes flaky WebBluetooth support on mac/linux.

Throughout the lifetime of the project, I've also had people asking to get Buttplug servers running on a Raspberry Pi. As of last Friday, that's now officially a thing! I got a buttplug-js server up and running on an RPi Zero W, which is a little $10 board with Wifi and Bluetooth. This is pretty huge, as it means we're getting closer to cheap/easy solutions for people who don't have desktops capable for running Bluetooth LE (like the masses out there still running Windows 7). There's also lots of neat embedded projects that could come out of this. The project is still mostly proof of concept right now, but it seems to run pretty well and I have a couple of people testing it out. The end goal is to ship a small embedded box with a web frontend that will hopefully act as an appliance, but there's still a lot of work to get there.

If anyone else is interested in trying out the RPi build, either get at me on the comments or on discord ([https://discord.buttplug.io).](https://discord.buttplug.io).)

Goal for this week is finishing up the Buttplug JS release, then finally getting back to the main GUI so I can start redistributing all of this work and people can finally move off the old C# GUI.

I'm also headed out to Carnegie Melon University to do an art residency, and give a lecture and workshop on Buttplug in 3 weeks, so I'll be working on my material for that.

Thanks for the ongoing support, and keep Buttpluggin'!

- qDot