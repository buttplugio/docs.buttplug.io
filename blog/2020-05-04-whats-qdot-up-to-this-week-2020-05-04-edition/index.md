---
title: Whats Qdot Up To This Week 2020 05 04 Edition
date: 2020-05-04
---
3D Printing all the things!

### New Hardware
My Prusa i3 MK3S arrived a couple of weeks ago, so I've been pretty busy working with it over the past week or so. First order of business was printing parts for the OSR2+ ([https://patreon.com/tempestvr),](https://patreon.com/tempestvr),) which is now all done and working! You can see video at

<!--truncate-->

[https://twitter.com/buttplugio/status/1256682208938438662](https://twitter.com/buttplugio/status/1256682208938438662) 

I'll be doing a youtube video series on this very soon, as it's a super intriguing project with an extremely lively community. It's also making me have to consider how to support multi-axis, realtime control in Buttplug, which is a good thing! Just not something I'd expected to have to do quite so soon. :)

### Buttplug
On the programming side, work continues on Buttplug-rs. I'm now implementing serial port support, which will hopefully mean the return of estim controls (ET-312/MK-312, ET-232, 2B), as well as controls for the aforementioned OSR2+.

The biggest thing that will fall out of that is support for the fucking Lovense Dongle, which we are now getting support questions about *daily*. Lovense's website has people convinced they can't use regular bluetooth, and honestly the dongle does handle things like Windows 7, so trying to get that done ASAP.

### Intiface Desktop
Of course, getting new Buttplug stuff done doesn't mean much if no one but developers can use it, so I'm also working on Intiface Desktop again to add support for downloading the Rust engine on all platforms. There have been quite a few issues with Intiface Desktop and engine installation recently (apologies to those of you that have had support issues and haven't heard much back from me), so I'm hoping to take care of those while fixing this.

### The Poll
As you may remember, a couple of weeks ago I posted a poll both here and on twitter about what people would like to see. On here, library features came in first, follow by apps, then project documentation. On twitter, It was documentation, then library features, then apps (and a few people wanted more youtube videos!).

My plans right now are:

 - Finish the next version of the library/CLI/Intiface Desktop.
 - Document things, because what's out there now is old enough to be wrong and it's starting to confuse people.
 - Revisit apps (playground, syncydink, Unity Support) while continuing to iterate on library.

That's it for now. Unfortunately, due to the pandemic situation and my day job things are moving a bit slower than I'd like, but I'm trying to keep things as productive as I can. Hope everyone is staying safe!

Until next week, Keep Buttpluggin'!

- qDot