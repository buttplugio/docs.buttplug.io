---
title: "What's qDot Up To This Week? (2019-11-25 Edition)"
date: 2019-11-26
---
Being a day late, but I hate missing more than 1 week in a row of these.

# Buttplug
2 releases in the past week!

<!--truncate-->

- Buttplug Rust 0.2, with a fully functioning Client! This is a huge step forward on the systems side. I'm now working on a server implementation as well as FFI to get bindings to other languages (C#/Python/C first, then hopefully JS via WASM at some point once I figure out the bindgen part) working.
 - Buttplug C# 0.5.4, which includes new hardware support for the Lelo F1s, WeVibe Vector, Lovehoney Desire, Aneros Vivi, and a few LiBo toys.

Most development is still happening on Rust for right now. I'd really like to get a full server setup together, and I don't think getting the server/device manager set up should be too difficult. Most of the work will be in getting the platform specific device subtype managers going. Luckily there's already cross platform libraries for serial/usb/hid, and scattered implementations for Bluetooth LE I can crib from.

I've already gotten some toy implementation of C#-to-Rust FFI working so we can FINALLY start looking at things like Unity access without having to fight with dependencies. Exciting times!

That's... actually it for right now because all of the above is actually a ton of work that's taking all of my time. Expect more of the same for a bit, though there may be a YouTube video popping up over the Thanksgiving break, as I'm planning on redoing my SLSA conference talk as a video.

Until next week, Keep Buttpluggin'!

- qDot
