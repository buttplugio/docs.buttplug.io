---
title: "What's qDot Up To This Week? (2023-06-26 Edition)"
date: 2023-06-26
---
Still bein' a nurse...

### Buttplug
Looks like Buttplug Protocol v4 gonna be happening a lot sooner than I expected!

<!--truncate-->

I've been working on trying to make life easier on developers, and one of the big goals there is "you should be able to control every device using a single number that represents some sort of vague intensity value". Will this be a *good* experience? Probably not. But since Buttplug gets used a lot for shitposts, and also people get confused by the current granularity of device control, I'm trying to hit a happy medium that allows ease of use with advanced controls for those who need them, and I think I've found a good way to do that.

Except that Buttplug v3's messages don't support the ability for a single actuator (output) on a device to be driven by multiple types of messages.

So I gotta fix that. It's not a huge deal, but fixing that plus some issues with sensors will make life *so* much easier on other people writing clients. I've had the authors of the python and an alternative C# client asking about this for months and I was trying to make the current system work, but it's just not worth it.

Not sure how long the new v4 design will take, hopefully weeks rather than months. Once that's done, I've got a lot of documentation updates to do, then hopefully buttplug as a library will be stable and quiet for a while and I can work on other things around it.

### Everything Else

 - Life is still busy with the medical stuff I outlined in the last update, so in general things are very, very slow right now. But the community is doing things like...
 - [BUTTPLUG VALLEY, A STARDEW VALLEY BUTTPLUG MOD](https://github.com/DryIcedTea/Buttplug-Valley). Yes there is now a stardew valley mod for vibrators! 

That's it for now. Until next time, keep buttpluggin'!

- qDot