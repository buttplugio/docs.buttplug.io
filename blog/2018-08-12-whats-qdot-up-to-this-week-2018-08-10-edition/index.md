---
title: Whats Qdot Up To This Week 2018 08 10 Edition
date: 2018-08-12
---
It's been a week of me being angry at me from a year ago, mostly.Work on cleaning the Buttplug C# codebase continues. I'm currently trying to get all of the changes I've made over the past week finished enough to merge the code and figure out what all there is to do after this. This is hindered by me constantly running into something I did in the early months of the project and having to sit there for a while going "What was I thinking?".

The nice part of this is that I now have an updated perspective on the state of ALL of the code in Buttplug, which will hopefully mean I can write coherent documentation about it once I finish this overhaul. One of the major goals of this C# work is to make it so I can write one document for developers that has both C# and Typescript/Javascript in it, and that's pretty close to possible now.

<!--truncate-->

Things that are left on C# work:

 - Lots of bug hunting and fixing. I most likely broke a lot of stuff on the way through this, even though all of our tests pass and there's less code than there was.
 - Modernizing the GVR application. It's the first app I wrote outside of the Websocket Server, and I was in a hurry and slung it together. I'm gonna try to do the minimal amount of work possible, as I'm hoping to start on a new version of our GUI system once this is over.
 - Generalizing our Serial Port access. Right now, the SerialPort class is made specifically to talk to the ET-312B. I'm hoping I can make a general manager so we can start using Lovense and Vorze USB keys (and DIY arduino toys and...) on Windows.
 - Playing with Xamarin for cross-platform C# work. Part of my work so far is seeing how much of this I can built in a possibly cross-platform way, but I haven't had a chance to really test that yet. We're much farther along on possibly being able to build iOS/Android apps with C#, though that's still a long ways out for having something actually shippable.

Hopefully I'll have something more exciting to talk about soon, but thanks for supporting me during the boring maintenancy times too. :)