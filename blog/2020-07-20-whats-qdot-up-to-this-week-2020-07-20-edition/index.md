---
title: "What's qDot Up To This Week? (2020-07-20 Edition)"
date: 2020-07-20
---
Learning that begging for patrons WORKS! My twitter shall now be insufferable!

### New Patrons
As an experiment over the weekend (and since stickers are on the way so I don't feel quite so guilty about advertising), I decided to be slightly more aggressive on Patreon advertising on twitter. And it worked!

<!--truncate-->

I'm up 10 Patrons this month, putting me at over 100 for the first time since I started on patreon 3 years ago! Thanks to everyone who signed up, as well as everyone who continues to support the project. It really means a lot, and I'm looking forward to having more than stickers and updates on library implementations to offer soon (like actually getting back to updating Intiface Desktop and other applications).

Remember, everyone that donates also gets a special role on our discord server! [https://discord.buttplug.io](https://discord.buttplug.io)

If you join and aren't promoted, lemme know and I'll get it fixed.

### Buttplug
Anyways, back to updates on library implementations!

Having finished the error work on Buttplug, I started back on the Serial Port device work I was doing in April. This ended up sidetracking me yet again over into Lovense Dongle handling (there's a version of the dongle that basically looks like a USB serial port), which is one of the biggest reasons people end up not using Buttplug. The dongle sucks, but Lovense pushes it so hard that a TON of people have it.

I ended up spending a few days getting the Lovense Dongle working in buttplug-rs, and it now seems pretty stable. This is for both versions of the dongle (USB Serial and USB HID) on all USB supporting platforms (Win 7/Win 10/Mac/Linux). It also means that our serial and HID device support in buttplug-rs basically work, so I can get on to adding OSR2, RealTouch, Cyclone X, ET-312/ET-232, 2B, etc. (OSR2 is the only priority there). 

buttplug-rs is now down to some really random missing features and bugs:

 - Can't tell when bluetooth devices disconnect on Mac/Windows
 - Can't tell when devices disconnect on Lovense Dongle (any platform)
 - Still missing protocols for Kiiroo toys (Fleshlight Launch, Onyx+, etc...)

Once these are done (next couple of weeks maybe?), I'm hoping buttplug-rs will be at a "good enough" point to start adding FFI, so we can replace the C#/JS/Python libraries with it.

But if you're wondering how this is important to you...

### Intiface Desktop
I'm also starting to work on updating Intiface Desktop for the first time in *14 months* (engines and config files have updated since then, this is the app itself). This is unfortunately making me realize that Electron wasn't the best idea for this, as I'd planned to update more often but kinda got stuck on buttplug-rs. However, for people to start using the new buttplug-rs engine, I'm going to have to add some new features to allow engine selection and downloading.

I imagine this is going to be a complete mess, as Electron, Vue, Vuetify, and pretty much all the other libraries the project depends on have had 14 months to change, but we'll see where things end up.

I also think Intiface Desktop in its current form is WAY more than it needs to be, so once buttplug-rs and a few FFI layers are stable, I'm hoping to loop back and take a look at it again. 

If you're an Intiface Desktop users and have opinions, please yell them at me, definitely looking for input.

While there's other news on the Buttplug Tutorial (which doesn't work), Intiface Game Haptics Router (which has new features lined up), etc, I'll end here for now 'cause those are things I doubt I'll get to in the next 7 days. I may also start announcing the new project logos over the next week as stickers arrive, there will be more posts when that happens.

Until next week, Keep Buttpluggin'!

- qDot