Ok, guess we're sticking to Fridays for weekly updates. Or maybe Saturdays, as is the case now.First off... If you ever wonder what I'm doing with your money, well, the image in this post is a good indicator. I get a lot of questions on [our discord](https://discord.buttplug.io) about cheap toys that work with Buttplug, which is why we have support for things like the [Youcups Warrior 2](https://www.aliexpress.com/item/YouCups-new-Warrior-II-APP-interaction-electric-male-masturbator-Vibrating-oral-Sex-products-adult-sex-toys/32833568062.html) and [Pipijing Whale](https://www.aliexpress.com/item/Electro-shock-8-speed-vibration-Smart-Kegel-Exercise-remote-control-silicone-egg-G-spot-ben-wa/32850060447.html). People want something to play with, but may not be able to shell out for a Lovense, much less a Launch or ET-312. I try to keep a list of < $50 toys from Alibaba that may take a couple of months to arrive and be less-than-body-safe, but will at least provide *something* for people to work with.

That means I also find stuff like bluetooth speaker onaholes.

<!--truncate-->

One of those is on the way to me now, and there will most definitely be a Buttpluggin' With qDot video about it when it arrives.

Now, Software Updates!

All of our server moves are done, and I'm now down to ironing out bugs from the move, like our CI scripts not working (CI = Continuous Integration, a system that allows us to make sure that our software builds and works somewhere other than our own development machines). This means I can get back to more important work.

I've just accepted some fixes to our C# code to improve Lovense device handling, and we're starting to discuss input and sensors. Right now, Buttplug in general is output only. We can make things vibrate, but we can't, say, read an accelerometer or pressure sensor (or battery level!). That's one of our next big areas to implement, though right now it's mostly in the discussion phase.

This week, I'm hopefully going to be spending a bit more time updating our Javascript library to be at parity with our C# library for toy support, and trying to bring all of our various JS apps up to date too. I got most of the way to upgrading Syncydink (which still is running on the version from last fall -.-) a couple of months ago, would be nice to get that over the line so features are easier to add again.

As I posted about earlier this week too, I'm making a pile of research stuff to work on at some point. This includes:

- Automated encoding using ML and CV (translation: blinding chaining python scripts because I have no clue what I am doing)

- A new way to use hardware sync with movies on webpages outside of syncydink (so you could, say, go to porn hub and play a movie on there and it'd work with your toy, versus having to download a movie locally)

- New UI for our windows apps (because our UI sucks)

That's it for now, back to work!