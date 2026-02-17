---
title: "Intiface V11 Win10 Only Released"
date: 2019-04-10
authors: [qdot]
---

[https://github.com/intiface/intiface-desktop/releases/tag/v11.0.0](https://github.com/intiface/intiface-desktop/releases/tag/v11.0.0)

Ok so you may have noticed that last night I made a "Intiface v7 Released" post and it's 22 hours later and we're already to v11.

<!--truncate-->

Yeah, that sucked.

After fighting with the installer builder, as of v11 application updating now actually, mostly, sometimes works. No more having to download binaries from github. That's basically the only change, but it's a big one.

Also, the updater uses differential based downloading, which is a fancy way of saying it'll only download the parts different from what it already has. This means you may download like, 2-3mb instead of 90mb (yay electron).

That's it. Hopefully at least a day or two between this and v12 now.
