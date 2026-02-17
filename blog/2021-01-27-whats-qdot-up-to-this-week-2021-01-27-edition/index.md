---
title: "What's qDot Up To This Week? (2021-01-27 Edition)"
date: 2021-01-27
authors: [qdot]
---
Tests!

# Buttplug
This has been another week of finding out exactly how broken Buttplug is. Lots of firefighting as bugs show up in different parts of the system, though most are in the core buttplug-rs library. The good news is that a lot of these bugs are being found by new devs, who are pretty good about reporting them and helping to test after patches, so the project is still seeing growth.

<!--truncate-->

The bad news is that a lot of these would've been avoided if the system had better tests.

With that in mind, I'm now trying to fill out more base test bases for the system, and working on getting tests in for the FFI layers also. It's going to take a while to get things back to where they were with C#/JS (both of which had multiple years of work behind them before they were retired), but anything more than we've got right now will be nice to catch things up front. 

# Websites
I spent the weekend updating project websites!

[https://buttplug.io](https://buttplug.io) is now up to date with the new logo, and updated app lists via...

Our new awesome list, [https://awesome.buttplug.io!](https://awesome.buttplug.io!) 

For those not familiar, "awesome lists" are basically a "curated" list of applications in a certain topic/library/etc area. Popularized by the web dev community, I'm trying to keep one for Buttplug apps. If there's anything I missed in the list so far, please file an issue on github or just comment here and let me know!

# Intiface Desktop
Alongside adding more tests to Buttplug, I'm working on Intiface Desktop v20. While this is mostly cleanup to remove the older engine support, I'm also starting on the Device Panel, which will allow users to check their devices in Intiface Desktop before connecting to applications.

The fact this wasn't in from day 1 is horrible, but once again, now is better than never, heh.

That's it for now, back to writing tests. Until next week, Keep Buttpluggin'!

- qDot
