---
title: "What's qDot Up To This Week? (2021-02-15 Edition)"
date: 2021-02-15
---
Being mad at The Handy?

# Buttplug
Been a week of bug fixes and hardware updates in Buttplug.

<!--truncate-->

The biggest thing, which I've already announced here, is support for The Handy ([https://thehandy.buttplug.io](https://thehandy.buttplug.io)). This took more work than it really should've because they did weird shit with their protocol (trying to mimic mine) without asking me for advice, but I've yelled at them about it and hopefully it's the last time. Hardware seems happy now.

Also fixed some MAJOR bugs (buttplug would ignore StopAllDevices commands, as well as crashing if you tried to set a toy to full vibration speed!). More firefighting than I'd like, but tests are going in with every fix, so hopefully we'll move toward better coverage and less dumb breakage.

# Btleplug
This is really a bit orthogonal to what I cover on this discord, but as a quick update, the bluetooth library that I maintain is now seeing a ton of work from the Rust community! This should hopefully mean more stable bluetooth support in Buttplug in the next few weeks. Really excited about this.

# VAMLaunch
I'm running builds to update VAMLaunch in the background while writing this post, so I'm hoping v2 will be out tonight or tomorrow. Keon support seems fine, and it should have Handy support too.

# Intiface Game Haptics Router
If you use the Intiface GHR, and are on v11-13,** YOU WILL NEED TO MANUALLY UPDATE.**

I broke the updater in v11 and it stayed that way more a bit. Download v14 from

[https://intiface.com/ghr](https://intiface.com/ghr)

# Other Stuff
Since buttplug-rs/c#/js are now stable, most of my time not spent firefighting is spent upgrading older software. Needs to happen but good lord there's a bunch of it.

Buttplug Playground has been updated to buttplug-js v1.x. It basically works but def has bugs still.

Work continues slowly on Intiface Desktop v20. I think it's mostly ready to go, just trying to make sure I don't flub yet another release, as has been the case with pretty much everything lately.

I started porting Buttplug Unity to buttplug-C# v1.x, but I have completely forgotten how Unity works so this is slow going.

Once Unity and Intiface Desktop are done, it's on to Buttplug Twine and the Intiface Tutorial. After that, I *think* I'll have dragged everything I've developed and am still maintaining up to the current library version.

Hoping to crank out some new Youtube Videos soon, finally got my desks cleaned up enough to set up my filming equipment again, and I have tons of toys to look at. Also hoping to start a new series where I go over how different programs that use Buttplug work (like the GHR, ViRo Club/Buttplug Unity, etc). I'm going to be adding Youtube Video Credits as a tier reward again, will be sending out updates for that in the next day or two.

Ok gonna cut things off here for now. Until next week, Keep Buttpluggin'!

- qDot
