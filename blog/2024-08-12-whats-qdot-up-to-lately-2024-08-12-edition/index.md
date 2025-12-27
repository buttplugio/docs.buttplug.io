---
title: Whats Qdot Up To Lately 2024 08 12 Edition
date: 2024-08-12
---
Dropping the idea that I'm gonna be doing this weekly again any time soon...

### Buttplug/Intiface Central
Things have been fairly quiet lately, mostly because the rest of life has been keeping me really busy (will get to that in the Everything Else section). I'm still managing to get some work done though!

<!--truncate-->

The work in question is pretty low level. I'm setting up our internal system for the move to our new message spec. Buttplug Message Spec v4 fixes a bug in how we define and communicate the features of devices, which should make it easier to expand functionality in the future, as well as letting us start implementing devices with sensors (kegel, depth, etc).

The goal right now is to ship a version of Intiface Central in the next couple of weeks that will have this work embedded in it but not really visible to the outside world. This will allow us to exercise the new code while we work on the actual message spec changes. I'm also hoping to wrap a few bug fixes for IC into that, as we've had days where our Sentry (crash logging service) event count goes into the 30-40k range (usually a single fairly innocuous error message firing very quickly in a loop. Thank fuck I get 5 million sentry events per month :| ).

### Everything Else

- I did a podcast thing with Projekt Melody last week and it was awesome! There's a VOD here: [https://www.twitch.tv/videos/2216819840](https://www.twitch.tv/videos/2216819840)

- For some reason a couple of my articles have made it on HackerNews again, and are getting lots of positive responses. I'm hoping to start writing more soon.

- Also getting a LOT of requests for updates to the Cult of the Lamb buttplug mod I made late last year, looking into the work that'll require now

- I'm considering streaming! Maybe doing some architectural overviews of buttplug, showing the process I use while modding games, etc. Please let me know if you're interested in that kind of content!

- I'm also thinking about doing a VRChat meetup! I have a [buttplug.io](https://buttplug.io) group in VRC now, will try to plan a couple of meetup times across timezones. Will post an event notification when I finally figure out when I want to do that.  

That's it for now. Until next time, keep Buttpluggin'! 

- qDot