Earlier this weekend, someone submitted a pull request to Buttplug C# to add Xamarin support for Bluetooth. Xamarin is basically a way to run C# code on phones (versus having to write Java for Android and Swift/ObjC for iPhone). 

While the core (non-device handling parts) of Buttplug run on pretty much all platforms, Bluetooth has been what's blocking us from running on phones and actually being useful. I'd originally planned on trying to make a Buttplug JS mobile application (via either reactNative or NativeScript) 'cause I'd heard Bad Things about Xamarin, but since someone was just handing me the code, I figured "why not" and build the included demo app for Android and iOS.

<!--truncate-->

Turns out, it... works? Pretty decently?

I've tested both scanning for the devices from an app UI, and actually putting a websocket server (?!?) on the phone and using it similar to Intiface Desktop. Both of these choices work surprisingly well. I've managed control through both ScriptPlayer and Playground using both phone OS's.

Not only that, the new Xamarin code (minus examples) is only about 60 lines of code. That's all that was required to get it working with Buttplug. Yay architectural choices that facilitate additions!

Where this goes from here, I'm... not real sure yet. This was absolutely not in the near-term plans, so I'm kinda overwhelmed at the moment, but there's a pretty real chance I could throw together a basic UI and have Intiface Mobile on Google Play/Apple App Store in a month or two. There's still some online services that need to exist to make connected all of this stuff smooth, but I'm still super stoked this works at all.

If you write C# and are interested in making your own mobile apps with this, I should have the Xamarin Bluetooth library in the Buttplug C# mainline and nuget packages up later this weekend.

More news as I figure it out.

- qDot