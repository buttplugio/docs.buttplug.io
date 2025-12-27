---
title: Whats Qdot Up To This Week 2024 03 11 Edition
date: 2024-03-11
---
Simplifying!

## Buttplug
There's been one major holdup on Buttplug that's been stalling everything for months. The system we use to store info about all of the devices we support is... getting a bit unwieldy. I think we're creeping up on support for over 500 different devices now, and most of that info is all in one gigantic JSON file.

<!--truncate-->

On top of that, we now have "user device" configurations, which are specific to devices that users connect, so they can do things like change device names shown in UI, persist information between connections, etc... This is just another JSON file, but it's even more of a mess because, unlike the first file I mentioned, this one is edited by users and intiface central, but needs to map back to the big JSON file. This gets extra complicated.

A solution I came up with mid last year was extremely stereotypical for being a developer: Let's shove it all in a DB! sqlite to be specific. I've been poking at that project on and off since April 2023. As of January 2024, it was looking pretty good in terms of access, but there's a ton of unanswered questions like

 - How do we update user DBs when we add new devices?
 - How do we handle easy debugging when a user has to ship us their DB?
 - Will this break WASM?

None of these were problems when we were just using JSON files.

Earlier this week I was discussing this issue with[ someone doing some really neat work on using buttplug + mods as a vtube avatar event system](https://twitter.com/renpona/status/1762685027064664108), and I went back to re-evaluate the work. Turns out, we can probably keep the JSON, we just need to change now we manipulate it. That'll also save us from the problems listed above.

For those nerdy and curious, here's the issue with my design notes: [https://github.com/buttplugio/buttplug/issues/616](https://github.com/buttplugio/buttplug/issues/616) 

So, that's a year of work out the window. Which is fine.

That's not really the first time that's happened with Buttplug, and I use this project as a way to learn things, so it's been a nice way to experiment with sqlite. Really, I just want this done.

## Intiface Central
For Intiface Central, I'm mainly try to get the new version with the Repeater Feature and possibly auto-updating capabilities out. Repeater is done, auto-updater should be done this week, the last thing to do after that is updating documentation as the program is already complex and the introduction of *modes* (which can change what Central does when you hit the big play button) will make it *complex*.

I'm also hoping to finally get patreon/github contributors into the About dialog! As with youtube, this is **OPT-IN**, so you will need to respond to the message I send about this!

After this, it looks like the WebRTC library I've had my eye on has finally implemented the features I was waiting for, so we might start looking at remote interconnect for Central! Not quite sure how this is going to look yet but it'll make for some fun experiments.

## Everything Else

 - I was on a podcast/vtubercast thing![ You can watch it on youtube.](https://www.youtube.com/watch?v=HZoad7S55tU) 

That's it for now. Until next time, Keep Buttpluggin'!

- qdot