---
title: "What's qDot Up To This Week? (2021-02-08 Edition)"
date: 2021-02-09
---
Figuring out what it is I do other than library work...

# Buttplug
Got buttplug-rs v2.1 out the door over the weekend. After a few hiccups due to still not having *quite* enough test coverage, I think we're good.

<!--truncate-->

I'm hoping I can keep the library in a holding pattern for a bit now while I work on other things.

Also, for anyone that wanted Nobra's support, it's there but somewhat difficult to get to at the moment. If you're interested in it, message me and I can help out.

# VAMLaunch
Getting more questions about VAMLaunch lately, so gonna fork that and try to maintain it on my own, while having to also admit that I have *zero* clue what I'm doing with VAM. But I can at least get the toy support updated and hope someone will take care of the VAM side, or that what's there from 18 months ago still works.

# Intiface Desktop
Intiface Desktop v20 is in progress now, mostly cleaning up stuff that's no longer valid since I dropped the other engines and updating dependencies, as well as finally bringing in device config file updates for the Rust engine (so adding new devices to protocols we already have won't require a recompile of the engine). Gonna try to get that out soon to make sure those base changes work, then get back to work on new Intiface Desktop features.

I admittedly have no idea what I want Intiface Desktop to be at this point. I'd definitely like to get more device management and simulation utilities in, but right now Buttplug/Intiface as a whole are stuck in this weird situation where they are accessible in SO many ways that no one is quite sure how to do anything, and it's really confusing to pretty much everyone involved. So should Intiface Desktop host applications (like Steam/Epic/Itch/etc), or should it just stand alone and support outside connections, or what?

Gotta figure that out.

# Web Apps and Support Libraries
Playground and the tutorial are still running on buttplug-js, and Buttplug Unity/Twine are on v0.x stuff too, so I need to drag those into the new world. This will be happening between all of the aforementioned work. Luckily I've got people using both Unity and Twine currently, so I have help on testing and advice.

That's it for now. Looking forward to bringing everything up to date and creating new stuff! Until next week, keep buttpluggin'!

- qDot
