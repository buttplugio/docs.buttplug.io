---
title: "Automated Motion Analysis Research"
date: 2018-06-19
---Fun new toy showed up today, as there are lots of computer vision papers and tools coming out of a big CV conference this week![https://github.com/MagicLeapResearch/SuperPointPretrainedNetwork](https://github.com/MagicLeapResearch/SuperPointPretrainedNetwork)

So, for those of you that don't read computerese...

<!--truncate-->

This is a small tool that does motion analysis on sets of images or a movie. It'll pick out points it can detect motion on, and track those points across time as the movie progresses, handing back information on where it thinks things have moved between frames.

I've attached a movie of me running this against some random porn. In an ideal world, this would run in real time via the GPU, but I don't have CUDA set up on any of my machines at the moment and didn't want to fuck with it, so this is the extremely slow CPU-bound version, hence the 1fps display. However, you can still see the motion vectors being generated across frames.

We should be able to use this data to create Buttplug commands to automatically encode ***some parts of movies*** ***in some instances***.  This is absolutely not a panacea for our movie encoding requirements. We'll still need to deal with scene edits, camera changes, camera motion, and as the ML was trained on what I am assuming are real scenes, it will have issues with hentai and furry art (and yes I tried it on furry art first because I most certainly have my own interests in mind here). However, this could vastly speed up encoding scenes where the camera is static and things stay in frame.

How this will look for people who just want to encode quickly, I can't yet tell you. I'm still a long ways off from being able to turn this into a usable tools that I can redistribute. Thought it might be fun to show off some ideas in development though.

Fun times ahead!