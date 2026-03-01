---
title: PetRoom Training Collar
brand: petroom
transport: rf
---

# PetRoom Shock Collar

## Introduction

This document describes a way to control the [PetRoom Dog Training Collar](https://www.ebay.co.uk/itm/323301551683) over 433Mhz-Band Radio Control.

Credit to MiscReader for the reversing work and code.

## Communication via RF

The PetRoom listens to OOK on a carrier wave of 433Mhz, listed as 433~825Mhz in the offer.

The RC-transmitted commands are bitwise encoded as

bit | pwm
--- | ---
0 | 1000
1 | 1110

Each message sent is preceded by a 6 pwm-bit long pulse (Likely to allow the receiver to set its gain) and 3 pwm-bit long low.
Each message is repeated 4 times.

The provided code runs on an Arduino with a serial pin connected to an RF-Module.

## Commands

All the functionality of the device has been documented.

Command | Description | Parameter
--- | --- | ---
Shock | Issues a static shock of specified strength| 0-100, high is strong
Vibration | Vibrates the collar | 0-100
Audio | Beeps | 0, no effect on intensity
Light | Lights an LED  | 0

## Protocol

The Commands looks like

Channel | L.A.V.S. | Remote ID | Intensity | Checksum | ?
--- | --- | --- | --- | --- | ---
1000 | 0001 | 11001010 00011010 | 00000000 | 01111110 | 0
0 | | 8 | 24 | 32 | 40

Bits | Purpose
--- | ---
0~3 | Channel, for addressing the individual collars
4 | Light
5 | Audio
6 | Vibration
7 | Shock
8~23 | Remote Serial no.
24~31 | Level, starting with most significant bit
32~39 | Checksum, bits 0~7 in reverse order and flipped
40 | Always zero, unimplemented control bit?

## Arduino sketch

The C++ Arduino Sketch provided my MiscReader - see the documentation for the full implementation details with code examples for building and transmitting training collar commands.
