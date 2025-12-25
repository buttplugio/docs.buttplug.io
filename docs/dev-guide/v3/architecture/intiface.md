---
title: Intiface Ecosystem
---

:::warning Deprecated Documentation

This documentation is for version 3 of the Buttplug Developer Guide. Please refer to the [latest version](/docs/dev-guide/v4/) for the most up-to-date information.

:::

# The Intiface Ecosystem

Intiface® is the official name for the application system built on top of Buttplug by Nonpolynomial
Labs, LLC (the company behind Buttplug, though it's just one person). Where Buttplug is for developers, Intiface is made to either help users actually use what those developers made, or else make our own apps.

When Buttplug is referred to in this document, it's in relation to the library. When Intiface is referred to, it's usually in relation to applications implementing Buttplug, and always by Nonpolynomial Labs.

For the rest of this document, you'll need to be familiar with Intiface Engine and Intiface Central, which we'll cover below.

:::tip Wait, Intiface®? As in Registered Trademark?

Yes, Intiface® is actually a registered trademark of Nonpolynomial Labs, LLC. This workmark was
registered to protect the app on app stores, since we're an open source app. It's not meant to be
predatory.

Also, I just wanted to learn what getting a trademark was like. I got a really shiny piece of paper.

It was very expensive.

:::

## Intiface Engine

Intiface Engine is a barebones CLI wrapper around the Buttplug Server and the various options to build it. All capabilities of the engine, including adding/removing device configurations, user configurations (like special device names, DIY devices, etc), hardware communication managers (bluetooth, USB, etc...) can be configured via arguments to Intiface Engine.

Intiface Engine is implemented in Rust and distributed as both an executable, and a library (for reasons covered in the [embedding section](../cookbook/connections/embedding.mdx) later.)

## Intiface Central

Because most users don't want to interact with a terminal or console, Intiface Central provides a GUI for setup and engine control. 

![Intiface Central GUI Example](/img/dev-guide/architecture/intifacecentral.png)

This is the hub program that it is expected most users will have an use. It's updated frequently by us with the latest version of Buttplug, as well as extra features like device testing for users, and device simulation for developers.

[Intiface Central](https://intiface.com/central) is implemented in a combination of Flutter and Rust, and is available on desktop and mobile platforms.

## Other Intiface Applications

* [Intiface Game Haptics Router](https://intiface.com/ghr) - A program that reroutes gamepad rumble
  signals from games to Sex Toys.
* Intiface Desktop (Deprecated) - The original version of what became Intiface Central, retired in
  late 2022. It was an electron based app that managed updates and execution of the Intiface Engine.
