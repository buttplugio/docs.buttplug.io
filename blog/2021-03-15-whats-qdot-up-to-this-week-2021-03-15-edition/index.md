---
title: "What's qDot Up To This Week? (2021-03-15 Edition)"
date: 2021-03-15
---
Weird week. Weird fuckin' week.

### Ear Haptics
Yeah ok so that whole VRChat thing? It's been givin' me *ideas*.

<!--truncate-->

We've already conquered vibrating toys in VRChat fairly thoroughly via plugins like XXXHaptics and VibeGoesBrrr. There's a lot to be done on interfacing, but that's truckin' along just fine.

But what about the rest of the body?

For vests/hands/feet, there's companies like bHaptics and oWo (yes there's a haptic company named oWo and I think they have zero furries on staff). bHaptics also makes a vibrating face mask for VR headsets for some reason.

But what about ear pets and headpats?

Well, we ain't got shit. Or didn't until last weekend.

Here's a picture of me in a rig I built in about 4 hours on Saturday:

[https://twitter.com/buttplugio/status/1370940208523350021](https://twitter.com/buttplugio/status/1370940208523350021)

This project was twofold:

 - I wanted to be able to feel ear pets on my av in VR without needing visual confirmation, like standing in front of a mirror.
 - I wanted to exactly how hard it is to stand up DIY hardware on buttplug.

I now have a better idea of both of these.

The rig itself consists of:

 - A RPi 0W running a simple python script that's a http-to-i2c bridge (didn't want to fuck with rust compile times here and it's not doing much)
 - 2 haptics motor drivers
 - 2 ERM coin motors

For the ear pets, things... work, but it's VERY experimental right now. I was taping the motors to my ears/head, they're ERMs instead of LRAs (LRAs are still in shipping. For those not familiar: ERMs are the big spinny motors like they used to have in gamepads. LRAs are smaller, faster, more controllable systems, like the motors in the switch joycons or that simulate taps/clicks on your phone), etc... I need better mounting mechanisms, more tuning, etc...

For Buttplug, well... It took me the better part of 2.5 hours to integrate this. This required adding network communication managers, wiring the protocol up to control the motors, getting the device configs running, as well as modding my VRChat avatar and making sure VibeGoesBrrr would talk to the motors. With all that done, I now have per-ear haptics.

And have also found out that my ears go numb pretty quick.

I've got 100 controller chips on the way in order to expand this project, as these nodes are made to be modular so we can cover basically wherever we want on the body. I'm not really sure if this project is going to end up as a product, but it's been a great way to get a better idea of what approaching buttplug as a DIY builder is like.

(it sucks and needs fixing)

### Everything Else

 - [https://xtoys.app](https://xtoys.app) is now using Buttplug for some of its protocols! :D
 - I've found out that a lot of people in the audio erotica scene are using syncydink for funscripts + audio. If you're one of them and you have opinions, please comment or get in touch. I'd like to at least think about making life better for y'all.
 - Trying to knock out some bugs in Buttplug, but VR (and life in general) keeps getting in the way. I expect there will be a bit of a library development lull for at least a couple more weeks, but actually getting in world and seeing how the library is used has been massively helpful.

That's it for now. Until next week, Keep Buttpluggin'!

- qDot