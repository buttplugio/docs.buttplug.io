---
title: Well That Didn't Take Long!
---

The problem with most sex toys is that no one is really trying to hide protocols these days, so once I get the hardware, this takes maybe half an hour.Vorze was no different.

I've created the documentation repo at

<!--truncate-->

[http://github.com/metafetish/libcockblender-docs](http://github.com/metafetish/libcockblender-docs)

And the formatted documentation is at

[http://metafetish.github.io/libcockblender-docs](http://metafetish.github.io/libcockblender-docs)

--

Basically, you just send 3 bytes to the toy, of the format [0x01, 0x01,  0xZZ]. The byte represented by 0xZZ denotes both direction and speed.  Speed is determined by the most significant bit (so 0x00-0x7f is  clockwise, 0x80-0xff is counterclockwise), speed makes up the rest of  the bits. It seems like there's 100 (0x64) speeds available, though  speeds < 5 don't seem to do anything. Sending speeds > 100 (like,  say, 0x65) don't seem to do anything, so if you're already running at a  certain speed, it'll just keep going. There may be error messages  incoming, but I haven't checked that yet.  

On windows, the dongle  acts as a serial port.  This is just a serial port emulation over USB on top of Bluetooth 4 (all  the protocols! \o/ ), so baud rate/data bits/etc don't matter. I think  you can just open the port and start spewing bytes at it.  

Still  not sure what those first 2 bytes in each packet denote, and the movie  player ain't real helpful for that. Will keep on that after I get this  initial documentation written up.
