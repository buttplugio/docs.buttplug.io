Edging ever closer to the v4 release...

### Buttplug
Buttplug Spec v4 and library v10 is... mostly feature complete! I think! Maybe!

<!--truncate-->

I keep adding stuff and I really need to stop it!

For real though, great progress is being made and I think I'm now down to hammering out specific message details and starting to rework client libraries for other languages. I spent the July 4th weekend finishing up some bugs and rebuilding the message spec, which is available at

[https://beta.docs.buttplug.io/docs/spec](https://beta.docs.buttplug.io/docs/spec)

You will probably notice that it is much, much simpler than prior specs, which is the point. I wanted to remove a lot of complexity while giving us room to grow more easily in the future, and I think I've achieved that.

If you're curious about what's left, the tracking bug is being kept up to date:

[https://github.com/buttplugio/buttplug/issues/565](https://github.com/buttplugio/buttplug/issues/565)

I'd like to get the Buttplug v10/Intiface Central v3 release done before the end of July, but it kind of depends on how much I continue to change things, and documentation/testing I can get done.

### Intiface Central
Intiface Central is now building against the new spec, and seems to be working pretty well. I'm trying to figure out what prerelease builds will look like, but I'm hoping to have a build for people to try up soon. This will be an important step in making sure the new version is ready to release, since pretty much every part of the library code got touched at some point over the past 2-3 years of development.

Probably the most interesting thing here outside of all of the underlying changes (which will make things hopefully more robust for users, but probably won't be noticable) is that I'm still hoping to release an HTTP REST API built into Central, for easy access to toy control. No more being required to use websockets! (Though I will still recommend that :| )

### Everything Else

- A lot of people making Keyboard/Mouse pickup software now! We've got [VibeMapper](https://github.com/LivingTh1ng/VibeMapper), [Lewd Input Viewer](https://github.com/Namaztak/lewd_input_viewer/), and at least one other in the works!

That's it for this week. Thanks to all of the new patreon/github/etc subscribers this past couple of weeks, the funding means a lot, especially as my affiliates fall apart due to me being so busy with coding I forget to run ads.

 Until next time, Keep Buttpluggin'!

- qDot