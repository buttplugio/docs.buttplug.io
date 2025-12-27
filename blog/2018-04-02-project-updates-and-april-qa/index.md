---
title: "Project Updates And April Qa"
date: 2018-04-02
---Welp, we've now reached me being on patreon for a whole year! Thanks to everyone for sticking with me so far.Trying to get back in the swing of doing monthly Q&A's, so if you've got questions, lemme know!

However, since most questions have usually been "What are your plans for [piece of software you made that you haven't touched in a while]?", I'll give updates on all of those first.

<!--truncate-->

**Hardware**

Getting Vorze and Lovense key access working would be great, as it would open up more chances for users on Win7. We have the hardware, it's just a matter of getting it all figured out.

We're still trying to finish out the Kiiroo Onyx 2. We have the Pearl 2 and Fuse done, I think the Onyx 2 is mostly the same, but we don't have one to test on yet so we're developing for it blind.

Haven't had any other hardware requests lately, so if you've got a toy we don't support, let me know.

**Buttplug Protocol/Libraries (General)**

We've got a couple of big things that need to be done in general across all libraries right now.

First off, we need an external way to define hardware. Right now, if a company changes their toy identifiers (like Lovense does CONSTANTLY), we have to basically release a new version of the software. The hope is that we can make an external config file that will be updated and distributed online, so we can update server capabilities for new hardware we already have protocol support for, without requiring everyone to download everything all over again.

Secondly, we need to start thinking about inputs. This will probably start with something benign, like retrieving battery levels from toys, but could grow to encompass accelerometers, buttons, and other sensors on toys too. How we abstract this (i.e. how do we make toy accelerometers all return the same basic normalized data) is going to be a tough problem to figure out. 

**Buttplug C#**

We just landed code comments and documentation, as well as support for the USB Cyclone X10. Oddly enough, the Cyclone is the first toy we've found that was already open source! You just have to be able to read Japanese, heh. All of the USB HID code was available in an open source C library on their website, which made this pretty simple to implement.

I'd like to get libraries and applications divided up, and we'll hopefully be moving to a new application system soon that is slightly less jank than our current controls library crap I threw together in half a day like a year ago.

I'd also like to get IPC capabilities added to the client/server, so local apps no longer have to route through Websockets. This will save a lot of trouble with all of the SSL hoops users usually have to jump through.

**Buttplug JS**

Haven't touched the JS libraries much lately, and they're mostly running ok. Hoping to get more documentation together soon at least.

**Syncydink**

Priority #1 on syncydink is getting a news panel up on load, so you can actually see what version you're running, as well as any updates that've happened. I get a lot of questions about if I've updated Syncydink because it's not working, but I haven't touched it in months, so it'd be better if it just said that itself.

After that, I really need to bring all of the packages and dependencies up to date. This is usually a matter of just typing in a couple of commands, but some of the packages we use are like, multiple versions back (the biggest culprit being our video player package), so that's gonna take some concentration.

Finally, once we're up to date, I really want to get the encoder done. I know everyone else wants that done too. Then it's on to things like streaming capabilities and new encoding interfaces.

**Playground**

Playground is still pretty good at doing what it needs to, not a lot of things to add here. I'd like to get something in to control rotation toys like the Cyclone X10/A10, but that's about it. It'll also get the same news panel as Syncydink, not that it seems to matter much there.

**Buttplug Tutorial**

I finished the tutorial, and have been pointing people at it when they ask, but the current website still doesn't mention it. I think it'll start getting tested more when the new website comes up, since it's front and center there. Definitely needs a CSS overhaul.

**Unity Plugin**

This was the #1 question I got at GDC last week. The good news being that there's also a lot of Unity experts at GDC, and I'm hoping to get help from a few of them to get this going. So hopefully more news on that soon.

**Unreal Plugin**

This was the #2 question I got at GDC last week, surprisingly. So that's at least on the radar now.

**Twine Plugin**

The twine plugin has been running the tutorial for a while now with no real complaints, but it's still not in a state where anyone can easily use it, so I'd like to get more documentation work done on that. Got some initial interest in it at GDC, so worth polishing.

**Youtube**

More Will It Buttplug videos are in the pipeline, and I'm really hoping to start a series on how Porn Sync works soon too, which will hopefully drive more interest in Syncydink dev.

So, uh, that's everything in my head for the moment. If there's some status I haven't covered, please comment and I'll be happy to answer!