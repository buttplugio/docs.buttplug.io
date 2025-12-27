---
title: "What's qDot Up To This Week? (2021-07-05 Edition)"
date: 2021-07-06
---
And suddenly, productivity.

### Buttplug/Intiface Desktop (Now with OSR-2 Support)
YES IT IS FINALLY HERE.

<!--truncate-->

BUTTPLUG HAS EXTREMELY BASIC OSR-2/SR-6 SUPPORT.

AND IT ONLY TOOK ME 2 YEARS jfc this is ridiculous.

So, yeah, as of Intiface Desktop v24 and Engine v39 (both released yesterday), Buttplug now supports a single linear stroking axis for TCode devices. We'll support arbitrary axes, rotators, and vibrators soon, but this was the first step in getting there.

Intiface Desktop also got:

 - A way to add Nobra's Silicone Dreams devices.
 - A warning whenever you try to connect multiple clients.

The best part about this is that we're now using the User Device Config system, a feature that's been in the library since early 2019 but never got UI to support it until now. This will eventually allow things like:

 - Adding your own devices (protocols will still need to be in Buttplug tho)
 - Renaming devices
 - Allow/Deny device lists
 - Setting min/max movement/speed limits on devices

It's super exciting to get this kicked off, and I'm looking forward to getting more things implemented for it.

### VibeGoesBrrr Stroker Support
A lot of this happened because of the VibeGoesBrrr VRChat plugin, which is my current platform obsession if that wasn't obvious. VGB recently implemented stroker support in a beta branch, and it's working REALLY well for real time VR control! I'll have some demo videos up as soon as I figure out whether I can post them without getting banned from multiple platforms for doing so.

### What's Next
I'm hoping to continue with the Intiface Desktop User Config updates, as well as bringing back Device Simulators so devs are no longer required to have actual hardware (though it will certainly help if they do). We've also got someone looking at Android support now, so there may be a native Android Buttplug library soon! We *may* already work on iOS too, but we need a Swift FFI layer to get that tested.

Lots of interesting developments ahead, can't wait to show them to you!

Until next week, Keep Buttpluggin'!

- qDot