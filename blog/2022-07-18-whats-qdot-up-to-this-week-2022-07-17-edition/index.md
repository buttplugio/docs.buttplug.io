---
title: "What's qDot Up To This Week? (2022-07-17 Edition)"
date: 2022-07-18
---
Oh so that's what Dart looks like

# Intiface Central
Yup, you read that right, now it's a rewrite AND a rename.

<!--truncate-->

As I need some space to consider sensor messages in Buttplug (I'll talk about that in a sec), I've started work on Intiface Desktop in Flutter. However, since this will hopefully be mostly a shared code base between mobile and desktop, calling it "Desktop" doesn't really work anymore. 

So now it's Intiface Central, which will be completely clear and not at all confusing when the Desktop version of Intiface Central will work as a router for the mobile version of Intiface Central! HOW COULD THIS POSSIBLY GO WRONG.

Anyways.

Porting from Rust to Dart is going pretty quick, outside of the fact that Dart somehow doesn't have sum types in the year of our lord 2022, which is rough. But compiling to desktop and mobile and having a decent, non-immediate mode GUI means I'll put up with it. Will post alphas once they become a thing, probably a week or two out, minimum.

# Buttplug
Buttplug v6 is down to getting sensor messages (i.e. pressure readings from kegelcizers, accelerometers, buttons, battery, RSSI, etc) in!

Ok and also probably a shitton of tests. But honestly if the features are in I can just ship v6.0.0 and then patch to my heart's content as my users QA for me, right?

Only problem with sensor messages is that they're a completely new dynamic in Buttplug, so I'm having to think through the design on this pretty hard before laying down code. A lot of the Intiface work right now is manual porting, so it kinda gives the codemonkey part of my brain something to do while I mull over that architecture.

Hoping at some point in the next week or so I'll finally feel like I've got something solid and can sit down and bang the sensor MVP out over a few days.

# Everything Else
Hopefully have some new toy stuff coming in soon! Can't talk much about it quite yet but excited.

Until next week, Keep Buttpluggin'!

- qDot
