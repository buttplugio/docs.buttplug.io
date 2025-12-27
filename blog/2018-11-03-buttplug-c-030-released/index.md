---
title: "Buttplug C 030 Released"
date: 2018-11-03
---You ever see someone do something dumb and be all "oh yeah I'd never do that thing" then you totally do that thing?I did that thing.

Buttplug C# 0.3.0 has been 5 months in the making. For what is basically a one-person project now (I'm working on the core alone at this point, after realizing most of the design for this is in my head and I'm not real great at writing that design down yet so it's hard to ask for help), that is kinda ridiculous. It's been a massive overhaul that could've maybe been done in smaller chunks, but there comes that problem of "what if someone uses it in the middle and I break them with the constant changes". Going silent for 5 months isn't super helpful either though.

<!--truncate-->

Anyways, Buttplug C# 0.3.0 is done now, released on Nuget so other developers can get to it. If you're wondering what this means:

For Developers:

- The whole API is now WAY more friendly to developers. Before 0.3.0 everything was very... raw because I was still figuring out what things should look like. Since that was solidified earlier this year, I could spend a lot of time thinking about how to make life easier on everyone, versus on how the system should even work in the first place.

- There are now tutorials in the repo, so people have example code to work from. This is a huge deal, as before this the only examples were the Server/GVR/etc, and those are... not pretty.

For Users:

- Um. This release don't mean much for users, yet. This is ONLY a release of the library, not the Server/GVR/etc apps. The hope is that since life will be easier on developers now, there may be more apps made using the library soon, which means more stuff for users. That make take a bit though.

As for what I plan on doing next, the problem is now too many directions and too little me, heh.

- Upgrading the Server and GVR to 0.3.0 (this is priority #1)

- While the C# library is out, it's not exactly well tested. There's tests in the library itself, but the real QA happens from other people using it and telling me what they like and don't. So that'll be on-going work.

- I am now confident enough in the C# library to really start thinking about Unity work. Luckily I also have Unity knowledgeable devs available to help with that.

- More hardware support in C#, including Nintendo Joycons, RealTouch, etc...

- I need to bring the JS library up to date with the C# library. Hopefully that won't take NEARLY as long as bringing the C# up to (and past) the JS library, which is what most of this was.

- Probably going to write a Python client, because I get LOTS of python requests and already own the Buttplug PyPi package.

- I really, really need to get bug fixes out for Playground and Syncydink. For some reason, the Launch won't connect for me on Chrome WebBluetooth anymore, which is a big problem.

- More youtube videos!

Obviously, if you have stuff you'd like to see me work on, now is also the time to speak up. :)

Thanks again for supporting the project through what has been a somewhat content-dry period. I really do hope things pick up after this, both for the sake of that you're all giving me money, and because I could use a bit of excitement myself now.