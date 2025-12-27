---
title: "What's qDot Up To This Week? (2019-09-30 Edition)"
date: 2019-10-01
---
Crap when did it become Tuesday.

### Buttplug
Buttplug C# 0.5.1 went out last week with support for the Motorbunny. Buttplug JS will be getting an upgrade pretty soon, also with Motorbunny support as well as a couple of fixes to some rather serious bugs.

<!--truncate-->

With that out of the way...

What I'm about to say is gonna get pretty violently technical and deep into Buttplug development internals really quick, so the tl;dr for those that don't want to wade through this: I'm doing some experimental work to hopefully make Buttplug easier to update and port to new platforms and languages. It's a big project and it may not work, but if it does, it will make life easier for everyone.

The long, technical version:

I'm writing a version of Buttplug in Rust. Again.

For those of you that've been around for the long haul, you'll remember that I started the current version of Buttplug in Rust in August 2016. This quickly went south due to multiple reasons:

 - Lack of Windows device API support (WinAPI 0.3 wasn't out yet, no UWP support)
 - Flux in the language (Tokio/Futures had just come out)
 - Unclear how it would port other places

I started the C# version in April 2017, and the Typescript version in June 2017, which leads us to where we are today. The issue here is that both C# and Typescript/Javascript require their own runtime. C# needs .Net, Javascript needs a JS engine like Spidermonkey or V8. This is less than great when I want to port to other platforms. There's ways to do that, and we're partially doing that now with Xamarin, but they all have their issues.

On top of that, when people want client libraries in other languages, it means reimplementing all of the client and core API of Buttplug in that language. I just did this for Python. It was agonizing, and it only works on Python 3.7+, which can be an issue for some people.

Similarly, we have older Unity games, written on Mono 2/.Net 3.5, that would like to support Buttplug. This would mean backporting the C# to .Net 3.5. Basically a completely rewrite of the core and client API. Again.

Finally, there's a *new* set of Microsoft technologies out (.Net Core 3.0/.Net Standard 2.1/C# 8) that are all really cool and awesome, but no longer backward compatible with .Net Framework, which is what most windows applications are written in. So, if we wanted to move to the new spiffy stuff (which I desperately wish I could), we'd have to fork AGAIN, possibly maintaining 3 version of C# code. As I am not an enterprise company, this does not sound fun.

The new goal is rewriting the core logic in Rust, a systems language. The core logic consists of:

 - The messages and protocol
 - The client and server APIs
 - The device protocols and configuration file loaders

Things outside of the core logic will be:

 - Client API implementations
 - Device Subtype Manager implementations

This means that, in a perfect world where this project works out, Buttplug C# will consists of:

 - A C# Client API that talks to a Rust core via C style FFI calls.
 - A Rust core that's easily upgradable
 - C# Device Subtype Managers (USB, Bluetooth, etc.) that Rust talks to in order to access devices

Implementations for new languages will look mostly the same, 'cause damn near everything can do C binds (remember SWIG?). Just switch out C# for your favorite language in the above list. For the Web, the hope is to compile this to WASM and wrap it in JS APIs.

In terms of user value adds, whenever we add new hardware protocols, they only need to be written once, in Rust, then we can recompile all of the wrapper libraries, and everything stays in sync, unlike the huge split in C#/JS right now. Also, features will only need to be implemented once, then APIs updated around them. Hopefully.

The biggest problem to this approach is going to be debugging. For instance, with C#, if a subtype manager throws an exception, this will have to be caught before it hits the C#/Rust border, converted into something we can flow through Rust, then rethrown once it hits the C# Client API side. This is a difficult situation to say the least, but other companies like Sentry and Mozilla are doing this already and have written up nice guides on how to do it.

Building is less of a concern, because I've been a build engineer before and done far, far worse things than this. :|

Another big reason to do this: Thanks to my time at Mozilla, I know a bunch of Rust compiler engineers. I cannot say this about any of the other languages I'm working. I have way more people to poke and complain at if things go wrong.

Anyways, that's the dream. Whether this will actually work, I have no fucking clue. I did the core implementation work last weekend, and we have a basic library that can do in-process client/server comms via ButtplugMessage objects right now (see [https://github.com/buttplugio/buttplug-rs](https://github.com/buttplugio/buttplug-rs) if you're interested in progress), but there's a long, long way to go from here. Goal for the moment is to get a minimal system up and running that proves out both the core library and the FFI setup (so probably a very simple Lovense implementation with vibration only), then go back and fill in protocols and everything else.

While this is in development, I'll still be working on the C#/JS libraries. There's bugs to fix and features to add, and in the end, nothing should really look too much different to developers using those libraries. The core will just be a little more opaque.

There's also a chance this experiment doesn't work, and we stick with C#/JS/Whatever else. I'd really like to avoid that, but it's something I'm keeping in view.

May god have mercy on us all.

### Game Haptics Router
I released v4 of the GHR last week, mostly for Motorbunny support. Hearing some initial reports of bugs that I'm going to check on this evening, so possibly expect v5 this week also.

Ok, well, a longer update than usual with less interesting content for those of you that aren't developers, but explaining the Rust work was a lot, and I'm trying to stay transparent here. Hopefully more fun news soon.

Until next week, Keep Buttpluggin'!

- qDot