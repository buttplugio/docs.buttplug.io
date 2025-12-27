Staring at polls.

### The Patreon Poll Results
So last week I decided to try one of my "is there anything else y'all" want polls. The results:

<!--truncate-->

- No one wants more updates (fair)
 - 1 patron each would like more youtube or merch
 - 3 patrons would like more application work
 - 17 patrons are like "keepin' on truckin', my guy"

Keep on truckin' I will. I lost ~10% of my patrons over January, but I'm approaching year 4 of Patreon now. I've realized that there are people that are gonna stick with you, then there are people who are gonna check things for a month or two and then peace out, but I haven't quite come to terms with that yet and I need to.

It's a little challenging, being surrounded by content creators pulling huge patron/intake numbers, while I kinda do my own code thing that is not exactly as instantly gratifying as making audio/visual content, but it's the nature of the beast.

The good news is, I'm not really lacking for motivation or anything, so that's nothing to worry about, I'm more just reevaluating if I'm making a go of this in the right way.

I'm actually pretty happy with my output at the moment, and that's what really matters. With that in mind, on to...

### Buttplug
I'm trudging along on buttplug-rs v2.1 now, which is shaping up pretty nicely. There's more tests in the system (kinda shocking how many things didn't throw errors at ALL), as well as more capabilities to test different parts of the system. I'm really hoping this shores up stability some, because I'm still getting a worrying amount of crash reports.

I also went ahead and added a tiny bit of new device support, in the form of the Nobra's Silicone Dreams Twincharger. Made some video/tweets about that here:

[https://twitter.com/buttplugio/status/1356102567692931073](https://twitter.com/buttplugio/status/1356102567692931073)

This is exciting because not only has Nobra been around for longer than I have in sex tech, it's also a serial port toy, which means this is going to be the first public test of the user device config system (as people have to identify which serial port the toy is on). This is a system I built in C# 2 years ago but it never got the UI in front of it for people to use, so I ended up porting it blind into Rust. It'll be usable in buttplug-rs v2.1 via CLI (WASM serial/HID is coming, but that's like, months away), but it'll need UI updates to Intiface Desktop to make it truly useful, so that'll take a bit more.

### Intiface Desktop
After buttplug-rs v2.1 ships later this week, I am really hoping to have time to concentrate on ID v21/v22 finally. v21 will be a fairly small update for stripping out all of the old code and just making sure the rust engine works with external device configs (so if, say, lovense releases a new device, I don't have to recompile and update the whole engine). v22 will have the new Device Panel, which will allow for device testing and setup. That's where things get exciting.

### Youtube and Other Stuff
I have so many toys sitting on my desk right now it's fucking ridiculous. There's new Lovense toys dropping tomorrow (Diamo cock ring and Lush 3), I've got Satisfyer toys in to add to the library (will take some extra bluetooth work), and I'm still trying to figure out what I want to do about this Hismith fucking machine I just got and all.

I also just received a decibel meter, which I'll be using in a new series of loudness testing videos for youtube. A lot of places I hang out have people that just absolutely freak about the idea of their toy being heard, so I figure having some tests up that people can reference should help. It's a bit of a stretch outside of the pure technical stuff I've been aiming toward, but it seems useful.

Speaking of, I have been spending the past month kinda figuring out where I want to go with Buttplug and it's various communities, as well as what stuff I'd just like to have someone to point to and say "check out their stuff". I'm starting to get a good direction on that now, so I'll be talking about that more next week.

Ok, enough introspection for now. Until next week, Keep Buttpluggin'!

- qDot