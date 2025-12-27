---
title: "What's qDot Up To This Week? (2023-04-17 Edition)"
date: 2023-04-17
---
Oops more platform support?

### Intiface Central
Having dragged my feet on it for a whole 2 months, I finally removed background device scanning (it'll be coming back in the future, but requesting the permission requires jumping through a ton of hoops on the play store) from the Android build of Intiface Central and released it to the Play Store this weekend.

<!--truncate-->

However, I'd forgotten that I'd put in untested fixed for Android versions < 12 and 32-bit processors. Luckily, both work now! AFAICT IC now works on Android 9+ (I haven't gotten any reports about Android 8 yet), and on 32-bit systems (tested on my own Nexus 7 tablet now running Android 11 thanks to LineageOS).

Then I was like "Wait doesn't the Quest 2 run Android?"

And sure enough, Intiface Central works on the Quest 2! Sideloading the APK via Sidequest works fine, bluetooth devices come up quickly, and can be controlled from our internal devices panel!

So that's fun. I'm still figuring out how we're gonna handle distributing this, but if anyone wants the APK, just let me know here or ping me on discord.

### Buttplug
Not a ton to say on Buttplug otherwise. I got the SQLite project a decent bit of the ways along just to realize that it was solving a different problem than the one I was having. I've put that project on the back burner for a bit while I return to concentrating on user device configuration in Intiface Central, which I can hopefully mostly do with our current setup for now.

### Everything Else
Not a lot to say otherwise right now. Got a lot of interesting development happening around the discord, so hopefully more to announce soon!

Until next week, Keep Buttpluggin'!

- qDot