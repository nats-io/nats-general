
# NATS Design Considerations

NATS is a bit different than other messaging products in that NATS is comprised of two components: core NATS, and NATS streaming.  

Most messaging solutions build persistence and guarantees (what streaming provides) into their base product.  There are advantages and disadvantages to both approaches, but disadvantages are usually presented as design challenges rather than feature limitations.  The advantage NATS leverages in separating these components is that the core NATS product does not need to sacrifice performance for features found in NATS streaming.  

While the components of NATS and NATS streaming complement each other to provide a full middleware solution, because core NATS and NATS streaming provide different features, they somewhat diverge in design considerations.   

## Core NATS Design Considerations

Core NATS was designed valuing simplicity and performance.  To that end, the decision **not** to implement some features is just as important as deciding what features to provide.  Features that are not supported in NATS usually would have a harmful impact on simplicity, performance, and security.  In that vein, one major technical decision driven by these values was to minimize state maintained by the server.

### Minimizing State 

NATS servers minimize client and cluster state, holding only what is required or reasonable for monitoring purposes.  This keeps NATS simple, performant, and reduces memory footprint.  Fewer reads and writes to state variables along the fastpath a message takes optimizes the server for performance.  The server maintains some information about the client, although this is only kept for the lifetime of the client-server connection, and is primarily used for authorization and authentication, backward compatibility with feature support, and to provide salient monitoring data.  Specific client information remains internal to the server and is not shared with other servers.

So what information about current state does a core NATS server share?

- **Subject Interest:**  The subjects that this server’s clients are interested in (subscriptions)
- **Cluster Topology:**  The other servers this server has knowledge of

The server protocol and client protocol provides a way to propagate this information to other servers and to clients, but these are driven by real-time events such as cluster topology changes and clients subscribing to topics.  Given this approach and the fact that core NATS supports at most once delivery, there is no need for consensus among nodes in a server cluster, keeping design simple and code performant.

This means NATS has no requirement for physical storage, requires little configuration, and can perform extremely well.

Naturally, there are a number of features these design goals preclude.  So what notable features are NOT supported in core NATS?

- Message delivery guarantees (any persistence of data beyond runtime)
- Transactions
- Message Schemas
- Last Will and Testament
- Message Groups

Of course, one could point to many other features that are not included, and we advise users of core NATS that want complex features like these above to utilize NATS streaming or implement these in their applications.

## NATS Streaming Design Considerations

NATS streaming does maintain client and server state, and clustered streaming servers must have consensus.

To share some NATS lore, the NATS streaming project was internally called project STAN, and you may see this in our server code and client libraries.  The streaming server maintains state, does support complex and storage intensive features, and when clustered maintains consensus which inherently adds overhead.  The thought was some of the NATS streaming features and design principles are the inverse of core NATS…  project STAN.

NATS streaming provides:
- Persistence of data - message delivery guarantees
- Message Replay
- Rate limiting
- Durable Subscriptions

This means NATS streaming complements core NATS to provide a richer feature set, and while performance is always a strong consideration, NATS streaming features may be added at the expense of raw performance when compared to core NATS.  To generalize, features that are not provided in core NATS due to design principals may be added to NATS streaming.

In discussion of these design features, we’ve outlined the values we apply to design decision.  That being said, we certainly don’t want to dissuade contributions or raising of issues that will help in the continued evolution of NATS.  If there is a feature in either component you’d like to see, please open an issue for discussion.
