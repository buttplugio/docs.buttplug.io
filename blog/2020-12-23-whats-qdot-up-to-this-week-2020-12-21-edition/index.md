---
title: "What's qDot Up To This Week? (2020-12-21 Edition)"
date: 2020-12-23
authors: [qdot]
---
DAMNIT V1 WILL HAPPEN. SOON.

# Buttplug
So close. So damn close.

<!--truncate-->

The WASM layer has been reworked and is now far more sane. C# has a few testers, all of whom seem relatively happy with the functionality. Dev Guide examples are up and working for Rust, C#, and JS

Outside of fixing massive memory leaks during certain unique types of usage ([https://github.com/intiface/intiface-cli-rs/issues/9,](https://github.com/intiface/intiface-cli-rs/issues/9,) just fixed and released new libraries/binaries) and getting READMEs updated, Buttplug v1 is ready to go.

Next few days will be me nailing down that last documentation, then writing a blog post and calling this done. We'll see how long it takes, but I'm not really set on any specific date for this release because it's really a beginning, not an ending.

There's going to be tons of bugs to fix and new features to add once v1 is done, but at least I can start rev'ing real versions at that point versus just promising new functionality.

I'm off from my dayjob from Christmas thru NYE, so I'll have a week to figure out what's next.

# Everything Else
Soon after v1 drops, outside of figuring out what's next, I'd like to:

 - Updating the website for the first time in many many months.
 - Bring GHR up to v1 and add Intiface Desktop connectivity so people don't have to wait on me for updates
 - Bring VAMLaunch up to v1, same deal with Intiface Desktop.
 - Get Buttplug Playground onto WASM, mostly done, just need to release it.
 - Fix the fucking tutorial.
 - Update Intiface Desktop to remove the C# option that hasn't worked anyways, and get us down to just using the Rust engine. And maybe adding Sentry logging for the constant crashes I'm expecting from that.
 - Continue writing the "advanced" part of the dev guide, which will cover some of the deeper parts of the library.

I also would like to do some blog posts about v1 development, and maybe some youtube videos? We'll see how much energy I have.

Hope everyone is having some sort of decent holiday or something.

Until next week, which will hopefully be post-v1 release, Keep Buttpluggin'!

- qDot
