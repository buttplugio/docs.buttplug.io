---
title: Whats Qdot Up To This Week 2018 11 09 Edition
date: 2018-11-11
---
Well, after releasing Buttplug C# 0.3.0, someone found a bug, so I released 0.3.1 this week! Yay releases that take less than 5 months!I'm also talking to the author of ScriptPlayer about starting to port it to Buttplug C# 0.3 at some point. This would remove the Websocket requirement (as we now have other, more direct ways to connect. If you're wondering, it's IPC over Named Pipes), making connection much easier.

We've also identified a Bluetooth chipset that none of our software seems to work with. Qualcomm Atheros Bluetooth (usually built into motherboards on laptops) doesn't seem to work with Buttplug *at all*. I'm not sure what's up, but I've been doing a lot of support on that lately.

<!--truncate-->

With that plus the neverending wails of Win 7 users in mind, I've come up with a new, possibly really stupid idea for being able to connect desktops to phones directly. I call it the "Web Relay". Since it ended up being Buttplug Issue #69, it's actually the "Nice Web Relay". You can read more on this [https://github.com/buttplugio/buttplug/issues/69.](https://github.com/buttplugio/buttplug/issues/69.) I'm not sure when I'll get around to it, but if it works, it could solve quite a few problems for people with Android phones and Win7 desktops.

Outside of that, I've been trying to put together some general project-wide goals to work on next. I'd really like to get out of the library development side for a bit before the year's end and actually build some apps, but want to make sure I've got the project direction laid out well before I get off on to that.

Finally, this week I'm off to Toronto to do my first speaking gig about Buttplug ever! I'll be speaking at the Society for Literature, Science, and the Arts annual conference about Buttplug as a research tool for remote interfaces and communication of intimate information. There's more info on the conference at [https://litsciarts.org/slsa18/.](https://litsciarts.org/slsa18/.) This probably means things will be quiet on the code front for the week, but I'm off for the US Thanksgiving week afterward, so hopefully I'll have some time to work then.

 As always, thanks for your continued patronage!