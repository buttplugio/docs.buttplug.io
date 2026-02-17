---
title: "What's qDot Up To This Week? (2020-09-21 Edition)"
date: 2020-09-21
authors: [qdot]
---
All the things!

# Stickers
As of about 5 minutes ago I am officially caught up on stickers! Everyone that entered their address should now have them.

<!--truncate-->

If you've given at $3 or above before and haven't put in your address, either add it to Patreon, or DM it to me on here/twitter/discord, and we'll get you some stickers!

# Buttplug
With Intiface Desktop stable enough for testing right now, I'm back to finishing up the Buttplug FFI ports. Basically, this is trying to get us to the point of the same language compatibility we have currently. 

 - Buttplug-rs FFI to C# is done and working, I ported the GHR to it last week and it ran fine (will release that soon)
 - Buttplug-rs FFI to Web JS via WASM is mostly done. I can replicate some of the JS demos with it.
 - Buttplug-rs FFI to Java is happening! Via a community member who I'm working with. This is super exciting, people have been asking about this for years.
 - Buttplug-rs FFI to Python has yet to be started but should be pretty straightforward
 - Buttplug-rs FFI to Node JS has yet to be started but should be pretty straightforward via Neon (a Rust to Node library)

I'm considering the first 2 bullet points the big releases, Python will be nice, and node has always been kinda iffy so getting that done will just make it... less iffy.

The big question for ALL of these is going to be how to distribute them through package managers. With C#/JS/Python I could just go to NuGet/NPM/PyPi respectively, and I should still be able to, I'm just going to have to pack the library along with it. Luckily the library is 3-7mb depending on the platform, so it's not like it's huge, but this may still get complicated for a bit.

# Everything Else

 - The plan after the 2 FFI layers are done is to work on DOCUMENTATION. Rewriting the dev guide and starting the rust buttplug and FFI books, so other people can actually start using this shit.
 - There may be a new GHR built on buttplug-rs soon. It'll look exactly/work the same, but will have Lovense dongle support/etc now via rust.
 - Trying to figure out what the future of things like Syncydink is going to be. I'm... a little enamoured with this whole idea of writing rust for the web, heh.

That's it for this week's update. I'll be sending another post here in a bit about something different.

Until next week, Keep Buttpluggin'!

- qDot
