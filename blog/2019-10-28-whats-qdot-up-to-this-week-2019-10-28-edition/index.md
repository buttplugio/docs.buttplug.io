---
title: "What's qDot Up To This Week? (2019-10-28 Edition)"
date: 2019-10-28
authors: [qdot]
---
Enjoying having electricity again!

My power went out as part of the California wildfire outages that've been all over the new. We were out for just under 48 hours.

<!--truncate-->

That sucked.

Anyways, on to updates.

# Buttplug
The Rust implementation of Buttplug continues to be the headline news here. It's still coming along quite well, with the client implementation now working completely. Sure, it's a mess, but it's a working mess!

We can connect to Intiface Node/C# CLIs, enumerate and control devices. The next order of business will be lots of cleanup and documentation, all well as starting work on the FFI layer for C#, just to figure out how that's going to work. Once Client for both Rust and C# are solidified (which will put us in a very good position to start considering **Unity plugins!**), then it'll be on to reimplementing the server side of things.

The Buttplug Rust Crate is still using lots of beta features, and may possibly use unstable features of the async-std library soon (for async MPMC channels to deal with events/observables easier), so I'm not sure when I'll be getting a new version of it up on crates.io. I'm gonna try to get at least something up when Rust 1.39 comes out a week from Friday (Nov 7) tho.

# Intiface Game Haptics Router
I don't have any specific updates on the GHR at the moment, but wanted to talk about some possible upcoming changes, as I'm getting a lot of questions about/interest in it.

One of the big gaps in the GHR at the moment is the lack of ability to use it with anti-cheat enabled games like OverWatch, LoL, etc... Apparently a LOT of people really want to do naughty stuff in OW, so I'm looking at ways around this right now, including:

 - USB/BT hijacking to watch HID packets
 - ML/CV implementations

The ML/CV idea (i.e. train models/use classical CV methods to process real time screen captures) is interesting in that we could possibly parse context versus just "rumble happened therefore we make things vibrate". This would give us a better foothold in places like the Healslutting community, though figuring out how to extract the context we need for this to be useful will be a LOT of work. I'm talking to some other developers who run games services based on this idea now, just to see what's possible.

Anyways, that's it for now. A fairly technical update this week, but all good stuff! Hopefully more to show for it soon. :)

'til next time, Keep Buttpluggin'!

- qDot
