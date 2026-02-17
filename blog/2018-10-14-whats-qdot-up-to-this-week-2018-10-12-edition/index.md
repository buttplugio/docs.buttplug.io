---
title: "What's qDot Up To This Week? (2018-10-12 Edition)"
date: 2018-10-14
authors: [qdot]
---
Yeah ok at this point it's just time to admit I didn't know what I was doing with C# a year ago and now I'm basically rewriting half of the project to make it actually work like actual C# programmers would actually expect.There. Done. Brutal honesty.

Finding all sorts of potential bugs in buttplug-c# as I continue on this deep scrubbing, which is good! There's been messages doing wrong things, unexpected ways to break the system, etc etc etc. It's all good cleanup that will hopefully lead to a glorious future with zero technical debt so I'll never have to do this again.

<!--truncate-->

Yup. That will totally happen.

Anyways, in other news, took a bit of a side trip last weekend into reverse engineering the EStim Systems 2B unit. Pulled the firmware by just watching the USB line during an upgrade, and some of the electrical engineers I work with are now doing circuit analysis. Not sure where this will actually go, but we'll at least have a better idea of how the 2B functions.

Also now looking at the Powerdot exercise unit ([https://powerdot.com),](https://powerdot.com),) which could be interesting since it sticks to the body and is bluetooth.

Back to the refactoring mines for now. I've gotten the C# Core and Server done, now it's on to the Client, then hopefully I can start considering releasing v0.3.0.