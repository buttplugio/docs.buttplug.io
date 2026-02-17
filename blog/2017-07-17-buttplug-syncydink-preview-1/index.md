---
title: "Buttplug Syncydink Preview 1"
date: 2017-07-17
authors: [qdot]
---

Ok so I said I'd have it done by the end of the weekend and I did!I just finished a test of Buttplug (on windows 10) + Syncydink (on iPhone!), and it's working rather well, even over WiFi, and at this point, the UI is ok enough that I think people can try it out.

First, some caveats:

<!--truncate-->

- This only works with funscript files so far. We can parse like 6 different haptic movie types, but I haven't built translators for those to toys yet.

- This only works with the Fleshlight Launch. See prior issue of needing to build more message translators. Going to try to get vibration done tomorrow and will send an update then, at which point it should work with all Lovense toys and XInput gamepads also.

Other than that, Buttplug should run on Windows 10 15063, and Syncydink needs to run on a decently modern browser. I've tested it on Firefox 54-56, Chrome 59 (desktop/android), Safari (macOS and iOS 10.3), and MS Edge (40.1.15063).

Funscript haptics files are available at:

[https://github.com/FredTungsten/ScriptPlayer/tree/master/Scripts](https://github.com/FredTungsten/ScriptPlayer/tree/master/Scripts)

You can usually download a script, then search for the name on Pornhub and find the corresponding video. I used the "Pendulum (No Host)" file for testing. I realize Cock Hero might not really be everyone's deal, but that community is contributing scripts right now so it's a good test base at least.

Instructions: 

1. Download Buttplug Server, Version 0.0.0.404: [https://ci.appveyor.com/api/buildjobs/rewqfwljlvs9mfe7/artifacts/Buttplug-Release-0.0.0.404-installer.exe](https://ci.appveyor.com/api/buildjobs/rewqfwljlvs9mfe7/artifacts/Buttplug-Release-0.0.0.404-installer.exe)

2. Install it

3. Run Buttplug Websocket Server. 

4. Go to [http://buttplug.world/syncydink.](http://buttplug.world/syncydink.) This may take a minute, as the javascript file is 2.3mb (MODERN WEB TECHNOLOGIES! \o/ Though seriously if any of you are webpack experienced and understand the following sentence please let me know: we need to code split to get to smaller sizes 'cause we can't uglify our client module, and I haven't had time to figure it out how. We should be able to get down close to 200k.)

5. Open sidenav by either right swipe or clicking on the purple hamburger in the upper left corner

6. Choose a movie

7. Choose the corresponding haptics file

8. Change to "Buttplug" tab, change address to whatever it needs to be, hit connect

9. Hit "Start Scanning". Note that buttplug will find all capable devices, but only the fleshlight launch will work with this demo.

10. Once the fleshlight is listed, you're ready to hit play on the video, and synchronization should start.

For getting syncydink running on a phone, I used dropbox to get the files over. They're pretty big though, so there may be better options. The best experience will be had by just running on localhost on a windows box for right now.

Let me know in the comments or in a patreon message or in email or twitter or whatever if you have any problems.
