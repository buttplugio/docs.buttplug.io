---
title: Whats Qdot Up To This Week 2022 02 07 Edition
date: 2022-02-07
---
A short one because...

### Buttplug
... Things got difficult.

<!--truncate-->

Right now I'm trying to implement one of the most important features of Buttplug v6: User device settings. This will allow you to set cosmetic things like device display names, which is pretty easy. However, it's also required for far more important features, like minimum device communication gaps (to stop programs that send too many commands and jam up BLE queues) and step ranges.

Step Ranges are a way to say "A device has a minimum speed of x, and a maximum speed of y". This is a nice to have for things like vibrators (so you can just tune out speeds that are too low), but is the only way to make things like fucking machines safe to use with the library.

Implementing this has turned out to be quite challenging, due to the way we structure the library and store configurations. I've gotten the basic system working and some tests implemented, but I've already had to redo things multiple times to make it work, and it's not quite as future-proofed as I'd like.

Working on this design and implementation took up pretty much all of the time I had to work on anything last week. I'm pretty confident I'll have a full solution ready this week and can hopefully get on to other things.

### In Other News

 - It's similarly boring to the previous news, but there's a new version of the windows API library we depend on for Bluetooth that should fix a bunch of issues like device disconnect (WE'LL BE ABLE TO DROP DEVICES IN-PROCESS ON WINDOWS FOR THE FIRST TIME EVER) and OS compat. Will probably end up in a new Buttplug v5 this week.

So, yeah, not every week can be exciting I guess, but getting this feature done should really improve quality of life for developers and users.

Until next week, Keep Buttpluggin'!

- qDot