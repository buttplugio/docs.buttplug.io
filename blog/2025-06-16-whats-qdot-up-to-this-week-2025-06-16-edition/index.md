Bringing about a world where buttplug doesn't suck to use...

### Buttplug
Holy shit, after 8 years of writing this stupid library I think I may have finally landed on a message format and API I don't hate, and that I hope others will similarly not hate.

<!--truncate-->

Buttplug didn't start with plan so much as just a problem: How to control a bunch of random shitty hardware? Coming up with a solution didn't happen through planning so much as just coding until something worked, calling that done, then throwing it out and seeing what the response was.

As of Buttplug Spec v3, that's mostly been "eh it mostly does what it's suppose to but it isn't easy". Part of the reason Spec v4 is nearing 2.5 years in development is that I wanted to actually plan, figure out formats, etc. Up until a couple of weeks ago I had something that was... ok and I could live with shipping but it didn't feel good, and it wasn't going to scale or extend well.

Cue me driving to pick up ramen and having some sort of weird epiphany about turning data structures inside out. Thanks to this, buttplug is now much simpler.

Devices are now defined in terms of features, which have groups outputs and inputs. Outputs can do things like vibrate, rotate, etc. Inputs are sensors. Features act as a container to bring context to things a device does. Of course, most devices are just like, a vibrator, so this isn't very interesting in that case. However, we are getting to the point where people are making DIY devices with motors that may have encoders and temp readings. All of those would be in the same feature since they all related to that specific motor. It also gives us a way to extend how we command outputs to do things, or new types of inputs we can take.

On top of this, we now just expect one command from a client to be one command for a feature. The new Buttplug server takes care of throwing away repeated commands *as well as* *keeping timing so apps don't flood devices.* No more blaming app devs for sending too many messages, we regulate that ourselves now!

This will probably all make more sense after I actually write up the new documentation for it, but I've been writing some sample programs with it and in general the library becomes so much easier to use and build clients for. Really looking forward to getting this out into the world now, mostly down to a few small tasks and changing some of the weirder protocols we support.

If you're curious how work is going, the to-do list is at [https://github.com/buttplugio/buttplug/issues/565](https://github.com/buttplugio/buttplug/issues/565) . I think I probably still have a few weeks or so of work left before this is in any releasable form, and I may put out a beta of Intiface Central before doing a full release since this changes so much.

### Everything Else
That is actually it for this update. There's been so many huge structural overhauls to the library that getting to where I am now has taken most of the past month, but for once I actually feel like I'm putting out *useful* software, versus software people have to use because it's the only thing that does what it does. We'll just have to see if that holds up when it's out.

Until next time, keep buttpluggin'!

- qDot