---
title: "What's qDot Up To This Week? (2021-08-16 Edition)"
date: 2021-08-16
authors: [qdot]
---
The pre-release slog continues...

# Buttplug
There's nothing worse than changing a surface API, because that means a major version revision, which means then you just start piling in ALL of the changes that might hit surface APIs, and sudden you've got a katamari release on your hands.

<!--truncate-->

So that's where things are right now. The good news is that, as of v5, I think Buttplug will be *completely* modular outside of the message system, which is kind of the last big hurdle until this is just a pure hardware abstraction and message passing library that just happens to talk to sex toys. But it will be very easy for users to add/customize the library to their liking, assuming anyone understands it enough to do that.

Which is why the next goal after this is documentation and better UI.

And then more Buttplug protocol messages because apparently everyone is getting fucking machines now and it's becoming A Problem.

Anyways, that's literally it for this week. I've just been doing lots of refactoring and replanning and am now into writing tests to make sure things basically continue working. Hoping again for v5 release this week, but we'll see if that actually pans out.

Until next week, Keep Buttpluggin'!

- qDot
