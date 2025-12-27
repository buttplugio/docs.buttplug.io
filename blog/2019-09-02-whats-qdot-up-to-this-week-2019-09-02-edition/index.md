OMFG.

I AM ACTUALLY CAPABLE OF FINISHING THINGS.

<!--truncate-->

### Intiface Tutorial
The new Intiface tutorial is done!

[https://tutorial.intiface.com/](https://tutorial.intiface.com/)

This time it's written using vue.js instead of twine, but still has basically the same interface. There's still a lot of debugging to do and a lot more information to add, but for now it seems to be up and running ok.

If you're already using Intiface Desktop, there's not much to see here, but once I start adding new features (Like WebRTC connections and what not), I'll probably be recommending users walk through the tutorial again with the new methods.

### Zendesk Support
This is kinda weird for an open source project, but I've started a support account on Zendesk. This allows me to receive trouble tickets whenever people are having problems with Intiface or apps like Playground and Syncydink. Not everyone has a github account or knows how to use github issues, so this seemed like a better match.

Right now, support requests are only implemented in the Intiface tutorial. To see what it looks like, go to the Intiface Tutorial, go past the intro screen, then hit the "Need Help" button.

One of the nice things that comes with the Zenhub account is a Knowledge Base, aka a FAQ:

[https://nonpolynomial.zendesk.com/hc/en-us](https://nonpolynomial.zendesk.com/hc/en-us)

It's going to take me a while to get this filled out, but I'm hoping it'll serve as the central place to answer questions about the various projects.

### Hardware Support Lists
blackspherefollower, one of the longest tenured community members and contributors to the project, has put together a nice list of computer controlled sex hardware, including information on devices supported by Buttplug:

[https://iost-index.netlify.com/](https://iost-index.netlify.com/)

I'm hoping to put together a simpler version of this for the buttplug.io and intiface front pages, so we can finally start answering the question "but will this work with my hardware?". 

Which seems like it should've been the first question the project answered.

Oops.

### Buttplug
Now that the tutorial is up, I'm gonna try to get back to a round of Buttplug updates (even though I found a TON of Intiface Desktop bugs while building the tutorial). This includes:

 - Kiiroo Titan 2.1 Support
 - Finishing up the Buttplug Python Client Library
 - Starting work toward a v1.0 release, including new messages for Battery Levels, RSSI Levels, Raw commands, etc...

### Everything Else

 - Still doing design work on the Nonpolynomial brand.
 - I'd like to get Playground updated with links to Zendesk Support in case people need it.
 - Syncydink still needs to be ported forward to the new Intiface Web widget. And also needs to have Zendesk support. And also need to be completely rewritten.
 - WebRTC is still blocked on me getting a basic user system together and figuring out EULAs and other boring legal requirements. I've been trying to quickly glue some Django experiments together for this, but it's been slow going.
 - Unity. Ugh. This is just a constantly shifting problem now. Still need to strip down the core library to remove dependencies so we can make an easier-to-embed client, which may happen as part of the v1.0 work.
 - No video work planned for the near future but who knows. I just randomly decide to make videos sometimes.

I think that covers everything for now. Until next week, Keep Buttpluggin'!

- qDot