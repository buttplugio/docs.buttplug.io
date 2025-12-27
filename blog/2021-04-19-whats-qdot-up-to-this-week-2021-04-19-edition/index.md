---
title: "What's qDot Up To This Week? (2021-04-19 Edition)"
date: 2021-04-19
---
Ok maybe if I write these in the morning I'll actually remember to send them out...

# Buttplug Unity
Most of the last two weeks have been spent trying to wedge Buttplug into Unity in a way that will work with IL2CPP. For those not familiar, IL2CPP is a way for Unity to compile games to make them run faster, but it takes a lot of consideration when building libraries to work with it.

<!--truncate-->

So much consideration that I had to rearchitect a non-trivial portion of Buttplug. :|

That ended up being Buttplug v3 (which came out last week), then most of this past week has been trying to get the FFI layer updated so the C# stuff will work with Unity. As of yesterday I finally have a solution that I *think* works everywhere. I managed to get toys vibrating in IL2CPP production builds as far back as Unity 2018, so that's a good sign. Cleanup is happening now, hoping to have this out later this week.

The big outcomes of this will be updates to the FarmD ([https://patreon.com/softscale)](https://patreon.com/softscale)) and ViRoPlayspace ([https://viro.club)](https://viro.club)) games, as well as hopefully being able to discuss starting toy control work with Dominatrix Simulator. The work on the FFI will also hopefully put us in a somewhat better position to look at C/C++ integrations, which gets us moving toward Unreal Engine integrations. Maybe Java bindings too?

# Everything Else
The workload mentioned above has eaten my life, so there's not a ton to say otherwise. Plans for the near future include:

 - Hopefully making a youtube video on the OhMiBod Lumen, now the smallest Bluetooth buttplug (the toy type) usable with Buttplug (the library). tl;dr: It's pretty good, but has the same connection issues as all other butt toys currently
 - Writing up a blog post on our issues with butt toys and how I plan to fix them (i.e. finally getting some sort of mobile interface working, so you can use your phone as the hardware controller and connect that to desktop apps)
 - More FFI expansion
 - More hardware support

That's it for this week. Until next week, Keep Buttpluggin'!

- qDot
