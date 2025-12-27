---
title: December Buttplug Update
date: 2017-12-26
---
Thanks to the holidays I've been rather quiet, but that doesn't mean work isn't happening!However, that also doesn't mean the work is very interesting to anyone but core developers, either. :)

As of last week, we've mostly finished up the new v1 implementation of the Buttplug Protocol Spec. This adds a couple of really important things:

<!--truncate-->

- Message Versions: We need to be able to tell whether a client and server are running the same version of the Buttplug Protocol. We now have the ability to do that, as well as deal with situations where the client is older than the server, so that **hopefully** we will never have to drop support for old applications that cannot be upgraded. We'll see how well that works in practice.

- More Generic Messages/Commands: Right now, the types of commands you can send to toys is fairly limited. We have a specific command for the launch, another one of the vorze, or a command that will set all motors in a device to vibrate at the same speed, no matter how many motors it has. We've broken these down and generalized them, so that we can now support devices with multiple vibrators/rotators/thrusters. This should make it easier to writing software that controls toys in a generalized way, which is, you know, kind of the whole point of this project.

This work has been in progress since October, and it's now mostly landed in the master branches of our repos. We're moving on to writing tests and updating documentation, then hopefully we can let the core sit for a while and update/fill out applications.

In the mean time, I'm also working on scripts for new videos (like, buttpluggin' with qdot videos, not scripts for porn. Though maybe I'll make funscripts for buttpluggin' with qdot videos...) and building a set of interaction macros for the twine interactive fiction engine ([http://twinery.org),](http://twinery.org),) with which we'll be building our new Interactive Buttplug Usage Tutorial. If anyone is interested, that work is happening at [https://github.com/metafetish/buttplug-twine.](https://github.com/metafetish/buttplug-twine.)

Ok and maybe I should rethink the title "Interactive Buttplug Usage Tutorial". 

Anyways, hoping to start posting about more features like Win 7 support, Syncydink upgrade, and other stuff soon. Thanks for sticking with me, and hope you are having a good holiday season.