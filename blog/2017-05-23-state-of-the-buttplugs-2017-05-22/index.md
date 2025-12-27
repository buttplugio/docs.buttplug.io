First off, Hello new patrons! Thanks for the donations! They will be used for new buttplugage assuming I don't die from burnout soon.Now then, moving on...

Remember when I thought programming applications for sex toys would actually involve programming sex toy stuff?

<!--truncate-->

Yeah I'm an idiot.

The past week has mostly been lost to learning the ins and outs of window dependency conflicts. Luckily most of that is now over, and I've come out of the ordeal with:

- A nifty new crash reporting system

- Binaries that work on Win7/8/10 at the same time

- Significantly smaller executables (but not quite to my dream of having a 64k buttplug demo yet) and simpler code

While stability and better structured code are great, that hasn't pushed Buttplug forward much in terms of features. I'm now trying to get back to building sex toy interaction features rather then endlessly kit out the CI for these applications.

The installers from appveyor ([https://ci.appveyor.com/project/qdot/buttplug-csharp,](https://ci.appveyor.com/project/qdot/buttplug-csharp,) click on either Release or Debug, click on Artifacts) should now work on Win 7/8/10 without crashing on startup, but will only bring up bluetooth on Windows 10 15063 or later. Other platforms can currently only use XBox Gamepad vibration, though I don't have a Kiiroo output for that quite yet so that only works via Websockets. As mentioned in the post last week, there's a Kiiroo Platform Emulator and a Websocket server in there, both seem to work right now, though there's no documentation for the JSON protocol yet.

My goal for the next few days is to build a fairly minimal javascript client library, wire that into some of the old test WebBluetooth programs I made (so they'll now work on all platforms), then document things enough to make some vague sort of sense and release v0.0.1. Hoping to get there in the next couple of weeks, but I originally said this would be an "over the weekend" project 5 weeks ago so yeah.

Right now I'm using github issues as my todo list:

[https://github.com/metafetish/buttplug-csharp/issues](https://github.com/metafetish/buttplug-csharp/issues)

I'll probably be making a trello board once things calm down some, so we can start planning new features across versions. I'll make another post when that happens.

Thanks to everyone for your support so far. Hope this turns out usable. :)