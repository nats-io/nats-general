## General Technical Review - NATS / Incubating

- Project: **NATS.io**
- Project Version: **2.12.3**
- Website: **https://nats.io**
- Date Updated: **2026-01-19**
- Template Version: **v1.0**
- Description: **NATS.io is an open-source messaging system designed for cloud-native applications, IoT, and microservices. It provides a lightweight, high-performance way for distributed systems to communicate.**
  - **Key Features**
    - **Pub/Sub & Request/Reply**
      Supports core messaging patterns: publish/subscribe, request/reply, and queue groups (load balancing).
    - **JetStream (Persistence & Streaming)**
      Optional persistence layer for message durability, replay, and at-least-once delivery.
    - **High Performance**
      Extremely low latency (microseconds) and capable of millions of messages per second.
    - **Lightweight**
      Small binary footprint, easy to run anywhere (edge, cloud, on-prem).
    - **Secure by Default**
      TLS, authentication, and authorization built in.
    - **Scalable & Flexible**
      Supports clustering and superclusters for global-scale deployments.
    - **Clients**
      Official clients for Go, Java, C#/.NET, Python, Rust, JavaScript
  - **Common Use Cases**
    - Microservices communication (service discovery, request/reply, eventing)
    - IoT device messaging (connect edge devices to cloud backends)
    - Streaming & event-driven architectures (with JetStream)
    - Control planes (managing distributed systems reliably)
    - Multi-cloud and hybrid cloud messaging (connect services across environments)

### Day 0 - Planning Phase

#### Scope

