---
title: "What's qDot Up To This Week? (2026-01-19 Edition)"
date: 2026-01-19
---
So much for that end of the year buttplug v4 release

# Buttplug
Missed the deadline on getting Buttplug v4 out by end of 2025 because I started working on testing Input messages annnnnd it turns out I just completely forgot to implement like half the system.

<!--truncate-->

Christmas break was mostly spent on that, porting the typescript and dart libraries into the v4 spec, and various refinements within the library. By the end of it things were feeling more solid but not quite there, hence more betas.

Since then, I've done even more work on reducing our message footprint (now there's just one stop message instead of 2!) and cleaning up the insides of the library. I've also started a bit of fun work [trying to integrate a small scripting language into commands](https://github.com/buttplugio/buttplug/issues/810), which is something people have been asking about for just about forever. Check out the linked issue if you'd like to see where that's going or have some input. This will not be shipping in v4 (most likely v4.1, because yes we can minor version specs now), but it should be neat!

# Intiface Central

Not much to say on Intiface Central, outside of that it's now the first testing ground of the v4 spec! Whenever you use the device panel in the beta, you're now sending v4 messages! It probably looks about the same!

Most IC updates will be coming after I get Buttplug v10 and Intiface Central v3 out, but at that point I'll have a lot of room to make smaller updates.

# Everything Else

Still honestly not sure when everything is going to get released as it mostly revolves around my otherwise very busy schedule now, but we're real close. Here's hoping it happens soon!

Until next time, keep Buttpluggin'!

- qDot