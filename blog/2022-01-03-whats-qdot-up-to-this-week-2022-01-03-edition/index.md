---
title: "What's qDot Up To This Week? (2022-01-03 Edition)"
date: 2022-01-03
authors: [qdot]
---
Back to the dayjob...

# Buttplug
The Intiface Desktop Alpha last week surfaced some bugs! Mostly that if someone has a Lovense dongle and a Bluetooth dongle connected at the same time, they'd fight each other.

<!--truncate-->

Also found out that there's been a blocking issue in the serial port implementation that's made OSR-2/SR-6 performance suck with Buttplug. Fixed that too.

Released Buttplug v5.1.6/Intiface Engine v46 this weekend, fixing the above issues as well as backing off the version checking problem that was crashing people with custom devices.

I've started planning for Buttplug v6, which will finally include new messages (meaning support for the Lovense Max Air Bladder, fucking machines like the HiSmith, possibly kegelcizers and other input devices, triggering on-device patterns, etc), as well as a bunch of quality of life fixes.

If you're curious what that release might look like, the relevant kanban board is here:

[https://github.com/buttplugio/buttplug/projects/1](https://github.com/buttplugio/buttplug/projects/1)

# Intiface Desktop
Lots of work happening on the new Intiface Desktop, thanks to input from everyone here that tried the first few betas! I can't stress enough how much help its been to get feedback early and often. :D

I should have another release out this week, which will most likely be the last closed alpha before I go to public beta. There will be some small changes to UI, but mostly concentrating on filling things in and fixing bugs for the time being.

# Other Stuff

 - I've updated the Awesome List: [https://awesome.buttplug.io.](https://awesome.buttplug.io.) This includes adding some FFXIV stuff, as well as moving things with multiple apps/plugins (vrchat, ffxiv, minecraft, etc) into their own sections.

That's... actually it for right now. Mostly concentrating on trying to get the new Intiface Desktop to beta, then it's on to documentation, Buttplug v6, and hopefully something new!

Until next week, Keep Buttpluggin'!

- qDot
