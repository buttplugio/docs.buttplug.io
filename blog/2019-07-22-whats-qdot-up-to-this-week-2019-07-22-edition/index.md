Organization, and even more new projects!

### Buttplug
After realizing that I had no idea what all projects I had in flight right now, and not really having an ability to deal with that plus new job, the past week/weekend have been dealing with trying to get everything logged and organized. It's getting there, slowly. I'm hoping once I have this system in place, I can keep at it and this won't happen again until it happens again.

<!--truncate-->

Current projects in flight include:

 - New Intiface Tutorial
 - buttplug-py first release
 - Intiface Desktop bugfixing/updates
 - Device bugfixing/updates
 - Adding input messages
 - Decoupling JSON parsers (makes the core library a little more flexible)
 - Unity bindings (blocked by prior decoupling task)
 - And....

While doing all this organizing I of course had to wander off and work on some new proof of concept.

### Teledildonics
So now we have teledildonics. Sort of.

*Technically*, teledildonics has been available in Buttplug since almost day one. If you knew how to chain together ports and websockets in the right way, you could have people remotely access your Buttplug Server. It was not easy though, and very few people pulled it off. With the introduction of Intiface Desktop, I managed to break that somewhat too, due to the way self-signed secure certificates work.

Enter WebRTC.

WebRTC is a technology that's been built into web browsers over the past 7 or so years. Without getting to deep in the technical parts, it basically allows you to do audio/video conferencing in a peer-to-peer manner, similar to Skype/Zoom/etc. You and the person you want to communicate with are matched by an outside server, then you're linked up and talk directly over the internet to each other from there.

Turns out there's also ways to fling arbitrary data over WebRTC, including Buttplug commands.

I ran a small test of this using a modified version of our buttplug-js Glitch.com tutorial, and sure enough, someone on the other side of the US could press a button and make my Lovense Lush vibrate. Wheee.

For now, my plan is to make a connector class for these that you can integrate easily. It'll only be in buttplug-js (using WebRTC outside of browsers is... an issue), but if you're working on the web or in something like electron (since it's basically chrome), this will allow you to connect to other people remotely, albeit with zero limitations on what they can do, so, uh, be careful with it.

I'll be posting more information about that once the project is cleaned up.

### Intiface, Etc...
Not a lot happening otherwise on Intiface at the moment. Logging quite a few bugs and fixes for Intiface Desktop once I can get to it, as well as starting to think about utilities that could be added, like local device testing (so you can just make sure your devices work while you're in Intiface without connecting to anything else! I cannot believe we've lived without this feature for like 2 years). No complaints about the new Playground so far, but that's because there's been almost nothing in the way of comments about it, period, heh.

That's it for the past, uh, 2 weeks. Until next week, keep buttpluggin'!

- qDot