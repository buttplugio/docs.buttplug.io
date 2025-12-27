---
title: "Intiface Desktop 001"
date: 2019-03-16
---Welp. Here we go:

[https://github.com/intiface/intiface-desktop/releases/tag/0.0.1](https://github.com/intiface/intiface-desktop/releases/tag/0.0.1)

<!--truncate-->

The first user focused (versus developer focused) release in something like 10 months.

Intiface is the new brand for the desktop and mobile apps I'm building on top of Buttplug. Buttplug was originally supposed to just be a library, but as many of you have heard me repeat too many times already, I moved slightly too fast and just started calling the server software Buttplug also. This poses 2 problems:

- People don't like actually *installing* a thing named Buttplug

- There's no way we're getting a product named Buttplug into app stores, ever.

Intiface isn't quite as catchy as Buttplug, but you can rest assured, Intiface has Buttplug in it.

As for Intiface Desktop 0.0.1:

Intiface Desktop is the new Buttplug Server. The major difference is that it's violently cross platform, meaning that it can run on Windows/Mac/Linux, and soon even RPi. 

Right now this is pulled off via Electron, meaning the executables are... large. Like 25x the size of the Buttplug Server. Such is life in Electron. :|

For those of you that are already cursing me for using Electron but happen to be still reading: There's another solution coming. I'm building another version of Desktop that will run on a local webserver, so you can access it through a browser. This is also the version that will run on an RPi, so you can set it up to be dedicated listening hardware. 

If you hate GUIs of *any* kind, all Intiface does is run a command line program in the background, so you can just write your own scripts to do that too. Those executables are downloadable as releases from buttplug C# ([https://github.com/buttplugio/buttplug-csharp/releases)](https://github.com/buttplugio/buttplug-csharp/releases)) and buttplug-js ([https://github.com/buttplugio/buttplug-js/releases).](https://github.com/buttplugio/buttplug-js/releases).) It's recommended to use C# on windows, JS on anything else.

Right now, Intiface Desktop 0.0.1 has almost all of the functionality of the Buttplug Server:

- Can listen on insecure/secure websocket ports (On Windows/Linux/Mac)

- Can listen on IPC (windows only for now, and really not even sure if it works)

New features include:

- Can update the Buttplug Engine (the part that actually talks to hardware) separate from the app.

- Runs on the latest version of Buttplug JS or C# (depending on platform), which I released last night.

- Has a setup flow, including secure cert acceptance, though you may not need it (see Secure Cert Update section below).

Future plans include:

- Ability to list supported devices (YES REALLY)

- Ability to run a Proxy Server (connect from desktop to android phone, similar to FeelConnect, but local)

- One day, connect to and act as a gateway for online services that still need to be written. >.>

The UI is still an absolute mess, but that's due to be fixed as soon as I have time. This release is mostly because I'm teaching a workshop using this next week and so I need something *now*.

On this point, the app current starts in "Advanced Mode". I'm trying to make a "Simple Mode" where setup of the whole server is done in sentence form, versus random checkboxes and lists, but that's not quite ready yet. If you've worked with the old Buttplug Server, Advanced Mode will be basically familiar.

The app also lacks self update capabilities. A preliminary version of this that just tells you to download the new version is coming soon (possibly next few days), with a full version that can update itself in place coming once I figure out how code signing certificates work (possibly next few weeks).

While 0.0.1 is out, I'm not really announcing it publicly yet because I expect there to be an absolute ton of bugs. If you decide to try it and find any issues, please let me know by commenting here, poking me on twitter/discord, etc...

While I could totally use a break after this release, it's not gonna happen. I leave for CMU tomorrow, will be posting updates from there!

Keep Buttpluggin' (hopefully with Intiface now)!

- qDot