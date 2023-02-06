# Buttplug and Unity

This will be a relatively short chapter for now, because:

Using [Buttplug Unity](https://github.com/buttplugio/buttplug-unity) is now just using [Buttplug C#](https://github.com/buttplugio/buttplug-csharp)!

As of Buttplug Unity v3, there's nothing particularly special about using Buttplug with Unity anymore. We're just repackaging the DLLs from Buttplug C# in a way that's easy to use with Unity. Our package also follows [Rule 4.1](../intro.md) of our Buttplug Game Dev Rules, meaning that it only connects out to Intiface Central.

This means that, for you as a Unity developer trying to integrate with a Buttplug game, you can just go through our [Writing Buttplug Applications](../../writing-buttplug-applications/) section and learn most of what you'll need to know about basic usage of the Buttplug library.

There's an example Unity project in Buttplug Unity for those wondering what simple interaction with the library looks like from a Unity standpoint.

:::caution More Unity Content Coming, Someday

We've found out the hard way that a lot of Unity devs aren't necessarily .Net flavored C# devs. Buttplug C# relies heavily on things like the C# Async system and other components that may be new to Unity developers. At some point in the future, we are hoping to feature more information about using Buttplug with Unity in this guide, to better describe how to integrate buttplug with games.

We just have to learn Unity first.

:::