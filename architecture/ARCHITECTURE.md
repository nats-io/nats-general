# Understanding NATS Architecture

NATS at is core is a publish/subscribe message oriented middlware an emphasis on simplicity, performance, security, and scalability.  It was built from the ground up to operate in the cloud.

NATS messaging is comprised of core NATS, and NATS streaming.  Core NATS supports at most once delivery, is designed to be lightweight, performant, and always available.  NATS Streaming supports log based persistence that allows for guaranteed delivery, replay of messages, and subscription continuity (durable subscribers).

# Core NATS

Core NATS is a broker based client-server [messaging](http://nats.io/documentation/concepts/nats-messaging/) software supporting the [publish/subscribe](http://nats.io/documentation/concepts/nats-pub-sub/), [request/reply](http://nats.io/documentation/concepts/nats-req-rep/), and [work queue](http://nats.io/documentation/concepts/nats-queueing/) messaging patterns.

## NATS Server

NATS clients using the NATS API to connect to the the NATS server ([gnatsd](https://github.com/nats-io/gnatsd)) through TCP connections established by NATS.  The NATS server then routes and delivers messages to clients based on the subject name provided.  While logically, applications communicate over a [message bus](http://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageBus.html), the network configuration is the standard client-server. 

![TCP NATS Client/Server](images/simple1.jpg "Simple TCP NATS Client/Server")

### Clustering

To provide high availability and scalability, NATS servers support full mesh clustering where each server is connected to all other servers in the cluster.  There is a one-hop maximum, ensuring that messages can never loop througout a cluster.  The servers connect to each other over TCP, and have a discovery protocol to share topology information and changes in real-time with both other members of the cluster and clients.

![NATS Server Cluster](images/cluster.jpg "NATS Server Cluster")

From a client perspective, a NATS cluster can be considered one entity.

### Subscriptions and Routing

When a NATS client creates a subscription, it registers interest for a subject in the server using the subscribe verb of the NATS protocol.  Subjects are discussed in the [protocol conventions](http://nats.io/documentation/internals/nats-protocol/).  The server then maps interest of this subject to the particular client to route incoming messages appropriately.

![NATS Server Routing](images/route1.jpg "NATS Server Routing Diagram")

When servers are clustered, they register interest to other servers on behalf of their clients, so messages are delivered to clients regardless of which server in the cluster they are connected to.  Notably, this ensures messages get delivered only to servers that need to route client, and are not unnecessarily sent across the network.

![NATS Server Routing Pruning](images/route2.jpg "NATS Server Routing Diagram - Subject Pruning")

However, NATS will route messages across as it need to.

![NATS Server Routing Interest](images/route3.jpg "NATS Server Routing Diagram - Subject Interest")

## Core NATS client design and architecture

Because the [NATS protocol](http://nats.io/documentation/internals/nats-protocol/) is text based and simple, with only a handful of verbs, NATS Clients are fairly straightforward.  Complexity typically falls into reconnection algorithms and the buffering of messages.  Architecture varies based on the idiomatic features of the client language or platforms, although all officially maintained clients support the following features:
 
  - Allow credentials to be passed when connecting to a server
  - TLS support
  - Publishing of messages
  - Subscribing to subjects and receiving messages
  - Buffering messages for resiliency
  - Reconnection to servers on detecting broken connections
  - Update available servers via the discovery protocol

The typical flow of a NATS client is very straightforward:

  1. Establish a connection to a server and setup error/notification handlers.
  2. Optionally subscribe to subject(s) and setup handlers to process messages.
  3. Optionally publish messages.
  4. When finished, a client will disconnect from the NATS server.

# Streaming Server

The [NATS streaming server](https://github.com/nats-io/nats-streaming-server) and clients are a bit different; conceptually, it's useful to consider NATS Streaming as a layer above NATS.  Within NATS streaming, NATS streaming servers are actually core NATS *clients*.  This offers flexibility in allowing NATS streaming servers to have dedicated hosts, distributing work.  In terms of core NATS, the streaming server is actually a NATS client.

When NATS streaming clients connect, they are creating a *logical* connection over core NATS to a streaming server; one could consider this a session established with the streaming server over core NATS.  The NATS streaming server is associated with a streaming `cluster-id`, the `cluster id` alongside a unique `client-id` is used to setup internal unique subjects for that client communicate with the NATS streaming server on.  Clients then publish and subscribe to the NATS streaming server, receiving acknowledgements that their message has been persisted meeting the at-least-once messaging guarantee.

From a network standpoint, the client and NATS streaming server look like this:

![NATS Streaming Server and Clients](images/streaming1.jpg "NATS Streaming Client/Server Diagram")

*Note:  For convenience, the NATS streaming server defaults to use a side-car architecture running a NATS server instance in its process space so it can run stand-alone.  This internal streaming NATS server can be configured to join an existing core NATS server cluster.  While there is a single process, when NATS streaming clients connect, they are actually connecting to the internal NATS server.*

## NATS Streaming High Availability Options

NATS streaming supports two ways to acheive high availability:
  * A lightweight [fault tolerant](https://github.com/nats-io/nats-streaming-server#fault-tolerance) warm standby.
  * Full log replication amongst several instances using RAFT.

## Partitioning

Streaming servers can be [partitioned](https://github.com/nats-io/nats-streaming-server#partitioning) to scale.  Multiple streaming servers in the same cluster distribute work based on assigned channnels.

![NATS Streaming Server Partitioning](images/streaming2.jpg "NATS Streaming Partitioning Diagram")

## Streaming client design and architecture

 The [NATS streaming protocol](http://nats.io/documentation/streaming/nats-streaming-protocol/) is more complex, requiring a number of fields.  Because of this, it is a binary protocol atop core NATS implemented through [Protobuf](https://github.com/google/protobuf).  While NATS streaming clients use a different API, because they sit atop NATS all of the features found in core NATS are available.  All officially supported clients provide the following:
 
  - Allow a logical streaming connection to be established with the NATS streaming server.  This allow passing a core NATS connection in order to add TLS, credentials, etc.
  - Publishing of Messages
  - Subscribing to subjects to receive messages, supporting the various subscription options found [here](https://github.com/nats-io/go-nats-streaming#subscription-start-ie-replay-options), as well as [durable subscription](https://github.com/nats-io/go-nats-streaming#durable-subscriptions) support.
  - Queue group subscriptions.
  - Support for handling publish acknowledgements and acknowedging received messages.

The typical flow of a NATS streaming client is very similar to a core NATS client:

1. Establish a connection to a streaming server
2. Optionally subscribe to subject(s) and setup handlers to process messages.  Messaged are acknowedged.
3. Optionally publish messages, and handle publish acknowedgements from the server.
4. When finished, a client will close it's connection with the NATS streaming server.