- Describe the roadmap process, how scope is determined for mid to long-term features, as well as how the roadmap maps back to current contributions and the maintainer ladder?

  The roadmap of the NATS project is decided by the maintainers, but informed/sourced from the community through GitHub or Slack, customers, support, etc: [Roadmap](https://nats.io/about/#roadmap)

  Features or changes planned, proposed, or considered for the server and the clients are usually created as GitHub issues under the server/client repo, with discussions and concrete proposals being made as Architecture and Decision Records (ADRs): https://github.com/nats-io/nats-architecture-and-design

  Features or changes for client libraries can usually be added by any willing contributor, and often are performed by contributors based on volunteering to work on such an issue.

  Features or changes for the server are usually performed by a maintainer due to the increased complexity associated with server development, but contributors are encouraged to do so as well when working in close collaboration with the maintainers to ensure preserving the desired quality as well as edge cases are taken into account.

- Describe the target persona or user(s) for the project?

  The target audience is anyone looking to simplify their tech stack, where multiple different technologies can be consolidated to just using NATS for both communication and persistence. Where NATS shines is being able to use the same technology from the cloud/on-prem all the way to the near and far 'edge'.

- Explain the primary use case for the project. What additional use cases are supported by the project?
  - Microservices communication (service discovery, request/reply, eventing)
  - IoT device messaging (connect edge devices to cloud backends)
  - Streaming & event-driven architectures (with JetStream)
  - Control planes (managing distributed systems reliably)
  - Multi-cloud and hybrid cloud messaging (connect services across environments)

- Explain which use cases have been identified as unsupported by the project.

  Usually, NATS can fit and be "lego-brick"-ed together to support any use case. However, there may be cases where the NATS server, although small, doesn't fit to run on a tiny (edge) device. Additionally, NATS, when using JetStream, is not intended as 'infinite storage', although it can be used for long-term storage depending on the use case.

- Describe the intended types of organizations who would benefit from adopting this project. (i.e. financial services, any software manufacturer, organizations providing platform engineering services)?

  NATS benefits any organization looking for a unified technology that functions and can bridge no matter what cloud provider or on-prem, running on raw hardware or Kubernetes, with large resources or small edge devices.
  A NATS cluster can even span multiple cloud providers, allowing resiliency to cloud provider or availability zone outages as well as satisfying EU regulations relating to using multiple cloud providers per region.

- Please describe any completed end-user research and link to any reports.
  - Jepsen: NATS 2.12.1 Analysis
    - Focus: A rigorous security and reliability audit of NATS JetStream, identifying specific edge cases for data loss and "split-brain" scenarios.
    - Link: https://jepsen.io/analyses/nats-2.12.1
  - arXiv 1912.03715: A Study on Modern Messaging Systems
    - Focus: Qualitative and structural comparison of NATS Streaming, Kafka, and RabbitMQ.
    - Link: https://arxiv.org/abs/1912.03715
  - ResearchGate: Performance Analysis of Apache Pulsar and NATS
    - Focus: Empirical comparison of cloud-native messaging frameworks in decentralized topologies.
    - Link: https://www.researchgate.net/publication/355030750_Evaluation_and_Performance_Analysis_of_Apache_Pulsar_and_NATS
  - ResearchGate: Next-Generation Event-Driven Architectures (2025)
    - Focus: Standardized benchmarking of NATS JetStream against Kafka and serverless event buses.
    - Link: https://www.researchgate.net/publication/396249627_Next-Generation_Event-Driven_Architectures
  - NASA Technical Reports (NTRS): Messaging Performance in ATM TestBed
    - Focus: Evaluating NATS for high-fidelity air traffic management simulations (Report NASA/TM-20220005503).
    - Link: https://ntrs.nasa.gov/citations/20220005503
  - UTUPub: A Comparative Study of Kafka and NATS (2025)
    - Focus: Empirical benchmark of JetStream latency and resource usage in single and multi-node environments.
    - Link: https://www.utupub.fi/handle/10024/182402

#### Usability

- How should the target personas interact with your project?

  Users can primarily interact with the server using dedicated client libraries, either using TCP or through WebSockets. Additionally, there's a CLI that can be used for development, demos, or administrative operations.

- Describe the user experience (UX) and user interface (UI) of the project.

  NATS makes client communication location transparent. No matter where your clients are deployed, or where the servers are. If the servers are connected together either directly or indirectly, your clients can communicate with each other. Clients can come and go and be dynamically moved in the topology as desired.

  There is no official user interface, but there exist many community user interfaces as well as commercial ones supported by vendors.

- Describe how this project integrates with other projects in a production environment.
  - Auth callout - the user can develop and/or integrate with any auth provider.
  - Kubernetes - the server can run on Kubernetes, but it's not a requirement. Project provides repositories that aid in the Kubernetes integration by providing Helm Charts, Kubernetes Controllers, Docker Images
    - https://github.com/nats-io/k8s/tree/main/helm/charts/nats
    - https://github.com/nats-io/k8s/tree/main/helm/charts/nack
    - https://hub.docker.com/_/nats
  - Prometheus - NATS metrics can be exposed to Prometheus through the Prometheus Exporter or by using NATS Surveyor services.
    - https://github.com/nats-io/prometheus-nats-exporter
    - https://github.com/nats-io/nats-surveyor/
  - Terraform - a provider for managing JetStream resources.
    - https://github.com/nats-io/terraform-provider-jetstream
  - Jaeger, Zipkin, OpenTelemetry - service latency & path tracing
    - [NATS Service Latency Distributed Tracing Interoperability](https://docs.nats.io/using-nats/developer/receiving/tracing)
    - [NATS Message Path Tracing](https://docs.nats.io/running-a-nats-service/nats_admin/monitoring/message-path-tracing)

#### Design

- Explain the design principles and best practices the project is following.

  NATS is designed with four goals in mind: performance, stability, simplicity, and security. [Design Goals and Philosophy](https://docs.nats.io/nats-concepts/overview#design-goals-and-philosophy)

  NATS aims for simplicity, while still allowing it to be configurable for advanced use cases.

- Outline or link to the project's architecture requirements? Describe how they differ for Proof of Concept, Development, Test and Production environments, as applicable.

  Development is easily done against a local single-server setup. Test and production environments can be as small or as large as required for the use case. From a single process, to a cluster, to a super cluster, to using leaf nodes, whatever the use case requires or benefits from.

  [Installing a NATS Server](https://docs.nats.io/running-a-nats-service/introduction/installation)
  [NATS Adaptive Deployment Architectures](https://docs.nats.io/running-a-nats-service/introduction/nats-deployment-architectures)
  [Environmental considerations](https://docs.nats.io/running-a-nats-service/introduction/environmental-considerations)

- Define any specific service dependencies the project relies on in the cluster.

  The server has no service dependencies, except for the hardware to run on, networking for communication, and storage if using JetStream. The server can run in Kubernetes, but this is not required.

- Describe how the project implements Identity and Access Management.

  The server provides various ways of authenticating clients: [Authentication](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_intro)
  The server can also be extended using 'auth callout' to authenticate using any auth provider or custom auth logic: [Auth Callout](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_callout)
  Authentication can be as simple as user/pass, but modern systems use NKeys or decentralized auth with challenges as the server doesn't have any private keys when those modes are used.

  The server uses subject-level permissions on a per-user basis: [Authorization](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/authorization). This specifies what subjects a user can publish to and subscribe on. Additionally, the account of the user can specify limits like the maximum number of connections, maximum message size, as well as per-connection restrictions like CIDR address restrictions, and time of day restrictions.

- Describe how the project has addressed sovereignty.

  NATS servers and client applications can be deployed anywhere, thus the user deploying the system is in full control of sovereignty, whether data is in motion or at rest (in the case of JetStream).

  When using JetStream, the user is also in control of where data is stored by specifying stream placement. The stream placement can add requirements as to in which specific cluster the stream is allowed to be placed, or by using arbitrary server tags which allow further customization; like in which region or cloud provider. This is a useful feature to use when designing with regulations in mind.
  [Stream placement](https://docs.nats.io/nats-concepts/jetstream/streams#placement)

- Describe any compliance requirements addressed by the project.

  N/A - vendors may address compliance requirements separately.

- Describe the project's High Availability requirements.

  The server has no high availability requirement, as it can run as a single server.

  When not using JetStream, the server topology can be arbitrarily small or large, supporting the dynamic addition or removal of servers without requiring any coordination by the user.

  When using JetStream, a quorum of servers is required to operate on replicated assets like streams/consumers. Additionally, any CRUD operations on streams/consumers require a quorum of all servers within the (super) cluster. Nodes can be dynamically added, but removal requires peer-removing to change the membership. The user can decide the replication factor of streams/consumers, allowing high availability when required.
  [Persistent and Consistent distributed storage](https://docs.nats.io/nats-concepts/jetstream)
  [Evicting a peer (peer-remove)](https://docs.nats.io/running-a-nats-service/nats_admin/jetstream_admin/administration#evicting-a-peer)

  Replicated streams and consumers within a cluster offer synchronous replication based on Raft consensus. Other options for High Availability include the use of source and mirror streams which offer asynchronous replication of messages. These are designed to be robust and will recover from a loss of connection, and are suitable for geographic distribution, for example when used in combination with leafnodes.
  [Source and Mirror Streams](https://docs.nats.io/nats-concepts/jetstream/streams#sources-and-mirrors)
  [Leaf Nodes](https://docs.nats.io/running-a-nats-service/configuration/leafnodes)

- Describe the project's resource requirements, including CPU, Network and Memory.

  The server has minimal hardware requirements to support small edge devices, but can take advantage of more resources if available. The required resources will highly depend on the use case as well as the scale required for it. For production deployments of JetStream, a minimum of 4 CPUs and 8GB of memory is recommended.
  [Hardware requirements](https://docs.nats.io/running-a-nats-service/introduction/environmental-considerations#hardware-requirements)

- Describe the project's storage requirements, including its use of ephemeral and/or persistent storage.

  The server doesn't require any storage when not using JetStream or an authentication method that requires storage. When JetStream is used, persistent storage is required to store file-based stream/consumer data. When JetStream is used in a clustered setup, peer assignment information of streams/consumers is also stored on disk. These peer assignments - like DNA of the system - indicate what streams and consumers exist, as well as where they live.

- Please outline the project's API Design:
  - Describe the project's API topology and conventions

    NATS uses subject-based messaging: [Subject-Based Messaging](https://docs.nats.io/nats-concepts/subjects)
    APIs are modeled using NATS services reachable on these subjects. Additionally, the NATS server has HTTP endpoints for monitoring. These monitoring endpoints are also available via normal NATS messages when using the privileged system account.

  - Describe the project defaults

    The NATS server has defaults such that simple local configurations can be done using CLI flags. Providing no flags starts a server without JetStream.
    [CLI Flags](https://docs.nats.io/running-a-nats-service/introduction/flags)

  - Outline any additional configurations from default to make reasonable use of the project

    Additional configuration can be performed using above CLI flags, but for production-grade setups these are usually done using a config file:
    [Configuring NATS Server](https://docs.nats.io/running-a-nats-service/configuration)

  - Describe any new or changed API types and calls - including to cloud providers - that will result from this project being enabled and used

    JetStream, initially announced and released in 2021, introduces API types and calls: [JetStream wire API Reference](https://docs.nats.io/reference/reference-protocols/nats_api_reference)

  - Describe compatibility of any new or changed APIs with API servers, including the Kubernetes API server

    N/A - NATS does not use any API servers.

  - Describe versioning of any new or changed APIs, including how breaking changes are handled

    The NATS server uses Semantic Versioning for its releases.

    APIs, for example those in JetStream, use NATS subjects when making requests. There is generally no versioning in these APIs, either an API is improved/extended in a non-breaking way, or a new API must be added. Since server version 2.11.0, the server has received JetStream API versions for indicating new stream/consumer-level features are used. Since server version 2.12.0 (and 2.11.9) the server also protects these stream and consumer assets from being loaded (and potentially corrupting data) if the JetStream API version is not supported by that server. Additionally, since server version 2.12.0, the client can assert that the responding server supports a minimum API version, otherwise it will return an error back to the user that it's an unsupported operation.
    [2.12 Downgrade considerations](https://docs.nats.io/running-a-nats-service/nats_admin/upgrading-a-cluster#v2.12-downgrade-considerations)

    The client protocol is incredibly stable, and is exposed to the client in the INFO portion of the protocol when it connects to the server. The protocol only supports two versions: sending '0' (or absent) indicates support for the original protocol, with '1' indicating support for the "echo" feature and dynamic reconfiguration of cluster topology. The original protocol version '0' got introduced in 2011, and version '1' in server version 1.2.0 in 2018. Support for headers in NATS messages was added in 2021, allowing clients to specify message metadata in HTTP-like headers. More importantly though, clients developed over a decade ago against previous (protocol/server) versions are still supported today when run against the modern server releases.
    [NATS client protocol](https://docs.nats.io/reference/reference-protocols/nats-protocol)

    The server maintains backward-compatibility between minor and patch versions, but may introduce breaking changes in major versions. The server will not break backward-compatibility on the protocol-level, it could however change JetStream-level behavior.

- Describe the project's release processes, including major, minor and patch releases.

  The server has adopted a 6-month release cycle, new features are scheduled to go into the next minor version. With patch versions receiving bug fixes and improvements in the meantime. Preview releases may be used to enable users in the community to try out and provide feedback on new features coming in the next minor release.
  A server release is done by tagging it with the proper version and releasing under GitHub's Releases. Afterward, a PR is made on the official Docker images repo to have an official container image be built of this new version.

#### Installation

- Describe how the project is installed and initialized, e.g. a minimal install with a few lines of code or does it require more complex integration and configuration?

  Installing the NATS server is as simple as downloading and running a single binary:
  [Installing a NATS Server](https://docs.nats.io/running-a-nats-service/introduction/installation)
  [Running and deploying a NATS Server](https://docs.nats.io/running-a-nats-service/introduction)

  The server binary supports many command line flags, but production-grade setups will usually use the config file instead:
  [CLI Flags](https://docs.nats.io/running-a-nats-service/introduction/flags)
  [Configuring NATS Server](https://docs.nats.io/running-a-nats-service/configuration)

- How does an adopter test and validate the installation?

  The server, given an invalid configuration, refuses to start. When the server starts up, it should eventually return a '200 ok' response on a system account endpoint (`healthz`) or the corresponding [HTTP health monitoring](https://docs.nats.io/running-a-nats-service/nats_admin/monitoring) endpoint, if configured. However, this only reports the server itself thinks it's healthy according to its configuration, the user can validate for their use case by doing a request/reply or using JetStream as it's intended to be used by the client application. Additionally, the various other monitoring endpoints can be used to inspect the clients are able to connect, cluster routes or gateways are established, leaf nodes are connected, etc.
  [Monitoring](https://docs.nats.io/running-a-nats-service/nats_admin/monitoring)

#### Security

- Please provide a link to the project's cloud native security self assessment.

  [Security Assessment](./security-assessment.md)

- Please review the [Cloud Native Security Tenets](https://github.com/cncf/tag-security/blob/main/community/resources/security-whitepaper/v2/cloud-native-security-whitepaper.md) from TAG Security.
  - How are you satisfying the tenets of cloud native security projects?
    - Overall, 8/10; see also https://docs.nats.io/nats-concepts/security for anything unclear here
    - Security as a design requirement started with choosing Go as the implementation language (this writer was there and the security model was very much part of the rationale for choosing Go). We design to minimise privilege required (and ship with example hardened systemd configuration files to significantly constrain the impact of a breach). We have been through multiple third-party security audits. Our limitation is that we don't force one auth model upon users and instead offer a selection of auth models, and the default is anonymous access permitted. This is mitigated by the same default offering no persistent storage and no privileged access: connections can just pass messages to other connections
    - "Applying secure configuration has the best user experience": here we have room for improvement. Part of the issue is the familiarization steps needed to pick an auth model, and because of the trade-off involved in operator mode (distributed auth) being mutually exclusive with all others (see below). When using distributed auth, operation is much simpler and powerful, but requires the user to store and [manage](https://docs.nats.io/using-nats/nats-tools/nsc) key material. We do support mutual TLS authentication but the project's own Helm charts do not make this easy to deploy. Here, the third-party Bitnami Helm charts do a better job and show what could be possible (eg, just set `tls.autoGenerated.enabled=true` and `tls.autoGenerated.engine=cert-manager` to get mTLS auth in a deployment). At this time, the nats-server does not have PKIX certificate lifecycle management as this is considered the responsibility of tools such as cert-manager. It is conceivable that we might implement automatic ACME certificate issuance in the future, if a compelling case can be made that this is actually a hindrance in practice.
    - Re "Selecting insecure configuration is a conscious decision" the trade-off choice was made to ensure that you could run without a config file and have a usable anonymous service (with no stored data and no secrets). The moment you start configuring auth, the nats-server protects you and discourages static credentials. Our expectation is that people will select the auth model which fits their requirements.
    - Re "Transition from insecure to secure state is possible": this is very possible and with one exception, administrators can mix and match auth models and combine them to let users migrate between them. The only exception is that the operator mode (distributed auth) is mutually exclusive with all others, because of a security decision that the administrators should not be able to trivially backdoor their way into an Account (which is a namespace and security boundary). Operator mode allows for running a public NATS service with mutually distrusting customers and where operational process controls preventing deployment of modified binaries allow building a service where the admins can't join the namespace of the customers. This is in tension with "able to migrate _to_ Operator Mode" and at this time, the NATS maintainers continue to choose the boundary enforcement over the migration path.
    - "Secure defaults are inherited": absolutely. The auth model which allows for an inheritance hierarchy is Operator Mode, where first account JWT restrictions apply to users created by that account; and second, there are [Scoped Signing Keys](https://docs.nats.io/using-nats/nats-tools/nsc/signing_keys#scoped-signing-keys) to apply permissions to all users issued via that signing key.
    - "Exception lists have first class support": we don't really have exceptions, although you could model them by using Scoped Signing Keys and have one Signing Key which is not scoped. The service which signs users using that Signing Key would need to be written by the administrators of a deployment and could implement whatever audit-logging and break-glass controls they deem necessary. The issue here is that NATS has a responsibility boundary here, where the server _consumes_ the Operator mode JWTs and we provide simple tools and documentation to let administrators move beyond the basics and adapt for their deployment model.
    - "Secure defaults protect against pervasive vulnerability exploits": yes. We implemented in a programming language which supports security, we ship with example hardened configs, and the auth models we have push hard against the NATS server having access to any secret besides the TLS private key. We actively discourage secrets in the configuration file (a static user/pass should at least use the salted hashed password support) and the Operator mode was designed to have no secrets stored by the nats-server: the nats-server is a consumer of public key cryptography, and signing happens with components such as `nsc` and `nats-account-server` (which is a starting point for tying into administrator-chosen identity management). We design to avoid holding secrets in the server.
    - "Security limitations of a system are explainable" is a very subjective standard, but we have explained above about auth model being a choice defaulting to anonymous, and about the Operator mode account namespaces being inviolate. The other main limitation is very explainable: "the JetStream management APIs can filter on subjects but not on payloads". We draw a distinction between using Subjects which might be backed by JetStream, and using the management APIs to manage JetStream, so this is only around managing JetStream, not using JetStream; these management APIs are well controlled by ACL if (and only if) the access decisions are exactly those in the management API's NATS Subjects.

  - Describe how each of the cloud native principles apply to your project.
    - (The principles addressed here are taken from https://github.com/cloud-native-principles/cloud-native-principles/blob/master/cloud-native-principles.md )
    - NATS provides a communications backplane for enabling microservice communication. It is fundamentally about distributed communication patterns and at its core enables microservices (as one well-supported model). By default it is highly amenable to immutable infrastructure deployment, as it is stateless and needs the binary, one config file, and TLS keys/certs. We provide Helm charts for running in Kubernetes, we provide `nats-server-hardened.service` as a SystemD configuration file. State enters the picture in two ways:
      1. JetStream storage, in which case the persistent storage volume needs to be managed for assets which lack replication, or administrators can rely upon replication to restore storage.
      2. Account dynamic existence, which can be provided by an external callout microservice, be implemented as a callout entirely, or exist as data replicated within the clusters for the NATS resolver mode for Operator mode. The nats-server is responsible for that third approach and offers modes for replication to ensure availability.
    - The defaults are all declarative; the corner case right now is the existence of JetStream assets where the management layer is implemented imperatively but various NATS official projects provide declarative approaches such as a Terraform provider for JetStream. Thus declarative is possible even there, but certainly not what the current documentation points people towards.
    - For immutable infrastructure, the one exception we have to the tenets is something which depends upon how configuration is defined. When using Operator mode, which is decentralized authentication/authorization using public key cryptography (signed JWTs), each Account JWT could be considered a snippet of configuration. They're designed to allow Accounts and Users to be created or destroyed as needed without any changes to the server config, and for cryptographic key material to be rotated. As such, they need to live "somewhere". There are account resolver modes which use HTTPS callouts to an external service, such that the NATS server remains immutable in deployment, but there are resolver modes where the account JWTs exist as stateful data inside NATS which can be propagated within a supercluster. NATS provides the toolkit to enable administrators to make choices about where they want the state to live and how immutable things are. The nats-server absolutely supports deployment models where the machines in a supercluster are rolled with atomic replacement and booted up from an immutable OS image (or K8S deployment).
    - NATS provides standalone versioned binaries for deployment, and OCI (or Docker) images. We believe the overhead is very low. A deployment minimally is just the binary. Usually one configuration file is needed too, plus TLS/PKIX material. While other state can exist (JetStream persistent store, Accounts within the NATS resolver), none of that needs to be deployed with the binary.
    - Our releases are typically cut automatically upon git tag push. Our exception is for embargoed security releases, where we use manual processes to override.
    - For "If a project's deployment is managed completely by a pipeline, the project's environment is protected" it's hard to see how this relates to the provider side, such as the NATS project. This is a deployment consideration for those choosing to deploy NATS. We certainly support this and make it as easy as we can for administrators to implement this and are open to feature requests for anything which can remove impediments.
    - The NATS server is highly observable. From exporting metrics via HTTP/HTTPS (and offering prometheus agents to bridge that), through exposing those metrics over the NATS backplane (in a System account), to supporting message tracing. We have solid logging, but most effort goes into metrics. Useful components to consider here include `prometheus-nats-exporter` (bridging prometheus scraping to individual NATS servers via HTTP(S)) and `nats-surveyor` (bridging prometheus scraping to NATS cluster/supercluster metrics via System account messages). The server recognizes message tracing headers and can be configured to support them (including security boundaries at namespaces by default), supporting multiple different standards.
    - Most configuration is declarative; the JetStream management layer is the obvious counter-example, but we provide tools such as `terraform-provider-jetstream` to bridge that gap.
    - Yes, our declarative configuration is declarative, not imperative masquerading as declarative (P8).
    - The NATS project provides microservice components, including the nats-server to act as a communications backplane, auth components such as the `nats-account-server`, metrics proxy services, and more. The only caveat here is as regards to discoverability: there's always a chicken and egg bootstrap issue when the service _is_ the communications backplane, but NATS provides for service discoverability.
    - NATS is self-healing and distributed. It allows for clusters and super-clusters, and automatically replicates data. Data can be moved around just by changing affinity tags on the JetStream asset and will automatically replicate and migrate. NATS lends itself not just to scaling out a cluster or supercluster, but to providing tools and techniques with which developers can scale out their services, including subscription queue groups and far more. NATS is an enabling technology for self-healing resilient service deployments.
    - NATS ships with helm charts for K8S deployments; we used to have an operator mode for orchestration (more closely matching the tenets here) but have found the Helm approach to be what people actually wanted.

  - How do you recommend users alter security defaults in order to "loosen" the security of the project? Please link to any documentation the project has written concerning these use cases.

    By default, the server has no authentication configured. Importantly though, that does not give you administrative privileges, since the system account still needs to be explicitly configured (which can't be "loosened").
    [System Events](https://docs.nats.io/running-a-nats-service/configuration/sys_accounts)

- Security Hygiene
  - Please describe the frameworks, practices and procedures the project uses to maintain the basic health and security of the project.

    N/A - the project does not use a framework for this, but security is considered as part of the PR review process.

  - Describe how the project has evaluated which features will be a security risk to users if they are not maintained by the project?

    Features that may risk security are considered with an increased level of scrutiny. Generally though, the primary features relating to security are encryption, authentication, and authorization. These don't require new features or active development. The most recent change was the addition of auth callout, which allows to defer authentication in a secure way to an external process.
    [Securing NATS](https://docs.nats.io/running-a-nats-service/configuration/securing_nats)
    [Auth Callout](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_callout)

- Cloud Native Threat Modeling
  - Explain the least minimal privileges required by the project and reasons for additional privileges.

    We require the ability to bind to listen on ports. If using WebSockets, this typically includes port 443, which is privileged, but can be assigned to a non-privileged port. Thus `cap_net_bind_service` (or equivalent on non-Linux) is required in some configurations. See `util/nats-server-hardened.service` for an example of a fully supported minimal privilege enforcement configuration for SystemD.

  - Describe how the project is handling certificate rotation and mitigates any issues with certificates.

    TLS is supported for encryption on the wire and can be optionally used for authentication. Certificates referenced by the server config can be replaced and the server hot-reloaded without downtime. The server properly rejects expired certificates, but does not support automatic certificate rotation. That must be done by the user since there are various ways to manage this. See the [TLS docs](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/tls).

  - Describe how the project is following and implementing [secure software supply chain best practices](https://project.linuxfoundation.org/hubfs/Reports/OSSSC_v2.pdf)

    The server uses Syft to supply a Software Bill of Materials (SBOM) alongside releases. Releases are not currently signed, but that work is in progress.

### Day 1 - Installation and Deployment Phase

#### Project Installation and Configuration

- Describe what project installation and configuration look like.

  Installing the NATS server is as simple as downloading and running a single binary:
  [Installing a NATS Server](https://docs.nats.io/running-a-nats-service/introduction/installation)
  [Running and deploying a NATS Server](https://docs.nats.io/running-a-nats-service/introduction)

  The server binary supports many command line flags, but production-grade setups will usually use the config file instead:
  [CLI Flags](https://docs.nats.io/running-a-nats-service/introduction/flags)
  [Configuring NATS Server](https://docs.nats.io/running-a-nats-service/configuration)

#### Project Enablement and Rollback

- How can this project be enabled or disabled in a live cluster? Please describe any downtime required of the control plane or nodes.

  Enabling and disabling is as simple as installing and uninstalling the server. There is no downtime requirement of the control plane or nodes.

  When disabling a server that was part of a cluster and had JetStream enabled, it will need to be 'peer-removed' to signal that this server isn't going to come back after it's uninstalled.
  [Evicting a peer (peer-remove)](https://docs.nats.io/running-a-nats-service/nats_admin/jetstream_admin/administration#evicting-a-peer)

- Describe how enabling the project changes any default behavior of the cluster or running workloads.

  Installing the server does not change any (default) behavior of the cluster or running workloads. Workloads need to use a client library to interact with the server.

- Describe how the project tests enablement and disablement.

  Installing and uninstalling is part of the test suite. The server specifically has a variety of tests how install/uninstalls influences communication or persistence between server instances as well.

- How does the project clean up any resources created, including CRDs?

  The project creates minimal resources when using the official Helm chart:
  https://github.com/nats-io/k8s/tree/main/helm/charts/nats
  It should clean up most resources, but may leave a volume behind if the user so chooses.

  CRDs aren't used by default, and usually only used with NACK (NATS JetStream Controller):
  https://github.com/nats-io/k8s/tree/main/helm/charts/nack
  NACK uses Kubernetes CRDs to let users manage JetStream resources.

#### Rollout, Upgrade and Rollback Planning

- How does the project intend to provide and maintain compatibility with infrastructure and orchestration management tools like Kubernetes and with what frequency?

  The server releases contain binaries for a wide variety of platforms. Additionally, there are also container images: https://hub.docker.com/_/nats. This usually means any server version can be run on any environment.
  The Helm charts and CRDs are generally simple and don't need much maintenance to remain compatible as well.

- Describe how the project handles rollback procedures.

  It's generally not recommended to rollback to a prior version, although one patch version prior is supported.
  Rollback is handled in the same way as upgrades (stop, replace binary/container, restart, wait until it reports healthy):
  [Upgrading a Cluster](https://docs.nats.io/running-a-nats-service/nats_admin/upgrading-a-cluster)

- How can a rollout or rollback fail? Describe any impact to already running workloads.

  The server should be gracefully shut down prior to rollout or rollback, this ensures client connections get redistributed to other servers in the cluster. This means there's no impact to already running workloads, unless it uses JetStream for a non-replicated stream or consumer that only lives on this single server.

  When not using JetStream, there's not really a way the rollout/rollback can fail, unless networking is not working. When using JetStream it might be the server needs to catch up missed replicated messages while it was offline, this usually just means it takes some time to synchronize over the network after which the server will report healthy.

- Describe any specific metrics that should inform a rollback.

  The server is consistently not reporting healthy under the `/healthz` endpoint for an extended period of time post upgrade.
  When using the Helm chart this is used for the startup probe.

- Explain how upgrades and rollbacks were tested and how the upgrade->downgrade->upgrade path was tested.

  Upgrades are tested by relying on pre-existing tests to validate unchanged behavior after an upgrade. Rollbacks are tested in the same way as below up/down/up tests.

  Upgrade->downgrade->upgrade tests are usually only done between major/minor version upgrades. For example when upgrading from 2.11 to 2.12. The release notes may contain notes about what downgrade path is safest, for example when downgrading from 2.12.0, it's recommended to downgrade to 2.11.9 or later. [2.12 Downgrade considerations](https://docs.nats.io/running-a-nats-service/nats_admin/upgrading-a-cluster#v2.12-downgrade-considerations)

- Explain how the project informs users of deprecations and removals of features and APIs.

  The server has committed to not removing features or APIs unless part of a major version upgrade. Note that the last major version bump to 2.0.0 was back in mid-2019, and although new features and APIs were added in minor versions since, no features or APIs were removed unless they were internal to the server itself with no user impact.

- Explain how the project permits utilization of alpha and beta capabilities as part of a rollout.

  The server does not utilize alpha or beta capabilities, once a feature is released it's meant to be fully supported, with only bug fixes or improvements being made. When performing an upgrade or rollback rollout there might be new JetStream features that can be used on the 'upgraded part' of the cluster, since 2.11.9 the server protects the 'non-upgraded part' by putting assets using new features under an 'offline mode' until the server is upgraded to the required version.

### Day 2 - Day-to-Day Operations Phase

#### Scalability/Reliability

- Describe how the project increases the size or count of existing API objects.

  The server itself is purely a single binary/container that doesn't use any API objects. However, when using the official Helm chart each server instance will be a pod part of a single stateful set, with a single service being used to load-balance between all servers in that NATS cluster. The amount of API objects will depend on the NATS cluster size the user configures as well as how many Helm installations they use.

- Describe how the project defines Service Level Objectives (SLOs) and Service Level Indicators (SLIs).

  N/A - the project does not define SLOs or SLIs.

  However, the various monitoring endpoints can be used to measure these, as well as tracking service latencies and path tracing:
  [Monitoring](https://docs.nats.io/running-a-nats-service/nats_admin/monitoring)
  [NATS Service Latency Distributed Tracing Interoperability](https://docs.nats.io/using-nats/developer/receiving/tracing)
  [NATS Message Path Tracing](https://docs.nats.io/running-a-nats-service/nats_admin/monitoring/message-path-tracing)

- Describe any operations that will increase in time covered by existing SLIs/SLOs.

  N/A

- Describe the increase in resource usage in any components as a result of enabling this project, to include CPU, Memory, Storage, Throughput.

  It's generally recommended to dedicate infra to nodes hosting the NATS servers, since these will benefit from increased networking bandwidth and throughput. As well as using dedicated and optimized storage when using JetStream. The server has a low resource footprint, but it's recommended to dedicate at least 4 CPUs and 8GB of memory when using JetStream for production-grade setups.

  However, if the usage doesn't prompt using dedicated infra, the servers could just as well run on pre-existing nodes in the cluster. But, when using JetStream, making sure replicated assets are hosted on separate nodes to ensure high availability given a single node outage.

- Describe which conditions enabling / using this project would result in resource exhaustion of some node resources (PIDs, sockets, inodes, etc.)

  Every server instance runs as its own pod. Depending on the use case the server will use a bunch of I/O resources for both networking and disk, in which case it's recommended to use dedicated nodes for predictable resource usage.

- Describe the load testing that has been performed on the project and the results.

  The user can perform load testing themselves by using the NATS CLI and `nats bench` commands. Additionally, the server contains a set of benchmarks that are run prior to server release to ensure no performance degradations.

  End-users as well as vendors may execute load testing that includes both the server as well as their application or load generator to perform more complex load testing.

- Describe the recommended limits of users, requests, system resources, etc. and how they were obtained.

  Although it depends on the use case, the server generally supports millions of users as well as millions of publishes/requests per second. NATS clusters are recommended to have a maximum size of 10s of servers, but super clusters can be used to extend the total server count further, as well as by using leafnodes.

  Limits are primarily dictated by networking when only using NATS core publish/subscribe, and when using JetStream this is also determined by the disk/storage/memory used.

- Describe which resilience pattern the project uses and how, including the circuit breaker pattern.

  The server tries to protect itself when it needs to. For example, "slow consumers" are the most known concept within the server, which means a small amount of slow clients don't bring down the whole server/cluster. [Slow Consumers](https://docs.nats.io/running-a-nats-service/nats_admin/slow_consumers)

  Clients can subscribe to messages (for example part of request/reply) and specify how many responses they want, if the amount of responses is received the server trips a circuit breaker to not distribute any additional responses.

  Similarly, when using JetStream, the server protects itself from excessive message or API ingestion by dropping these once a (configurable) maximum of queued requests is reached.

#### Observability Requirements

- Describe the signals the project is using or producing, including logs, metrics, profiles and traces. Please include supported formats, recommended configurations and data storage.

  The server exposes its own [monitoring](https://docs.nats.io/running-a-nats-service/nats_admin/monitoring) endpoints via HTTP and via system account endpoints: Additionally, events are also sent for client connects/disconnects, authentication errors, stats, etc: [System Events](https://docs.nats.io/running-a-nats-service/configuration/sys_accounts)

  There's also support for Prometheus-style metrics either through the exporter or Surveyor:
  https://github.com/nats-io/prometheus-nats-exporter
  https://github.com/nats-io/nats-surveyor

  The server can be profiled as well to debug performance issues: [Profiling](https://docs.nats.io/running-a-nats-service/nats_admin/monitoring#profiling)

- Describe how the project captures audit logging.

  Since NATS at its core is publish/subscribe, any interactions can be easily audited by subscribing on the relevant subjects. When using JetStream, the server also supports publishing advisories as well as auditing API usage:
  [JetStream Advisories](https://docs.nats.io/running-a-nats-service/nats_admin/monitoring/jetstream-advisories)
  [JetStream wire API Reference](https://docs.nats.io/reference/reference-protocols/nats_api_reference)

- Describe any dashboards the project uses or implements as well as any dashboard requirements.

  The project does not implement or require dashboards itself. However, there are Grafana dashboards available when using the Prometheus exporter or Surveyor. Additionally, there are a wide variety of community dashboards available, as well as commercial ones.

- Describe how the project surfaces project resource requirements for adopters to monitor cloud and infrastructure costs, e.g. FinOps

  Users just need to monitor the (hardware) resources like CPU, memory, disk, and networking.

- Which parameters is the project covering to ensure the health of the application/service and its workloads?

  The server contains its own health checks. The operator should confirm these health checks are reporting 'ok' for all NATS servers involved. Additionally, the other various monitoring endpoints can be used to both ensure and monitor the health of workloads that use client connections to the server.
  [Monitoring](https://docs.nats.io/running-a-nats-service/nats_admin/monitoring)

- How can an operator determine if the project is in use by workloads?

  The monitoring endpoints can be used to check if there are client connections or JetStream assets in use.

- How can someone using this project know that it is working for their instance?

  If the server is reporting healthy, it's working. However, the server may be misconfigured by the user, so it's recommended to interact with the system in the way the application interacts with it to validate this. For example, if the application requires JetStream, but JetStream was not actually configured on the server.

- Describe the SLOs (Service Level Objectives) for this project. & What are the SLIs (Service Level Indicators) an operator can use to determine the health of the service?

  N/A - the project does not describe SLOs/SLIs.

  However, the various monitoring endpoints can be used to measure these, as well as tracking service latencies and path tracing:
  [Monitoring](https://docs.nats.io/running-a-nats-service/nats_admin/monitoring)
  [NATS Service Latency Distributed Tracing Interoperability](https://docs.nats.io/using-nats/developer/receiving/tracing)
  [NATS Message Path Tracing](https://docs.nats.io/running-a-nats-service/nats_admin/monitoring/message-path-tracing)
  The monitoring endpoints can also be used to determine the health of the service.

#### Dependencies

- Describe the specific running services the project depends on in the cluster.

  The server only depends on networking being available. If JetStream is used, it also depends on having a disk with sufficient storage capacity.

- Describe the project's dependency lifecycle policy.

  The server uses minimal external dependencies, and is strict about adding new external dependencies. These dependencies are updated whenever a newer version is available, which will be included in a subsequent server release.

- How does the project incorporate and consider source composition analysis as part of its development and security hygiene? Describe how this source composition analysis (SCA) is tracked.

  The server uses Syft to supply a Software Bill of Materials (SBOM) alongside releases. GitHub Actions is used to confirm commits are signed-off by the contributor on a pull request.

- Describe how the project implements changes based on source composition analysis (SCA) and the timescale.

  All NATS source repositories rely on GitHub's Advanced Security product for continuous scanning of CVEs that are found in dependencies. Dependencies are updated promptly by the respective maintainers when identified.

#### Troubleshooting

- How does this project recover if a key component or feature becomes unavailable? e.g Kubernetes API server, etcd, database, leader node, etc.

  The server does not rely or depend on components like Kubernetes, etcd, or other databases, as it can be deployed directly on raw hardware as a single binary.

  The server only depends on the node it's running on being online and networking being available, as well as a disk when using JetStream. The server recovers gracefully from networking issues, but may require a restart given disk/storage-level issues.

  If the user configured the server to use auth callout for authentication and authorization. If the user's auth service is offline, new clients will not be able to authenticate while connected clients will remain connected, until the auth service recovers. [Auth Callout](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_callout)

- Describe the known failure modes.
  - A server crashes, and clients automatically reconnect to other servers in the cluster.
  - A server hosting a non-replicated JetStream stream/consumer remains offline until the server is restarted.
  - A server hosting a replicated JetStream stream/consumer crashes, a new leader will automatically be elected from the remaining servers also hosting this stream/consumer.

#### Security

- Security Hygiene
  - How is the project executing access control?

    Access control to the server infra depends on how it's installed. If installed on Kubernetes it will rely on Kubernetes access control, if installed on AWS it will rely on IAM, etc.

    Access control for client connections is determined by the authentication and authorization methods used/configured: [Authentication](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_intro)

- Cloud Native Threat Modeling
  - How does the project ensure its security reporting and response team is representative of its community diversity (organizational and individual)?

    The project relies on the maintainers to be responsive and report on security issues found or introduced in the software.

  - How does the project invite and rotate security reporting team members?

    Currently, there is no rotation of team members.
