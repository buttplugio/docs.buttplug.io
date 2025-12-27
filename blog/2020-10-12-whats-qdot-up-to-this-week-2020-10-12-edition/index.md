---
title: "What's qDot Up To This Week? (2020-10-12 Edition)"
date: 2020-10-12
---
First newsletter in 3 weeks!

I swear I have a good excuse!

<!--truncate-->

I was literally playing Hades the whole time.

This excuse may not seem good but it actually is good. You just gotta trust me.

### QIUI Hack
As you may have seen, I spent most of last week spamming twitter with my thoughts on the QIUI hack (tl;dr a company that makes insecure IoT equipment got very throughly pwnd after refusing to secure their work and having a security deadline lapse. User database, someone hacking in and locking all of the equipment, etc...). That ended up being surprisingly time consuming, mostly because I just have a ton of thoughts on this subject and the QIUI hack was a very good, concrete event for Many Teaching Moments.

[https://twitter.com/buttplugio/status/1314251571140587522](https://twitter.com/buttplugio/status/1314251571140587522)

[https://twitter.com/buttplugio/status/1314622550194839552](https://twitter.com/buttplugio/status/1314622550194839552)

### Buttplug
Enough about things that aren't my projects though. What have I specifically been up to the past 3 weeks?

A bunch!

Buttplug is getting very close to v1. In the past few weeks I've:

 - Added Battery level readings
 - Added RSSI level reading capabilities (this will take longer because I have to do a bunch of Bluetooth work first)
 - Added Raw messages
 - Fixed quite a few bugs in the core library

So the v2 message spec is pretty much implemented and ready to go in buttplug-rs. I'm planning to release v0.10 of the library, update Intiface CLI Rust to work with that, then it's on to updating the FFI layers and finishing out toy support (things like the Mysteryvibe, which I have some users asking about), and we can cut v1. I was hoping for October, but at the current rate things are going (dayjob keeping me VERY busy, and Hades being addictive af), I'm gonna now be conservative on that and say November.

### Intiface Desktop
I'm hoping to get more features into Intiface Desktop, including the beginnings of the device panel, which at first will just let you do some quick device checks, show battery if possible, etc...

I also desperately need to get crash logging in, as apparently Intiface Desktop crashes a LOT for VR Chat users? I'm not sure why and I'm currently blind since I don't have logs or stacks. :(

### Intiface Game Haptics Router
Once the C# FFI layer is updated to v0.10, I will most likely completely port the GHR to buttplug-rs and make it the first shipping application to use that library. This will make many people with Lovense dongles very happy. :)

So, that's it for now. The finish line is in sight! There's just shiny addictive video games off to the side of it that are really distracting! :)

Until next week, Keep Buttpluggin'!

- qDot