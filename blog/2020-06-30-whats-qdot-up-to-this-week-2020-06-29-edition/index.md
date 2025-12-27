---
title: Whats Qdot Up To This Week 2020 06 29 Edition
date: 2020-06-30
---
Day late but HEY YOU GOT EXCLUSIVE CONTENT so I'll call it a fair trade.

### Intiface Console Game Haptics Router
Yet another flight of my ADHD, yet another proof-of-concept project that I won't have time to finish any time soon.

<!--truncate-->

For those of you that didn't see the youtube video a couple of days ago, it's now gotten a writeup in Vice:

[https://www.vice.com/en_us/article/pkyk9y/animal-crossing-connected-buttplug-vibrator](https://www.vice.com/en_us/article/pkyk9y/animal-crossing-connected-buttplug-vibrator)

The Console Game Haptics Router is basically the GHR for consoles. Instead of hooking into game software, the goal is to MITM the controller/console connection and siphon off rumble from that to control a sex toy.

I went with Switch for this because it was the easiest thing to deal with. XBox gets fiddly depending on what version controller you have. and PS4 has a really annoying authentication scheme that is already handled in other projects, but may require hardware intervention. At some point the CGHR will support all of these, but I just wanted to get the idea and a proof of concept out, which I've managed now.

In the end, the CGHR will probably be a RPi linux distro, maybe a little premade box or something that I'll sell (though obvs you can build your own too, it'll still be open source), not real sure.

### Buttplug
Work on Buttplug continues. I got buttplug-rs 0.4.0 out the door, which I found out is still a buggy mess during the implementation of the CGHR, so that's something to work on.

Right now I'm working on overhauling the error system to... actually throw helpful-ish errors. There's a lot of debate on how to do this in Rust, and I think this will end up requiring multiple passes, but it'll still be exponentially better after the first pass is done.

After that, I'm hoping I'm done with architecture fiddling for a bit and can get back to hardware support, like serial ports and more device protocols.

### Everything Else
Getting lots of feature requests and bugs filed for the regular GHR, which I may look into soon. Syncydink continues to exist on life support, not quite sure what to do with it. Intiface Desktop will be getting a new release at some point soon, just to handle the new Rust binary, then will probably be stripped down to something WAY simpler than it is right now and rebuilt from there, as it is way too much code for not doing a whole hell of a lot.

And maybe more videos. Making the ACNH vid was fun.

Until next week, Keep Buttpluggin'!

- qDot