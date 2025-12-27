A continuous stream of questionable choices.

(Warning: extremely developer/tech heavy update ahead)

<!--truncate-->

### Buttplug
After lots and lots and lots of bikeshedding and hemming and hawing and refactoring and discussion, I've gotten the Buttplug v2 spec to a point where I can start playing with test implementations. As a refresher, here is what's getting adding to the system:

 - Raw Messages - Allows us to communicate directly with devices, makes life easier for testing/implementing new things in the system, as well as lots of internal architecture/communication stuff
 - BatteryLevelCmd/RSSILevelCmd - Our first "sensor" messages! We'll be able to read battery/RSSI levels from devices that support queries for those.
 - PatternPlaybackCmd - Ability to play patterns built into toys, and at some point, ability to make your own patterns and expose them for playback!
 - ShockCmd/ToneEmitterCmd - A surprising amount of people have been begging for shock collar/pavlok/etc support over the past few years, so adding some basics for that. Will be interesting to balance against the other hardware types we support.

Implementing this is going to take a while, as there will still be refinement while we figure out exactly what works and what doesn't, before exposing it for everyone to use. I wouldn't expect this to be done before mid-January.

As part of the work, we're also reworking how and where we define devices. This time last year, we implemented our device config file ([https://buttplug-device-config.buttplug.io).](https://buttplug-device-config.buttplug.io).) Now we're moving even more information out into that, including device names and capabilities. This will make it even easier for us to add new toys to already existing protocols.

The first implementation is happening in C#, even though I'd been working on Rust lately. Rust just doesn't have the server pieces in to test this with yet, where C# is more mature. The hope is that this is the last time I have to update server libraries in 3 languages (C#/TypeScript/Rust), and any major changes after this will happen in rust then propagate through FFI bindings elsewhere.

### Everything Else
Not much to say on other projects right now, as this is the main focus. I did update Syncydink to the latest version of Buttplug, so now it can support a few more toys, but it still needs a massive overhaul. Also updated the Intiface Game Haptics router, once again just a library version roll for more toys.

Until next week, keep Buttpluggin'!

- qDot