# NATS Master Roadmap

This document is a high-level outline of the roadmap for the NATS Project, identifying the major 
components and their release relationships to other components.

Our overall project plan is kept updated on [the wiki](https://github.com/nats-io/roadmap/wiki).

* [NATS Goals](#nats-goals)
* [NATS Components](#nats-components)
* [Project Planning](#project-planning): release-relationship to the Docker Platform.

This roadmap is a living document, providing an overview of the goals and
considerations made in respect of the future of the project.

## NATS Goals

THe overaching goal of NATS is to provide a messaging platform that prioritizes the following key characteristics:
  
 * Performance - achieve the highest message throughput and lowest latency possible
 * Stability - "always on". Nothing we put in NATS should cause it to crash, and NATS should guard itself against unruly client behavior that might compromise performance or availability for all clients.
 * Simplicity - a compact, simple, and easily mastered API that requires no knowledge about the implementation of the broker (`gnatsd`), and a broker that is lightweight, requiring minimal configuration, system resources and external dependencies.
 * Security - NATS supports basic security features: authentication, authorization and encryption (TLS) 

## NATS Components

Components of the NATS Project are managed via GitHub [milestones](https://github.com/nats-io/roadmap/milestones).
Upcoming features and bugfixes for a component will be added to the relevant milestone. 
If a feature or bugfix is not part of a milestone, it is currently unscheduled for implementation. 

The NATS Project consists of several components, including:
 
 * NATS 
   * Server (`gnatsd`) - http://github.com/nats-io/gnatsd
   * Clients - http://nats.io/download
 * NATS Streaming 
   * Server - http://github.com/nats-io/nats-streaming-server
   * Clients - http://nats.io/download
 * NATS Connectors - http://github.com/nats-io/nats-connector-framework
 * NATS Cloud (http://nats.cloud)




## Project Planning

An [Open-Source Planning Process](https://github.com/nats-io/roadmap/wiki/Open-Source-Planning-Process) is 
used to define the Roadmap. [Project Pages](https://github.com/nats-io/roadmap/wiki) define the 
goals for each Milestone and identify current progress.
Welcome! The NATS Master Roadmap can be found [here](https://github.com/nats-io/roadmap/wiki)


