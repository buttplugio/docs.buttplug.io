---
title: "What's qDot Up To This Week? (2021-06-14 Edition)"
date: 2021-06-16
authors: [qdot]
---
Other than completely losing track of what day it is...

# Buttplug & Intiface Desktop
Intiface Desktop v21 is out, and with it, the first publicly usable release of Buttplug v4! This means that you can now use the Lovense Connect app with Buttplug, though I'm already finding out how many people have their desktops and WiFi on different, inaccessible subnets. \>.\<

<!--truncate-->

Intiface Desktop v22 will be out as soon as this evening, fixing a few major bugs in the Devices panel. Otherwise things seem pretty quiet so far.

# Project Consolidation
Boring project management news time!

I've also taken some steps to reduce the amount of repos the project is using, mostly because it's just not worth it to have everything so split up. I just moved the spec repo (which used to be buttplugio/buttplug) into the rust repo, and have now renamed the rust repo to be buttplugio/buttplug. The main buttplug repo now has:

 - The Spec
 - The Spec Schema
 - The Device Config
 - The Rust Implementation

So what was 4 repos (3 of which were rarely updated) is now one! Way less work for me. Yay.

# What's Next
I'm now back to having a bunch of different directions to work in, all of mostly equal importance. This includes:

 - Starting on Intiface Mobile (think Lovense Connect but for Buttplug in general), which includes making an FFI for the device comm managers as well as getting WebRTC connectors going.
 - More Intiface Desktop updates, like filling out the Device Panel with configuration (so you can set up serial ports for devices, allow/deny device lists, set device parameters like min/max speeds), etc...
 - Starting to consider new Buttplug Messages. This includes finally getting something done for the Lovense Max Air Bladder, plus some extremely generic messages so we can easily support all toys without requiring Raw commands
 - So much documentation. So much.
 - So much youtube video filming. So much.
 - Lots of other stuff.

I'm gonna be spending a bit of time trying to plan, with the hopes that I'll have some better direction (and updates on that direction) in the next week or two.

That's it for now. Until next week (or possibly later this evening if I get the new Intiface Desktop build out), Keep Buttpluggin'!

- qDot
