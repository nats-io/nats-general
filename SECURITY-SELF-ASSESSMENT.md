# NATS Security Self-assessment

The Self-assessment is the initial document for projects to begin thinking about the security of the project, determining gaps in their security, and preparing any security documentation for their users. This document is ideal for projects currently in the CNCF sandbox as well as projects that are looking to receive a joint assessment and currently in CNCF incubation.

For a detailed guide with step-by-step discussion and examples, check out the free Express Learning course provided by Linux Foundation Training & Certification: [Security Assessments for Open Source Projects](https://training.linuxfoundation.org/express-learning/security-self-assessments-for-open-source-projects-lfel1005/).

### **Self-assessment outline**

#### **Table of contents**

- [Metadata](https://github.com/cncf/tag-security/blob/main/community/assessments/guide/self-assessment.md#metadata)
  - [Security links](https://github.com/cncf/tag-security/blob/main/community/assessments/guide/self-assessment.md#security-links)
- [Overview](https://github.com/cncf/tag-security/blob/main/community/assessments/guide/self-assessment.md#overview)
  - [Actors](https://github.com/cncf/tag-security/blob/main/community/assessments/guide/self-assessment.md#actors)
  - [Actions](https://github.com/cncf/tag-security/blob/main/community/assessments/guide/self-assessment.md#actions)
  - [Background](https://github.com/cncf/tag-security/blob/main/community/assessments/guide/self-assessment.md#background)
  - [Goals](https://github.com/cncf/tag-security/blob/main/community/assessments/guide/self-assessment.md#goals)
  - [Non-goals](https://github.com/cncf/tag-security/blob/main/community/assessments/guide/self-assessment.md#non-goals)
- [Self-assessment use](https://github.com/cncf/tag-security/blob/main/community/assessments/guide/self-assessment.md#self-assessment-use)
- [Security functions and features](https://github.com/cncf/tag-security/blob/main/community/assessments/guide/self-assessment.md#security-functions-and-features)
- [Project compliance](https://github.com/cncf/tag-security/blob/main/community/assessments/guide/self-assessment.md#project-compliance)
- [Secure development practices](https://github.com/cncf/tag-security/blob/main/community/assessments/guide/self-assessment.md#secure-development-practices)
- [Security issue resolution](https://github.com/cncf/tag-security/blob/main/community/assessments/guide/self-assessment.md#security-issue-resolution)
- [Appendix](https://github.com/cncf/tag-security/blob/main/community/assessments/guide/self-assessment.md#appendix)

#### **Metadata**

A table at the top for quick reference information, later used for indexing.

| Field | Value |
|-------|-------|
| Assessment Stage | *Complete* |
| Software | *https://github.com/nats-io* |
| Security Provider | No |
| Languages | *NATS Server -> Go<br>Additional Client languages -> Rust, Python, .NET, JavaScript, Java, Swift, Ruby, C* |
| SBOM | NATS Server dependencies are managed via Go modules (go.mod). SBOMs are generated and uploaded as part of the release process in the SPDX format. See the [2.12.0 release](https://github.com/nats-io/nats-server/releases/tag/v2.12.0) as an example.|

##### **Security links**

Provide the list of links to existing security documentation for the project. You may use the table below as an example:

| Doc | url |
|-----|-----|
| NATS Advisories Website | [https://advisories.nats.io/](https://advisories.nats.io/) |
| NATS Security Documentation | [https://docs.nats.io/nats-concepts/security](https://docs.nats.io/nats-concepts/security) |

#### **Overview**

One or two sentences describing the project -- something memorable and accurate that distinguishes your project to quickly orient readers who may be assessing multiple projects.

- _NATS.io is an open-source messaging system designed for cloud-native applications, IoT, and microservices. It provides a lightweight, high-performance way for distributed systems to communicate._

##### **Background**

NATS addresses the communication challenges inherent in modern distributed systems. Traditional messaging systems often rely on hostname-port-based addressing and struggle with dynamic topologies, hybrid deployments, and the scale demands of cloud-native architectures. NATS solves these problems by providing:

- **Subject-based addressing**: Instead of connecting directly to specific hosts and ports, clients publish and subscribe to named subjects, enabling location-independent, many-to-many (M:N) communication patterns.
- **Adaptive topology**: NATS servers can form clusters and superclusters that automatically communicate topology changes in real-time, allowing the system to evolve without reconfiguration.
- **Multi-environment deployment**: NATS runs across diverse environments—from large cloud instances to edge gateways and IoT devices—making it suitable for hybrid and edge computing scenarios.

The core NATS server provides lightweight, at-most-once delivery messaging. JetStream, NATS' built-in persistence layer, adds streaming capabilities with configurable persistence, replay policies, and distributed storage using a NATS-optimized Raft consensus algorithm. This combination enables NATS to support use cases ranging from microservices communication and event streaming to IoT telemetry and legacy system replacement. JetStream runs as part of the nats-server as an optionally enabled feature.

##### **Actors**

The NATS ecosystem consists of several distinct actors, isolated through network boundaries, authentication mechanisms, and account-based multi-tenancy:

1. **NATS Server**: The core messaging broker that routes messages between clients. Servers can operate standalone or form clusters for high availability and horizontal scaling. Servers are isolated from clients through various forms of authentication and can be further segmented using network policies.

2. **NATS Clients**: Applications that connect to NATS servers to publish and subscribe to messages. Clients use various authentication methods (tokens, username/password, TLS certificates, NKEYs, or JWTs) and are isolated from each other through account boundaries and subject-based permissions.

3. **Accounts and Users**: Accounts are logical isolation boundaries within NATS that provide independent subject namespaces. Accounts prevent lateral movement by ensuring that messages published in one account cannot be accessed by clients in another account unless explicitly exported and imported. Connections do not authenticate as Accounts but as Users. Users live within Accounts. Granular authorization (permissions) can be defined on both the Account and User level.

4. **JetStream Storage**: The persistence layer that stores messages to disk or memory. JetStream data is protected by filesystem permissions and can be encrypted at rest. Access to streams and consumers is governed by subject-based permissions within accounts.

5. **NATS Cluster Mesh/Gateways**: NATS servers can form into local Cluster meshes and Gateway together into Superclusters.  All such servers use common authentication and form one security domain.  The connections can authenticate both with mutual TLS and with credentials, separate from those used for client connections.

6. **Leafnodes**: NATS servers running with a distinct security domain, perhaps with separate authentication mechanisms or authorization namespaces, which can connect into Clusters or Superclusters.  Leafnodes support all the facilities such as JetStream and accepting client connections and further allow for intermittent connectivity into a supercluster.

7. **Operators and Users (in JWT mode)**: In decentralized JWT authentication, operators issue account JWTs, and accounts issue user JWTs.  The NATS server uses a Resolver to look up the Account claimed by a User JWT at authentication time but otherwise does not need to be pre-provisioned with individual Users.  Each Account holder is responsible for their own policies around issuing Users and associated permissions.

##### **Actions**

Key security-relevant actions in NATS include:

**Client Connection and Authentication:**
1. Client initiates TCP connection to NATS server (optionally over TLS)
2. Server presents authentication challenge based on configured authentication method
3. Client provides credentials (token, username/password, TLS certificate; or NKEY signature, with an associated JWT if in Operator mode)
4. Server validates credentials against configuration or through auth callout to external service
5. Upon successful authentication, server associates connection with an account and applies authorization rules
6. If authentication fails, server closes connection

**Message Publishing with Authorization:**
1. Authenticated client sends `PUB` or `HPUB` messages with subject and payload
2. Server checks if client's account and user permissions allow publishing to the specified subject
3. If authorized, server routes message to all subscribed clients with permissions to receive on that subject, respecting account boundaries
4. For JetStream, server additionally validates write permissions to the target stream and applies stream limits
5. If unauthorized, server returns a permissions violation error without forwarding the message

**Message Subscription with Authorization:**
1. Authenticated client sends `SUB` messages with subject or subject pattern
2. Server checks if client's account and user permissions allow subscribing to the specifies subjects
3. If authorized, server will route messages sent to those subjects to this client
4. If unauthorized, server returns a permissions violation error

**Cross-Account Communication via Import/Export:**
1. Account A exports a subject or service with optional permissions
2. Account B imports the subject/service, mapping it to a local subject
3. When a client in Account B publishes/subscribes to the imported subject, server validates both accounts' permissions
4. Server enforces token requirements or response limits as configured on the export
5. Messages flow between accounts only through explicitly configured import/export mappings

**JetStream Message Persistence and Replay:**
1. Client publishes message to a JetStream stream subject
2. Server validates stream write permissions and checks against stream limits (size, age, message count)
3. Server persists message to storage backend (memory or file) with replication to cluster peers using Raft consensus
4. Consumer requests messages with specific delivery policy (all, last, new, by sequence, by time)
5. Server validates consumer read permissions and delivers messages according to acknowledgment policy
6. Encrypted-at-rest JetStream configurations encrypt data before writing to disk

Outside of NATS the protocol or client-server connection, there are security-relevant actions relating to account and user management:

 1. Account issuance by an Operator
 2. User issuance by an Account
 3. Credential minting with static server configuration
 4. Credential roll-over within an Operator, Account, or User: adding, revoking or changing Signing Keys

In all these cases, NATS does not prescribe specific lifecycle or operational requirements.
Organizations are responsible for establishing processes compatible with their operational requirements.

##### **Goals**

NATS aims to provide the following security guarantees:

1. **Authenticated Access**: Only authenticated clients can connect to NATS servers. The system supports multiple authentication methods to accommodate different security requirements and deployment scenarios.

2. **Authorization Enforcement**: Clients can only publish to or subscribe from subjects they are explicitly authorized to access. Authorization is enforced at the subject level with support for wildcards and deny rules.

3. **Account Isolation**: Messages published within one account cannot be accessed by clients in another account unless explicitly exported and imported. This provides strong multi-tenancy boundaries.

4. **Encrypted Communication**: Client-server and server-server connections can be protected with TLS encryption to prevent eavesdropping and man-in-the-middle attacks.

5. **Credential Integrity**: In JWT mode, user credentials are cryptographically signed and can be validated without storing secrets on the server. Private keys remain with their owners (operators, accounts, users).

6. **Data Persistence Security**: JetStream data can be encrypted at rest and is protected by filesystem permissions. Access to persistent data is governed by the same authorization rules as real-time messaging.

7. **Audit and Observability**: Security-relevant events (authentication failures, authorization violations) are logged to support monitoring and incident response.

8. **Resistance to Denial of Service**: NATS implements connection limits, message size limits, slow consumer detection, and resource quotas to prevent resource exhaustion attacks.

##### **Non-goals**

NATS explicitly does not provide the following security guarantees:

1. **Message Content Encryption**: NATS does not encrypt message payloads end-to-end between publishers and subscribers. While TLS encrypts data in transit between clients and servers, messages are visible to the NATS server in plaintext. Applications requiring payload confidentiality must implement their own encryption.

2. **Message Integrity Verification**: NATS does not provide cryptographic signatures or checksums for message payloads. Applications cannot verify that a message has not been tampered with by a compromised server or during routing.

3. **Publisher Authentication to Subscribers**: Subscribers cannot cryptographically verify the identity of a message's publisher. Authorization controls who can publish, but messages do not carry publisher identity proofs.

4. **Prevention of Authorized Resource Exhaustion**: NATS limits resource consumption, but cannot prevent an authenticated user with legitimate permissions from publishing large volumes of data within their quotas, potentially impacting other users or incurring storage costs.

5. **Complete DoS Protection**: While NATS implements many DoS mitigations, sufficiently large-scale attacks at the network level (e.g., volumetric DDoS) require infrastructure-level protections beyond NATS itself.

6. **Compliance Certification**: NATS does not maintain formal compliance certifications (e.g., PCI-DSS, FedRAMP). Organizations must evaluate NATS security controls against their own compliance requirements.

7. **Server Isolation between Equivalent Servers**: the servers inside a Cluster or Supercluster constitute a trust equivalency and can issue System account messages resulting in privileged actions on other servers.  Less trusted servers should be run as Leafnodes instead.

#### **Self-assessment use**

This self-assessment is created by the NATS team to perform an internal analysis of the project's security. It is not intended to provide a security audit of NATS, or function as an independent assessment or attestation of NATS's security health.

This document serves to provide NATS users with an initial understanding of NATS' security, where to find existing security documentation, NATS plans for security, and general overview of NATS security practices, both for development of NATS as well as security of NATS.

This document provides the CNCF TAG-Security with an initial understanding of NATS to assist in a joint-assessment, necessary for projects under incubation. Taken together, this document and the joint-assessment serve as a cornerstone for if and when NATS seeks graduation and is preparing for a security audit.

#### **Security functions and features**

**Critical Security Components:**

These are core security mechanisms that are fundamental to NATS security and should be prioritized in threat modeling:

1. **Authentication System**: Controls who can connect to NATS servers. Failure in authentication logic could allow unauthorized access to the entire messaging system.

2. **Authorization Engine**: Enforces subject-based permissions for publish/subscribe operations. Bypass or misconfiguration could lead to unauthorized message access or injection.

3. **Account Isolation Boundary**: Provides multi-tenancy by preventing cross-account message visibility. Compromise of this boundary breaks tenant isolation guarantees.

4. **TLS Implementation**: Protects confidentiality and integrity of data in transit.
   Weak TLS configuration or implementation flaws expose messages to eavesdropping or tampering.
   When using mutual TLS, flaws may allow joining a cluster or other privileged actions.

5. **JWT Signature Validation**: Verifies cryptographic signatures on JWT credentials.
   Signature validation bypass or weak algorithm acceptance would allow credential forgery and impersonation.

6. **Raft Consensus in JetStream**: Ensures consistency of persistent data across cluster replicas. Consensus failures could lead to data corruption or split-brain scenarios affecting data integrity.

**Security-Relevant Components:**

These components enhance security through configuration and deployment choices:

1. **Connection Limits and Rate Limiting**: Mitigates denial of service by restricting resource consumption per client. Configurable thresholds allow tuning for specific deployment environments.

2. **Slow Consumer Detection**: Identifies and disconnects clients that cannot keep up with message flow, preventing memory exhaustion on the server.

3. **JetStream Encryption at Rest**: Protects stored messages from unauthorized filesystem access. Requires external key management integration.

4. **Monitoring and Logging**: Provides visibility into security events (failed auth, permission violations) for detection and response. Log verbosity is configurable.

5. **Authorization Deny Rules**: Explicitly prohibits access to subjects, taking precedence over allow rules. Enables defense-in-depth by denying dangerous subjects even if broadly granted.

6. **Import/Export Token Requirements**: Adds an additional authentication layer for cross-account communication, ensuring both accounts agree to the data sharing.

7. **TLS Certificate Verification**: Can require and verify client TLS certificates, enabling strong mutual authentication. Certificate authority configuration determines trust boundaries.

8. **External Authentication Callout**: Allows delegation of authentication to external systems (LDAP, OAuth providers), enabling integration with enterprise identity management.

9. **Account Resolver**: when in Operator mode, the NATS server has no account or user credentials in configuration, but needs: the _public_ keys of one (or more) Operators, and a trusted path to an Account Resolver to retrieve Accounts.  The designed use of public-key cryptography ensures that the NATS server needs no access to any private keys.

#### **Project compliance**

NATS does not currently maintain formal compliance certifications. However, the project implements security controls that support compliance with various standards:

- **OpenSSF Best Practices**: NATS has achieved the OpenSSF (formerly CII) Best Practices "Passing" badge, demonstrating adherence to open source security best practices including secure development, vulnerability reporting, and code quality standards.

- **GDPR Considerations**: NATS as a messaging infrastructure does not store personally identifiable information (PII) by design—it is payload-agnostic. Organizations using NATS for GDPR-regulated data must implement their own encryption, retention policies, and access controls at the application layer.

- **SOC 2 / ISO 27001 Alignment**: NATS provides audit logging, access controls, encryption capabilities, and availability features that align with information security frameworks. However, compliance is the responsibility of the organization deploying NATS.

- **FIPS 140-2**: NATS can be compiled with FIPS-validated cryptographic libraries (e.g., BoringSSL/BoringCrypto) for deployments requiring FIPS compliance, though NATS itself is not FIPS-certified.

Organizations deploying NATS in regulated environments should evaluate NATS security controls against their specific compliance requirements and implement additional application-level controls as needed.

#### **Secure development practices**

**Development Pipeline:**

NATS follows secure software development practices throughout the development lifecycle:

- **Source Control**: All NATS projects are hosted on GitHub under the nats-io organization with version control via Git.

- **Code Review**: All changes require pull request review before merging. Maintainers review code for functionality, security implications, and adherence to coding standards.

- **Continuous Integration**: GitHub Actions automatically run comprehensive test suites on every pull request, including unit tests, integration tests, and race condition detection (Go's race detector).

- **Automated Security Scanning**:
  - Dependabot monitors dependencies for known vulnerabilities and creates pull requests for updates
  - CodeQL static analysis scans for security vulnerabilities
  - Go vulnerability scanning via `govulncheck`

- **Container Image Security**: Official NATS container images are built from minimal base images, signed, and published to Docker Hub and GitHub Container Registry. Images are immutable once published.

- **Third-Party Security Audit**: NATS has undergone a professional security audit by Trail of Bits, with findings addressed in subsequent releases.

- **Code Coverage**: Test coverage is tracked via Coveralls, with maintainers monitoring coverage trends to ensure adequate testing of new code.

**Communication Channels:**

- **Internal**: Core team members communicate via private channels and GitHub discussions for project coordination.

- **Inbound**:
  - GitHub Issues for bug reports and feature requests
  - NATS Slack workspace for community support and questions
  - Google Groups mailing lists (natsio@googlegroups.com) for discussions
  - security@nats.io for confidential vulnerability reports

- **Outbound**:
  - GitHub releases and release notes for new versions
  - https://advisories.nats.io/ for security advisories
  - NATS blog and Twitter (@nats_io) for announcements
  - Community Slack for real-time updates

**Ecosystem:**

NATS is widely integrated into the cloud-native ecosystem:

- **CNCF Integration**: As a CNCF graduated project, NATS is commonly deployed alongside other CNCF projects like Kubernetes, Prometheus, and Envoy.

- **Kubernetes Native**: NATS provides Kubernetes operators and Helm charts for cloud-native deployments. Many Kubernetes platforms include NATS as a messaging option.

- **Service Mesh**: NATS can function as the communication backbone for service meshes and is integrated with projects like Kuma.

- **Observability**: NATS integrates with Prometheus for metrics, supports OpenTelemetry tracing, and works with various logging solutions.

- **Multi-Language Support**: With 40+ client libraries, NATS enables messaging across diverse technology stacks used in cloud-native applications.

- **Edge Computing**: NATS' lightweight footprint enables deployment on edge devices and IoT gateways, bridging cloud and edge environments.

#### **Security issue resolution**

**Responsible Disclosures Process:**

NATS follows a coordinated disclosure process for security vulnerabilities:

- **Reporting Channel**: Security vulnerabilities should be reported via email to security@nats.io. This address is monitored by the NATS security team and maintainers.

- **Confidentiality**: Reporters are asked to keep vulnerability details confidential until a fix is released and publicly disclosed. NATS commits to working with reporters to address issues before public disclosure.

- **Communication**: The security team acknowledges receipt of vulnerability reports within 48 hours and provides regular updates on remediation progress.

- **Recognition**: Security researchers who report vulnerabilities responsibly are credited in advisories (unless they prefer anonymity).

**Vulnerability Response Process:**

1. **Receipt and Triage** (Day 0-2): Security team reviews the report, verifies reproducibility, and assesses severity using CVSS scoring.

2. **Impact Analysis** (Day 2-5): Team determines affected versions, attack vectors, and potential impact on users. A CVE ID is requested if applicable.

3. **Fix Development** (Day 5-14): Maintainers develop and test a fix in a private branch. Complex issues may require more time.

4. **Pre-Disclosure Notification** (Day 14-21): For critical vulnerabilities, advance notification may be provided to major NATS users to allow preparation.

5. **Release and Disclosure** (Day 21-30): Patch is released with version bump, and security advisory is published at https://advisories.nats.io/ with CVE details, affected versions, severity, and remediation guidance.

6. **Post-Disclosure**: Advisory is also published to GitHub Security Advisories, and announcements are made via community channels.

**Incident Response:**

For active exploitation or critical vulnerabilities:

- Emergency patches may be released on an accelerated timeline
- Community is notified immediately via Slack and GitHub with mitigation guidance
- If needed, NATS team coordinates with CNCF and other projects that depend on NATS
- Post-incident reviews are conducted to improve detection and response processes

**Historical Performance:**

NATS maintains a public record of all security advisories at https://advisories.nats.io/, demonstrating transparency in vulnerability handling. The project has addressed 14 security issues to date, with timely patches and clear communication to users.

#### **Appendix**

**Known Issues Over Time:**

NATS maintains a transparent record of security vulnerabilities at https://advisories.nats.io/. As of this assessment:

- **Total Security Advisories**: 14 CVEs disclosed publicly
- **Severity Breakdown**:
  - Critical: 1 (CVE-2022-24450 - Authentication bypass)
  - High: Multiple DoS and authentication-related issues
  - Medium: Permission handling and information disclosure
  - Low: 1 (CVE-2021-32026 - TLS cipher configuration)

- **Common Vulnerability Types**:
  - Denial of Service (server panics, resource exhaustion)
  - Authentication/Authorization bypasses
  - Account/permission boundary violations
  - Configuration vulnerabilities

- **Notable Incidents**:
  - CVE-2020-26149: Credentials leak in nats-account-server
  - CVE-2021-32026: Weak TLS cipher suite acceptance
  - CVE-2022-24450: Critical authentication bypass in clustering
  - CVE-2025-30215: Most recent advisory (future-dated for disclosure timing)

All identified vulnerabilities have been promptly addressed with patches and security advisories. The project's track record demonstrates responsive handling and transparent communication.

**OpenSSF Best Practices:**

NATS Server has achieved the OpenSSF (formerly CII) Best Practices **Passing** badge:
- Badge URL: https://bestpractices.coreinfrastructure.org/projects/1895
- Status: Passing (100% criteria met)

Key achievements include:
- Public version-controlled source repository
- Secure project website (HTTPS)
- Documented security vulnerability reporting process
- Secure development knowledge among contributors
- Use of automated testing tools
- Vulnerability tracking and patching process
- Public disclosure of vulnerabilities

To achieve higher badge levels (Silver/Gold), NATS would need to implement additional practices such as two-factor authentication requirements for committers, automated security scanning integration, and more comprehensive security documentation.

**Case Studies:**

1. **MasterCard: Global Payment Processing**
   - Use Case: Real-time payment authorization and settlement messaging across distributed data centers
   - Security Requirements: Multi-tenancy isolation between payment networks, encrypted communications, high availability
   - NATS Features Used: Account-based isolation, TLS encryption, clustering with automatic failover
   - Outcome: Sub-millisecond messaging latency with strong security boundaries between payment channels

2. **Synadia Cloud: Multi-Tenant NATS-as-a-Service**
   - Use Case: Providing NATS messaging to thousands of customers in a shared infrastructure
   - Security Requirements: Complete account isolation, credential management, DDoS protection
   - NATS Features Used: JWT-based authentication, account isolation, connection limits, JetStream with encryption at rest
   - Outcome: Strong security isolation allowing customers to handle sensitive data in shared infrastructure

3. **Choria: Infrastructure Orchestration for 50,000+ Nodes**
   - Use Case: Secure command and control for large-scale server fleets
   - Security Requirements: Authentication of commands, authorization by node attributes, audit logging
   - NATS Features Used: TLS mutual authentication, subject-based authorization, request-reply patterns
   - Outcome: Secure orchestration at scale with granular access control and full audit trails

**Related Projects / Vendors:**

NATS is often compared to other messaging systems in the cloud-native ecosystem:

- **Apache Kafka**: Kafka focuses on high-throughput log-based streaming with disk persistence. NATS provides lower-latency messaging with optional persistence (JetStream) and is significantly simpler to deploy and operate. Use Kafka for high-volume data pipelines; use NATS for low-latency service communication and IoT.

- **RabbitMQ**: RabbitMQ is a mature message broker with complex routing and guaranteed delivery. NATS is more lightweight, cloud-native, and offers better performance for request-reply patterns. RabbitMQ is stronger for traditional message queue workflows; NATS excels in distributed systems and microservices.

- **Redis Pub/Sub**: Redis provides in-memory pub/sub but lacks persistence, sophisticated authorization, and multi-tenancy. NATS offers these features while maintaining comparable performance. Use Redis for simple caching with pub/sub; use NATS for production messaging with security and persistence requirements.

- **gRPC**: gRPC is an RPC framework, not a messaging system. NATS complements gRPC by providing service discovery, load balancing, and asynchronous messaging patterns. Many users combine both technologies.

- **MQTT**: MQTT targets IoT and embedded devices with specific protocol constraints. NATS supports MQTT via NATS-enabled MQTT bridge while offering additional patterns (request-reply, JetStream) and better security models. NATS is suitable for both IoT edge and cloud infrastructure.
