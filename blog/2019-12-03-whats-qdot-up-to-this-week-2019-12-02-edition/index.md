---
title: Whats Qdot Up To This Week 2019 12 02 Edition
date: 2019-12-03
---
Tuesday is the new Monday.

### Hardware
For some reason, shocking seems to be the name of the game at Buttplug HQ lately. I just reversed a Dog Training Collar ([https://twitter.com/buttplugio/status/1200882638086537216)](https://twitter.com/buttplugio/status/1200882638086537216)) and am now working on the Pavlok ([https://twitter.com/buttplugio/status/1202070730638102528)](https://twitter.com/buttplugio/status/1202070730638102528)) as well as some knock-off bluetooth TENS unit for a friend. This is mostly a matter of timing and coincidence, but still, lots of shocky shit on my desk right now, and probably finally getting a shock message in Buttplug soon.

<!--truncate-->

Which brings me to my next topic...

### Buttplug
Now that the Rust client is done, things have slowed down a bit in the land of Buttplug as I try to figure out what all of the next steps I need to take are. I had originally been planning on finishing porting the library (the device protocols and server code) to Rust, then starting to add new messages, but it's feeling like I may need to switch the order of that.

The new messages/capabilities I'm looking at bringing in are:

 - Raw Messages - A way to send raw uint8 byte arrays to devices. This will mostly be for development and internal use, but it means that if you want to try to access something that doesn't have a protocol built into Buttplug yet, you could technically do it.
 - Battery/RSSI - Our first 2 reads! Battery power (for bluetooth plus anything else that might have battery, like the ET-312) and RSSI (for bluetooth). This will start us on our way to sensor retrieval messages in the next version.
 - Shock - Yeah this is coming from the shock device work. Will have strength and duration parameters.
 - StaticTone - Another one for shock collars specifically. Probably the most niche generic message I've made so far. Just has duration.
 - Pattern - And going the other direction, the ability to select patterns on any toys that have them. This message will come with a selection of patterns, and in the future, you'll be able to make your own patterns and expose them via this message. Message will take the pattern index, as well as a strength, just in case you can scale the pattern amplitude. I will try to explain this in more human terms at some point in the future too.
 - Steps - This isn't a message, but rather an attribute to other messages. Right now with Buttplug, if you want to make something vibrate, you're given a range of 0.0-1.0. That's an (sorta) infinite range of possible values. However, most toys have like, maybe 255 vibration levels if you're lucky, some have 20, some have 3. How do you know which toy has what levels? You don't! So you just have to guess and it kind of sucks. The Steps attribute to messages like VibrateCmd, RotateCmd, LinearCmd, etc will allow you to know exactly what your control range is, so you can make your calculations accordingly.

This will be the first time new messages and capabilities have been added to Buttplug in *2 years*. Yes, the past 2 years have mostly been spent futzing with the APIs, adding new hardware protocols, and rearchitecting the whole thing like, twice. So it'll be nice to move forward instead of sideways-with-a-slight-lean-forward.

### Intiface
Intiface is still kinda on hold until I get the above stuff done. Hoping it will see more work in January.

I'm probably going to make some quick YouTube videos this week about the shocky shit, as well as finally filming a version of my SLSA talk, so expect updates when those are done.

Until next time, Keep Buttpluggin'!

- qDot