---
title: "Buttplug V10b2 And Intiface Central V3b2 Released"
date: 2025-10-19
---The time has come!

Or, well, I finally got sick of saying "one more thing then I'll release" and just decided to fucking release everything, lol.

<!--truncate-->

For the past 3 or so years, y'all have been listening to me ramble about the next version of the Buttplug Spec, how long it's been in development, etc... I honestly wasn't sure it was gonna make it out this year, but over the past couple of weeks things have come together enough that I felt ok starting beta releases, so here we are.

### Buttplug
The buttplug changelog is pretty massive:

- v4 Spec implementation! A simplified spec, with expanded capabilities and extra future-proofing (I hope)

- Rebuilt our backward compatibility for older specs

- Split repo in many different crates, as we rarely touch like 80% of the code

- Folded Intiface Engine into the main Buttplug repo

Everything is now on the main branch at [https://github.com/buttplugio/buttplug](https://github.com/buttplugio/buttplug)

### Intiface Central
Intiface Central looks almost exactly the same, but has Buttplug v10 under it now! There's also been quite a few bugfixes, mostly for quality of life issues.

And then there's the built-in REST API! This will *hopefully* make it easier to make quick one-off apps and test ideas without having to use a full client implementation.

Pre-releases are available at [https://github.com/intiface/intiface-central/releases](https://github.com/intiface/intiface-central/releases) - v3b2 is up already, though the builds are not signed and it's just desktop for now. v3 builds also have a "Use pre-release" option so you can track beta updates.

### What's Missing
At this point, I'm pretty sure we're feature complete on the Buttplug side. I'll be updating and changing Intiface Central while we test both of these though.

- Documentation. There is **almost no accurate documentation currently**. I'd updated the spec and some of the dev docs at some point in the past, but I need to sweep through and update everything again. Due to this, I'm not really announcing this release much yet.

- Bug fixes. We're aware of quite a few devices that are broken, mostly devices that have commands that can cancel other commands (joyhub devices, lovense devices with rotation, etc)... We've done quite a lot of testing but still have a lot to go.

- Client implementations. Rust has an implementation, but so far none of the other languages are implemented. This is considered part of testing.

### What's Next
The plans as they currently are:

- Documentation, documentation, documentation

- Continue bugfixing as we find things, as well as filling out holes in implementations.

- Move the Buttplug and Intiface websites to be built on docusaurus

  - They've been static pages since 2017, the plan now is to integrate the base pages into the documentation sites so everything is in the same place.

- Start work on JS and C# implementations

- Maybe do some development streams?

The main thing that could get in the way of this is my dayjob, the thing that's mostly been the reason for the slowdown over the past year. Not necessarily a bad thing, because I love the work and it's a great place, but it's definitely keeping me busy.

There's a lot more motivation to work now that I've hit a big milestone on this though. 3 years was way too long to run this branch, but it gave me a chance to actually do things as right as possible. I hope.

As always, for those with subscriptions, thank you so much for your continued support and dealing with the long quiet spells. I really appreciate it.

Anyways, that's it for now. Until next time, Keep Buttpluggin'!

- qDot