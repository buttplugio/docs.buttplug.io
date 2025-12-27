Holy shit. Rust Bluetooth works.

### Buttplug
Ok well I said back in like, October/November that it was gonna be spec and Rust updates for a while, and I apparently meant it.

<!--truncate-->

After realizing exactly how much work it was going to be to overhaul C#, I decided to pivot back to Rust for a bit just to see how far we were off there. As of last week, Rust only had the barest implementation of a Buttplug Server possible, so I decided to try building up some device interfaces. 

Without Bluetooth LE access, the library isn't really worth much, so that was the first order of business. There's been multiple shots at implementing Bluetooth LE in rust, most of which are Bluez or Servo (Mozilla's experimental browser) focused. I decided to try Rumble ([https://github.com/mwylde/rumble),](https://github.com/mwylde/rumble),) another Bluez focused library with a finished Linux impl and a mostly done Windows UWP Pull Request from 18 months ago.

Linux worked pretty much off the bat, which was great.

I had to spend most of the weekend patching up the UWP implementation, but by Sunday, I had windows talking to bluetooth via Rust.

So, that's a HUGE worry out of the way. Even if the library isn't async and feels kinda messy (Bluez's device model is weird), it works enough to probably get an alpha version of the server out now.

This means that I'm back to full focus on Rust, which will get us a Windows and Linux implementation, with Mac possible (blurmac exists so we can possibly port the code from that or may just use it wholesale? [https://github.com/akosthekiss/blurmac).](https://github.com/akosthekiss/blurmac).) HID and Serial libraries already exist and are cross platform, so that should get us most of the way to the major desktop platforms.

Mobile is still going to be interesting, but somehow there's already an Android  Rust version of Blurz ([https://github.com/szeged/blurdroid),](https://github.com/szeged/blurdroid),) so we may even be able to support Mobile via Rust, with a Java/Swift FFI layer on top of it, meaning we can still centralize all of the logic.

I'm as shocked as anyone at how quickly this is coming along, but I suppose there's been so much work on design over the past couple of years and now it's just a matter of wedging it into a new language.

So, that's pretty much it for now. I realize this isn't exactly a feature filled email, but if we can settle down to a single implementation, that means I can concentrate on apps in the future versus updating 3 different implementations and figuring out which one might work where.

Until next week, Keep buttpluggin'!

- qDot