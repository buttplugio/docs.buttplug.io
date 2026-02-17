---
title: "Buttplug Win7 Bluetooth Le Server Alpha 1"
date: 2017-11-12
authors: [qdot]
---

Here we go.[https://ci.appveyor.com/api/buildjobs/3lohva12t662uun2/artifacts/ButtplugNodeServer-1.0.9.7z](https://ci.appveyor.com/api/buildjobs/3lohva12t662uun2/artifacts/ButtplugNodeServer-1.0.9.7z)

Please do not pass this URL around. This is not meant for general public consumption yet.

<!--truncate-->

If you're running Win 10, ignore this and just use our C# server like you have been. This is really for Win 7/8 users only.

This 7zip file contains a bare, command line Buttplug websocket server based on node. There's no installer, this is just the executable and supporting modules. I usually don't release things quite THIS raw, but I'd like to get some idea of how this works for people before figuring out which direction to go with it next.

In terms of bluetooth dongles, right now the only one I have that I've tested with is the usual Plugable dongle I recommend. ([https://www.amazon.com/Plugable-Bluetooth-Adapter-Raspberry-Compatible/dp/B009ZIILLI)](https://www.amazon.com/Plugable-Bluetooth-Adapter-Raspberry-Compatible/dp/B009ZIILLI)

Here's the steps for usage.

1. Install Zadig WinUSB drivers. Download Zadig from [http://zadig.akeo.ie/](http://zadig.akeo.ie/) and start it. Look at the device list for your bluetooth dongle, select it, and make sure the VID/PID pair that shows up is on the list at [https://github.com/sandeepmistry/node-bluetooth-hci-socket](https://github.com/sandeepmistry/node-bluetooth-hci-socket). If it is, install the WinUSB drivers for it. This means your dongle will no longer work with other devices, and you'll need to uninstall these drivers if you want to get it working with other things again. If this is a problem, upgrade to Windows 10. :)

2. Run the buttplug-node-server.exe executable. It should print a few messages followed by a "bluetooth on!" message. If you don't see a "bluetooth on!" message, then bluetooth is not running.

3. You'll need to do the cert verification step, same way as you do in the C# server. Open your browser, go to [https://localhost:12345](https://localhost:12345) and accept the certificate.

4. Go to [https://buttplug.world/playground](https://buttplug.world/playground) and try to connect to the websocket server, then do a "Start Scanning" and see if your device comes up.

Currently, this will only work with playground/syncydink. ScriptPlayer compatibility is a top priority but I may not have time to work on it for a few days and just wanted to get something out.

If you start scanning and your device isn't found, stop the websocket server, unplug/replug your dongle, start the websocket server again, then reload playground and try reconnecting. I've had problems with scanning just not finding devices at all until I replug the dongle, but haven't had time to debug.

The goal is to integrate this into the same GUI the Win10 server users, but we're a ways off from that and I'm still trying to figure out how that's going to work. For now, this will hopefully work as a stop gap. I'll post updates as they happen, and please let me know if you do/don't get things working.

Good luck.
