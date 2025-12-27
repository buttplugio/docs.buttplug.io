---
title: "Buttplug Rust v3.0 Released - Less is Less"
date: 2021-04-11
---
When I released [Buttplug Rust v1](https://buttplug.io/), I figured I’d be rolling major versions whenever we updated the [Buttplug Protocol](http://buttplug-spec.docs.buttplug.io/). Here we are, at major version 3.0, still running the same protocol, but with more surface API changes. So much for those plans.

<!-- truncate -->

## Why v3.0?

Since the release of Buttplug Rust v1, I’ve been getting steady pings from game developers asking when the [Buttplug Unity](https://github.com/buttplugio/buttplug-unity) plugin would be updated, in order to support new hardware as well as IL2CPP compilation. I finally got time to start work on this project a couple of weeks ago. Unfortunately it didn’t get off to a great start.

Using the [C# FFI to Buttplug Rust](https://github.com/buttplugio/buttplug-rs-ffi) worked fine, everything basically compiled with no real changes outside of some module paths, which was great. However, the development cycle after that basically became unusable. We found we could run Unity in Play Mode once, but any subsequent run would stall.

[There’s more info in the related bug](https://github.com/buttplugio/buttplug-unity/issues/9), but long story short, Unity’s Mono implementation wasn’t able to properly shut down Buttplug Rust’s async handling runtime. This meant threads got left open, and when Mono tries to reset itself (as is common, to save Unity game developers from having to manage their own state resets), it’d just stall forever.

The fix to this was moving from our current runtime ([async-std](https://async.rs/) on top of [smol](https://github.com/smol-rs/smol)) to [Tokio](http://tokio.rs/). [Tokio](http://tokio.rs/) provided far more granular runtime lifetime handling and passing, meaning we can easily manage when we bring up and take down the system. We now don’t spin up any runtimes (which brings up a number of threads) until we need to, and we can tear it down once all of our devices and clients disappear.

With that work done, Unity seems to be pretty happy. It compiles Buttplug support to either Mono or IL2CPP, and the development loop seems stable. I also took some time to work more with the fantastic [tracing](https://github.com/tokio-rs/tracing) crate to improve logging in the library, making it easier to follow device connection lifetimes. This work also made me realize that my “batteries included” philosophy for Buttplug Rust maybe included a few too many batteries.

## What Got Removed

One of the original tenets of Buttplug followed my philosophy about sex toy design: that it should be as quick as possible to start using, and able to run basically standalone while also having the ability to extend where needed. Developers can just get the library and integrate it with their program, not having to worry about how devices connect, how IPC mechanisms works, or other boring details. This hopefully allows for developers to concentrate on implementing interesting things with sex toys.

Sometimes though, this gets overrun by me learning things while implementing the library, so we end up with more features than might really be needed, or that I can support. Optimizing the library for Unity brought up a few things that could be removed.

### Removing async-std and ThreadPool Runtimes

Unlike many languages with async capabilities (C#, JS, etc…), Rust’s async execution system is designed in such a way that the language comes without a way to execute tasks. Rather, it depends on outside implementations that can tune to the specific requirements of an application. While this is overall a win for the ecosystem, it can sometimes cause [frustration](https://kevinhoffman.medium.com/rust-async-and-the-terrible-horrible-no-good-very-bad-day-348ebc836274).

Supporting multiple runtimes in Rust is common, but usually for libraries that will have widespread use: network services, database connectors, etc… While there are certainly developers using Rust to develop Buttplug applications, they are a minority compared to developers using FFI libraries, where this runtime selection will be hidden.

Buttplug Rust as it exists now was started in September 2019, slightly before the release of async features in Rust 1.36. At the time, async-std was developing alongside the nightly branch of rust, and looked more like what the async ecosystem does now. Thanks to that, I ended up going with that for our initial execution system, and it has worked great up until our current issues with Unity.

This also functioned as a way for me to learn how to live as a library developer in the new Rust async ecosystem. This was a combination of interesting and frustrating, especially as requirements sometimes differed greatly between libraries.

With subsequent releases of Tokio over the past 18 months, it has grown to integrate with the async facilities of Rust in a more ergonomic way, while still providing more granular control (and the cost of some added complexity sometimes, i.e. runtime handle management). Thanks to this, it now fits Buttplug’s needs better, and comes stocked with some very useful sync primitives and channels, including [Broadcast](https://tokio-rs.github.io/tokio/doc/tokio/sync/broadcast/index.html) (which I use heavily to simulate the event systems we had in C#/Javascript).

On top of this, most of the async work we still need to happen ([Windows Named Pipes, serial ports](https://github.com/tokio-rs/tokio/pull/3388)) is farther along in tokio/mio (as far as I’m aware, and it’s currently stalled), meaning we can just integrate with that when it comes along by using tokio as our main implementation.

After switching Buttplug to Tokio, it became apparent that maintaining 4 runtimes (tokio, async-std, futures crate ThreadPool, and wasm-bindgen) was silly, since I don’t really have users split across those (and many users may not even know why the runtimes are there). Some of our other dependencies like [async-tungstenite](https://github.com/sdroege/async-tungstenite) could handle the differences, but the complexity of the feature system for Buttplug was getting out of hand, as was remembering where to put all of the relevant `#[cfg()]` calls. I’ve now removed async-std and ThreadPool implementations, leaving us with just Tokio and wasm-bindgen (required for WASM). Ideally it’d be great if we could use Tokio’s executor for everything, but that’s not quite possible as of yet. The current system is managed using an internal system similar to the [async\_executors](https://github.com/najamelan/async_executors) crate, which works well enough for abstracting task systems.

This does not mean that Buttplug isn’t usable with other runtimes now. Outside of the Device Communication Managers (which, granted, are possibly the most important part of the library), most of the library is runtime agnostic, and async-std contains tokio compatibility systems that will allow the library to run using its runtime also. This change mostly reduces the amount of thinking I have to do when updating the library and its direct dependencies. This is open source self care more than anything.

### Removing Secure Sockets for Buttplug Servers

When Buttplug C# first started in 2017, Chrome allowed for localhost websocket connections via mixed contexts (i.e. https:// website calling through ws:// for localhost websockets). Firefox did not have a feature like this, so we implemented the ability to create self signed certs and load them into the server to run a self signed websocket server for Buttplug. This allowed us to get applications working in Firefox.

Firefox changed this in 2020, now also allowing mixed context localhost connections. With this addition meaning that Chrome, Firefox, and Edge all supported mixed context connections, the need for including the batteries of a secure socket connection went away. Any users that require this feature can still set up a reverse proxy in front the server port, but managing the certificate generation and loading system is well out of scope of Buttplug’s core goals. Removing this will hopefully simplify changes to our connector system in the future, and also removes the burden of keeping cert libraries in lockstep.

For most of the talk of async in this post, the secure socket change is actually what drove the major version update. Removing secure sockets changes our Websocket connection API, which is exposed to developers, and therefore is a breaking change in the general public API. This change only happens in the Rust library, as the server is not exposed in the FFI, so while Rust moves to v3, the FFI APIs will continue on the v1 track.

## What’s Next

Now that Buttplug v3 is done, there are quite a few releases to make on top of it:

*   Updating the C# and WASM FFIs, though only C# will see much of a change.
*   Finishing the Buttplug Unity update and releasing v1 of that package
*   Updating Intiface to remove the Secure Socket options

These updates will be happening throughout the next week.

After that, the main focus is going to be more documentation and the implementation of a WebRTC based proxy system. This stems from the [rather startling discovery that Buttplug (the library) doesn’t work very well with buttplugs (the sex toy)](https://twitter.com/buttplugio/status/1381007465056100352), which I’ll be making another post about soon.

With this proxy system (inspired by the work of [xtoys.app](https://xtoys.app/)), we can start using mobile hardware (phones, linux SoCs like RPis, etc) as connection points, giving users more freedom in where and how they use toys. Alongside this will be more hardware and QoL updates, but the goal for now is making our system usable to the wave of social VR users we’ve seen over the past few months.

Onto v4! But hopefully via many v3 point releases first.
