---
title: Whats Qdot Up To This Week 2019 04 29 Edition
date: 2019-04-29
---
Been a while since I've given a weekly update, mostly because I've been giving piecemeal project updates, so, without further ado...

### Stickers
Getting reports that people around the world are receiving their stickers now! If you haven't either added your address to your patreon account, or messaged it to me through Patreon messaging, and you're donating at the $3/month or higher level, get at me!

<!--truncate-->

### Buttplug
Things have been busy on the library side of the project.

 - Due to many, many requests, I've started a python version of the client library. It's now mostly together, and can enumerate devices, send commands, etc, though there's not a lot of error checking/handling. The repo is at [https://github.com/buttplugio/buttplug-py,](https://github.com/buttplugio/buttplug-py,) and I have the "buttplug" Pypi package squatted currently. I'll hopefully be publishing a full version of the package soon. It's currently VERY heavy on the py3.7 features, I'm going to look at trying to backport to 3.6 if enough people yell at me about it.
 - I'm finally starting to add new messages to the protocol, including our first shot at input messages! This means we'll be able to receive information from devices as well as send it now. The first two input messages will be for BatteryLevel and RSSILevel, so we can check for battery power and signal quality on bluetooth toys. Future messages will include accelerometer data, squeezing sensors (for kegelcizers), etc...
 - Buttplug iOS is now, oddly, a thing, though not in any easy sort of way. There's a special browser you can get from the app store (for $1.99 [https://itunes.apple.com/us/app/webble/id1193531073)](https://itunes.apple.com/us/app/webble/id1193531073)) that implements WebBluetooth. I made a couple of patches to buttplug-js to make things mostly work with it, and sure enough, I've managed to control Lovense toys and the Fleshlight Launch from it. It's mostly on par with what we can pull off in Android Chrome for now, so if you've wanted to control sex toys from an iPhone or iPad, we can now do that!
 - I have patches from a contributor to support the Lovense USB dongle in the C# library. It's going to take some work to get those added, but once that's done, we'll be able to support Lovense toys on any machine that can do USB -> Serial and use the C# libs.

### Intiface
Things have been similarly busy over in Intiface, the user facing portion of the project:

 - As I mentioned last week, we can now ship on all platforms. Windows was already working, Mac somehow miraculously works, and Linux works as long as you're cool setting some capabilities on the engine executable in the file system (which, if you're running linux, you should be)
 - All work now is mostly related to getting things publicly releasable, as I have to have Intiface shipping in place of the old Buttplug Server before I can start shipping the new features like Battery Levels. This mostly involves lots and lots of UI polish.
 - The last feature I'm adding before release is the Proxy server, which will allow users to bridge from a desktop to a mobile phone in order to use the bluetooth on the phone to talk to toys. This means you can use something like ScriptPlayer on the desktop, which will connect to Intiface Desktop, then have the Buttplug Server running in a webpage on your phone, which will also be bridge into Intiface Desktop, so ScriptPlayer can control toys connected to your phone. Now that Buttplug works on iOS and Android, I'm hoping this will be the bridge we need for remaining Win7 users, as well as users that are just having problems with desktop bluetooth otherwise. Setup for this is... not trivial, but people seem to be motivated by the goal of having control of their toy. :)

### Other Projects

 - I already posted the stupid bluetooth bouncy ball project. That was so amazingly dumb. I really need to do more stuff like that. ([https://www.patreon.com/posts/26324105](https://www.patreon.com/posts/26324105) if you missed it) New youtube video coming about this project as soon as I can get some time to film.
 - I tried an experiment with week with embedding Buttplug in bookmarklets, meaning you can have a button on your bookmarks bar that allows you to inject Buttplug into certain pages. This would allow you to do silly things like sending stock/bitcoin prices as vibration commands based on dynamically updating pages. More on this project soon.
 - I'm also working with the author of the Overwatch Healslutting software in order to integrate Buttplug into it. They currently only run with Lovense toys, so this will allow them to branch into the 100 or so pieces of hardware we support now.
 - I'm hoping to get back to porting the Game Vibration Router and integrating BeatSaber support again soon.

Oof. Things are busy around here!

Thanks again for your support, and until next week, Keep Buttpluggin'!