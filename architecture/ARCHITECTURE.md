# Understanding NATS Architecture

[NATS](https://nats.io) is a publish/subscribe message oriented middleware with an emphasis on simplicity, performance, security, and scalability.  It was built from the ground up to operate in the cloud.

NATS messaging is comprised of core NATS, and NATS streaming.  Core NATS supports at-most-once delivery, is designed to be lightweight, performant, and always available.  NATS Streaming supports log based persistence providing at-least-once delivery, replay of messages, and subscription continuity (durable subscribers).

# Core NATS

Core NATS is the ideal [messaging](https://nats-io.github.io/docs/developer/concepts/subjects.html) software for [publish/subscribe](https://nats-io.github.io/docs/developer/concepts/pubsub.html), [request/reply](https://nats-io.github.io/docs/developer/concepts/reqreply.html), and [work queue](https://nats-io.github.io/docs/developer/concepts/queue.html) messaging patterns.

## NATS Server

The NATS server routes messages between NATS clients - applications that use the NATS protocol (usually via a NATS client library) to connect to the the NATS server ([nats-server](https://github.com/nats-io/nats-server)).  Logically, applications communicate over a [message bus](http://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageBus.html), but the network configuration is the standard TCP client-server model.

![TCP NATS Client/Server](images/simple1.jpg "Simple TCP NATS Client/Server")

NATS clients send messages to the NATS server over TCP connections established by NATS client libraries.  Published messages are delivered to clients based on subscriptions made to subjects.  

The NATS server supports [TLS](https://nats-io.github.io/docs/developer/security/tls.html) and [Authorization/Authentication](https://nats-io.github.io/docs/developer/security/intro.html).

### Clustering

Running a single NATS server introduces a SPOF.  In order to provide high availability and scalability, NATS servers support full mesh clustering. Each server is connected to all other servers in the cluster.  There is a one-hop message routing maximum, ensuring messages will never loop througout a cluster.  The servers communicate with each other using a [server-to-server clustering protocol](https://nats-io.github.io/docs/nats_protocol/nats-server-protocol.html) over a TCP connection.  The protocol supports "discovery" to propogate topology information and changes in real-time with other members of the cluster and clients.  Thus, servers can be dynamcially added or removed from a cluster at runtime with zero downtime.  Ideally, a client will have at least 2 addresses of "seed" servers.

![NATS Server Cluster](images/cluster.jpg "NATS Server Cluster")

It is important to note that from a client perspective, a NATS cluster is considered one entity.  An officially supported NATS client only requires the address of one server in the cluster to connect, but will then receive the complete cluster topology. The client is able to fail over to other servers in the cluster in the event of a crash or network partition.

More information about clustering can be found [here](https://nats-io.github.io/docs/nats_streaming/clustering/clustering.html).

### Subscriptions and routing

When a NATS client creates a subscription, it registers interest for a subject in the server.  Subjects are discussed in the [protocol conventions](https://nats-io.github.io/docs/nats_protocol/nats-protocol.html).  The server maps interest in this subject to the particular subscription on the client.  When the server receives a message, it inspects the subject, and routes the message to all subscriptions that have interest in the subject.

![NATS Server Routing](images/route1.jpg "NATS Server Routing Diagram")

When servers are clustered, they automatically register interest to other servers in the cluster *on behalf of their clients*, providing message delivery to clients regardless of which server in the cluster they are connected to.

![NATS Server Routing Interest](images/route3.jpg "NATS Server Routing Diagram - Subject Interest")

Notably, messages only get routed to servers in the cluster with client interest, so are not unnecessarily propogated across a network.

![NATS Server Routing Pruning](images/route2.jpg "NATS Server Routing Diagram - Subject Pruning")

## Core NATS client design and architecture

The [NATS protocol](https://nats-io.github.io/docs/nats_protocol/nats-protocol.html) is text based and simple, with only a handful of verbs. NATS Clients are fairly straightforward.  Complexity typically falls into reconnection algorithms and the buffering of messages.  Architecture varies based on the idiomatic features of the client language or platforms, although all officially maintained clients support the following features:
 
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

# Streaming server

The [NATS streaming server](https://github.com/nats-io/nats-streaming-server) and streaming clients are a different protocol than core NATS.  Conceptually it's useful to consider NATS Streaming as a layer above NATS - streaming servers are actually core NATS **clients**.  This offers flexibility in allowing NATS streaming servers to have dedicated hosts, distributing work.

When NATS streaming clients connect, they create a *logical* connection over core NATS to a streaming server; one might consider this a session established with the streaming server over core NATS connectivity. The NATS streaming server is associated with a streaming `cluster-id`, which alongside a unique `client-id` provided by a client is used to setup internal unique subjects for streaming clients to server communication. Clients then publish and subscribe to the NATS streaming server, receiving acknowledgements that their messages have been persisted to meet the at-least-once messaging guarantee.

The NATS streaming server requires a core NATS server to operate and defaults to using a *side-car* architecture by launching a NATS server instance in its process space.  This is a convenience feature.  While there is a single process, when NATS streaming clients connect, they are actually connecting to the internal NATS server.  This internal NATS server is fully functional and can be configured to join an existing core NATS server cluster.  The NATS streaming server can run stand-alone, and connect to an external NATS server cluster.  *Running stand-alone is slightly less convenient, but may yield better performance.*

Regardless, from a network (TCP) standpoint the client and NATS streaming server look like this:

![NATS Streaming Server and Clients](images/streaming1.jpg "NATS Streaming Client/Server Diagram")

## NATS Streaming high availability options

NATS streaming supports two methods to acheive fault tolerance / high availability:

  * The use of lightweight [fault tolerant](https://github.com/nats-io/nats-streaming-server#fault-tolerance) warm standby backups.
  * Full log replication amongst multiple instances using [Hashicorp RAFT](https://github.com/hashicorp/raft).

## Partitioning

Streaming servers can be [partitioned](https://github.com/nats-io/nats-streaming-server#partitioning) to scale.  Multiple streaming servers in the same cluster distribute work based on assigned channels.

![NATS Streaming Server Partitioning](images/streaming2.jpg "NATS Streaming Partitioning Diagram")

## Streaming client design and architecture

 The [NATS streaming protocol](https://nats-io.github.io/docs/developer/streaming/protocol.html) is more complex, as it requires a larger number of fields in the internal protocol messages. It is a binary protocol over the NATS protocol utlilizing [protobuf](https://github.com/google/protobuf) for serialization. While NATS streaming clients use *a different client API*, many of the features found in core NATS are available to NATS streaming clients. However, streaming messages and core NATS messages are not interchangable. NATS streaming also uses a separate subject namespace than core NATS, so messages can not be published via streaming and subscribed via core NATS.
 
 All officially supported clients provide the following:
 
  - A logical streaming connection with the NATS streaming server over core NATS.
  - Publishing of Messages
  - Subscribing to subjects to receive messages, supporting the various subscription options found [here](https://github.com/nats-io/stan.go#subscription-start-ie-replay-options), as well as [durable subscription](https://github.com/nats-io/stan.go#durable-subscriptions) support.
  - Queue group subscriptions.
  - Support for handling publish acknowledgements and acknowedging received messages.

The typical flow of a NATS streaming client is very similar to a core NATS client:

1. Establish a connection to a streaming server
2. Optionally subscribe to subject(s) and setup handlers to process messages.  Messaged are acknowedged.
3. Optionally publish messages, and handle publish acknowedgements from the server.
4. When finished, a client will close its connection with the NATS streaming server.
