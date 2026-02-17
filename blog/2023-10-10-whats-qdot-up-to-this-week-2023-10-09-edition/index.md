---
title: "What's qDot Up To This Week? (2023-10-09 Edition)"
date: 2023-10-10
authors: [qdot]
---
Playing Cyberpunk 2077 so much that I forget it's Monday and therefore write my update on Tuesday. :|

## Intiface Central and Buttplug
Anyways, Intiface Central v2.4.5 is now out! There was a v2.4.4 but we don't talk about that because I completely hosed Lovense Dongle support in it.

<!--truncate-->

This release took *way* too long to get out, mostly because of scope creep and my still unpredictable schedule. I ended up just making a hard cut after I finished mDNS and calling what we have at the moment done.

The big new features:

 - Joycon support on Desktop
 - mDNS Advertising on all platforms - Experimental, I didn't have a lot of time to test it. This will allow Intiface clients/servers to find each other on the local network instead of users having to type in IPs.
 - Crash Reporting on all platforms - Experimental (until I feel like I have the privacy where I want it) and opt-in 

We're already getting a ton of crash reports, so thanks to anyone who has turned those on!

The next 4 things ahead:

 - iOS Backgrounding - So people can run the app on iOS and still control their toys when its not on focus and not have the whole thing disconnect. This is *surprisingly* difficult to pull off.
 - Intiface Central Phone/Desktop Interop - This will allow users to use their phone to control hardware, with apps interacting with intiface central on the desktop. There's two reasons we need this: older apps that don't give a way to select intiface central addresses, and websites that can't connect offsite to insecure endpoints (i.e. https site on desktop trying to talk to non-secure websockets on a phone, which all browsers will block). There's also the chance we could just run a self signed certificate in front of the mobile app too, but teaching users how to debug and bypass that is a nightmare which is why I took that feature out in the first place years ago.
 - News/Log panel updates in IC - Just needs some UI work.
 - Buttplug Spec v4 - Mostly for developers, but this will fix some issues in Buttplug v3 as well as hopefully futureproof us for more complex devices that will have sensor/actuator interactions (i.e. motors with encoders, etc...)

Ideally all of this will be done before the end of 2023, but we'll see what my schedule ends up permitting. Assuming we do get it all done though, we'll be in very good shape to start looking at actual implementation of the Remote Control project that I did a proof of concept for last month.

## Everything Else
I don't actually have a ton to write here myself, I've been so busy on the above content that I've not really been able to pay attention to much otherwise. Things have been pretty busy in community contributions though, so keep an eye on the Awesome list ([https://awesome.buttplug.io)!](https://awesome.buttplug.io)!) We have a C++ and Kotlin client, an Unreal plugin, and other things happening!

Anyways, that's it for this week. Until next time, Keep Buttpluggin'!

- qDot