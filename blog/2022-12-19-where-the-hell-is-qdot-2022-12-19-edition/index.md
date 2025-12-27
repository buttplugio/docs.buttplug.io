---
title: Where The Hell Is Qdot 2022 12 19 Edition
date: 2022-12-19
---
Oops.

### Life
So yeah, it's been a real slow month on Intiface/Buttplug updates. A combination of crunch time at the day job and a family emergency that had me back in the US Midwest for a week completely blew my development time post-Thanksgiving. Luckily that all mostly seems to be over now, and I've got 2 weeks off around the holidays, so I've got lots of plans! We'll see how many of those actually get done.

<!--truncate-->

### Buttplug and Intiface Central
I've spent today catching up on PRs and bugs from the past few weeks, and just released Buttplug v6.3.0 and Intiface Central v2.1.0. These have support for a bunch of new Lovense toys, a few new brands (metaXsire, TryFun, etc...), and a bunch of bugfixes for major brands like Lovense, WeVibe, Satisfyer, etc... Not the most feature packed of releases, but important nonetheless.

I'm hoping to start making headway on device configuration UX in Intiface Central next. This is the biggest new capability of Buttplug v6 and Central and I can't wait to show it off!

Also very much hoping to get documentation and client libraries updated so our developers can start using the newest features in the system.

### Mobile Intiface Central
Intiface Central is now up on the Android Play Store. Just search "Intiface Central". That said, it's... not working real great at the moment. This is my first mobile app release and I'm learning a lot. Issues include:

 - Bluetooth doesn't work on Android < 12
 - App Backgrounding doesn't work
 - Connections to the device itself need to be direct for the moment, which screws trying to connect to mobile intiface central from a desktop web browser, so instance. This will be fixed with a new Intiface Central Desktop feature I'm working on.

The iOS app store review went well but got stuck with me needing to update my bluetooth permissions string, and due to the aforementioned life issues I haven't had time yet. Hoping to get that back on track this week but we'll see what review turnaround is like with the holidays.

### Everything Else
It has been EXTREMELY FUCKING BUSY despite not having much time to develop

 - The [UKButt Ultrakill](https://github.com/PITR-DEV/ukbutt-mod) mod blew up so much stuff omfg. Our website got more traffic than when it was trending HN. Affiliate sales went through the roof. I'm still recovering
 - Someone wrote a [Guilty Gear Mod](https://github.com/super-continent/acpr-buttplug) 
 - Someone wrote a [Hollow Knight Mod](https://github.com/danatron1/ButtplugKnight) 
 - [We have a forum now!](https://discuss.buttplug.io) 

So yeah, just because I haven't been coding, it doesn't mean everyone else stopped too. :)

That's it for now. Until next week, Keep Buttpluggin'!

- qDot