# Buttplug and Games

This section will give an overview of integrating Buttplug with various game engines, or via mods to games. Every game is unique, so the amount of advice that can be provided is limited, but we'll start with some general rules for game dev with Buttplug, and cover what can be done with the major engines and modding frameworks.

## Rule #1: READ THE REST OF THE DEVELOPER GUIDE

**Seriously.** Just because you're developing or modding a game does not mean you are immune to using Buttplug as a library. It just means you may be integrating Buttplug under a different framework than a desktop gui, mobile app, web page, etc... Even with that difference, all of the same rules of using Buttplug will still apply, and you'll need to know how clients, devices, and other pieces of the system work.

## Rule #2: Make Sure Integration Will Be Worth Your Time

Take some time to make sure you know why you're integrating Buttplug, and that it's going to be worth it. Here's an incomplete list of things to consider:

- Do players of your game expect sex toys to work with it?
  - For porn games, this is pretty obvious
  - For other games, think about the community. Will they actually want to use what you build? If
    they don't, will they appreciate the shitpost at least?
- Do players of your game *have* sex toys that work with it?
  - It can be worth it to do a quick poll to see if you have users that already have hardware, so
    you can use them as testers.
  - Even if they don't, if you think your idea is good enough, integrating toy access could work in
    your favor by drawing players in. Think of it as a marketing tactic.
- What mechanics are in the game that will work with toys?
  - Interacting with toys usually needs some sort of contextual event to take place, and those
    events need to happen enough to keep things interesting. Remember, your player is going to have to get out the toy, turn it on, connect it, make sure it stays connected, etc... So if your game would only trigger it once in a long while, are they going to do that?
  - You know your players better than anyone, so even if your game mechanics are such that toy
    interaction would be sparse, would they still be interested?
- Is gamepad rumble already integrated in the game?
  - If so, this may make your life way easier. You can just send a subset of the rumble commands to
    Buttplug and release that as a first pass.
- Do you want to put in the work to move beyond vibration?
  - Buttplug supports more motion/actuation types than just vibration. For instance, stroking
    devices may be far more interesting to some players than vibration. However, integrating type of hardware actuation that *only* Buttplug supports can be extra work. When considering real time interaction, sometimes this may be a *lot* of extra work. That work can reap serious rewards both for current players that have the hardware and marketing to new players, but consideration of the effort should be done up front.

Make sure you have good answers to all of these questions before progressing to the next rule, otherwise you may just be needlessly costing yourself resources.

## Rule #3: Always Make Sure You Can Turn Off Buttplug

Before you even get to figuring out how you're going to integrate Buttplug: Unless your game requires hardware to function, make sure usage of Buttplug is opt-in.

Hardware support is complex, and Buttplug will be hiding a lot of that complexity from both you and your users. While we strive to make sure that the library doesn't crash arbitrarily, we aren't perfect, and bugs will happen. You want to make sure your game is playable without hardware, and that if there is a hardware error/failure, the game degrades gracefully.

## Rule #4: Choose Your Integration Strategy Up Front

How you integrate Buttplug with your game is something that should be decided early on. While there's a recommended way to do things that we'll go over first, there are also alternatives that may work better for you but will require extra upkeep on your end.

### Rule #4.1: Recommended - Just Connect Out To Intiface Central

The easiest thing to do about managing Buttplug hardware management is leaving it to us (the Buttplug at Nonpolynomial). This means having your users download and install [Intiface Central](https://intiface.com/central), which handles devices configuration and connections, as well as updates to the hardware portions of our systems. 

In your game, you'll use a plugin like [Buttplug
Unity](https://github.com/buttplugio/buttplug-unity) or [Buttplug
Twine](https://github.com/buttplugio/buttplug-twine) to connect to Intiface Central. We do our best to maintain full backward compatibility with older versions of our libraries, so hopefully if your game works with Intiface Central whenever you develop it, it will continue to work in the future.

It's important to know that there are certain pieces of hardware that require specialized configurations that Intiface Central handles via user configuration. Games that do not connect to Intiface Central may miss these configurations and will have to deal with user questions regarding those issues.

While we realize there's issues in requiring users to download *more* software when you'd like your game to Just Work, this method is similar to how other commercial systems like bHaptics, various system LED/Lighting systems, etc work. Gamers are used to having support programs these days, and Intiface Central is just another one on the pile.

Directly using Intiface Central also means that if users have hardware access issues, support can come from the Intiface community, as everyone is using Intiface Central.

### Rule #4.2: Shipping Intiface Engine With Your Game And Also Connecting to Intiface Central

If you absolutely, positively cannot live with your user possibly having to download and run an outside program with your game, there is an option for you that is not recommended and we do not support.

You can ship a copy of [Intiface Engine](../../architecture/intiface.md) with your game, and, after checking to make sure Intiface Central is not running already, start the process when your game starts.

This will give you a visibly seamless start to your game's hardware support, but at a very high
cost.

Shipping Intiface Engine is what the Buttplug Unity plugin used to do, and it was a very bad idea for multiple reasons:

- Any time Intiface Engine updates, you need to update along with it, otherwise you miss out on
  support for new hardware, or bugfixes.
- You need to detect if the user is already running Intiface Central.
- Starting extra processes that access hardware and other OS resources can possibly be flagged as  a
  security issues on some user's machines.
- You miss any configuration that the user may have set up in Intiface Central, which may include
  configuration required for certain devices.
- You have to bring up all device communication managers, as you don't know what devices your user
  may have. This may cause extra resources to be used on the system that will be wasted.

We highly recommend just relying on Intiface Central and not shipping Engine with your game. We do not have any officially supported plugins that handle this strategy now, so you're on your own if you go this route.

## On To Game Dev

With all of that out of the way, let's talk about developing games in specific engines and mod frameworks.