---
title: "What's qDot Up To This Week? (2020-11-20 Edition)"
date: 2020-01-20
---
AGH IT'S DONE IT'S FINALLY DONE

### **btleplug**
After busting ass for the past week, btleplug 0.4.0 with macOS support is done. This means buttplug-rs now works with bluetooth toys on Win10, MacOS, Linux, and possibly even iOS once I figure out how to test that. This is the first time we'll have had reliable bluetooth running on all 3 desktop platforms under the same Buttplug library in the 2.75 years the project has existed. This is a HUGE help for me going forward, as it really does look like we'll be able to use rust for almost everything.

<!--truncate-->

Still figuring out that whole WASM/Web angle on this so we can replace buttplug-js with this too, but we'll get there.

### Buttplug
I'll now be returning to Buttplug work. I've got some patches to bring in from other developers who've been working on porting toy protocols over to rust, and I need to sweep through and see what else needs to be implemented or fixed before we can release v0.1.0. My goal is to have v0.1.0 also working under a CLI, so we can maybe start using it under Intiface (even though it's going to be super buggy for the next while, I figure).

Unfortunately that's all the news for the week, as I just did the btleplug release about 30 minutes ago, so I haven't exactly had time to do much else. Getting closer to having things to talk about actually related to things people use soon, though!

Until next week, Keep Buttpluggin'!

- qDot