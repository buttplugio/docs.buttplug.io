SO MUCH STUFF OMFG

### Stickers
Fucking UPS lost my hologram stickers, so I'm not sure how long that's going to take to resolve. Rather than wait for the new shipment, I'm just gonna start shipping out what I've got now. For anyone waiting for stickers, expect messages saying I shipped them sometime in the next week I hope.

<!--truncate-->

### Lovense Toys
If you have updated the firmware on your Lovense toys in the last 2 weeks, and are having problems connecting them to Buttplug or other non-Lovense apps, please let me know!

There's been reports that the latest firmware update causes issues with toys. I'm gonna work on diagnosing on my end, but more reports are always helpful.

### Buttplug and BtlePlug
I released Buttplug-rs v0.5.0 and BtlePlug v0.5.0 yesterday!

BtlePlug is the cross-platform bluetooth library that Buttplug uses to access toys. I'm currently just patching it to the point of getting Buttplug working, after which I'll be doing an overhaul on the API to bring it up to modern async rust. It got some fixes to make device disconnection notifications more reliable, and the developer API a little more ergonomic.

Buttplug-rs v0.5 has lovense dongle support, serial port support (which gets us nearer working with OSR2, ET312, etc), and updated to Btleplug v0.5 to use the aforementioned device disconnection fixes.

### Intiface
Now that Buttplug-rs v0.5 is out, and makes Buttplug mostly usable, I need a way to get that out to people to test. This means adding it to Intiface Desktop for people to use as an engine! I'm probably going to be spending the next couple of weeks on this, because I haven't updated Intiface Desktop in a year, and it's a typescript application using a web framework, which basically means it might as well be written in COBOL now. This may take a while.

That's it for this week. Here's hoping the Intiface Desktop work goes faster than I think it will!

Until next week, Keep Buttpluggin'!

- qDot