[https://pypi.org/project/buttplug/](https://pypi.org/project/buttplug/)

I just posted the most minimal implementation possible of a buttplug client to PyPi, meaning the buttplug-py package now actually at least does something.

<!--truncate-->

The package is HEAVILY py3.7 based internally, so you're either using py3.7 or you're out of luck right now. It's asyncio based, and also uses some non-standard python idioms like events ('cause I just wanted to make it look like the C#/Typescript impls, and both of those languages have first class events), but those are mostly just a matter of callback passing.

There's almost no documentation currently, as I haven't dealt with sphinx in years and forgot how much I hate it (fuck restructedText so much), and just wanted to get code up. I'll be spending the next few days wrestling with sphinx to try to get a better manual together, at which point I'll probably post more about this publicly. But since ya'll are paying me, you get the raw goods first. :)

If you're absolutely jonesing to try this, there's an example that basically shows how it works:

[https://github.com/buttplugio/buttplug-py/blob/master/examples/test.py](https://github.com/buttplugio/buttplug-py/blob/master/examples/test.py)

As usual, you can message me if you have any questions, too.