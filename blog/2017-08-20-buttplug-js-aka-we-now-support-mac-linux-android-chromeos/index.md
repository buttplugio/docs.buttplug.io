---
title: "Buttplug Js Aka We Now Support Mac Linux Android Chromeos"
date: 2017-08-20
authors: [qdot]
---

As of yesterday, I managed to get the javascript web technologies version of the Buttplug Server done. This is now integrated into Syncydink:[https://buttplug.world/syncydink](https://buttplug.world/syncydink)

If you go to the site now in Chrome (and yes this requires chrome, for WebBluetooth, and you will need to use https), then go to the Buttplug tab and click on "connect local", the "Start scanning" button now triggers a search for devices.

<!--truncate-->

Currently, we support:

- MacOS/Android: Fleshlight Launch, all Lovense toys

- Linux: Some Lovense toys

- ChromeOS: Haven't tested

Yes, there's a problem with Linux and the Launch (and apparently the Lovense Hush but not the Edge?!). We can connect to the launch via WebBluetooth, but it can't actually establish communications. We figure this is a Chrome bug (we've successfully controlled the launch with gatttool), and will be following up on that with the Chrome WebBluetooth team.

Also, this list doesn't have Gamepads in it for any platform, because gamepad vibration on web browsers is an extremely new thing, implemented as part of the Gamepad Extensions spec for WebVR. While rumble is implemented for VR controllers, it has yet to be extended to gamepads in any browser that I am aware of. Either way, we'll still try to support touch rumble with this soon.

# Next Steps
Here's our plans for the next while if not more:

- Add more toy coverage to buttplug-js and buttplug-csharp

We recently added TranceVibrator and WeVibe support, and OhMiBod should be on the way shortly. Starting to look toward things like the SayberX, as well as backward toward things like the RealTouch.

- Videos! Seriously!

So to everyone who started donating to this patreon because I was gonna make videos, don't fret! I'm gonna make some more! We've now just got miles and miles of topics to cover since I have a solid software base to work from. Buttplug is to my videos as MIX/MMIX is to Art of Computer Programming, as it were. :)

- Documentation. Any at all.

We documented the protocol but so far that is it. We have a LOT more documentation we need to write in order to make this huge pile of code easier for others.

- Start adding ui/ux features to syncydink

Syncydink right now is a bare minimum haptic movie player. There's no chapters, no looping, no bookmarking. We've got a lot of work ahead of us to make it an ideal viewing system

- Working with new partners

Thanks to the Vice article as well as community outreach, we're starting to get interest from possible partners. As things solidify in this department I'll post about them here.

- Ramping up media/attention

We're almost done with the checklist I made for myself of "things to do before I can really start pushing this hard in public". We've got a few small things left, but once those are done, we'll probably be trying to drum up more coverage and interest.

- buttplug-node and buttplug-rust

In terms of server implementations, we can now expand buttplug-js to also support Node.js bluetooth. This would detach us from requiring the browser on mac and linux, and could also possibly work on windows for people that want to work in JS instead of C#.

I'm still dedicated to a Rust client/server pair because damnit I want to write more rust, and we've had a ton of interest in that community. It's just a fun language to work in. We've got a large hill to climb there though, as there's a lot of library code (usb/bluetooth support etc) to write.

- Tutorials

Now that buttplug-js is technically runnable from a browser, depending on your platform, we're hoping to build some tutorials on glitch.com. This will allow people to quickly and easily remix on top of the buttplug-js node module to make their own webapps.

# Closing
Thanks again to everyone who has stuck with me through this somewhat quiet development period. I'm really hoping that we're going to have more to show that the base software is usable.

As always, if you have any questions, feel free to contact me via the comments here, or on twitter at [https://twitter.com/qdot,](https://twitter.com/qdot,) or by email at kyle@machul.is.
