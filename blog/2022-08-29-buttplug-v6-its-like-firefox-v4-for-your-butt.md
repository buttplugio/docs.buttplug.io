---
title: Buttplug v6 - It’s Like Firefox v4 For Your Butt
---

After nearly 9 months of development, Buttplug v6 is out today. If you’re curious what this does, or more likely, doesn’t mean for you, this post will lay out what’s in today’s release and what’s yet to come.

<!-- truncate -->

This release isn’t really everything I wanted it to be, but in the end it became obvious that the line of yaks requiring shaving to get this out in a “complete” state was going to stretch on for a few more months at minimum. Therefore, Buttplug v6 mostly contains the foundation for the new features I wanted in the new version of the library, and I’ll be building on that through point releases in the upcoming months to turn it into what I feel it’s supposed to be.

I’ll be covering a lot of these topics in their own blog posts over the next few weeks, but for now here’s a summary of what’s new and future plans.

If you just want the gritty details, check the changelogs of the spec and the library itself.

## I’m a User/Dev, How Will This Affect Me?

Right now, users of software that employs buttplug and developers working on games/apps that use the library should not expect to see too much different. This release of Buttplug is mostly for the very few people who are not me that want to work on the Buttplug library itself.

I’ve been blocking almost all new features and fixes to the library since December 2021, in order to keep the development branch clean and easy to work with. Unfortunately the planning for v6 wasn’t great, so the features that caused the largest amount of chaos went in first, meaning that rebasing on top of v5 changes quickly became very difficult.

Getting v6 out in its current version releases this block, and allows device protocol developers to get back to actually implementing new protocols and bug fixes. While there may be new releases of Intiface that use Buttplug v6, many of the new features won’t be completely open to developers for at least a few more weeks at minimum (see the FFI section below for more info on this).

For those curious about the Firefox v4 reference in the title of this post: Firefox v4 development lasted way beyond what it was supposed to, due to many of the same issues I had here (check out this C|Net article for some history). Instead of learning from history, I repeated it. Hopefully I can avoid that in the future, though I’m not sure I can roll to a rapid release schedule for Buttplug since this is still basically a single developer project.

## Buttplug Spec v3, ScalarCmd and SensorCmd

By far the biggest change in Buttplug v6 will be the release of the new Buttplug v3 Protocol Spec. The Buttplug Protocol is the low level communication specification between Buttplug Servers (which handle hardware connection and control) and Buttplug Clients (the side of the system that applications, games, and other pieces of software use to connect to Buttplug Servers). Very few people work with this level of the system, as it’s usually only seen by library developers writing clients for other platforms/languages. While these changes are opaque to users, the spec defines the capabilities and scalability of the system to new devices, making it the core of what we do as a project and how users finally get the new features they’re asking for.

The spec moves at a glacial pace, with this being the first major change in 2 years, with the last major being 3 years before that. The good news is that this means that what we have in the spec seems to work for a majority of our users at the moment, but what we had in v2 left us little room to expand for the future. Spec v3 aims to fix that with the addition of 2 new messages, as well as the deprecation of 5 messages that those 2 new messages can replace. There is also additional descriptive information available about devices.

The two new messages are:

- ScalarCmd
  - Instead of just allowing a developer to say “make a device vibrate”, we can now let them say
    “sets a device actuator to a static level”. For instance, the Lovense Max has an air bladder
    that can inflate/deflate, constricting a certain amount. ScalarCmd can now be used to set
    that.
  - I’ll have a full blog post detailing the design of this message and our command system
    in general soon. 
- SensorCmd 
  - Buttplug has had no capability to actually take input from devices so far. There are multiple
    intimate devices that can hand back certain readings, like button presses, accelerometer data,
    and pressure sensing. SensorCmd gives Buttplug a way to take this information in and relay it to
    developers so they can create more in-depth experiences for their users.

Initial support for these messages will slim, mostly replacing the older, more specific messages (like battery and RSSI) with the new more general ones. However, there are plans to release new versions of the library that will incorporate either new or missing features from hardware in the upcoming weeks.

