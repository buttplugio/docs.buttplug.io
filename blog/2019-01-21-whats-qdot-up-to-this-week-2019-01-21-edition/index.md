New year, new post day because I do most of my work on weekends so doing updates on Mondays seems a little better.

New year, new application architecture too!

<!--truncate-->

Right now, Buttplug looks like this:

- There's a library, but that's only for developers.

- There's a "server" application, but it's windows 10 only really (windows 7 isn't worth much).

- There's only Chrome web browser support for Mac/Linux/Android.

- Nothing for iOS.

- Application and Web support have different hardware support.

- There's no RPi or other embedded system support, which a lot of people want.

- It's all kind of a nightmare to manage.

In order to make life suck less for myself AND everyone else, I'm now trying to build a single app on top of web technologies + some native processes that will run on windows/mac/linux/mobile/web. This will replace the "Buttplug Server" on windows, and make it usable even on things like the Raspberry Pi and Windows 7 (though Win 7 will probably require a cell phone too, as my solution is similar to FeelConnect but less reliant on remote services). 

To achieve the "Buttplug should only be the name of the library" goal that I've had for a while, this new project is called "Intiface", a name which it shares with the new set of services I'll be putting up to handle things like teledildonics. In the future, "Buttplug" will only refer to the library that accesses sex toys, and applications and services will be under the "Intiface" name.

I got the core of this application structure working over the past week, and am now moving on to basic UI. Once I have something that's installable and replicates the Buttplug Server functionality (which doesn't take much, honestly), I'll be posting an announcement here so you can check it out.

The Buttplug Developer Guide also had quite a bit of work done on it. I finished the first draft of the "Writing Buttplug Applications" section, and have been working with various people to tighten up the "Ethics" section as it's currently WAY too long.

It's feeling really good to be back to writing applications instead of stuck in libraries again, and I'm looking forward to sharing initial work soon!

Keep Buttpluggin'!

- qDot