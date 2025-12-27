---
title: "What's qDot Up To This Week? (2021-12-13 Edition)"
date: 2021-12-13
---
AND WE'RE BACK.

I seem to have recovered from my coding burnout, while simultaneously getting VR burnout. So now I'm writing a bunch of code but barely using VR.

<!--truncate-->

# Buttplug
Finally released Buttplug v5.1! This has important features like:

 - Lovense Gush/Hyphy, Satisfyer support built in, along with extended support for Svakom, ManNuo, LoveDistance and Kiiroo toys
 - Updated to the latest version of the Bluetooth LE library we use, should fix quite a few bugs, especially on Linux
 - Named Pipes (no more websocket port collision issues! At least once programs start using Named Pipes, which they probably won't for a while.)
 - Some fixes to try and make Lovense Connect more stable to use
 - Lots of library stability fixes
 - Started working on making it easier for users to add their own devices to the library

I've also finally updated the C# and Javascript/WASM libraries to work with the latest version of Buttplug, and made some small fixes on the Python library. I'd like to also update Twine, but that's going to take some serious work.

This was a pretty big release, and I'm hoping it's the last one before v6.0, which will have new messages in it, allowing us to support things like some fucking machines and the Lovense Max Air Bladder (finally). Expect work on that to begin after I finish up the alpha for the new Intiface Desktop.

# Intiface Desktop
Work on the new Intiface Desktop (written in Rust instead of Electron) continues, and is mostly ready to ship as an alpha version to patrons! It'll be extremely rough around the edges to start, and I'll be making a lot of UI changes before it gets to public beta, but I'm definitely excited to get it out to people to start playing with! There won't be a lot of new functionality up from that will be interesting for users, but the system itself should be far more stable, and will allow users to report crashes and other errors far more easily than me trying to ask questions over discord.

# Other Stuff

 - I still have 3 videos waiting to finish editing >.> Coding has been top priority for now, but hoping to get to video content soon.
 - I'm now working with devs from [Nudica](https://nudi.ca/blog/) and [Heat](http://patreon.com/heatgame) for Buttplug integration into their games!

That's it for now. Been a busy few weeks, but looking forward to having new software out for people to check out soon!

Until next week, Keep Buttpluggin'!

- qDot
