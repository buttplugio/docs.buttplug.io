---
title: "What's qDot Up To This Week? (2020-04-20 Edition)"
date: 2020-04-20
authors: [qdot]
---
Well, I just had a weed mint, so I guess celebrating the holiday?

# Intiface CLI/Desktop
Leading off with something other than Buttplug for once!

<!--truncate-->

After getting buttplug-rs 0.2 out the door last week, I moved on to getting intiface-cli-rs (for those of you that use Intiface Desktop, that's what's referred to as the "engine" there) working with the new library. 

As of about 5 minutes ago, I have intiface-cli-rs running in what will be Intiface Desktop v17!

The ultimate goal is to have Intiface Desktop running only on top of intiface-cli-rs, instead of the C#/JS split it currently has. I suspect this goal is still a bit of a ways off, as I'm still getting Rust device support to the same point as C#, but once that happens, it'll make life MUCH easier for me once that's done.

And yes, this does mean I'm still developing Intiface Desktop! It's been almost a year since it's been updated. >.>

# Buttplug
I've made 3 unannounced Buttplug-rs releases after the initial v0.2.0 release. Most of these are small bugfixes and updates that allowed intiface-cli-rs to come together, but those should start calming down soon.

Next up for Buttplug is implementing serial port access, as I get constant questions about Buttplug work for the OSR2  ([https://patreon.com/tempestvr/)](https://patreon.com/tempestvr/)) as well as the ET-312, ET-232,  and 2B estim systems. There are also quite a few people building their own hardware that would like to use serial, so it'll hopefully help them too. 

Alongside that I'm hoping to start adding new messages to the system to round out v2 support in Rust. Batteries! RSSI! Toy Patterns!

# Intiface Game Haptics Router
If you didn't see on twitter, someone tried the GHR with emulators, and it works! So far Project64 and Dolphin have been tried and seem to work with any game that has rumble.

# Teledildonics 101 Part 4
I would very much like to wrap up the livestream series this weekend, showing off the teledildonics app on glitch (which now has a few testers even!). Things have been pandemicly busy the past few weeks, which hasn't left me with much energy for trying to livestream, but I'm hoping to bounce back from that over this week.

That's it for this week. Until next week, keep buttpluggin'!

- qDot
