---
title: "Buttplug C 020 And Buttplug Js 050 Released"
date: 2018-01-22
authors: [qdot]
---

Fucking. Finally.It's been 4 months since the last release of the C# applications and library, which is just way the fuck too long for a small project like this. I'm really hoping we'll speed up iteration on that side, because I've released... wow. 12 versions of the JS library in that time.

If you upgrade the C# applications (WebSocket server, Game Vibration Router, etc...), chances are you're probably not going to notice much in the way of changes. While there's some new hardware support (ET-312, Youcups, etc...), most of the changes in these releases are deep in our libraries, around how we communicate let applications communicate with devices. Since you're giving me money, I figure you may be interested in some details, so here you go:

<!--truncate-->

Back in August of 2017, I'd been working on Buttplug for about 4 months with no releases yet, and was getting a little stir crazy. I ended up jumping the gun a bit and putting out 0.1.0 without really considering what we'd done at that point. That means we have messages that are... not very ergonomic. 

For instance, if you want to make something vibrate, you normally used "SingleMotorVibrateCmd". While this supports an infinite speed range, it only does so for one vibrator. The Wevibe has 2 vibrators, the lovense edge has 2, the mysteryvibe crescendo has /6/. So we were throwing away a lot of toy capabilities. 

Similarly, for controlling the fleshlight launch, we have a message named FleshlightLaunchFW12Cmd. Ugly, right? You send it a position and a speed, and it just sends that to the fleshlight launch. However, thanks to funscript, we have a lot of movies that are encoded with commands for position and time to move to that position from the last implied position, which we then have to calculate speed for. If we're gonna adapt those commands to vibration or estim or whatever, we have to do a lot of message gymnatics around that.

To fix these issues, we now have messages like VibrateCmd and LinearCmd. VibrateCmd takes up to an infinite number of speeds, for an infinite number of vibrators. LinearCmd takes up to an infinite number of positions to move to within a certain amount of time for a certain amount of linear movers (the launch only has 1, but the real touch, with its belts, has 2). From those, we can adapt as needed between devices, and we're also future compatible for toys we don't even know about yet.

Planning for this and making sure things would be backward compatible with what we've written so far is why all of this took so long, and why it kinda doesn't look like much on the outside.

Having these features in will allows us to start retrofitting applications like syncydink and playground to take advantage of more toy features (so for those of you that read this far, YES I AM GETTING BACK TO SYNCYDINK WORK SOON). We're also developing new applications that will benefit from this.

We've also massively increased test coverage on both libraries, meaning shit will hopefully break at least a little bit less.

Anyways, that's it for now. I'll hopefully have more frequent updates about application upgrades soon, and now that this release is out, I can finally work on the videos I've written scripts for, so new Buttpluggin With qDot eps soon!

Thanks for your continued support!
