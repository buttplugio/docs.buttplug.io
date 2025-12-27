---
title: Coming Soon - An Application I Have Yet to Name But That Involves the Buttplug
date: 2017-04-30
---Last week, after 4+ years of trying to figure out some completely cross platform solution before even starting to build my sex toy server application, I decided to just do a quick implementation in C#, which should at least cover Windows 10 Creators Update (possibly earlier versions if you don't mind losing BLE device support), and possibly iOS and Android if Xamarin works out.Turns out, this ended up being a pretty good idea, because I now have a basic system working that can communicate via json over websockets, to control the Fleshlight Launch, as well as gamepad rumble. I'm now working on getting a simple CLI and GUI together for it, as well as some documentation and tests, and I'm hoping to make a v0.0.1 release this week.

<!--truncate-->

You may have noticed the overly long title to this post, though. Originally, I was just going to call everything Buttplug, 'cause that's what I do. The library, the application, all of it. However, after talking to a few people and doing a bit of thinking, I realized I should probably leave the reusable library portion of the software named Buttplug ('cause then I can say software has Buttplug inside :D ), but the application name should probably line up across Desktop and Mobile platforms, and should probably be somewhat innocuous, just in case I try to get this into the app stores (it'll be free there, mostly using that for distribution). I'm still working on what that name is going to be, but I've still got a few days before I have things releasable, so I've got time to think. If anyone has any ideas, I'm listening.


For anyone interested, the repo for all of this work is [http://github.com/metafetish/buttplug-csharp.](http://github.com/metafetish/buttplug-csharp.) I still plan on doing a cross-platform Rust implementation, but this has already given me a lot of ideas about how this should be put together that will be helpful for all future implementations.
