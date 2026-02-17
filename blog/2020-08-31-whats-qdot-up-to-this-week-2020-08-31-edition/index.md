---
title: "What's qDot Up To This Week? (2020-08-31 Edition)"
date: 2020-08-31
authors: [qdot]
---
A surprisingly busy week!

# Intiface Game Haptics Router
A request to get the GHR working with Fall Guys yesterday meant a new release. Had to fix up some issues with DLL hooking, but I think they're now finally fixed once and for all. This may require retesting of some games that had haptics but didn't seem to work with the GHR initially.

<!--truncate-->

On top of that, I added simple rotation support! So if you've got a Lovense Nora, Vorze Cyclone or UFO, etc, the vibration speed will now translate to rotation speed.

# Intiface Desktop
The update of Intiface Desktop to support Rust is almost done! The new version of Intiface Desktop will support Rust and C#, making Rust default and dropping node support altogether (you didn't want to be using the node engine anyways, trust me). The C# support is only staying for windows users who I may have broken things for in Rust, but I'm hoping Intiface Desktop will only run one engine within the next 6-8 weeks.

# ... But Why?
The next and much bigger question is... What the fuck is Intiface Desktop *for*? Throughout the past few years I've managed to totally fracture the platform, between the availability of libraries on native/web, the ability to build them embedded or using ID, etc. So it's hard to say *why* people should use it. I'm starting work now to figure out how (for lack of a non-businessy term here) to realign all of the Buttplug/Intiface properties to make things a little more obvious and streamlined. More on this as I figure it out.

Some of the things I'd like in Intiface Desktop:

 - Device setup/tests
 - Device simulators for developers
 - App library, maybe some sort of launcher/installer?
 - Web synced app updates?

Thinking in the direction of a sort of games launcher (Steam, Epic, etc) for sex toy apps, probably closer to Itch than anything.

And yes, if you just want something that will run a main server and gets rid of all that crap, I'll be making a stripped down version too. :P

Feel free to comment if you have things you'd like to see in ID.

Anyways, that's it for now. Long weekend coming up, so hopefully getting a lot done then!

Until next time, keep buttpluggin'!

- qDot
