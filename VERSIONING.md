# NATS Versioning

In versioning NATS, several areas are accounted for including protocols, server processes, and client libraries.  NATS will generally the [semantic](http://semver.org/) versioning scheme with a `MAJOR.MINOR.PATCH` format, with a few tweaks.

## Protocol Versioning

While the current protocol version has worked well for several years, realistically, NATS will need to support changes or new features in the future and require changes to the protocol. NATS will utilize the a strategy similar to semantic versioning with congruent rules for major and minor version bumps.

A change to a protocol that will alter the existing contract with the client will result in **a major version bump**.  *Note:  Additions or changes that an existing client would reasonably accommodate will evaluated on a case by case basis, possibly to be categorized as a client bug.*

Any non-breaking change to the protocol results in a minor version bump.  Changes in the category would be be adding to the content of `INFO` messages that can be optionally used, extending an existing protocol verb in a non-breaking manner, or adding a new optional protocol verb to extend functionality.  A client working with NATS protocol version with the same major version and less than or equal to the minor version as the server will continue to operate as expected.

If a protocol version is not specified in code or documentation, one may assume 1.X for the NATS server, and 0.x for the NATS streaming server.  Until the NATS streaming server reaches 1.0, breaking changes, while unlikely, may be introduced.  This is congruent with semantic API versioning.

| Protocol | Current Version | Components                                     |
| ---------|---------|------------------------------------------------|
| NATS Client Protocol | 1.0.0 | Client / Server                                |
| NATS Server Protocol | 1.0.0 | Server / Server                                |
| NATS Steaming Client Protocol | 0.1.0 | Streaming Client / Streaming Server _(Legacy)_ |
| NATS Streaming Server Protocol | 0.1.0 | Streaming Server / Streaming Server _(Legacy)_ |

When an official client is said to support a specific protocol version, it should support all features associated with that protocol level.  If it cannot due to language, OS, etc., the client must document what features of the protocol it cannot support.

When a client library supports a major version greater than the server, they *may* fatally error.  If a client supports a minor version higher than the server, it will surface an appropriate non-fatal error when attempting operations not supported by the current protocol version server.

## Software Versioning

### Servers

Servers follow semantic versioning scheme as well, albeit slightly modified.  Major version bumps occur if there are any of the following conditions:

 * A breaking change in configuration files.
 * A breaking change with parameter behavior.  This is unlikely and to be avoided.
 * A client protocol version bump. A NATS server may still accommodate older client protocol versions, although a major version bump can be an opportunity to reduce technical debt that has accrued in older protocol functionality.
 * An incompatible major server protocol version bump.
 * Strategically bumping version based on maturity, features and enhancements. 
   * *We also want protocol versions to have parity with the servers with respect to production readiness.  For example, when NATS streaming server goes 1.0 (production ready), the protocol version will be promoted to 1.0.*
 * While server REST APIs should use URL versioning, in the unlikely event there are breaking changes, a version bump must occur.

A major version bump does not require backward compatibility with previous configuration, API, protocol, etc., although every effort should be made to do so.

### Clients

Clients will follow semantic versioning rules as written; dropping support for an older protocol version will always result in a major version bump. 

There are some idiosyncratic versioning requirements that use of extensions - this includes java clients, NuGet packages, or various packaging and installation channels.  For example, Chocolatey best practices dictate a date be added after patch component of the version, and java maven development builds will have a `-SNAPSHOT` appended to the version.  These are perfectly acceptable, falling within the semantic versioning specification.
