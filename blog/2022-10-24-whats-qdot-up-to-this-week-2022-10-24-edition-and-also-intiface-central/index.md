---
title: "Whats Qdot Up To This Week 2022 10 24 Edition And Also Intiface Central"
date: 2022-10-24
---Oof.

### Intiface Central
For those that just want the software (that this time should actually work) before reading all of the fun surrounding the software, Intiface Central v0.0.2 is available for Windows/Mac at

<!--truncate-->

[https://github.com/intiface/intiface-central/releases](https://github.com/intiface/intiface-central/releases)

Linux on the way this week hopefully, followed by new mobile releases which are happening on discord but I may upload here.

So, yeah, Intiface Central v0.0.1 was a mess. I found out that my strategy of downloading the Engine (i.e. the part that actually has the buttplug server in it) as a separate executable and having Intiface Central run that is... not really viable given the security models of most modern OSes. Windows and macOS both hate this and won't let it happen easily.

The good news is that I already had a plan for this. Our new mobile apps never even had the chance of running this way, so I had to embed the engine in them, so I spent the past week porting that functionality to desktop. It seems to work fine now, and also makes life much easier in terms of application development. We should no longer have issues of people not being able to download/update the engine, or having the file go corrupt or whatever.

It does mean that any time I update Buttplug I'll also have to release a new version of Central, but at this point I really don't care. I just want this done and easier for users.

I also got Android release builds working finally, so that app will be ready to ship to Google Play once it's a little more tested. We're still looking quite good for releasing Central as a usable replacement for Intiface Desktop within the next month or so, and mobile is just going to be a matter of seeing how difficult it is to get into app stores.

### Everything Else
That is actually pretty much it right now. I'm singularly focused on getting this done, at which point hopefully this newsletter will actually turn more varied and interesting again.

Until next week, keep Buttpluggin'!

- qDot