Additionally, there will now be more descriptions of devices available. Users will now be able to
create their own names for devices (known as “Display Names”) which can be shown alongside or
instead of the device’s Base Name. There will also be text descriptions of devices features, so that
if a device has multiple vibrators or other actuators, users and developers can denote which
features maps to which actuator. There is currently no UI available for this functionality, but it will be added to Intiface Central at some point in the future. See the “Plans for the Future: Mobile” section below for more info.

## Better User Device Configuration Capabilities

Thanks to an overhaul of the user device configuration system, users will now also be able to customize devices to their needs. This includes:

- Reserving device indexes so the same device shows up at the same index every time a client
connects.
- Setting the usable range for a device, like maximum speeds for vibrators or minimum/maximum stroke
  ranges for strokers.
- Allow/deny lists for devices, so users can say exactly which devices will/won’t connect to
Intiface/Buttplug. Great for making sure you aren’t controlling your neighbors vibrator!

As with device feature descriptions, there is currently no UI available for users to set these configuration values yet. See the “Plans for the Future: Mobile” section below for more info.

## New Testing System

In “things only I care about but that make me really happy anyways so you get to hear about them too”, there’s a new test system! It uses a simple procedural YAML-based DSL for defining expected message flows. One of the biggest issues in Buttplug pre-v6 was that changing the device system required changing every protocol single test, and as we continue to amass protocol support, time to update kept getting worse and worse. This allows us to easily update the system and only update the test harness, leaving the test scripts as is.

This will also allow us to test backward compatibility, as Buttplug Servers are supposed to be able to talk to ALL versions of the Buttplug Client, so that we never drop support for software someone is currently fucking. This has… only been a half-truth for the past couple of years, as v0/v1 support has been iffy. Now we’ll be able to make sure every release that goes out supports every version.

… At least once the v0/v1 harnesses are written. Those are currently slated for a point release in v6. v2/v3 support are solid though!

## Documentation or Lack Thereof

One of the biggest missing features of Buttplug v6 will be any documentation about Buttplug v6. I haven’t updated much of the API documentation, the Developer’s guide still refers to the v2 spec, etc… Right now the public API won’t look too much different, so developers certainly could start using Buttplug v6 with minimal changes, but using everything available like sensors, user configs, and other new features will definitely require more documentation at both the API and Guide levels. This is definitely in the works.
Plans for the Future: New FFI Strategy

Speaking of mistakes: FFI handling in Rust has been a big one!

This is another subject I’ll be expanding on in its own blog post, but for now I’ll just say that the situation for people using Buttplug outside of Rust sucks, and I’m aware (and extra sorry to Unity developers 😐 ).

Trying to extend the native library to be used on both the Client and Server sides has not panned out how I’d like. Buttplug really needs pure language-native Client implementations that don’t depend on Rust (the server will always live in Rust though), and I’ll be looking at getting the system switched back to that soon.
Plans for the Future: Mobile

And you know what also was a mistake? Working with Bluetooth on Desktop!

Ok so I didn’t have quite as much as a choice here but it’s still never exactly been fun.

A good 80% of our support issues these days are weird problems with Bluetooth APIs not working on one desktop platform or another. Either someone has the wrong bluetooth dongle, or it works with some toys but others, or whatever. It’s just a constant barrage of broken and it needs to stop. Sex Toy manufacturers seem to test solely on mobile, so it’s time to move Buttplug and Intiface to mobile too. Buttplug has already been compiled and tested on Android and iOS, so this is mostly a matter of getting UI and build systems together, which is still a tall order but the hard part is done.

Buttplug and Intiface will still support desktop too, but it’ll make life way easier for a lot of our users.

I think. Maybe.

Of course, design of this will get its own blog post too. For someone who usually writes about 1 blog post a year I’m signing myself up for a lot here.
Onward to v6.1

I’m not even considering what v7 is going to look like right now, but rather trying to keep focus on smaller iterations to make things work. Ideally we’ll get v6 documented and debugged, get mobile apps out, then I’m hoping to take some time to actually implement some applications/games with Buttplug after working pretty much solely on the library for over 5 years. Not completely confident that will hold, but I can dream, right?

Looking forward to see what everyone manages to do with the library once it’s usable. Until then, if you still have to bang your head against it while it’s in this new, raw state, please let me know how it goes for you.