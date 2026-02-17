---
title: "Whats Qdot Up To This Week A Lot 2023 09 11 Edition"
date: 2023-09-11
authors: [qdot]
---

Ok well I guess I'm back on the development wagon.

# Buttplug Teledildonics
I've been feeling like developing again lately (and not only because I finished Baldur's Gate 3), so I decided to try to make headway on some fun projects instead of just diving back into the library specifics.

<!--truncate-->

First and foremost: I have a proof of concept of Buttplug Teledildonics working.

This is a subject that will probably need a whole blog post, but tl;dr: I have a very easy way to do peer-to-peer and server-client style remote connections for Buttplug using WebRTC. I ran my first test on saturday, streaming a GHR session to someone on the other side of the US while doing screenshare through Discord, and it worked wonderfully. I'm planning on doing another stream with multiple viewers at some point soon to see how that works out, will post here when I've got that scheduled.

There is a LOT to do before this is usable in the wild, but it will most likely power our upcoming desktop/mobile interconnect system first (to make it easy to forward to control to a phone when using desktop apps/games that don't have an easy way to set server addresses).

Feel free to poke me on here or Discord if you have any questions about this.

# Buttplug WASM
Due to several requests, I'm working on getting the Buttplug Server component (the part that actually talks to hardware) compiling for the web again. This will allow people to run Buttplug completely within Chromium/Blink based browsers (though I still recommend connecting out to Intiface Central if at all possible), a feature several apps depend on now. The code is done, I've just got to figure out packaging, which I am... not looking forward to (this involves webpack :c ). 

# Intiface Game Haptics Router
I also updated the GHR finally! The way the GHR was working was to watch a system called XInput for Gamepad commands. XInput has now been EOL'd in favor of another system, known as UWP Gaming Input. Unity now compiles to this API instead of XInput, meaning some games were simply not even showing up on the GHR anymore, or were showing up as XInput but not working.

With this addition, the GHR *should* work with many new games. I've only tested it with one so far (Pawperty Damage), but I suspect we'll be hearing about more games after I get this released. I just have some cleanup to do, should be ready to go later this week.

In addition, I'm looking at adding some very simple "cheat" style routing to the GHR. This would allow people to use programs like Cheat Engine to find health/damage/etc values in games, and we could pick those up and route them to toys via hooking. I'm still working out the design and feasibility on this, but it could make the GHR much more useful in the future. More info on this soon.

# Everything Else
Life is starting to become *slightly *less hectic but still isn't great. Really hoping to keep up on this new momentum though, I'm actually excited about working on stuff again for the first time since I got the mobile apps shipped.

This has been the biggest week for Buttplug development since January. Excited for what's to come!

Until next time, keep Buttpluggin'!

- qDot
