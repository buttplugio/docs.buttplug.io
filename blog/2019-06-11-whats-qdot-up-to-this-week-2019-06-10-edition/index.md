---
title: "What's qDot Up To This Week? (2019-06-10 Edition)"
date: 2019-06-11
---
Somehow still managing to work on shit!

New job is definitely busy, but I'm still managing to keep up on Buttplug/Intiface dev around it, which I'm pretty happy about. I figured I'd get nothing done over here in the first month or two, but things seem to be chugging along nicely.

<!--truncate-->

# Intiface Desktop
As of June 1st or thereabouts, Intiface Desktop is now the official platform for Buttplug users. I went ahead and deprecated the old Buttplug Server, though I haven't completely removed downloads. I may just leave it there for history sake, but once I start adding new messages to the protocol, it'll stop working altogether.

This did come at the cost of having a tutorial that's now out of date, so I'm trying to work quickly to replace the old Buttplug tutorial with a new shiny, simpler Intiface tutorial. I'll no longer be using Twine, since our platform story is a little more unified than it was when I put that together, but I'll still be updating the Twine library for use in games.

# Buttplug Web Apps (Playground/Syncydink)
Since Intiface Desktop can host on multiple ports at the same time (versus the binary ssl/no-ssl thing we used to have in Buttplug Server), I'm also now working on simplifying the connection dialog for Playground/Syncydink, and will be using that as a UI example for app developers.

I've learned that most of the time, users will just be using localhost and default ports. It's easy to try to connect to all of those and just pick the first one that works, so we shouldn't require users to know IPs and port numbers unless they're trying some sort of special setup. Not only that, usually the first thing you want to do after connecting is scan for devices, so connecting will now automatically start scanning (this can be turned off via settings in the applications). The goal is to make getting started actually USING a buttplug application quicker and easier. 

This new UI will also make it easier to extend functionality on applications, for instance, making it easier to build a playlist mechanism into Syncydink.

Expect to see this new UI in Playground and Syncydink sometime in the next couple of weeks.

# Buttplug and Unity
A couple of weeks back I worked with someone to test feasibility of Buttplug on Unity. Right now the biggest barrier is NJsonSchema, the library we use for message structure parsing. It's more of a nice to have than a requirement, so I'm now working on dividing out all of the Json stuff into its own library, into a new library type I'm calling "serializers". Alongside that, I'll be adding another serializer specifically for Unity's built-in JSON serializer, so hopefully we can integrate Buttplug Clients with Unity, with no outside dependencies. That'd be pretty sweet.

I've also started discussions with a few VR game devs/communities like:

- Virt-A-Mate

- Besti

- Dominatrix Simulator

So that once the Unity capabilities are up and running, we can start looking at integration. Exciting!

That's it for now. Until next week, Keep Buttpluggin'!

- qDot
