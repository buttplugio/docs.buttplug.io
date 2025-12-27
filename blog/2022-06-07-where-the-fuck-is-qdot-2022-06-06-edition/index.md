---
title: "Where the Fuck is qDot? (2022-06-06 Edition)"
date: 2022-06-07
---
Been a while since I've dropped off updates for a whole ass month.

# Buttplug
So it turns out if you rush the development of a thing to get it done then sit on it for 2+ years, it takes a while to clean it up. In this case, months.

<!--truncate-->

That said, I think the server side of Buttplug Rust is finally in better working order.

When I started Buttplug Rust's server implementation in late 2019, it was because I found a mostly-already-done way of accessing Bluetooth in a cross platform way through rust. Everything that wasn't that got rushed in order for me to reduce the amount of work I'd have to do by maintaining multiple versions of the server (at the time we already had C# and JS). I... never really revisited things after that, just bolted shit on. "Technical debt" at its finest.

That's what most everything this year has been so far, cleanup from that mess because it was becoming impossible to bolt anything more on. Now that's done, BACK TO BOLTING.

Which will hopefully mean LevelCmd and lots more device support.

There's a bunch of Quality of Life things this fixes too, like most protocol implementations being like, 30 lines of code now, but it's QoL for me and like, 1-2 other people. :)

# Intiface Desktop and Mobile
This is where shit gets weird. In the last update, I mentioned that I was looking at building Intiface Mobile, probably using native APIs.

[Then this comment on btleplug happened](https://github.com/deviceplug/btleplug/issues/8#issuecomment-1132878595).

Someone ported our Rust bluetooth library to work under Flutter, google's cross platform desktop/mobile framework.

Using this as a template, I may be able to have Desktop and Mobile all run under the same codebase, getting us to all platforms WAY faster than my original egui/java|kotlin/swift idea.

I'm researching this in the background while finishing up Buttplug v6, but would really like to have some sort of mobile solution for toy connections ASAP, because the discord gets more and more desktop bluetooth support requests daily, and I'm not sure how much longer we can keep up.

# Not Buttplug
With all of that happening, what am I currently working on?

Eye tracking. >.>

Turns out there's a decent DIY solution to possibly get avatar based eyetracking VR for < $50. I've been working over the past week with a few other developers (who've already been at this for 6 months) to put a solution together for this. It's looking really good so far!

Check out [https://github.com/RedHawk989/EyeTrackVR](https://github.com/RedHawk989/EyeTrackVR) if you're interested.

But yeah it has nothing to do with Buttplugs.

Anyways, that's it for now. Hopefully back to at least every-other-week updates if not every week. :)

Until next time, Keep Buttpluggin'!

- qDot
