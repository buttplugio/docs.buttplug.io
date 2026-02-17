---
title: "Intiface V7 Win 10 Only Released And Updates On Projects"
date: 2019-04-09
authors: [qdot]
---

The newest version of Intiface for Windows 10 is now ready to download at

[https://github.com/intiface/intiface-desktop/releases/tag/v7.0.0](https://github.com/intiface/intiface-desktop/releases/tag/v7.0.0)

<!--truncate-->

For those of you that downloaded an earlier version: Do not try to use the application update system inside Intiface. It won't work (and still doesn't in v7). I'll hopefully have that fixed once and for all in v8.

This is basically a fully functional replacement for the old Buttplug Server at this point, but it's really not much more than that. Now that I've at least got the base done, I'd like to have testing happening while I work on new features.

Here's the status of some upcoming features.

# Linux Support
Linux support should be back pretty soon for Intiface Desktop. I've gotta fix up the node.js buttplug engine and figure out how to have the user allow the proper caps for bluetooth, but otherwise it should be ready to go.

# Mac Support
Mac support on the other hand... ugh. Apple has done their best to make it really, really hard to release software for macOS that was not built solely in XCode (which none of mine is). I'm trying to figure out a solution for signed binaries right now, but am hitting multiple blocks that may take a bit to figure out.

# Express (HTTP Server instead of Electron) Support
For everyone that hates electron or wants all of this to run on a Raspberry Pi, I've built the system so it should run in a web browser backed by a specially built web server. This is still extremely proof of concept, but once we have desktop linux compatibility up and running, that'll get us most of the way to being able to run Intiface on a local web server. This should work across all platforms, but probably won't be the way I'd recommend running Intiface on desktop unless you know what you're doing.

# Proxy (aka Win 7 Support, Assuming You Also Have An Android Phone)
The first new feature I'll be adding to Intiface is known as the Proxy. This is to give people with an android phone a way to talk to bluetooth LE toys from a desktop. The workflow will look something like:

 - Load a special webpage on your android phone that looks pretty much like the Buttplug connection sidebar for Buttplug Playground ([https://playground.buttplug.world).](https://playground.buttplug.world).) Connect to Intiface Desktop through this using websockets.
 - Now you can use any Buttplug desktop app (Syncydink, Scriptplayer, etc...) to connect to Intiface also, and it'll forward device commands to the phone.

Still not quite a elegant as having an actual mobile app, and you'll need your phone and the desktop on the same network for all of this to work, but it's a decent stop gap for now that can allow sex hardware to work with no app store downloads required.

# Simple Movie Hosting
This will just be a way to host movies and script files on a desktop so they can be accessed on a phone or standalone VR headset in Syncydink without having to move the huge files to the phone/headset. Trying to remove the barriers to watching hardware sync'd VR for those that don't have a full VR rig available.

# GVR v2
The first application I'm planning to build outside Intiface is v2 of the Game Vibration Router. It'll mostly be v1 with a shiny new skin, plus a couple of extra features for dealing with the VR game mods (like Beat Saber) I've been working on.

# Syncydink and Playground
I've learned a LOT more about Vue and app development while building Intiface, so I'm hoping to circle back and update Playground and Syncydink with those skills at some point within all of this.

# Mobile Apps
Since Intiface is built on web tech, I'm hoping I can take the frontend work I've done, scale it for mobile screens, and maybe integrate it with something like NativeScript to make mobile apps. I highly doubt this will Just Work, but it'd be nice if it did.

# Intiface Online
Yes actual teledildonics are coming, especially now that I have a flexible desktop app to connect thru. This may take a while tho, as there's a lot of unfun stuff like server images and user systems to build first.

That's it for now. I've been doing Intiface releases every few days at the moment but have been waiting to get to a stable point to announce things here, so I'll probably start making update posts here more often.

Lemme know what you think!

qDot
