All the things, slowly...

### Buttplug
Buttplug v7 continues to be fairly stable, but there's still one sticking point:

<!--truncate-->

The device control API sucks.

The device control API is something I threw together years ago without thinking much about developer ergonomics, and due to the recent upswing in developer interest in the library, I'm now getting a lot of complaints. The good news this, I think there's some fairly easy ergonomics fixes for this.

The plan is to get these fixes into Rust/C#/Typescript soon, then continue to iterate as I get feedback. Luckily the dev community seems much more engaged lately, so I've been getting really helpful comments and PRs.

### Intiface Central
Intiface Central v2.3.0 was released last night. For Desktop, this doesn't mean much, it's just an update of flutter and some of the dependencies. Apparently is now compatible out of the box with the steam deck though, so that's something.

For mobile, specifically Android, this will be the first version with opt-in App Foregrounding. This means Intiface should be usable when the phone is off or the app is in the background, making it the reliable, carry-with-you system I'd hoped it'd be. Unfortunately the new app permissions for this require me to upload videos of proof of usage to Google, so it may be a few more days before I can get this into the Play Store.

iOS is coming soon after, just requires some updates to the bluetooth code first.

### Intiface Game Haptics Router
The GHR is finally getting an update! Not only am I yanking out the embedded server so that it will now only connect to Intiface Central (reducing my support load), I'm adding the ability to take haptics from *all* connected controllers. This will allow games like Rez Infinite to control vibrators using both the main controller as well as the extras.

An update to the GHR after this will also allow routing, so you can say things like "only vibrate when controller 2 vibrates".

### Everything Else
That's... actually pretty much it for now. There's been some things added to the Awesome list, so check that out: [https://awesome.buttplug.io](https://awesome.buttplug.io)

Until next time, Keep Buttpluggin'!

- qDot