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

:::warning Section not finished

Still need to write

- Rule #3: Choose Your Integration Strategy Up Front
- Rule #4: Always Make Sure You Can Turn Off Buttplug

:::