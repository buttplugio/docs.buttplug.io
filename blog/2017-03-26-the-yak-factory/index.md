---
title: "The Yak Factory"
date: 2017-03-26
authors: [qdot]
---
New blog post going up on buttplug.io tomorrow, but you get to read it first!--

When writing software for hobby projects, there's a tendency to go "Oh, I want to learn [thing]" and add that to the stack of things required to build the project. So far, buttplug has been no exception.

<!--truncate-->

Using [Rust](http://www.rustlang.org/) to build the desktop version was a great start for that. While Rust is a fantastic language that's really coming into its own, and provides great facilities for safe programming (something that doesn't happen in sex toys much if ever), the library ecosystem leaves a bit to be desired. There's not much in the way of GUI or hardware access libraries, and things like Bluetooth 4 libraries are basically non-existant (I realize [blurz](https://github.com/szeged/blurz) exists, but it's linux/dbus only). Instead of just writing libraries to support the toy hardware, I decided to try and fill things in, writing a [simple systray application library](http://github.com/qdot/systray-rs), which I'll then just use for status and opening a browser based GUI.

Hardware is still a problem, though. Serial and USB Sex Toys shouldn't be too difficult to deal with, as there's already [serial](https://github.com/dcuddeback/serial-rs) and [libusb](https://github.com/dcuddeback/libusb-rs) bindings for rust. Unfortunately, most sex toys these days are Bluetooth 4/BLE, so serial and USB only get me support for legacy toys. I haven't been able to find libraries in ANY language that handle full Windows 10/macOS/Linux BLE. [node.js's noble](https://github.com/sandeepmistry/noble) comes close, but still doesn't work with Win10 UWP bluetooth APIs (though that support will be [coming in with the noble-uwp repo](https://github.com/jasongin/noble-uwp) the Creator's update next month). There's more info on desktop bluetooth [in this article I wrote on the subject last year](https://kyle.machul.is/2016/11/07/talking-bluetooth-le-on-desktop-in-2016/).

Speaking of noble and node.js, at some point I decided one of the [things] I need to learn was node. I've been developing hardware access libraries in 3 languages:

 - Python: For proof of concept work, as this is the language I work   fastest in
 - Rust: For buttplug application work
 - Javascript: To both learn node and WebBluetooth, meaning that for   browsers supports WebBluetooth, no software has to be downloaded.

Then there's the toys themselves. I've been picking up a bunch of new toys lately, including the [Vorze Interactive](http://vorzeinteractive.com/) and [Fleshlight Launch](http://fleshlight.com/launch). Getting new toys means:

 - Reverse engineering the toy
 - Writing documentation
 - Taking pictures
 - Adding a buttplug.io page
 - Writing libraries
 - THEN trying to figure out integration with the buttplug application   framework

Needless to say, I haven't made it very far into development of the actual Buttplug application yet.

To remedy this, I'm trying to give myself a good first goal for release. Coming up with these goals has been driven off conversations with [my patreon funders](http://patreon.com/qdot) and members of communities like the [RealTouchScripts Forum](http://realtouchscripts.com/), as well as assessing how I want to use what I've learned so far. The problem being that buttplug in itself is more of a development platform and less of an end-user application. That means adding yet another project to the pile, that will exercise the applications and the libraries in a way that's interesting to both me and users.

With that in mind, I've created a repository for something I'm calling [SyncyDink](http://github.com/metafetish/syncydync). There's a trend these days of make web-based video players for toys, since it's fairly easy to throw together a GUI and play videos in HTML, and get the timing information out of them via javascript and requestAnimationFrame updates. However, every player uses a different format for their specific toy. Making a single player that can take the formats and send them to the Buttplug application (or just straight thru to WebBluetooth for platforms and toys that support it) seems like a good goal for QA'ing things. There's already a TON of haptics-encoded content out there, as well as people familiar with using it.

... But also it means I get to play with WebVR for 180 SBS videos. 

See? I keep shaving, and the yaks keep coming out of the factory.

Expect Buttplug and SyncyDink to be released sometime near the heat death of the universe.
