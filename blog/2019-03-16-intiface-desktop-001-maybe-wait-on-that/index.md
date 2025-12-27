Ok well it turns out the code signing thing is going to be a bigger problem than I thought on Mac and Windows. My initial tests worked because I was running against a locally built server and didn't realize it. As soon as I cleared my config and downloaded the server through the app (as everyone else is doing), almost nothing works due to downloaded app privilege restrictions.

I'm trying to figure out some workarounds for this now, but until then, if you're experiencing issues on Mac and Windows, that's (part of) why, and the errors being thrown aren't caught, so things fail very silently.

<!--truncate-->

If you're running Linux, Intiface may still work depending on which distro you're on.

More updates once I figure this out. :|