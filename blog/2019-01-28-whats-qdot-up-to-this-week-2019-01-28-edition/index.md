Ok yeah Monday works out much better for newsletters. Less panicking about what I'll get done on the weekend after writing it, more panicking about what I got done on the weekend not being worth writing about.

Work continues on the new server app, though things have moved slightly farther back into the library yet again.

<!--truncate-->

Throughout the past year, I've gotten some requests in relation to how people use the library, and some of these match issues that've cropped up during my own development:

- People building their own hardware want an easy way to add simple access without changing code

- A cam studio using the software that was having problems with every computer running Buttplug trying to claim every toy it could find in the studio.

- Companies releasing new toys with no changes other than identifiers, so all we really needed to do was add new addresses for the hardware but this required changing code and releasing new libraries.

- Removing serial scanning because it was screwing with other serial devices, which means we need a way for people to say "I have [this device] on [this serial port]"

With *all* of those things in mind, I'm now working on configuration files so that these things can be set up outside the libraries, and possibly changed by users savvy enough to have a text editor and know how YAML works. This is yet another internal library change that I was hoping to avoid, but this will hopefully kill many birds with one stone. C# is 80% done already, I have a feeling Buttplug JS won't take too long either.

In application related news, a game using Buttplug was just announced and did their crowdfunding launch!

[https://patreon.com/viroclub](https://patreon.com/viroclub)

This is a VR game/experience that, when it launches, hopes to have cam models doing real-time mo-cap. Right now they have demos with a couple of pre-recorded scenes. It's using Buttplug for the sex toy interaction, and the devs are on our Discord.

That's it for now, back to the YAML mines.

Keep Buttpluggin'.

- qDot