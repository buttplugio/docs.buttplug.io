---
title: "What's qDot Up To This Week? (2020-02-17 Edition)"
date: 2020-02-18
---
Yesterday was a US Holiday so this update is happening a day late. :)

### Buttplug
Releases! So many releases!

<!--truncate-->

- buttplug-rs 0.1.0 - Finally released a new version of the rust buttplug library, with the new server code. It's not completely done, but I was at the point where there were more new commits in the dev branch than there were in all of master, so I needed to merge and start making smaller updates. From here on out, hopefully it'll be smaller, more frequent releases
 - buttplug-twine - Finally finished it! I was working on my GDC slides, needed a quick Twine demo, and realized that buttplug-twine didn't work at all now. After about an hour of fixing, it's ready to go and seems vaguely usable. Could definitely use more documentation, but hopefully I'll get to that post GDC
 - intiface-cli-rs v0.0.1 - Same as intiface-cli for js and C#, but in rust. Will be our testing platform for buttplug-rs for now, but at some point will be the server implementation that Intiface Desktop uses for all platforms.
 - systray-rs v0.4.0 - Doesn't have anything to do directly with Buttplug, but allows users to create applications that just show an icon in the icon tray of win/mac/linux. I'll be using it for a easy GUI for intiface-cli-rs

I've got a lot of travel/talks coming up so I imagine things will be quiet on the code front for the next couple of weeks, but it's been good to actually release stuff!

Next plans include:

 - Getting buttplug-rs to feature parity with C#/JS
 - Adding v2 spec to buttplug-rs (battery! rssi! patterns!)
 - Lots of documentation for everything

### Travel and Conferences
I'll be in Chicago next week for OOOHack ([http://commiserate.life/sthack),](http://commiserate.life/sthack),) then I'll be at GDC in SF March 18-20, and will be speaking at 3pm on the 20th.

That's it for this week. Until next week, Keep Buttpluggin'!

- qDot