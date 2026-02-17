---
title: "What's qDot Up To This Week? (2020-07-06 Edition)"
date: 2020-07-06
authors: [qdot]
---
Being my own social media intern.

# Animal Crossing New Horizons / CGHR
Most of last week was spent tracking the media spread of the Animal Crossing/CGHR project. It managed to hit Vice, DailyDot, Kotaku, AVClub, and a ton of European, South American, and Chinese outlets too. Still seeing posts here and there today, but it's mostly died down now. Overall, reaction was neutral. Lots of confusion, lots of misreporting about how the system worked, but Youtube traffic bumped 100% over the past 2 weeks, got about a 10% follower increase on Twitter, and Buttplug website traffic is up 2-4x. I expect all of those numbers to fall off pretty quick.

<!--truncate-->

Luckily I also had a 4 day weekend, which means I'm finally rested up enough to start coding again on...

# Buttplug
I hadn't touched buttplug-rs in about 2.5-3 weeks, and last I'd left it there were about 200 compile errors 'cause I was ripping out and replacing the error system.

Good news is, that's all done, and the error system is now far more usable in terms of typing. Before this, there were just 5 types of errors and some string descriptors for those, which were impossible to really catch and do much with. We now have many, many error types, meaning that we're now on the other end of the spectrum where you can drill down to the type of error thrown but figuring out whether it's useful is difficult. I'm going to continue ironing this out, but it's still better than it was.

My hope is to now get back to a combination of hardware implementations (serial ports, lovense dongle, etc), protocols (basically everything still missing from C#), and tests. Next "fun" project outside of that will probably be looking at the FFI layers so we can start running C# on top of rust.

# Everything Else
We're quickly approaching the point where I'm going to have to switch off and work on other non-buttplug libraries for a bit. This includes:

 - btleplug, which needs both async APIs and lots of cleanup on windows/mac, but the first job is really just making sure we get device disconnects on windows
 - Intiface Desktop, as I need to start integrating functionality to use the rust executable in it
 - systray-rs, a little utility I wrote back in 2016 to make tray icon apps in rust. I'd like to have a version of Intiface CLI that uses this, so people can run it without having to bring in all of Electron.

Getting to the point of working on this stuff means that the Rust library will have stablized enough to really be considered the core logic of Buttplug. It'll still be a while before it's ALL we're using, but that's at least looking like near-to-medium term versus long term work now!

I'm also considering trying to make more short Youtube videos, but if that happens I'll be making another post about it soon.

That's it for this week. Until next week, Keep Buttpluggin'!

- qDot
