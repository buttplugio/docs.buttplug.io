---
title: "What's qDot Up To This Week? (2021-08-30 Edition)"
date: 2021-08-30
---
Releases!

### Buttplug
With Buttplug v5 released last week, I've now moved to getting all of the dependencies updated. This means the FFI libraries (new C# and JS out yesterday), and Intiface CLI/Engine will be happening in the next day or two.

<!--truncate-->

For the FFIs, right now it's just a library update, without adding any new surface API for the new features of the library. I expect I'll be getting to that soon, but would like the new features (websocket devices, etc...) to get tested more in Rust before I connect them to the rest of the world.

For the engine, I'm expecting bugs, since this update will be a huge overhaul of our bluetooth handler (good news macOS users, Buttplug should be useful there again!) but hoping for the best.

I'm hoping the next major revision to Buttplug will be the addition of new messages, the first time this will have happened in almost 3 years. I'm still working on figuring out exactly what those messages will be, if you're interested in being involved in that discussion, check out our Github Discussions area. ([https://github.com/buttplugio/buttplug/discussions)](https://github.com/buttplugio/buttplug/discussions))

### Intiface Desktop
Of course, all of the new features in Buttplug v5 *do* need to make their way into Intiface Desktop, so I'm looking to climb that hill next.

While also considering rewriting Desktop in Rust using egui. :|

Intiface Desktop is the largest node/typescript/electron application I've written, but it's now also the *only* one I maintain, and keeping up that maintenance when not working in those technologies is a nightmare. There's going to be some tradeoffs with egui (not gonna be quite as flexible on the GUI side, font rendering isn't great, etc), but honestly Desktop doesn't do much, so I'm hoping at least keeping it in technologies I know will help.

I'm doing some research and demo implementations on this now, might actually post some alphas here if people are interested.

This also may be leading to a larger integration project for easily building media/game/etc integrations with Buttplug and other libraries, but more on that as I actually come up with better descriptions for it.

### New Projects using Buttplug
Here's some new things people have built using Buttplug lately!

- Godot.Buttplug ([https://github.com/nhydock/Godot.Buttplug)](https://github.com/nhydock/Godot.Buttplug)) - Native interface for Buttplug in the Godot game engine!

- ButtplugMc (Minecraft) ([https://github.com/psiloclast/ButtplugMc)](https://github.com/psiloclast/ButtplugMc)) - A new Buttplug command system for Minecraft integration, using our new Java FFI!

- Buttplug Morse - [https://github.com/kaylynn234/buttplug-morse](https://github.com/kaylynn234/buttplug-morse) - Morse Code your Buttplug!

- Healsluts (Overwatch) - [https://github.com/Sir-Prise/healsluts](https://github.com/Sir-Prise/healsluts) - In-browser Hardware based Healslutting for overwatch using the display capture API!

That's it for now, until next week, Keep Buttpluggin'!

- qDot