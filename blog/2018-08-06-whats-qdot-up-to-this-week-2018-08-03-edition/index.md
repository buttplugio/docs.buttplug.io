---
title: Whats Qdot Up To This Week 2018 08 03 Edition
date: 2018-08-06
---
When it rains, it pours.Even though no one may really notice. >.>

I spent all of Friday evening and most of Saturday completely rewriting our C# Client interface. The current version didn't really mesh with the Client code in our Javascript library, and I wanted similar architectures between the two so that I could write one set of documentation for both APIs. We're now much closer to that possibility.

<!--truncate-->

In terms of what this means for you as a user of Buttplug? Right now, not a ton. This is all developer focused work. However, with the ability to now combine docs across languages, it means I can provide guidance to those interested in using Buttplug in their software, which hopefully means more Buttplug software in the future. Think of this as making boring investments now for hopefully more exciting work later.

With this also comes the ability to start connecting pieces together in different ways. For instance, I could now rewrite the Game Vibration Router to work on desktop, or connect to our Android app on a phone. We no longer require everything to exist on a single desktop for C# stuff. I'm also hoping this could move us toward exposing a C# GUI on top of the node server, which would finally solidify our Windows 7 support into the same frontend that the Win10 stuff runs on.

I'm finishing up this work over the next week, and then figuring out how all of these should be released and documented (which is the opposite order in which things should normally happen but yay open source).