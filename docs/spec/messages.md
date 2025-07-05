# Messages

Messages are the core object for Buttplug communication.

How messages are represented depends on the implementation in question. For instance, in a C\#
library implementation of Buttplug, messages are classes. In Rust, they're structs. This is an implementation detail left up to the client library developer.

In a server implementation, messages need to be serialized in some way to be sent between the client
and server. In this case, they may exist in some sort of intermediate format, like JSON, ProtoBuf, or CBOR.

## Basic Message Structure

Messages are made up of multiple different kinds of fields. As long as the fields can somehow be
represented in JSON, we consider them valid.

All messages will contain an "Id" field. This field as the range of 0 to 4294967295. A value to 0
denotes a _System_ message, meaning a message that will only ever be sent from a server to a client.
All messages coming from a client will have an Id from 1 to 4294967295, as set by the client
themselves. When the server replies to the message, it will return a message using the same Id as
was sent. This allows developers to synchronize messages over remote systems like networks, or
languages that lack async/await capabilities.

Other than range, there is no restriction to what values the client can send as an Id. The Id does
not need to be sequential, nor does it need to be unique. The client could just send 1 for every
message, which would be valid in async/await library situations where the execution flow would
handle matching message pairs without the need for the Id. In remote situations, like those over
network connections, it is expected that the client will establish a sane usage of the Id field to
orchestrate messaging.

## Message Flow

There are two types of message flows.

* Messages can be sent from the server to a client. Messages like DeviceList, ServerInfo, and
  certain device specific input messages can happen without the client making a request. The server
  **will not expect a reply** from the client for these messages.
* Messages sent from the client to the server **will always receive a reply** from the server. The
  message type the client will receive in reply is based on the type of message sent. Some messages
  may receive a simple "Ok" message in reply in order to denote successful receiving, while others
  may receive something context specific. Messages reply types are listed in the message
  descriptions section.

## A Note On Scaling

The Buttplug Message System, as described here, was not designed to scale to large multiuser systems
\(like cam services\), nor was it designed for being a firmware level protocol to be run on sex toy
microcontrollers. It was built with either a single user, peer-to-peer, or small group setting in
mind.

As the message flow section states, this system resembles a sort of half-assed-TCP mechanism. Using
this system to drive large scale device control streaming services may require changes to this
system.

Reducing and rearchitecting this system for scaling is an exercise left to the developer. Either to
implement, or to contract the Buttplug designers to build it for them.

## JSON Message Serialization

For reference implementations of the Buttplug protocol, we use JSON for serialization. 

:::tip Why is the JSON format for Buttplug messages so weird?

The format of Buttplug json messages mimics the output from Rust's
[serde-json](https://github.com/serde-rs/json) crate. This is due to the first implementation of
Buttplug with working serialization being in Rust in 2016.

The second, usable implementation of Buttplug happened in C# in 2017. The message structure was inherited from Rust, but the PascalCase named of messages and their fields was taken from C#.

That is how we've ended up with the mess we're in now. There is most likely no language that will handle both the structure and capitalization scheme naturally, and the spec has been around for long enough that it is difficult to change. This is now just an accepted point of shared pain for anyone that wants to use this protocol.

:::

When sending messages over the line to a server/client, we wrap them in a JSON array, so that
multiple messages can be sent and parsed simultaneously.

The format is as follows:

```json
[
  {
    "MessageType" :
    {
      "MessageField1": "MessageValue1",
      "MessageField2": "MessageValue2"
    }
  },
  {
    "MessageType2" :
    {
      "Message2Field1": "Message2Value1",
      "Message2Field2": "Message2Value2"
    }
  }
]
```

Message descriptions in this document will reflect this layout.

Similarly, some message values will have certain bounds and limitations. These are described in this
documentation, and are included in the JSON schema in this repo.

## Adding and Updating Messages

The message list as described here is only set in stone for this version of the spec. New messages
may be added as new devices with different capabilities are released, or as new generic messages
are deemed necessary. The only rule is that once a message is added to this document, it may be
deprecated but should never be removed completely from the document (though it may not be available
in newer protocol versions), in order for backward compatibility to be implemented in servers. Newer
versions of the message may succeed it. This will allow parsing and schema checking to be as strict
as possible. If edits to a message need to be made, message names can be reused, as it is assumed the [Message Version](#message-versioning) acts as a namespace for messages.

Any changes to the spec will also cause a spec version update (covered in the next section), which
will need to be reflected across systems and implementations. So far, these updates have been rare.

Requests for new messages can be submitted to [the Buttplug Github Issue
Tracker](https://github.com/buttplugio/buttplug/issues).

:::tip Version 0 Issues

Version 0 of the Message Spec was implemented without much thought for the future development of Buttplug. While very few client applications still exist for use with Version 0, backward compatibility implementation is possible.

Spec Version 0 was listed as Spec Version 0.1.0 initially.

Version 0 of the [RequestServerInfo](identification.md#requestserverinfo) message does not have a
parameter for protocol version. It is assumed that any
[RequestServerInfo](identification.md#requestserverinfo) message received without a version number
is from a Version 0 client, and should be communicated with at that spec level.

:::

## Message Versioning

To cope with protocol version differences between servers and clients, each protocol message type
has a version number. The message version number is based on the protocol version the message was
introduced in, and is represented as an unsigned integer.

To establish protocol versions between clients and servers, the client sends the protocol message
version as part of the [RequestServerInfo](identification.md#requestserverinfo) message (as the
ApiMajorVersion/ApiMinorVersion fields), and the server includes its protocol version in the
[ServerInfo](identification.md#serverinfo) response (as the same fields field).

### Major Version Differences

If a server supports a newer major protocol version than a client, any messages that the server
attempts to send will be checked against the client protocol version, and either downgraded to a
previous version where possible, or simply dropped. Server support for downgrading a message is
optional, and it is not expected that all servers will support downgrading through all versions of
the protocol. If a server implementation does not have downgrade capabilities, it should disconnect
clients with lower schema versions.

If a client supports a newer major protocol version than a server, this is considered an invalid
connection situation, and a disconnect should insue. This rule is based on the assumption that the
user can most likely update the server version to something newer. The client may not be easily
upgraded for many reasons, such as being a proprietary application or source code not being easily
accessible, being to complex to work on and upgrade, etc...

### Minor Version Differences

As of Spec v4, the Buttplug Protocol now supports Minor Versions. These denote differences in `OutputType`/`InputType`, as well as possibly new Client -> Server message capabilities.

If a server supports a newer minor protocol version than a client, the client should ignore any `OutputType`/`InputType` features it does not understand. There will be no breaking changes, just additions.

If a client supports a newer minor protocol version than a server, no considerations should be needed. Newer minor versions are a superset of older minor version capabilities, so everything is considered to _just work_.