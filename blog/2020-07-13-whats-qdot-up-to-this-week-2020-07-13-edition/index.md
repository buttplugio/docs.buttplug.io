Gloriously boring shit!

### Stickers
But first, merch!

<!--truncate-->

Those of you that signed up at the >= $3 level in the past, uh, 7 or so months might've noticed the severe lack of stickers being sent your way. I ran out in January and hadn't ordered a new batch yet 'cause I was trying to figure out the branding stuff. The good news is, I'm fixing that! We'll have new stickers in for the new logo soon, at which point I'll be getting the backlog taken care of.

Maybe those handwritten letters will happen someday too. Only 3 years behind on that one. >.>

### Branding
There's gonna be more new Buttplug logos soon, and I'm hoping to do the full announcement and switch over this week. Expect more previews soon. Then it's on to Intiface! :D

### Buttplug
In tech news, buttplug-rs is making some great progress!

Back in April, I was working on serial port access for the OSR2, Lovense Dongle, etc. Things felt weird and just generally "not quite right" while adding those features, so I decided to take a break and do a little bit of cleanup.

Which ended up in me rebuilding the async strategy and error system for the whole library 'cause I had made some bad decisions earlier.

After 2.5 months of "break" (oops), all of these things are now much cleaner and working far better than they did before, which means I'm back to serial port work! I got Lovense Dongles causing toys to vibrate last night, and I'll be trying to figure out how to at least get the OSR2 to run with stroking commands as a start ASAP.

Alongside this, I'm now to the point of writing integration tests for buttplug-rs! Now that features are mostly in, they can be tested together, and the new error system is there to make sure I fail in ways I expect. This is putting me closer to feeling ok with distributing buttplug-rs in Intiface Desktop!

That's it for now. Until next week, Keep Buttpluggin'!

- qDot