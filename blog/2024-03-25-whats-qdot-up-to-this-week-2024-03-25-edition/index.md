---
title: Whats Qdot Up To This Week 2024 03 25 Edition
date: 2024-03-25
---
I think I'm gonna be recovering from GDC for at least twice as long as I was there...

### Intiface Central
Intiface Central v2.5.6 is out as of about 20 minutes ago!

<!--truncate-->

This has mostly been blocked on me trying to get documentation done for the new "Repeater" mode, which is really just a simple websocket proxy for doing things like using websites on desktop while controlling toys via Intiface Central on a phone. Usually this would be shot down by mixed content issues (most websites are https but can access http locally, but phone aren't local), and we're starting to see more users trying Central on phones, so this seemed like a good stop gap while we work toward WebRTC for direct P2P.

There's also a bunch of device integration and fixes in Buttplug, including for Svakom, Satisfyer, and Motorbunny products that we've been getting a lot of complaints about.

Finally: everyone who got back to me that donates at the $5 or higher level, your names are now in the about/help screen! :D

Next up in Intiface Central:

- Possibly a roadmap on github? I'm trying to get things more organized

- Fixing issues with adding/removing user devices, as this is becoming very popular very quickly, even while being undocumented.

- Simulated devices needs to happen ASAP.

- More documentation! And possibly a website overhaul!

### Buttplug and Btleplug
Buttplug will require some changes to accommodate the new IC features mentioned above, but more important will be possibly patching a *huge* problem in the Android implementation of our bluetooth support. I've finally managed to get a crash log from someone with a phone that's having problems with Android IC, so I'm hoping to make progress on fixing that soon (we see this crash 100s of times a month and it is actively blocking android users).

Otherwise, I would very much like to get back to the next version of the message spec in Buttplug. This is holding up a lot of fun features in relation to sensors (i.e. being able to play games with your bluetooth kegel hardware, or possibly even [erection sensing hardware](https://github.com/buttplugio/buttplug/pull/617). 

### Everything Else

- GDC was great! Met lots of cool people, may have some collaborations coming out of it! We'll see!

- There's some really exciting work happening with buttplugio being used as a vtube avatar event engine! [Check out this social media post for more info.](https://twitter.com/renpona/status/1771621312823255500)

- I think I still owe a ton of people stickers. I will be messaging about that soon.

That's it for this week. Until next week, Keep Buttpluggin'!

- qDot