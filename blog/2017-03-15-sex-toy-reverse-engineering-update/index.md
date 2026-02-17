---
title: "Sex Toy Reverse Engineering Update"
date: 2023-03-15
authors: [qdot]
---
A public patreon update, just to give everyone an idea of the kind of work that patreon dollars fun! (Well and also because this is a [metafetish.com ](http://metafetish.com) post anyways)Most of the reverse engineering happening now is in preparation for getting v0.1 of [Buttplug](http://buttplug.io/) out the door. What that release will actually look like is anyone's guess, but the more toys we have documented and reversed, the better. I'll usually be covering reverse engineering and software development work over on [the Buttplug.io blog](http://buttplug.io/blog) and leaving this blog for featuring news, business, and other people's projects (with buttplug update posts every so often), but I'm taking this opportunity to update both places since I haven't written anything about my own work in a while.

First off, all of our documentation and code repos are still at

<!--truncate-->

[http://github.com/metafetish](http://github.com/metafetish)

I'm also trying to keep hardware information up-to-date and available on the [buttplug.io website](https://buttplug.io/). Keep an eye on the hardware menu, and I'll probably add a "Recently Updated" section to the front of the site soon.

Anyways, onto the libraries!

The Kiiroo and Lovense libraries have been getting the most love lately, but I'm slowly working my way through documenting as much as possible now before writing any more code.

# Miiyoo
Repos for the [Kiiroo](http://www.kiiroo.com/) line of toys, including the [Onyx](http://www.kiiroo.com/onyx), [Pearl](http://www.kiiroo.com/pearl), and upcoming [Launch](http://fleshlight.com/launch) toys.

 - Documentation of Kiiroo's devices, bluetooth protocol, and REST API   for their "desktop platform" software is   at   [http://metafetish.github.io/miiyoo-docs](http://metafetish.github.io/miiyoo-docs),   repo   at   [http://github.com/metafetish/miiyoo-docs](http://github.com/metafetish/miiyoo-docs).
 - I'm also working on python libraries for direct control of Kiiro   toys, as well as platform (http server) emulation   at   [http://github.com/metafetish/miiyoo-py](http://github.com/metafetish/miiyoo-py).   Javascript and Rust implementations will come after that.

  

# Lovesense
Repos for the [Lovense](http://www.lovense.com/) line of toys, including the Max, Nora, Hush, and Lush. 

 - Documentation of Lovense's devices and bluetooth protocols are   at   [http://metafetish.github.com/lovesense-docs](http://metafetish.github.com/lovesense-docs)
 - There's protocol libraries for python at [http://github.com/metafetish/lovesense-py](http://github.com/metafetish/lovesense-py) (or [lovesense on pypi/pip](https://pypi.python.org/pypi/lovesense), node/javascript at   [http://github.com/metafetish/lovesense-js](http://github.com/metafetish/lovesense-js) (or  [lovesense on npm](https://www.npmjs.org/package/lovesense)). Rust   libraries coming soon at [http://github.com/metafetish/lovesense-rs](http://github.com/metafetish/lovesense-rs)

  

# KHole
Repos for the [Minna KGoal](https://www.minnalife.com/products/kgoal) bluetooth kegel exerciser

 - Python proof of concept at [http://github.com/metafetish/kgoal-py](http://github.com/metafetish/kgoal-py)
 - Documentation and more code coming soon!

  

# Wejibe
Repos for the [Wevibe](https://www.wevibe.com/) line of products.

 - Very basic documentation   at   [http://github.com/metafetish/wejibe-py](http://github.com/metafetish/wejibe-py)

  

# Buttshock (Estim Reverse Engineering)
Repos for reverse engineering the [Erostek ET-312/ET-232](http://erostek.com/), [Estim Systems 2B](https://www.e-stimsystems.com/index.php?main_page=product_info&cPath=1&products_id=71), etc...

 - There's so many repos for this now that I'm just going to point to   the   [buttplug.io hardware page for the ET-312](https://buttplug.io/hardware/erostek-et312/). 

  

# The Past
The above toys are things that are still in production. We've still got repos for the Real Touch, Rez Trancevibe, VStroker, and Virtual Hole.

# The Future
I'm hoping to flesh out the above projects more. Getting documentation for everything, even the out-of-production toys, is the highest priority. After that, coding the usual set of python/javascript/rust libraries for toys still in production. 

Python is usually just because I work fastest in that, so it's good for proof of concept. Now that WebBluetooth is defaulted on in Google Chrome on OS X, I'm trying to make javascript libraries that work either via node/[noble](https://github.com/sandeepmistry/noble) or WebBluetooth, where I can. Rust libraries are how we'll provide access from C, as well as integrate things into the actual Buttplug software.

There's new toys to be working on, too! This includes:

 - [Kiiroo/Fleshlight Launch](http://fleshlight.com/launch)
 - [Rends Vorze A10 Cyclone](http://vorzeinteractive.com/)
 - [OhMiBod Bluetooth Toys](http://ohmibod.com/)
 - [SayberX](http://sayberx.com/)

I'm hoping the patreon will fund some of these, because this hobby is getting expensive lately.

The biggest problem right now is when I get to coding, I forget to write updates about what I'm doing, so the only people aware of updates are those that follow me on github. As I'm not sure anyone *actively* reads their github status timeline, I'm hoping having a dedicated blog for those topics on buttplug.io will help. It could also just end up being yet another blog I don't update. Time will tell, I suppose.
