---
title: "Does qDot Even Exist Anymore? (2023-04-10 Edition)"
date: 2023-04-10
authors: [qdot]
---
Oof. Not particularly the past while. Life is getting in the way of Buttplug work. That said...

# Buttplug
I started working on getting user configurations into Intiface Central, and thanks to our convoluted configuration files, it got very difficult very quick.

<!--truncate-->

So it's time to move to a convoluted relational DB!

I'm moving device configs and user configs to a SQLite setup. This will massively reduce the amount of bookkeeping I'm required to do when loading device and user configurations (meaning less code in the library, and removing many of the most complicated code paths), and should in general keep everything cleaner going forward.

Unfortunately it's also a big architecture change, so I'm guessing it'll be a few weeks of work, especially since I'm maybe getting 2-3 hours a week to work on the project right now. I think it'll end up being much better in the long run though.

# Everything Else

 - I went to GDC. It was ok I guess.

That is pretty much it for right now. Until next time, keep buttpluggin'.

- qDot
