# Petrainer Shock Collar

## Introduction

This document describes a way to control the
[Petrainer PET998DRB Dog Training Collar](https://www.amazon.com/gp/product/B00W6UVROK/)
over 433Mhz-Band Radio Control.

Credit to [XMPPWocky](https://twitter.com/xmppwocky) for the proof of concept control code.

The information in this document was taken from this code initially and
extended with information found while coding
[GoToShock](https://praios.lf-net.org/littlefox/gotoshock).

## RF protocol

The Petrainer shockers listens to ASK on a 433Mhz carrier wave. While the
original version of this document said OOK, it understands data sent with ASK
transmitters like the FS1000A, so it more likely understands OOK "by accident".

Bits are encoded using PWM with two different duty cycles, 25% for a 0 and 75%
for a 1. The total length of each bit is 1ms.

protocol bit | pwm duty cycle | on-time | off-time
------------ | -------------- | ------- | --------
0            | 25%            | 250µs   | 750µs
1            | 75%            | 750µs   | 250µs

Each message send is preceded by a longer pulse of 1.25 to 1.5ms, most likely
to allow the receiver to set its gain.

## Digital protocol

Messages are always 42 bit long and always consist of the same fields. There is
no field to signal the duration of a given command, instead, the messages are
just repeated for as long as the command should be done (e.g. the remote just
sends the same message over and over again until the button is released).

bits | field         | description
---- | ------------- | -----------
2    | header        | constant `01`
4    | channel       | see below
3    | command       | see below
17   | *unknown*     | not yet reverse-enbyneered - most likely contains a more-or-less unique ID for the remote that sent the message
7    | intensity     | how much to shock, capped by the shockers at 100
3    | command check | check value for the command
4    | channel check | check value for the channel
2    | footer        | constant `00`

### Check values

Some fields have a kinda "checksum" at a later place in the message. The
purpose of this is most likely to have something not done by other protocols on
this RF band, making sure your shockers are not triggered by someone turning on
their remote controlled outlet.

To build those check values, you take the original bit sequence, flip all the
bits and reverse their order. Examples:

* original bits: 001, all flipped: 110, order reversed: 011
* original bits: 010, all flipped: 101, order reversed: 101
* original bits: 0000, all flipped: 1111, order reversed: 1111
* original bits: 1110, all flipped: 0001, order reversed: 1000

### Channels

The original remote can send on two different channels, called channels 1 and 2
by it. The bit encoding for them is `0000` for channel 1 and `1110` for channel
two, meaning the protocol might understand more such channels, but this was not
tested yet.

### Commands

Three commands are supported by the original remote and shockers. With the
given number of bits, the protocol could, in theory, support more.

While the intensity field is sent in every message, not all commands make use
of it - you can set it to whatever value for those.

command   | bits | intensity? | description
--------- | ---- | ---------- | ---
Zap/Shock | 001  | yes        | Issues a static shock of specified intensity.
Vibrate   | 010  | yes        | Make the shock collar vibrate, great for "announcing" an incoming shock - and then just not sending one after all :>
Beep      | 100  | no         | Beep.


### Full example with annotations

Here is a full message ("channel 2: shock with intensity 38%") with annotations:

```
01  1110  001  00101110001010110  0100110  011  1000  00
|-  |---  |--  |----------------  |------  |--  |---  |-
|   |     |    |                  |        |    |     \- footer, always 00
|   |     |    |                  |        |    |
|   |     |    |                  |        |    \------- checksum for the channel
|   |     |    |                  |        |
|   |     |    |                  |        \------------ checksum for the command
|   |     |    |                  |
|   |     |    |                  \--------------------- unsigned int for intensity,
|   |     |    |                                         38 here
|   |     |    |
|   |     |    \---------------------------------------- unknown usage :(
|   |     |
|   |     \--------------------------------------------- command, "zap"/"shock" here
|   |                                                    (we should decide on a name)
|   |
|   \--------------------------------------------------- channel, here "channel 2"
|
\------------------------------------------------------- header, always "01"
```

## Implementation in Go

Supporting output via Raspberry Pi GPIOs and probably other drivers in the
future. Meant to built a kinda PiShock experience but in OpenSource, can also
be used as a library in other projects:

* developers Gitlab: https://praios.lf-net.org/littlefox/gotoshock
* Github mirror: https://github.com/LittleFox94/gotoshock
* Go docs: https://pkg.go.dev/praios.lf-net.org/littlefox/gotoshock
  - [pkg/types](https://pkg.go.dev/praios.lf-net.org/littlefox/gotoshock/pkg/types) has all the spicy protocol things

## Python script

This code talks to an RFCat dongle. Other devices like a YardStickOne likely work with minimal modification.  
DIY solutions like [this](https://rurandom.org/justintime/w/Cheapest_ever_433_Mhz_transceiver_for_PCs) might also work.

The ported python3 script, which should work, provided rflib works with python3.

```python
"""
Module for connecting to a Petrainer Shock Collar and sending commands

This module implements a framework to send On-Off-Key-encoded messages
over radio using an rfcat dongle, and a class that controls the collar's shock function.

Credit to XMPPWocky (https://twitter.com/xmppwocky) for the proof of concept control code.
It was modified by definite_purple to work with python3.
Although she was not able to test it, because she doesn't have the hardware.

rflib can be obtained here: https://bitbucket.org/eviljonny/rflib
bitstring over pypi or here: https://github.com/scott-griffiths/bitstring
"""


import bitstring
import rflib
# import binascii

MHZ = 1000*1000

_COLLAR_BAUD_PWM = 4200  # The baud of the rc
_COLLAR_BAUD = _COLLAR_BAUD_PWM/4  # message bits get encoded to 4 radio bits
_COLLAR_FREQ = 434*MHZ


def _pwm_to_raw(pwm):
    """decodes messages received from the control unit"""
    raw = bitstring.BitStream()
    while True:
        try:
            nybble = pwm.read(4)
            if nybble.bin == "1110":
                raw += bitstring.Bits("0b1")
            elif nybble.bin == "1000":
                raw += bitstring.Bits("0b0")
            elif nybble.bin == "0000":
                pass  # radio silence. No info
            else:
                print(nybble)
                print(nybble.bin)
                raise ValueError("bad nybble")

        except bitstring.ReadError:
            break

    return raw


def _raw_to_pwm(raw):
    """encodes messages in preparation to sending them to the collar"""
    pwm = bitstring.BitStream()
    for bit in raw.bin:
        if bit == "0":
            pwm += bitstring.Bits("0b1000")
        else:
            pwm += bitstring.Bits("0b1110")

    return pwm


def configure_rfcat(d):
    """configures the rfcat dongle to the collar's language"""
    d.setFreq(_COLLAR_FREQ)
    d.setMdmModulation(rflib.MOD_ASK_OOK)
    d.setMdmDRate(_COLLAR_BAUD_PWM)


def tx_raw(d, raw, repeat=8):
    """encodes message, precedes pulse, pads with silcence, sends 8x

    adds 00000000000000011111 in front of the encoded part
    (silence, then a pulse)
    and  000000000000000000000000 behind it.
    (silence)

    I don't know exactly why the signal goes high for five pwm-bits
    before each transmission.
    It is likely there to allow the receiver to set its gain."""
    pwm = _raw_to_pwm(raw)
    tosend = bitstring.BitString(bytes=b"\x00\x01\xf0", length=(20)) \
        + pwm + bitstring.Bits(bytes=b"\x00\x00\x00")
    # print(tosend.hex)
    d.RFxmit(tosend.tobytes(), repeat=repeat)


def zap(d, intensity):
    """modifies a template with the shock intesity, and proceeds to transmit"""
    assert intensity <= 100
    assert intensity >= 0

    template = bitstring.BitString(
        bin="010000001101110100101011100101000011111100")
    template[25:32] = bitstring.Bits(uint=intensity, length=7)
    tx_raw(d, template)


class ShockCollar:
    """class for the shock collar"""
    def __init__(self):
        d = rflib.RfCat()
        configure_rfcat(d)
        self.d = d

    def shock(self, intensity=1.0):
        """accepts a number 0 <= intensity <= 1 and sends the shock command"""
        intensity_int = int(intensity*100.0)

        zap(self.d, intensity_int)

```

### The original python2 script
```python
import rflib
import binascii
import bitstring

MHZ=1000*1000

_COLLAR_BAUD_PWM=4200
_COLLAR_BAUD=_COLLAR_BAUD_PWM/4
_COLLAR_FREQ=434*MHZ

def _pwm_to_raw(pwm):
    raw = bitstring.BitStream()
    while True:
        try:
            nybble = pwm.read(4)
            if nybble.bin == "1110":
                raw += bitstring.Bits("0b1")
            elif nybble.bin == "1000":
                raw += bitstring.Bits("0b0")
            elif nybble.bin == "0000":
                pass #ew
            else:
                print nybble
                print nybble.bin
                raise ValueError("bad nybble")

        except bitstring.ReadError:
            break

    return raw

def _raw_to_pwm(raw):
    pwm = bitstring.BitStream()
    for bit in raw.bin:
        if bit == "0": pwm += bitstring.Bits("0b1000")
        else: pwm += bitstring.Bits("0b1110")

    return pwm


def configure_rfcat(d):
    d.setFreq(_COLLAR_FREQ)
    d.setMdmModulation(rflib.MOD_ASK_OOK)
    d.setMdmDRate(_COLLAR_BAUD_PWM)

def tx_raw(d, raw, repeat=8):
    pwm = _raw_to_pwm(raw)
    tosend = bitstring.BitString(bytes="\x00\x01\xf0", length=(20)) + pwm + bitstring.Bits(bytes="\x00\x00\x00")
    # print tosend.hex
    d.RFxmit(tosend.tobytes(), repeat=repeat)

def zap(d, intensity):
    assert intensity <= 100
    assert intensity >= 0

    template=bitstring.BitString(bin="010000001101110100101011100101000011111100")
    template[25:32] = bitstring.Bits(uint=intensity, length=7)
    tx_raw(d, template)


class ShockCollar:
    def __init__(self):
        d = rflib.RfCat()
        configure_rfcat(d)
        self.d = d
    def shock(self, intensity=1.0):
        intensity_int = int(intensity*100.0)

        zap(self.d, intensity_int)
```
