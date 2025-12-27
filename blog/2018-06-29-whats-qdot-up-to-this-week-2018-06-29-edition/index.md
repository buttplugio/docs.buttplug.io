Javascript, javascript, and more javascript. Well, ok, it's actually all Typescript. But you get the idea.buttplug-js has been lagging behind our C# libraries for a while, so I spent the first chunk of this week bringing it up to date, and buttplug-js v0.8.0 is out now. We now have Lovense device queries working everywhere, which is a massive help for the new versions of firmware constantly being released. Also fixed quite a few bugs.

Once that was finished, it was time to go update the rest of the apps that depend on it. I've updated our Twine and Tutorial apps, so they run on the new version. Buttplug Playground also got an update, and now supports per-feature control, meaning if you have a piece of hardware with multiple features (like the Lovense Edge, Max, Nora, or Mysteryvibe Crescendo), you can now control motors/rotators/etc individually).

<!--truncate-->

Finally, the thing most people are actually interested in...

**Syncydink**

As I'm sure everyone is painfully aware, I haven't updated Syncydink in for-fucking-ever. There's a few reasons for that.

- I had to change a bunch of the underlying libraries, including the UI library it was built on.

- It's a complex program, and building both 2D and VR into it made it really difficult to work with.

- I've just been generally busy anyways.

I started overhauling the UI back in May, and that's mostly done now. Syncydink mostly works now, outside of the device simulator, which I'm hoping to get rid of and just use the Buttplug DevTools for, and VR, which... I'm trying to figure out what to do with. I'd really like to keep 2D and VR in the same application, but the VR libraries make up over half of the code size.

My hope is to get these issues knocked out and a new version of Syncydink up soon. It's been rather annoying because this upgrade basically gets us back to where we were except with newer libraries, while what I'd really like to be doing is adding new features. Hopefully the maintenance work will be done soon though.

Thanks again for your support!