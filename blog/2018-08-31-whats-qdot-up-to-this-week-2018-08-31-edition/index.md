---
title: Whats Qdot Up To This Week 2018 08 31 Edition
date: 2018-08-31
---
An update! On time!If you guessed that I don't have much to say, congratulations, you're right! 

This week has been more about fighting infrastructure than I would've liked. There's been some lingering breakage in how some of the Buttplug code is tested, and that ended up needing to be fixed and taking a non-trivial amount of time.

<!--truncate-->

Nerd speak version: Appveyor CI (windows builds) auth broke after I did the Github org move from metafetish to buttplugio, so our PR checks were never returning correctly. I was just working around it but it turns out other people want to contribute and that was tripping things up, but fixing it was... more of a challenge than I had originally planned on. The gritty details are at [https://help.appveyor.com/discussions/problems/16277-build-fails-on-master-branch-for-unknown-reasons](https://help.appveyor.com/discussions/problems/16277-build-fails-on-master-branch-for-unknown-reasons)

That said, some stuff did get added around that work. We now have support for more Magic Motion devices, as well as some other code fix-ups. I'm also working on C# code examples now (for anyone interested, the branch is at [https://github.com/buttplugio/buttplug-csharp/tree/client-examples](https://github.com/buttplugio/buttplug-csharp/tree/client-examples) ) which will hopefully get new developers up to speed on using Buttplug C# somewhat faster, with the main interest there being more Unity work.

I'm trying to dig out of infrastructure and maintenance work, but it's a pretty big pile. I'm really hoping that once the C# 0.3.0 release is ready (hopefully within the next month) and in line with the JS library, I'll be able to work quicker across both of them, and these letters will be more about things like new apps and syncydink feature work. :)

Thanks for sticking with me through the boring parts! :)

qDot