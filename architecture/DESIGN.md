
# NATS Design Considerations

NATS is a bit different than other messaging products in that NATS is comprised of two complementary components: Core NATS, and NATS JetStream. NATS JetStream is built-in to the NATS Server binary but must be enabled on a per server basis and both can be part of the same cluster, which allows you to decide which nodes will be using some of their resources (CPU, RAM and disk space) to support NATS JetStream features while others could be dedicated to Core NATS.

## Core NATS Design Considerations

Core NATS was designed valuing simplicity and performance.  To that end, the decision **not** to implement some features is just as important as deciding what features to provide.  Features that are not supported in NATS usually would have a harmful impact on simplicity, performance, and security.  In that vein, one major technical decision driven by these values was to minimize state maintained by the server.

### Minimizing State 

NATS servers minimize client and cluster state, holding only what is required or reasonable for monitoring purposes.  This keeps NATS simple, performant, and reduces memory footprint.  Fewer reads and writes to state variables along the fastpath a message takes optimizes the server for performance.  The server maintains some information about the client, although this is only kept for the lifetime of the client-server connection, and is primarily used for authorization and authentication, backward compatibility with feature support, and to provide salient monitoring data.  Specific client information remains internal to the server and is not shared with other servers.

So what information about current state does a Core NATS server share?

- **Subject Interest:**  The subjects that this server’s clients are interested in (subscriptions)
- **Cluster Topology:**  The other servers this server has knowledge of

The server protocol and client protocol provides a way to propagate this information to other servers and to clients, but these are driven by real-time events such as cluster topology changes and clients subscribing to topics.  Given this approach and the fact that Core NATS supports at most once delivery, there is no need for consensus among nodes in a server cluster, keeping design simple and code performant.

This means NATS has no requirement for physical storage, requires little configuration, and can perform extremely well.

Naturally, there are a number of features these design goals preclude.  What notable features are *NOT* supported in Core NATS?

- Message delivery guarantees (any persistence of data beyond runtime)
- Transactions
- Message Schemas
- Last Will and Testament
- Message Groups

## NATS JetStream Design Considerations

NATS JetStream does maintain client (consumer) and server (stream) state. Clustered JetStream enabled servers provide distributed and replicated 'shared-nothing' persistence using the Raft protocol.

NATS JetStream provides:
- Persistence of data - higher message delivery guarantees
- Message Replay and Queue Consumption
- Flow Control
- Durable shared consumers
- Key/Value and Object stores

This means NATS JetStream complements Core NATS to provide a richer feature set, and while performance is always a strong consideration, NATS JetStream features may be added at the expense of raw performance when compared to Core NATS.

In discussion of these design features, we’ve outlined the values we apply to design decision.  That being said, we certainly don’t want to dissuade contributions or raising of issues that will help in the continued evolution of NATS.  If there is a feature in either component you’d like to see, please open an issue for discussion.
