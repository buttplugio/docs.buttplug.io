---
title: Whats Qdot Up To This Week 2021 10 11 Edition
date: 2021-10-11
---
New features! Finally!

### Buttplug
Thanks to getting bored with bringing the new Rust Intiface Desktop to parity with the JS Desktop app, I decided to play around with building some small new features that required changes all the way back to Buttplug.

<!--truncate-->

- User configurable names for devices! You'll be able to set the display names of devices. I eagerly await seeing how absolutely fucking off the rails this goes ([https://twitter.com/buttplugio/status/1447374441139212290](https://twitter.com/buttplugio/status/1447374441139212290) for a vague idea). 
 - Persistent device indexes! This means if you connect a device, it will continue to connect at the same index (which is how developers access the devices) until you delete your config files.
 - Device Allow/Deny! You can tell Intiface/Buttplug to never connect to certain devices, or *only* connect to certain devices!

I'm also starting work on trying to design some better messages for Buttplug, as we're starting to run into more and more devices that we can't easily support with our current message set. If you're interested in some of this design discussion, check out some of these threads:

 - [https://github.com/buttplugio/buttplug/discussions/359](https://github.com/buttplugio/buttplug/discussions/359)
 - [https://github.com/buttplugio/buttplug/discussions/371](https://github.com/buttplugio/buttplug/discussions/371)

### Intiface Desktop
All I can say on the new ID at the moment is that work is continuing. I'm now working on bringing device configuration and testing in, which will get us back to parity with the old system, and make the new version ready for Beta. The aforementioned naming/allow/deny UI will hopefully be folded into this.

That's it for now. Until next week, Keep Buttpluggin'!

- qDot