---
title: "Intiface Desktop Rust Egui Alpha 1"
date: 2021-12-27
---In lieu of a weekly update, here's what y'all actually pay me for: A chance to be the first to test my extremely alpha software! Isn't paying to be my QA fun? :3

### What To Expect
If you're going to try this out, know that my main goal here is "stay out of the way". The old intiface was HORRIBLE at that, now I'm trying to minimize what users have to do normally so they can just boot up and go.

<!--truncate-->

Also, expect a lot of things to be missing, because I'm still working on a good bit of this, but want to make sure I'm at least headed in the right direction.

### Currently Windows >= 10 Only
Should work on other platforms, I just haven't had time to test on mac/linux yet. Maybe later this week.

### No Application Update Notifications Currently
For now, if I put out a new version, I'll post it here. I've still gotta build out the infrastructure for app updates but wanted to get this out sooner rather than later and it's already been a month of "one more thing".

### Installation
I actually built an installer for this, and all file will be separate from Electron Intiface Desktop. These can run side-by-side but I really don't recommend running them at the same time. Having both installed won't hurt anything though. If you need to uninstall this new one, it'll be listed at "Intiface Desktop x.x.x.x" in your apps and programs.

### How To Use
This is pretty much exactly like the old electron Intiface Desktop. Only difference is that the server status is now always visible. It's kinda like a music player interface now.

 - Hit play button to start server
 - Hit stop button to stop server
 - Icons on right will show status (Hear No Monkey = server off, Ear = Server listening, phone = server connected. I just like my weird iconography ok?)
 - There's also text in the middle

If you hit the down button, that'll open up the rest of the UI, and looks pretty similar to the older Intiface Desktop builds.

### Crash Reporting Default To On
This will be part of first run setup once I get the UI together for it, but right now crash reporting defaults to on, so if anything falls over, I'll get a notification on Sentry. If you absolutely hate this, you can turn it off in App Settings > General.

### If Something Goes Wrong Or Weird
Hit the **"Send Logs To Sentry"** button on the log panel and send me a message on here or discord/telegram/twitter.

### I Need Opinions!
Is this better than the Electron one? Worse? Are the color sets for the UI ok? If you have absolutely ANY opinions, please let me know them! You can reply here, send me a message on patreon/telegram/discord/twitter, whatever, I just want as much feedback as possible.

### Where We Go From Here
This test will be patreon-only until I finish out the update systems and the first run experience, which might happen later this week if motivation holds out. Right now I just need a break from GUI programming though because I am starting to approach burnout again.

Once I've made sure that the application can at least notify about updates and possibly even update itself, I'll move to a larger beta period that will probably get a channel on the discord server where I can interact with more people.

After enough people have tested this and we're feature complete with some documentation available, this will replace the electron Intiface Desktop. What that process is going to look like is an interesting question since the Electron system updates itself using some odd methods, but we'll see what happens. I don't expect this to happen before Feb 2022 though.

### Why Is This Important?
So, outside of the obvious (Intiface is how most people actually use Buttplug, and I've really neglected it)...

This is also me doing a test run of distributing apps through Patreon. I'd like to maybe do some fun small projects using Buttplug next year, because I've really lost touch with how developers interact with the library. I figure I'll make these part of the $5 tier or something, as they probably won't be fully formed ideas or anything I want to keep up, but rather just some fun experiments.

### Other News That Would Normally Be In the Weekly Update
This thing has kinda been my week so I don't have much to say otherwise, other than I got the youtube videos for the buttplug reviews and diamo mod up finally. That's really been about it. 

Expect a refresh of the Awesome Buttplug Apps/Games List ([https://awesome.buttplug.io)](https://awesome.buttplug.io)) sometime this week because I'm way behind and have devs prodding me about updating it.

### Conclusion
Ok I think that's it for now. If you have any questions, please reply to this, message me, or hit me up via:

 - Twitter: [https://twitter.com/buttplugio](https://twitter.com/buttplugio)
 - Telegram: qdot76367
 - Discord: qdot#0001 or [https://discord.buttplug.io](https://discord.buttplug.io)

Until next week, Keep Buttpluggin'!