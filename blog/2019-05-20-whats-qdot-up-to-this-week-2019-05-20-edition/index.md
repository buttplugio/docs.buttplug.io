I'm jobless! Now working on Buttplug/Intiface full time! For a whole week! Then I have another job!

Unfortunately, it turns out I may be a little obsessed with game modding now.

<!--truncate-->

### Game Vibration (Haptics?) Router
A couple of months ago, someone contacted me about modding VR games for Buttplug, similar to how the old GVR project worked for non-VR games. They're specifically interested in Beat Saber. I created a "Butt Saber" repo, and got a good bit of the way there, until I hit some roadblocks with the Buttplug libraries and the old Buttplug Server. That put things on hold until I could finish those up.

Now that those are working ok, I decided to revisit the project. My original project was aimed specifically at Beat Saber, but I realized that the functions I was looking for were actually Unity functions, not specific to Beat Saber. That meant I could possibly generalize the mod to work with ANY Unity VR game.

I've spent the past week reworking things and it looks like the solution I've come up with may be viable. It'll attach to both older and newer unity games, and doesn't require replacing executables or putting files in the game install directories, everything is done cleanly via remote process hooking.

I'm hoping to have a first version out by the end of this week!

Also, as the header for this section says, the title may end up changing. This could easily grow into a full game mod engine versus just vibration rerouting, meaning we could also trigger linear movement in things like the Fleshlight Launch, rotation in the Vorze A10, etc.

### Intiface Desktop
Proxy mode in Intiface Desktop is coming along, it's now mostly down to fixing some breakage in the JS/Node libraries. Hoping that'll be following on the heels of me finishing the GVR.

This will also come along with the actual release of Intiface, which mostly means I'll be redirecting people from download the old Buttplug Server to using Intiface Desktop.

### Buttplug
And of course, now Buttplug is stuck behind both of these. The next major upgrades to Buttplug deal with new messages, which means the old Buttplug Server will become obsolete and unusable. Everyone needs to be moved or moving to Intiface Desktop before then, so I gotta have that done first. The joy of Yak Shaving Factories. :|

  

Anyways, that's it for this week. I'll hopefully have a GVR installer announcement out soon. 

Until then, Keep Buttpluggin'!

qDot