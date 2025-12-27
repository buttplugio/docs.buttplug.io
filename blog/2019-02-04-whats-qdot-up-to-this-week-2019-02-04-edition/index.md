BUTT SABER

So someone popped up in the discord yesterday and was all "Hey could you make the Game Vibration Router work with Beat Saber" and I was like "I'll take look" and well that blew the past 24 hours pretty nicely.

<!--truncate-->

The good news is that not only will this be possible, but I should be able to mod most Unity VR games to work with the GVR with the method I've found. This means you can route VR controller haptics to sex toys via Buttplug. The bad news is that it's going to take me a bit more work to get it done and I'm in the middle of finishing up the next C# library release, so it'll be a week or two. Exciting though!

For those curious about technical details: I'm just using Illusion Plugin Architecture to patch a hook into the rumble functions that can call out to Buttplug. This is mostly piggybacking off the work of the Beat Saber mod community. The repo is at [https://github.com/buttplug/buttsaber,](https://github.com/buttplug/buttsaber,) but there's not a lot there at the moment 'cause my initial idea of "Try to port the whole buttplug library into the mod" was a total failure. New idea is to just hook haptics and pipe them out to a local network host.

Outside of that, the major work throughout the past week was finishing up configuration file implementation, which is now up and running. This should speed up the rate at which we can add protocols and devices to the libraries. So for everyone that's been waiting for Switch JoyCon/RealTouch/etc support, hopefully that wait will be coming to an end soon.

I'm now trying to finish up that work by cleaning up the many, many things I broke along the way. No real ETA on that but god I hope it's soon 'cause I can't wait to get back to public facing work yet again.