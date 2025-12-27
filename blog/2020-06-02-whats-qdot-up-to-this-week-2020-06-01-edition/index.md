---
title: "What's qDot Up To This Week? (2020-06-01 Edition)"
date: 2020-06-02
---
A day late but with a good excuse. (and fair warning: the Buttplug Section will be EXTREMELY engineering heavy but there's a couple of things after it)

# Buttplug
Buttplug-rs ate my brain.

<!--truncate-->

So some of you might remember this point I made last week:

 - Buttplug Server isn't actually async (no way to clone base object, so it also blocks per message)

As of about 5 minutes ago, the Buttplug Server is now actually async! And doesn't require cloning to be that way!

Basically, I was misunderstanding how async library APIs in rust should work, and that was causing ownership and lifetime issues that basically bound the whole system to one task running at a time. Buttplug is *now* looking far more like a lazily evaluated future builder. For any call made into the server, we basically just roll up the state we need into a future, along with whatever call will leave the current task/thread context, then hand that back for you to execute whenever you like. This means every single message can be spawned into its own task. 

In the end, we're still beholden unto at least some threads, because a lot of the hardware APIs I use aren't async yet. But we're getting there! And the system outside of those threads is much easier to reason about. At least, to me.

So, why does this matter? For local usage, it... honestly really doesn't. This is such violent overkill as to be ridiculous. However, this now makes the library scalable from a single local server accessing hardware to being a full, 100s (probably way more but I haven't profiled it so I'm being conservative) of sessions at once teledildonics server. All in the same damn library, with a fairly clean, (what I think is) easy to use API.

# Why Are You Being So Nerdy?
Not gonna lie: The current dive into extremely, extremely deep architecture is a coping mechanism. Shit's pretty fucked in the US right now (I live in the San Francisco Bay Area, it's been pretty active around here), and it's a lot to deal with, even from my completely reclusive place in it all. I'm supporting protestors how I can, am donating (personal funds) to causes, and support the uprising that's showing how systematic racism has hosed this place on so many levels.

Anyways, turns out, refactoring Buttplug is apparently my self care around dealing with the constant news of protests, COVID-19, and everything else. So that's why there's this sudden push. It'll end up in a cleaner library, and a hopefully sane me. 

Back to your regularly scheduled Buttplugs.

# Why Can't I Buy A Fleshlight Launch?
Thanks to some info from people that work with Kiiroo, I've heard that the Launch is now out of stock for at least the next 3 months. Not sure if I've mentioned it here before, but Fleshlight has yanked their name from the Launch. If/when it returns, it will be the Kiiroo Launch. Whether anything else will change is a good question. Kiiroo has been changing their processing platform to ESP32 lately, so it could be that we end up with a different Launch, though I'm not expecting a better one.

# Other Stuff
I still keep wanting to get back to videos, but code is still my top priority for the moment. I've got a huge list of topics to make videos on once I can finally get some time though. The discord server has been more lively lately also, especially around the Game Haptics Router, with people starting to request some new and really interesting features. Looking forward to implementing some of those soon!

Anyways, that's it for now. Until next time, stay safe, and Keep Buttpluggin'!

- qDot
