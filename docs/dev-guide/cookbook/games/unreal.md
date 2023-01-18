# Buttplug and Unreal

:::warning Buttplug Can't (Directly) Do Unreal Yet

Hello Unreal Devs!

As you've probably figured out by googling before you got to this, there's not really integration between Buttplug and Unreal yet. The holdup right now is the lack of a C/C++ layer for Buttplug, which is need to communicate with Unreal's C++ codebase. Not only that, it may actually be worth implementing a Buttplug client *specifically* with Unreal in mind since there's a full async system that interacts with the Unreal engine event loop.

Until this is figured out, we're unfortunately dead in the water with Unreal. Help would definitely be appreciated on development for this.

:::