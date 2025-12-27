---
title: "The End Of Fleshlight Launch Firmware Bricking"
date: 2017-09-11
---

Took a bit of a diversion from buttplug/syncydink over the past few days.Having finally gotten sick of reading all of the reports of people having their Fleshlight Launch bricked by firmware updates, I spent the weekend writing my own firmware loader. I now have a node.js/typescript based loader that can load Launch firmware (and as soon as I get one, Pearl 2 firmware) from desktops. I'll be porting this to work in Chrome, so that we can hopefully fix firmware loading from Android, which is usually where problems crop up.

I'll be writing a full blog post about the internals of firmware loading, but that may be a bit. Some fun facts I learned along the way:

<!--truncate-->

- Firmware load bricking happens because there's very little in the way of failure tolerance and redundancy in FeelConnect. If something goes wrong, there's not much in the way of retries. Not only that, with the current v1.3.12 of the app, the firmware may load fine, but the final step of "mode locking" may fail because of a bad reconnect. We've been discussing this on the message boards: [https://metafetish.club/t/launch-firmware-update-problem/117/10](https://metafetish.club/t/launch-firmware-update-problem/117/10)
 - All of the byte operations in FeelConnect happens as string operations. No, really. They actually do string concats and splits for leading zeros when doing nibble operations.  It's sick (in the bad way). My typescript version is all node.js Buffers or ES6 Uint8Arrays, which admittedly still feels weird over, say, uint8_t[]. 
 - There's a lot of trust of the bluetooth stack in FeelConnect, leading me to believe it may be developed on iPhone more than Android. Android bluetooth straight up lies to you constantly, and this is where the firmware bricking issue comes in. FeelConnect sends a lot of data over without checking whether it was written correctly, trusting that the phone will give the application correct write responses (it won't, and even if it does that's not a good signal for the write being completey done yet). When things do fail, there's no retries.
 - There's no firmware signing. The CRC check happens on the host, not the machine itself. My Launch is currently running firmware version v6.9 because I can just change the firmware version and line CRC for the intel hex file, and there doesn't seem to be any internal verification of the loaded firmware. This bodes well for us writing our own firmware for Kiiroo toys.

An added bonus of this is that it gets us close to being completely free of FeelConnect. We'll still need a way to load firmware over Windows and iOS, but now that we know how, it's mostly a problem of actually getting it implemented.

All of this is up on github at [https://github.com/metafetish/miiyoo-firmware-utils.](https://github.com/metafetish/miiyoo-firmware-utils.) I'll be prettying it up, hooking it up to WebBluetooth, and creating a firmware fixing utility on buttplug.world soon.
