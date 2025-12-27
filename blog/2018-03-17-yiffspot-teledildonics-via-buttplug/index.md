---
title: "Yiffspot Teledildonics Via Buttplug"
date: 2018-03-17
---

If nothing else, you're paying me for these post titles, right? :)Well, this is definitely not how I planned on spending the past couple of weeks, but here we are.

A few weeks ago, I got pinged on a twitter thread about NSFW github repos. In the same thread, this repo came up: [https://github.com/kisuka/yiffspot](https://github.com/kisuka/yiffspot)

<!--truncate-->

Yiffspot is a node.js based anonymous sex chat server, which runs the domain [https://yiffspot.com](https://yiffspot.com). You can go there now and have text sex with some anonymous furry if you'd like.

Anyways, since the code was open source, I decided to look through the repo. Surprisingly enough, the project was written in fairly clean, simple es5 Javascript. Not only that, the project is a complete standalone server. As long as you have a machine to host it on, it handles both the client and server side.

This seemed like a perfect candidate for Buttplug integration. I had figured that doing a full person-to-person teledildonics server was going to take more work because I'm apparently stuck in the past, but this was everything I needed to make a quick, decentralized teledildonics server.

2 weeks later, I've gotten the patches into good enough shape to submit as a PR to the main project. The server, with buttplug integration, is also up and running at

[https://teledildonic-yiffspot.glitch.me](https://teledildonic-yiffspot.glitch.me)

With documentation at

[https://metafetish.club/t/using-buttplug-with-yiffspot/267](https://metafetish.club/t/using-buttplug-with-yiffspot/267)

And remixable/clonable on glitch at

[https://glitch.com/edit/](https://glitch.com/edit/#!/teledildonic-yiffspot)#!/teledildonic-yiffspot

You may be wondering why this is important. That's a good question.

Well, I mean, first off, more ways for furries to fuck is always important. Obviously.

Outside of that, the only things that make Yiffspot "furry" is the name, and the fact you have to choose a species for partner matching. Beyond that, it's just a plain chat server (with some weird BDSMy options I guess but hey). We can easily modify the look and options and turn this into a generic teledildonics server.

I've also cleaned it up enough that it's easy to bring up on places like Glitch or Heroku, so people can have their own server if they don't want to use a central one. This means it's basically decentralized. If you have the codebase and the server, you're mostly ready to go.

Having this as a proof of concept is giving me all sorts of ideas about other simple, connected things we can do. For instance, having synchronized movie playback with Syncydink, in case you wanted to watch a video with someone else at the same time.

Also, this was a great test run of one of the biggest use cases of Buttplug: bolting it on to shit that is already out there. Before people start building applications specifically for Buttplug, we have to prove its worth, and most everything I've built so far has been from the ground up. This will be the first time I've added Buttplug functionality to something I didn't start, and handed it back to the original developer. Will be interesting to see how well that works out, assuming any normal Yiffspot users even have computer connected toys.

Now that this project is done, I'm hoping to get back to polishing up things like Syncydink (REALLY I AM ACTUALLY GOING TO WORK ON IT AGAIN), the Twine libraries, and finally getting some of the UI/UX nightmare that is the Windows GUI tamed. There will hopefully be more video production in between all that too.

I'll be writing up a longer blog post about the Yiffspot work on Metafetish, and will have a better status update on the rest of the projects hopefully sometime in this upcoming week.

Thanks for your support!
