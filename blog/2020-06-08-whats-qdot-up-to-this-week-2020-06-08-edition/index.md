---
title: "What's qDot Up To This Week? (2020-06-08 Edition)"
date: 2020-06-08
---
It's possible to feel like you're living in the future even when time has lost all meaning, I guess.

### Buttplug
Thanks to the obsessive refactoring and cleanup work I've been doing over the past couple of weeks, this weekend I got to a point where I could try one of the big goals of the rust rewrite of Buttplug: compiling to WASM.

<!--truncate-->

And it* just worked.*

For those not familiar, I'll try to do an explainer here, but feel free to ask questions if this doesn't make sense: 

Usually, when we write programs for the web, we use the javascript programming language, in one way or another. This can mean writing javascript by hand, or writing in another programming language that can be turned into javascript (typescript, elm, coffeescript, there's tons of languages come and gone now that do this).

However, there's now a new standard that lets us compile to a format that is way faster and more optimized than javascript, called WebAssembly, or WASM.

Rust has compiled to WASM for a while, but building Buttplug for it was going to require cleanup that I'd been putting off until the last couple of weeks. While it can't access websockets or bluetooth quite yet, both of those features are probably like, another weekend of work away.

So what does this mean for Buttplug and it's users?

Basically, buttplug-js will no longer lag behind other implementations. I can write Rust, compile to both native and WASM, and whoever wants to use it on the web will be using the same implementation that's on desktop (outside of a few things like the aforementioned websockets and bluetooth, which will have their own specific web implementations).

There are drawbacks here, though. 

For users, it's mostly about download size. Buttplug-js, which is typescript compiled to minified JS, is around 300k uncompressed. Buttplug-wasm is 2.1mb optimized but  uncompressed. gzip'ing gets those down to 80k/600k respectively, so I'm looking at a 9x size growth here. That said, this library isn't exactly going to be used everywhere, so I'm just going to say "deal with it" because it makes my life SO much easier.

For developers, debugging this will be a little more difficult since the code isn't going to be available in the browser all the time. If the rust crashes, it'll print its stack, but it'll require writing more rust and recompiling to fix.

Still though, the dream of having a single Buttplug implementation is one step closer. I thought buttplug-wasm was still a couple of months away at least, so this is super exciting.

### **Game Haptics Router**
Got a couple of pieces of GHR news!

ROCKET LEAGUE WORKS AGAIN! I don't know how, but it does! For some reason, only in windowed mode, but still! This doesn't even require a GHR upgrade. It seems to just work.

Also, someone on our discord server threw out a really interesting idea: What if your toy activated whenever you hit a button as well as whenever the game made the gamepad rumble? We could even do things like mapping buttons to different vibrators/toys, having certain buttons or directions be pattern playback, etc... It's a really intriguing idea. I'm gonna be looking at expanding the GHR to handle this in the near-to-intermediate future.

Anyways, that's it for now. I'm hopefully winding down on the hardcore refactoring on Buttplug and can get back to adding features and stablizing for the next release in the next week or two, after which I can also start tackling the C# (and Unity) work. It's nice to have some light at the end of the tunnel.

Until next week, Keep Buttplugin!

- qDot