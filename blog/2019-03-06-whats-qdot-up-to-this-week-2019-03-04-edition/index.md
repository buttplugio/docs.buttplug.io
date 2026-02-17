---
title: "What's qDot Up To This Week? (2019-03-04 Edition)"
date: 2019-03-06
authors: [qdot]
---
AHHHH I LEAVE FOR CMU IN 2 WEEKS AHHHHHHHHHHH

So yeah that's pretty much the inside of my head right now.

<!--truncate-->

**Intiface Update**

I'm doing a final push to try to put together the first version of Intiface (the new Buttplug Server GUI application) before I leave, in the hopes that I can ship a beta to Patrons and also use it in my workshop at CMU. Things are going mostly well in that respect, though there's lots of weird little bits and pieces that have to be put together (release pipelines, settings dialogs, etc) to make the whole thing work.

For anyone curious: The first version of Intiface will mostly do the exact same thing as the current Buttplug Server GUI. The main difference will be that it'll run on Windows/Mac/Linux (and RPi soon after) instead of just Windows. It'll also use our new device configuration system, meaning that I can add devices quickly and easily without having to change a bunch of code and have everyone redownload everything.

**Possible Windows 7 Support**

Speaking of platform support, I've got some possible good news for those of you who've been waiting for Bluetooth LE Hardware Windows 7 support for the past, uh, 2 years.

It may possibly happen!

Companies like Lovense and Vorze have put out USB keys for their devices in the past to make them work on anything that supports USB Serial Class devices (Which goes back to WinXP if not before). Thanks to someone on discord earlier this week, I was pointed at a generic USB Serial BLE dongle by BlueGiga with an Open SDK!

[https://www.silabs.com/products/wireless/bluetooth/bluetooth-low-energy-modules/bled112-bluetooth-smart-dongle](https://www.silabs.com/products/wireless/bluetooth/bluetooth-low-energy-modules/bled112-bluetooth-smart-dongle)

These dongles are available from $10-20 depending on where you buy them from, which is totally reasonable. I have a few on the way now, and will be trying to implement Buttplug device subtype manager support on them ASAP (which doesn't mean a ton since my schedule is nuts through late March), as having this available means we can cover BLE hardware support on platforms where an OS API might not work out.

**Everything Else**

Once Intiface is at least into Beta, I'm hoping to get back to the GVR, Syncydink, and other applications. It's been hard to work on those since I was hamstrung by my own server software and libraries, but I think we're almost out of the woods on that.

Thanks again for your continued support, and Keep Buttpluggin'!

- qDot