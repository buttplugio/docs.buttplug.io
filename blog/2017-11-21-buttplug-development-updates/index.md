---
title: "Buttplug Development Updates"
date: 2017-11-21
---

It's been a little quiet around here lately, so I figured I'd share what's going on in development.- ET-312 Estim serial protocol support is now in the C# client. This allows users with ET-312 boxes to scale intensity based on input.

- .NET Standard conversion of the C# project is finished. This is a fancy way of saying we're getting closer to being able to use C# for mobile apps on Android/iOS. Our goal there is to have a Websocket Server App for phones, which will solve even more platform issues (we hope).

<!--truncate-->

- We're working toward a v0.2 release of the C# projects, which will contain a lot of architecture work to make sure that software developed around Buttplug is forward/backward compatible. The goal is making sure we don't have someone's favorite program suddenly stop working because of changes made in the future.

- Lots of architecture/documentation work.

So things are a little quiet on the "interesting/exciting" feature front right now, but a lot of the work we're doing at the moment will ensure that we can get back to the exciting stuff with a more stable platform to build on.
