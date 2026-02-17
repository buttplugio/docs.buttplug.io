---
title: "Buttplug Game Vibration Router"
date: 2017-08-23
authors: [qdot]
---

A couple of weekends ago, I got the stupid idea of "Hey. Rez Infinite came out. Wouldn't it be funny if I could make it work with the original USB Rez Trancevibrator?"48 hours and a lot of education about DLL Hooking later, it was done. We now have a way to control sex toys via Gamepad vibration command on Windows, with no modifications required to the game in question. This works with any game that supports XInput (XBox Compatible) gamepads, and I'll be extending it to work with vibration commands to Oculus/Vive controllers soon. Also, this currently only works with toys that vibrate, as that's all I've had time to implement. This certainly can work with the Launch, Vorze, and other toys, I just need to sit down and figure out the translation algorithms to do so. 

I've now run it by a couple of testers, and it seems to work, so I'm releasing it only to Patreon members first. I'm planning on making a Buttplugin' With qDot video about this and releasing it to the general public next week, but figured it might be fun to have more people trying it with games first.

<!--truncate-->

For those interested in the technical explanation: The basic idea here is similar to something like x360ce ([http://www.x360ce.com/).](http://www.x360ce.com/).) x360ce allows players to use joysticks/gamepads/other controllers for any game that will take an XInput gamepad.  It does this by "hooking" the DLL, which means injecting code into the process and intercepting/rerouting calls to library functions that relate to controller input and output. I used the same methodology here, except that my case is much simpler, since I'm just looking at commands that make the controller vibrate and then passing them on to the controller while also sending them to Buttplug. The package I used  for this is called "EasyHook", and the name is completely honest advertising. It's crazy how easy this was. 

[https://github.com/EasyHook/EasyHook/](https://github.com/EasyHook/EasyHook/)

To get the Game Vibration Router app (or as it's currently called the XInput Injector, which will be changing sono), you'll currently need to switch to running on a CI build of the Buttplug Application Suite. The latest version is the only working one, so you'll want anyhing >= 0.1.0.447.

[https://ci.appveyor.com/api/buildjobs/cvyusr3kxu0pyd5a/artifacts/Buttplug-Release-0.1.0.447-installer.exe](https://ci.appveyor.com/api/buildjobs/cvyusr3kxu0pyd5a/artifacts/Buttplug-Release-0.1.0.447-installer.exe)

As usual, this requires Win 10 15063 if you want bluetooth toys, otherwise you can use it if you want to play the game with one gamepad while using another for whatever you need vibration for. 

I've conferred with some people from the game anti-cheat industry, and they've said that this hook should NOT trigger anti-cheat mechanisms in games (at least for VAC/EAC). That said, be careful with it in online situations, as explaining this to customer support might be awkward. :)

I've set up a thread on the message boards for reporting game compatibility:

[https://metafetish.club/t/game-vibration-router-compatibility-thread/105](https://metafetish.club/t/game-vibration-router-compatibility-thread/105) 

If you try this out on something not on the list, lemme know (either by signing up for the forums and commenting, or feel free to DM me on twitter or email me at kyle@machul.is if you want privacy), and I'll add it to the list.

Have fun!
