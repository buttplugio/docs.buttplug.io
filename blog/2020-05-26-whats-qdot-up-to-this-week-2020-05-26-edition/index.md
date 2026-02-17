---
title: "What's qDot Up To This Week? (2020-05-26 Edition)"
date: 2020-05-26
authors: [qdot]
---
Coming in a day late because yesterday was a US holiday.

Not really sure I *want* talk to about what I'm up to because it's kind of embarrassing but...

<!--truncate-->

# Buttplug
I'd been planning on working on documentation in Buttplug for most of May. At the end of April, I was tackling serial port dev, but it was getting mired in eccentricities which were taking longer than I expected to resolve, so midway thru May I did actually switch over to documenting code.

*Then the trouble began.*

I decided to start with the Buttplug Client code, the first code written in buttplug-rs back in October of last year, before async was even in mainline Rust. It turns out that trying to explain your code to an imaginary general audience is a fantastic way to figure out what's wrong with... pretty much all of it.

Issues so far:

 - Client wasn't actually async (would block per message)
 - Server isn't actually async (no way to clone base object, so it also blocks per message)
 - Client event loop was a complete mess
 - Connector system far too integrated with serializers and Client code, can't really have server connectors easily.

The list goes on.

So far I've done a ton of cleanup and simplification on the Client, as well as documenting it. This has also turned into extracting Connectors, to make adding things other than our current choice of websockets easier. 

Unfortunately, cleanup is not all that much fun to talk about, but my hope is that this will make everything more robust and testable, as we've had some people using intiface-cli-rs (intiface-cli is what's behind Intiface Desktop) and it's, uh, kinda crashy.

Having the code documented will also hopefully make it more usable for others, and quicker to fix for me, because untangling whatever I was thinking last October when I first put this together was... different than my understanding now.

# Nonpolynomial
Nonpolynomial, the startup I founded that backs Buttplug, Intiface, and some other projects, is getting some branding! I've been working with a design studio on this since last August, and the new company identity is almost ready for preview! I'll also be setting up a company blog there so I can stop just making twitter threads constantly. :|

So, that's unfortunately it. Not a ton of sex toy talk this week, more meta stuff. Looking forward to getting out of the cleanup/documentation weeds and back to more fun (or at least flashy) stuff soon.

Until next week, keep buttpluggin'!

- qDot
