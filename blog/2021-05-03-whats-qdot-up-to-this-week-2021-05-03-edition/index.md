---
title: "What's qDot Up To This Week? (2021-05-03 Edition)"
date: 2021-05-03
---
Just rethinking large portions of the project. Again. :|

# Buttplug and Lovense Connect
So it turns out I was not aware of exactly how "Lovense Connect" works.

<!--truncate-->

Lovense has 2 mobile apps:

 - Remote, which is their teledildonics system
 - Connect, which is for cam models and 3rd party devs

Turns out, Connect just opens up a webserver on your phone, and allows access via HTTP or websockets. You have to contact lovense's servers to ask for IPs, but after that, its all local.

I spent the weekend implementing this in Buttplug, and it works pretty well. This is now basically our proof of concept for the WebRTC based system I've been planning that will look like this.

The problem now is that this splits Buttplug into being both local control and possibly talking to the network, which makes privacy *very weird. *Before this, we didn't really have to consider that someone using a serial port toy might be mad about us look at bluetooth too, as they're all attached to the same computer. With Lovense Connect, we certainly don't want people just using Kiiroo toys to have to ping Lovense's servers to ask for connections that will never be there. So while the technical implementation of this was pretty smooth, figuring out how we're going to message this to users and developers is going to be new, and a shift in how we've worked before.

I'm going to be writing up a series of blog posts on this, as well as the future of Buttplug, over on the Nonpolynomial Blog ([https://nonpolynomial.com/blog).](https://nonpolynomial.com/blog).) I'll post here when those are up.

# Other Buttplug News
I've also been doing a lot of work to make Buttplug more extensible. We've been getting more and more DIY builders in our Discord, but I hadn't added a way to add protocols to Buttplug without having to modify and recompile the whole library yet. I've simplified that and made adding both protocols and device communication managers easier, so the system is fairly flexible now. This means that people can either build code for their own hardware, or else add hardware support I've been avoiding. Of course, it could use some documentation...

# Everything Else

 - So documentation is going to be my goal for this month, alongside the aforementioned design work around figuring out online services, and...
 - Updating Intiface Desktop! Intiface Desktop needs documentation VERY badly, as well as UI updates to deal with selecting comm managers (so you can turn off the Lovense Connect stuff if you won't use it). Hoping I can line all of this work up.
 - And in news of removing work... Due to getting way too many support questions, I took down Syncydink from the buttplug.world domain. It's still available on the internet archive, because it's a static, client side program that doesn't need any databases or network services, so it should work as long as browsers do. If you're a patron and need help with it, contact me directly and we'll talk.

That's it for now. Until next week, Keep Buttpluggin'!

- qDot
