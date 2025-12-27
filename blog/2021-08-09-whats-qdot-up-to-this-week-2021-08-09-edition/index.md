---
title: "What's qDot Up To This Week? (2021-08-09 Edition)"
date: 2021-08-09
---
A line of yaks stretching as far as the eye can see...

### Buttplug
The slow march toward what is now Buttplug v5.0 continues.

<!--truncate-->

btleplug v0.8 has now been integrated into Buttplug, which has reduced bluetooth code size by 50% and made macOS work, like, at all.

Thanks to trying to build my own DIY hardware (my head haptics for VR), I've now actually started listening to the requests/complaints of other DIY builders, and it turns out a lot of them were pretty valid. With that in mind, there are now 2 other new features coming in with with the btleplug update:

 - Websocket Server Device Communication Manager, which is basically a very long-winded way of saying "connect to and control devices over websockets". The big win for this will be the restoration of Device Simulators. We'll be able to build web apps that can connect as devices instead of Buttplug clients, so that you can test your apps with pictures of shaky buttplugs or stroking toys instead of... actual shaky buttplugs or stroking toys. Note that only the capability will be landing in Buttplug v5, actually building out the simulator GUI is going to take a bit afterward, but it's one of my top priorities after this release is done.
 - Overhauling the Device Configuraiton system to allow more user customization of device capabilities, as well as adding new devices locally. In Buttplug up until now, anyone that's wanted a device supported has had to put in code to the main library. With the expansion of the device configuration system, it'll now be easier to add your own DIY devices that other people may not have, and use them locally.
 - Oh and a third actually: tcode now support multiple vibrators as well as multiple linear axes, meaning you can define your OSR-2/SR-6 setup in the new device configuration system based on whatever you've built! This also will allow people to implement TCode as a firmware protocol and add it to Buttplug easily.

These two features, once released and more importantly, properly documented, should make life far easier for people wanting to hook DIY toys into Buttplug. Of course, configuring it all is going to be quite the challenge, which means it's time for more updates to...

### Intiface Desktop
Once Buttplug v5 is landed, I'll be shifting over to more frontend work to expose all of this via Intiface Desktop, as well as starting to build in a documentation system, as the functionality of the program is growing quickly and will be getting quite complex soon. I'm hoping I can keep the program usable for those that just want to quickly hook up their lovense toy while extensible enough for those of us that are building our own thing. That may end up meaning I hire someone for UX soon, because wow I'm bad at this. :)

### Youtube
While working on the library I've had my 3D Printer going constantly in the background, in the hopes of kicking off some new youtube videos on the OSR-2, Handy mounting systems, etc soon. So keep an eye out for those!

Anyways, that's it for this week. Until next week, Keep Buttpluggin'!

- qDot