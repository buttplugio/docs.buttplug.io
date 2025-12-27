---
title: Buttplug Unity Is A Thing Whats Qdot Up To This Week 2020 06 15 Edition
date: 2020-06-15
---
AN ACTUAL PATREON PERK: I HAVEN'T ANNOUNCED THIS ANYWHERE (BUT DISCORD) YET

### Buttplug Unity
I've had people prodding me for Buttplug support in Unity pretty much since Buttplug began. Of course, when Buttplug began, Unity didn't really support .Net Framework 4 yet, and packaging for it wasn't something I was familiar with.

<!--truncate-->

Fast forward to 2020, and someone bugged me about it today and I finally found the "Custom Packages" documentation. One hand built version of Buttplug C# (had to remove our JSON Schema parser, which doesn't play well with Unity) and a package.json file later, Buttplug Unity is a thing.

[https://github.com/buttplugio/buttplug-unity](https://github.com/buttplugio/buttplug-unity)

This is an EXTREMELY raw version of Buttplug Unity. Basically it just brings in my handbuilt library so you can use it in scripts. You'll still need to connect to Intiface Desktop or Intiface CLI, which you'll currently have to get yourself. I'm going to make a version that comes with those, but that'll be a few days at least.

If you've got questions, please hop on the #unity channel on discord, happy to help.

Exciting times ahead!

### Buttplug Rust
Ok back to talking about stuff only I care about.

Buttplug Rust continues to get the rough edges sanded off of it. This week I made it possible for mere mortals to add new protocols (It was using a macro setup that was WAY too complex for what was needed), add the new all new shiny Raw Protocol (so you can just fling byte arrays at endpoints and do things like reflashing firmware. I'm sure I won't regret this :| ), fixed some huge bugs in order of operations for protocols, and continued on general cleanup.

Big problem right now is that I now need to figure out when to cut the next release and move on. This will probably entail:

 - Finishing up the new logging system
 - Making sure the Raw protocol is off by default

And that's about it! Hopefully by next week.

After buttplug-rs 0.5 is out, I'm probably gonna move back to btleplug for a couple of weeks to make sure the windows core can do what it needs (like, say, firing an event when a device disconnects >.>). Once that's done, I can start looking at moving the C# library on top of rust, which is the last major unification piece before Buttplug v1.0. 

The end of the (3 years of) beginning is in sight!

That's it for now. Until next week, Keep Buttpluggin'!

- qdot