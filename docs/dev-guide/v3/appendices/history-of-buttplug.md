---
title: The History of Buttplug
---

:::warning Deprecated Documentation

This documentation is for version 3 of the Buttplug Developer Guide. Please refer to the [latest version](/docs/dev-guide/v4/) for the most up-to-date information.

:::

# The History of Buttplug

* 2007: _An Idea in a Presentation_
  * In my presentation at the first Arse Elektronika conference in 2007 ([available to watch on
    youtube](https://www.youtube.com/watch?v=FRLygav4tcs)), I presented the idea of "obfuscated macros" for controlling toys, a user experience strategy to define how users define haptic control for pleasure without a remote user having to figure out what inputs worked and what didn't. This ended up being the basis of some software experiments over the years until 2013, when the first solidified attempt at implementation happened.
* 2013: _Python 2 + greenlet_
  * The first, unreleased implementation of buttplug. [It's even in our repos if you want to check
    it out](https://github.com/buttplugio/buttplug-py-deprecated). This used python 2, greenlet, and
    ZMQ, but never got as far as talking to a device. It was mostly me playing around with
    architecture. The project was abandoned because I couldn't figure out how I was going to
    distribute it easily.
* 2016: _Rust, the first time_
  * Yes, Buttplug was implemented in Rust at first. Sort of. Due to the lack of hardware libraries,
    windows support (WinAPI 0.3 wasn't out yet), etc, this version only lived for about a month
    before being abandoned.
* 2017: _C#_
  * The second, and most mature implementation of Buttplug. C# was chosen because of Windows
    compatibility (though all libraries are now .Net Standard and compile cross-platform), which is
    where most of our users are. This implementation is where the current version of the spec came
    from. It uses C#'s async/Task features, and the design of this version of the library heavily
    influenced the later Rust implementation.
* 2017: _Javascript_
  * In an effort to build a pure web version of Buttplug, a Javascript (well, actually Typescript,
    but you get it) implementation was created. This ended up being both a pure web library
    (accessing devices through WebBluetooth), as well as a node library (accessing devices via
    noble). Due to the inherently async nature of Javascript engines, this was an async
    implementation, using promises and es7 async/await. This version has constantly lagged behind C#
    mostly because maintaining multiple libraries sucks.
* 2019: _Intiface Desktop_
  * While libraries were available for developers to use, there was no good central application for
    applications to connect to. This meant any time Buttplug updated, so did most of the
    applications that were using it. To fix this, the Intiface Desktop application was created. It
    was an Electron based app that ran a Vue frontend, and executed the server as a background
    process. This was distributed to users so that developers could use Buttplug clients without having to worry about needing to update whenever a new Buttplug version came out, because the server that Intiface Desktop supported would integrate all of the newest hardware in a backward compatible way.
* 2019: _Rust, again_
  * The split between C# and Javascript also helped us support as many platforms as possible. Going
    into development on the current Rust implementation in 2019, our platform supports looked like this:
    * Windows - C# (Node compiles, but is slow and difficult)
    * Mac - JS/Node (C# compiles, no Bluetooth/USB)
    * Linux - JS/Node (C# compiles, no Bluetooth/USB)
    * Android - Xamarin (C#, Bluetooth via Xamarin Bluetooth, didn't really work)
    * iOS - Xamarin (C#, Bluetooth via Xamarin Bluetooth, didn't really work)
    * Web - Pure JS (Blink Engines only for WebBluetooth, so users required Chrome or Edge to use in browser)
  * Needless to say, the fragmentation between the libraries was a problem. None of our users were
    sure when or how their devices would work. This, combined with the new fragmentation of C#
    8.0/.Net Core 3, and the Xamarin lockin on mobile, meant we either needed to put all of our eggs
    in the .Net basket, or else look at another solution that could get us native everywhere.
  * Evaluating Rust in late 2019 was a far different situation than it was in 2016. FFI was more
    mature, WinAPI 0.3 was out and WinRT-rs provided UWP support, multiple Bluetooth libraries had
    already been written (though none were fully cross platform, [we fixed
    that](https://github.com/deviceplug/btleplug)), async/await was on the way, many projects were
    compiling Rust native to mobile platforms and using Java or Swift via FFI on top of it, and
    compiling to WASM is an option (albeit still a difficult one). Choosing Rust in 2019-2020 got us
    close to parity with where we were in C#/JS, all in the same language, and we'll be able to
    progress with the community and technology as it grows.
* 2020: _Everything moves on top of the FFI_
  * Once the core Rust system was in place, it seemed like it'd be best to move everything to live
    on top of Rust. This was mostly an effort to reduce core buttplug developer load. Instead of having to worry about implementing messages, websockets, json de/serializers, etc in every language, it could just be done in Rust then everything else could use that. C# was moved on top of FFI, and JS used a WASM implementation.
* 2021: _A Breakthru on Mobile_
  * In 2021, an anonymous github user named [gedgygedgy](https://github.com/gedgygedgy) created an
    async android runtime and JNI bindings to the bluetooth portions of the android API. This allowed [btleplug](https://github.com/deviceplug/btleplug) (the bluetooth library Buttplug uses) to be used on Android. Gedgygedgy disappeared in August 2021, but left the repos around. Additional work was done by qDot in April 2022 to bring the libraries up to date and integrate them into btleplug, at which point working versions of the Buttplug Library were built for both Android and iOS.
* 2022: _Intiface Central_
  * Due to not staying up to date with the latest web/node frameworks, Intiface Desktop had become
    arduous to maintain, seeing no updates for over a year. Instead of trying to rebuild on
    Electron, the system was scrapped for a Flutter based application that could be used across
    Desktop and Mobile. This became Intiface Central, which was released in November 2022.
* 2022: _Everything moves off the top of the FFI_
  * It turns out that move everything to FFI was overkill. The pure C# and Typescript clients we
    originally had were fine, it was the maintenance of the server side that was an issue. The
    server was now solved by the single rust implementation. Trying to force languages with their
    own runtimes on top of Rust was a bad idea, and ended up causing far more problems than
    solutions. In late 2022, the FFI layer was removed, and replaced with a binding to [Intiface
    Engine](https://github.com/intiface/intiface-engine). This binding was originally built for the
    mobile apps using buttplug, but came in handy for desktop too.
