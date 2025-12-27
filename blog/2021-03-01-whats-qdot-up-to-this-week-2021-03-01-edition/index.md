Not much, honestly. It's been a Extremely Fucking Bad couple of weeks out in reality, so things are going very slowly right now.

<!--truncate-->

### VR
But at least it was a rough couple of weeks with new toys?


Got a Valve Index + Full Body Tracking setup, in order to both get more testing in with the GHR (where I've had people yelling at me about Vive issues for years now), as well as just having an overall better experience with Neos and VRChat.

I am now mildly obsessive about VR Worlds, so expect more content in that direction soon.

### Buttplug
Only real Buttplug development that's happened has been bugfixes. There's a TON of work happening on the btleplug library (which handles bluetooth for Buttplug) thanks to some contributors, so I've updated that, as well as fixing some log messages that were possibly causing crashes in Intiface Desktop. A new Intiface Engine was released yesterday that I'm hoping will make life way better for those afflicted (which now, thanks to the aforementioned VR worlds obsession, includes me :| ).

### **Intiface Tutorial, VaMSync**
After being broken for at *least* 18 months, I've now ported the Intiface Tutorial to buttplug-js v1.x. I still wouldn't exactly call it helpful, but it's something.

I also updated VAMLaunch to become VaMSync, but given that I don't really use or even know how to use VaM, I'm not sure how successful that's been. 

### Everything Else
Here's what's on my TODO list right now:

 - **Intiface Desktop updates:** ID 19 is 6 months old now. This needs to happen so badly. Mostly quality of life updates to start but then moving onto larger additions like device management and configuration, simulation, etc.
 - **Device additions:** Switch Joycon, which shouldn't be too hard. OSR-2 still coming, but needs the Intiface Desktop updates for port setup.
 - **Documentation:** I need to finish the developer guide, update STPIHKAL for the first time in like 2.5 years, and rework the tutorial to start from the point of "So you've decided to buy a computer controlled sex toy"
 - **WebRTC:**Last but probably most important to the platform, adding WebRTC as a connector. This will (hopefully) easily allow people to use their phone as a Buttplug hardware server while using their desktop as a client (i.e. VR/movies on desktop, with toy controlled via phone, since desktop bluetooth isn't reliable for everyone). It also really opens up a lot of remote control situations, as [https://xtoys.app](https://xtoys.app) has shown.
 - **Python Library: **I was really hoping someone else would do this but given that I've had people show up then give up on Java, Kotlin, and C, I think the FFI extensions are gonna be all me.

As always, if you have things you'd like to see implemented, comment or poke me!

That's it for now. Here's hoping things start sucking less. Until next week, keep buttpluggin'!

- qDot
