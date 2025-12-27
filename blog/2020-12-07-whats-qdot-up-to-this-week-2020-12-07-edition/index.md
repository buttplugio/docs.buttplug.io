Redoing shit. :(

### Buttplug
Most of the past 2 weeks has been spent working on the Buttplug Developer Guide. I've got the first 3 chapters (good enough for v1 release), with Rust and C# examples in. Pretty happy with that overall!

<!--truncate-->

[https://buttplug-developer-guide.docs.buttplug.io](https://buttplug-developer-guide.docs.buttplug.io)

Also, there are now beta versions of both C# and JS/TS/WASM on nuget and npm, respectively. So if you're building apps, look for prerelease packages there if you want to play around and help test/debug.

Late last week I started working on getting the Javascript/WASM examples together, and that has... not gone so well. Unfortunately, the architecture I was pursuing for WASM just didn't work out. I was trying to write *everything* in Rust and compile to WASM, which means even the JS/Typescript method calls would access WASM/Rust. This meant bending JS ideas into Rust itself, and that got... gross. Those of you that follow the twitter account got to see some of that.

Over the weekend, I decided to finally just restart using the same Rust FFI code that C# currently uses, except now compiled to WASM, with my own Typescript to create the Client API. This is working out far better, and I hope it should be done in a week or so, which will both put me back on track to finish the Dev Guide soon, and also means that updating the WASM code in the future will suck less.

### Syncydink
Welp, lots of people unhappy with me about dropping Syncydink. I've lost about 5 patrons so far, which is honestly less than I thought I would, so thanks to those who've stuck around.

The reason I cut development when I did is because someone else needs to take over the project. There was lots of low hanging fruit to fix and even some new pull requests to bring in, but if I started updating again, it'd raise expectations of even more updates after that, and honestly, I just do not fucking care about video sync. 

Video sync has a huge community, and one of the tenants of working on the core Buttplug library is "never get involved in a community you do not have direct interest in". Due to sex software being about, well, sex, you either need to be directly interested in the subject matter of the software, or monetarily interested in producing it, or ideally, both (looking at your, furry porn game producers on patreon). Without those, you're going to have a Bad Time. With video sync, I'm not in either category, so I'm hoping someone else will pick up the idea of a web based hardware synced movie player and go make themselves so big patreon/subscribestar/whatever dollars.

### Everything Else
The amount of new hardware I have in for testing and videos is just fucking ridiculous. I've got an Edge-O-Matic ([https://maustec.io/pages/nogasm),](https://maustec.io/pages/nogasm),) a few WeVibe toys, a Hismith on the way, etc. I am very much looking at getting this library and documentation shit done so I can work on integrations and apps.

GHR w/ Buttplug C# FFI will hopefully be out soon.

That's it for now. Until next week, Keep Buttpluggin'!

- qDot