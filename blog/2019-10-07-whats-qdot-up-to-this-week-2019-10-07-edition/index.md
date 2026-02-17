---
title: "What's qDot Up To This Week? (2019-10-07 Edition)"
date: 2019-10-07
authors: [qdot]
---
Rust. That's it. Just rust.

# Buttplug
Ok, well, not quite. I did actually take the time to do a couple of other things:

<!--truncate-->

- Buttplug C# 0.5.1 was released, adding Motorbunny support
 - Buttplug JS 0.12.1 was released, adding Motorbunny support and fixing a serious bug in the JSON parser that had been there for a whole year. :(
 - Vue Components and Buttplug Playground got quick releases to integrate that JSON parser fix and also fix another bug on Intiface Desktop connection because Promise.all() does not work like I thought it did (I apparently wanted an equivalent to Promise.allSettled(), which is not in most browsers yet. I'm just so ahead of my time.)

Outside of that, RUST. RUST ALL THE TIME. For some reason I've really managed to get a grasp of the language this time and the implementation is going surprisingly well (even though I'm on Rust 1.39 using beta features that won't be in stable for another month >.>). As of tonight I have a client that can connect to the node/C# server implementations via websockets. Still a lot of work to do, but it's coming along really well and I'm fairly convinced this is going to make life way easier for everyone going forward, and by everyone I mean me.

That's it for this week.

Until next week, Keep Buttpluggin'!

- qDot
