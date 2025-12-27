Paying for my sins!

### Buttplug
Well, Buttplug v6 is (mostly) feature complete, which meant it was time to test things, and, um.

<!--truncate-->

Oops.

So it turns out that all of my tests were ONLY for the new version of the protocol that I'd been working with since February. Trying Buttplug v6 with pretty much anything that's actually out and working with Buttplug v5 right now breaks pretty quickly because of incompatibilities in the way I wrote some message checks.

It alllllllso turns out that protocol compat with versions 0 and 1 of the spec have NEVER worked with Rust. Which means either no one uses really old stuff or no one talks about it because that's been broken for 2 years now. (Or else my initial tests there were wrong and it somehow passes checks but I really don't know how).

In order to alleviate this now and hopefully in the future, I've spent the past couple of weeks finally writing a nice, scripted test system that should allow us to easily test across all versions of the spec. For the first release of Buttplug v6, I'll at least be making sure everything that worked with Buttplug v5 still works, but I'd like to have a point release soon after that which will get us to the full compat I've always said we had. >.>

### Everything Else
Yeah that's pretty much it. All I've been doing for 2 weeks is tests. It's one of those things that simultaneously super fulfilling and extremely frustrating. But in the end I'd really like a library that I know mostly works. :|

Until next week, Keep Buttpluggin'!

- qDot