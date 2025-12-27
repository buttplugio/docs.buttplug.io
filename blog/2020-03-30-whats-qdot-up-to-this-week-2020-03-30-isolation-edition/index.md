---
title: "Whats Qdot Up To This Week 2020 03 30 Isolation Edition"
date: 2020-03-30
---Well this first header is not something I would've expected to be writing last week.

### Buttplug Teledildonics
So, as you have probably been aware from my incessant posting about it, I'm doing a Iivestream series on how to build a simple teledildonics service. The first 3 parts are done and up on youtube, here's the playlist link:

<!--truncate-->

[https://www.youtube.com/playlist?list=PLDZBOOe-bdwNAjm018ql9KDzu5SEV_XwX](https://www.youtube.com/playlist?list=PLDZBOOe-bdwNAjm018ql9KDzu5SEV_XwX)

The 4th and final part is coming up, where I actually code a teledildonics system with the app I built in part 3. I'd been figuring I'd just write a new simple protocol system to make instances of the app talk to each other. I've usually claimed that Buttplug itself wouldn't work as a good teledildonics protocol, so I was just going to make something that basically worked but probably wouldn't be worth much.

Then last Friday I realized that I was completely wrong and actually I could build teledildonics with full permissions assignment/sharing from within Buttplug itself.

I spent most of the weekend coding it into buttplug-js, since I'm doing the livestreams in js, but these structures will also be built into buttplug-rs, and hopefully usable from all implementations in the near-to-medium future), and sure enough, it works. I released buttplug-js v0.13.0 last night, with the structures needed to build a simple many-to-one Teledildonics system. Tested it using Buttplug Playground (yes, Buttplug apps "just work" with this, you basically connect to another server instead of the intiface desktop one), and it worked!

By many-to-one, that's many controllees, one controller. Multiple people can share their toys for one front-end to control (or just one-on-one too). This just has to do with how the architecture comes together inside of Buttplug.

There's still some fiddly network and permissions bits to work out, mostly in UI, but I'm hoping to have something online by next week that will allow people to have their own teledildonics control via forking a glitch.com project, or just downloading the git repo and running their own server. As patrons, you'll all get first crack at that, and I'll be posting info about it here throughout the week as I get more done. 

I'm now trying to figure out how to present this in Part 4 of the livestream, as this could get pretty deep into the weeds on the Buttplug library, and I'd like to keep things as accessible as possible for that series. But this makes a lot of new options (twitch-plays-sex-toys, telegram/discord bots, etc) basically trivial from the controls routing side, so we'll see where this ends up.

If you're really curious about the internals, hit me up on twitter or discord, happy to explain, but you may get firehosed.

That's pretty much it for this week. The livestream then the teledildonics projects ate all my time.

Until next post, which I'm guessing will be before next Monday: Stay home, stay safe, and keep buttpluggin'!

- qDot