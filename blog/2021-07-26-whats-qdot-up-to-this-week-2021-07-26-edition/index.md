---
title: "What's qDot Up To This Week? (2021-07-26 Edition)"
date: 2021-07-26
---
Too god damn much bluetooth.

### BTLEPlug
This is going to be one of those updates that is more about meta-buttplugs than buttplugs. About 6 months ago, a ton of code was overhauled in btleplug, the Bluetooth LE library I maintain and that powers all bluetooth in Buttplug on Windows/macOS/Linux. Unfortunately testing to this code has gone slowly, and there were a couple of stalls due to weirdness on Linux. Luckily this past weekend I finally figured out the Linux issues enough to write a workaround, so we'll hopefully have the new btleplug v0.8 released this week.

<!--truncate-->

The nice part about the new version is that it cuts the amount of bluetooth handling code in buttplug in **half. **The new async code is far smaller and cleaner, and it also is part of our path to getting Android support working.

### **Buttplug Android**
Alongside the btleplug work, Buttplug Android is continuing development. If anyone is interested in how Buttplug and Android apps will talk to each other, check out this thread (having an understanding of how Android's internally messaging system works is helpful):

[https://github.com/buttplugio/buttplug/discussions/368](https://github.com/buttplugio/buttplug/discussions/368)

### Everything Else

 - I'm continuing to expand our support for tcode, which I'm basically going to call the firmware protocol of choice for DIY buttplug projects at this point. Expect to see multiple linear axis as well as vibration support soon.
 - I'll also be added the ability to connect to Buttplug as a *device* via Websockets. This will allow us to rebuild the simulation system (which people have been asking for since I blew it up 2.5 years ago >.>), as well as making handling connections from things like ESP32s basically turnkey.
 - I'm trying to plan out the new documentation portions of Intiface, which will allow people to get help and troubleshoot within the app. This is gonna take a while, but hopefully should drastically reduce our support load and our user's confusion levels.

That's it for right now. Lots of hard work ahead, but it's nice to continue growing the platform!

Until next week, keep buttpluggin'!

- qDot