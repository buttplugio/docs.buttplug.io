---
title: Whats Qdot Up To This Week 2021 03 22 Edition
date: 2021-03-22
---
I can apparently code again!

### Intiface Desktop
And that means Intiface Desktop updates! I was already working on cleaning up ID back in January, then got sidetracked onto... something or other. Anyways, with the new release of VibeGoesBrrr (a VRChat plugin for Buttplug) on Friday, it managed to trigger a bug that would cause Intiface Desktop to stop server processes after ~15-20 minutes. This had been a problem for months, though usually it took 4-6 hours to crop up. Turns out, the server process buffer wasn't flushing and would overflow at 1MB of log messages, and the new VGB caused us to spew TONS of log messages, hence the ~15-20 minute time to server stoppage.

<!--truncate-->

I changed the process input to streaming (so now there's no limit, I racked up a 20mb log file testing that heh), so that should no longer be a problem. Everything else there has been quality of life stuff, just bug fixes, removing the C# engine choice, etc.

The next big thing for Intiface Desktop is... figuring out what Intiface Desktop is supposed to be. The application was never really defined as a product, I just chucked it together so people didn't have to run a command line. That's not really working anymore, so I'm going to take a bit of time and figure out exactly what it *should* be.

### Buttplug
Updated Buttplug C# and JS yesterday. Mostly bug fixes, but should make life nicer for devs using either of those.

### Other Projects

 - Syncydink continues to be wildly popular now that I said I'd no longer work on it. Am now weighing my options here.
 - I've gotten a bunch of people asking about Phasmophobia Buttplug mods. May look at that, as it uses the same system as the VRChat mods.
 - VRChat work continues apace. The new VibeGoesBrrr release is super neat. Highly recommended. Really hoping to get back to Neos work here soon too.

That's it for this week. Until next week, Keep Buttpluggin'!

- qDot