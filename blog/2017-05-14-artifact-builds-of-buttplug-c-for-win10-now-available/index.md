---
title: "Artifact Builds of Buttplug C# for Win10 Now Available"
date: 2017-05-14
authors: [qdot]
---
I have set up the Appveyor CI to output ButtplugGUI installers on every build I make now.  If you go to[https://ci.appveyor.com/project/qdot/buttplug-csharp](https://ci.appveyor.com/project/qdot/buttplug-csharp)

and click on one of the build configurations, then click on the "Artifacts", you can download installers from each build.

<!--truncate-->

Note that these installers may not actually /work/. Just because all of the tests passed and the installer was built does not mean this is a functioning product. I just spent an hour trying to figure out why builds failed silently after install due to fucking up assembly version number insertion, so I've still got a lot to do on the QA side here.

Also, there is currently no documentation for Buttplug other than the code itself. There's not even really comments in the code at the moment. Not my finest hour in terms of documentation, but I've fallen down on a lot of my normal habits (tdd, comments, etc) just 'cause it's been nice to actually get this out of my head. I'll be sweeping back through to comment at some point.

So, here's a few tips about it at least:

- Right now builds support the Fleshlight Launch, Lovense Hush, and XInput gamepads (xbox gamepads). The builds will detect Kiiroo Onyx/Pearl toys but something is wrong with how I talk to their serial chips so the connection is very iffy.

- The "Device" Tab: Here you can trigger device scanning (instantaneous for gamepads, bluetooth might take a bit), and see what devices it finds. When Buttplug finds a device, it connects with it and will stay connected until the program ends, the device turns off, or something throws an exception that I missed that frees the device somehow. The number shown at the front of the name is the "Device Index". This is important for later.

- The "Applications" tab: Turning the "Websocket" Application on will make Buttplug a (unsecured) websocket server, able to talk to other applications via a JSON protocol. This hasn't been tested in a while and may not be working. The "Kiiroo Platform Emulator" application turns on a webserver that receives HTTP requests from applications that expect to talk to the Kiiroo Onyx, like [http://flickr.tv](http://flickr.tv) movies and VirtualRealPlayer. The device list shown here is devices you can select to control with the commands the server receives. Currently, only the Fleshlight Launch works for this, and it's just using the FeelConnect protocol, so don't expect much. Note that, outside of closing and reopening the application, there's currently no way to turn off the http server once you turn it on because the library I'm using doesn't seem to have that working. 

- The "Log" tab: Shows the current log messages coming from Buttplug. If you have repeatable, non-crashing problems and need to send me documentation, this is where that'll happen. You can save logs I can use to remotely debug things to a file and poke me on here, or just email me if you've got my address.

- The "About tab: Just shows version info, links (yes I know the documentation link is a 404 :p ), and begs for cash.

I'm keeping the bug list on github as up to date as I can, so as issues disappear from there, they'll show up in these artifact builds.

[http://github.com/buttplug-csharp/issues](http://github.com/buttplug-csharp/issues)

The current path to v0.0.1 involves:

- Writing more tests

- Figuring out how to test the installer on appveyor so we don't have bogus builds

- Moving logging and some other stuff to dependency injection

- Figuring out NuGet for library distro

- Writing basic application documentation

- Starting on the "Big Book Of Buttplug", the developer documentation for the library/protocol/architecture/whatever the hell it is I've done here

As for platform support, this currently will not run at all on Windows 7, most likely because I'm hard linking against UWP metadata that requires at least some version of Windows 10. I've got a Win7 VM with visual studio up now, and I'm going to see about adding a Win7 version of the project that gets rid of that. It'll be missing all of the bluetooth parts for now, but at least gamepads will work. Tracking of that work is at

[https://github.com/metafetish/buttplug-csharp/issues/40](https://github.com/metafetish/buttplug-csharp/issues/40)

Ok. Back to work.
