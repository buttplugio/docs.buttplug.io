Fuuuuuuuuuuck.

### Buttplug
Well, it took me 3.5 years to get to  v1, and now ~3 weeks to get to Buttplug v2. \>.\<

<!--truncate-->

Since (and slightly before) the release of Buttplug-rs v1, I've been working with developers to find issues with the library. This has led to quite a few bugs being squashed, but I found a lot of them were coming from the same part of the system that has to do with how we handle distributing information between different components. Taking a deeper look at this, I realized the library is basically doing it completely wrong. It's not super surprising, since this is part of the system I wrote well over a year ago when just starting the buttplug-rs project, and I was still very new to async Rust. However, it'll mean major changes in the surface API of buttplug-rs, so that requires a major version roll. My hope is that fixing this will make things far more reliable though, and it should hopefully be done this week.

The FFI layer shouldn't really change much, so this is really only of concern to anyone using Rust directly, and I'm not sure anyone other than me is doing that. >.>

### Intiface Game Haptics Router
The GHR v10 is out! You can sorta detach now! You can hook it up to Intiface Desktop! It runs on buttplug-rs!

Really happy to get back to work on this and make it better. It still needs a ton of UX work, and I'm now starting to scope out handling stroking toys like the Keon/Launch/OSR2 with it, though that's gonna be... weird.

### Intiface Desktop
With the first major GHR update done, I'm going to be working on Desktop next. I'm really not happy with where Desktop is at the moment, as it just... doesn't make sense for what it is. I'd like to simplify what's there currently, and add some utilities like device checks, configuration, etc... to actually make it useful. The first release will probably be mostly under the hood changes to remove the C# engine, get device config updates working again, etc, but after that, expect more drastic feature work.

### VAMLaunch
With GHR v10 done, I'm hoping I can port that code over to update VAMLaunch. I'll be reaching out to the VAM community to see what other things might be needed too (like maybe renaming it something other than VAMLaunch since the launch is no longer a thing? :3 ).

### New 3rd Party Projects
A couple of new 3rd party projects to announce!

 - Aethersense - [https://github.com/Ms-Tress/AetherSense](https://github.com/Ms-Tress/AetherSense) - New FFXIV project that seems to be picking up steam. I've been working with the dev to diagnose buttplug issues, so it's getting lots of support from my end too (even though I still don't play FFXIV yet heh).
 - Osu!Toy - [https://github.com/hornyyy/Osu-Toy](https://github.com/hornyyy/Osu-Toy) - Fork of the Osu! rhythm game that has Buttplug support.

Ok, back to bug squashing.

Until next week, keep buttpluggin'!

- qDot
