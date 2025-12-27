---
title: "What's qDot Up To This Week? (2020-01-13 Edition)"
date: 2020-01-13
---
Oops I accidentally another library

# BtlePlug
Yup, you're reading that right. Not Buttplug, BtlePlug. :(

<!--truncate-->

One of the things Buttplug needs to function is a Bluetooth LE library. This library ideally needs to support:

 - Windows 10
 - MacOS/iOS (these are mostly similar)
 - Linux
 - Android

In C#, we had a library that could support Win10 and Mac. That was about as far as we could get. If we used WebBluetooth we could get everything but iOS easily, but it required use of Google Chrome or Electron, so it wasn't really a great choice.

Now that I'm trying to get the core logic on Rust, I decided to see what Bluetooth LE libraries were available around the Rust ecosystem. Surprisingly enough, all of those platforms are supported in Rust. Unfortunately, that support comes from 3 separate libraries.

I've now taken it upon myself to try to glue these libraries together into some sort of frankenstein to get buttplug-rs up and running on Win10/Mac/Linux for now. That library is BtlePlug.

[https://github.com/deviceplug/btleplug](https://github.com/deviceplug/btleplug)

iOS may "just work" with the macOS side, and Android will come later.

There also needs to be basically a complete overhaul of the API, as no one working on the Rust libs was considering how this needed to work on all platforms (there were technical reasons for that which I won't go into here).

Anyways, we already had Win10 and Linux working, so this is mostly for Mac. I've already got Mac scanning for devices, so progress is happening, and once this is all working, we'll be able to use the same code on all versions of Intiface Desktop! No more guessing which platform supports which devices!

Unfortunately, that's been pretty much it for my week. Getting this together took a while, and I'm trying to get other people on the project to help fill things out. I don't really *want* to maintain a bluetooth library, but it doesn't look like anyone else does either, so here we are.

Until next week (which will hopefully have more sex tech and less bluetooth news), Keep Buttpluggin'!

- qDot
