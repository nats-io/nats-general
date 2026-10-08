# NATS Governance

This document defines the project governance for NATS.

## Table of Contents

- [Principles](#principles)
- [Maintainer Roles](#maintainer-roles)
- [Active Maintainer Role Expectations](#active-maintainer-role-expectations)
- [Emeritus Status](#emeritus-status)
  - [Returning to Active Maintainer Status](#returning-to-active-maintainer-status)
- [Changes in Maintainership](#changes-in-maintainership)
- [Project Decision Making and Voting](#project-decision-making-and-voting)
  - [Decision Making](#decision-making)
  - [Formal Votes](#formal-votes)
- [Maintainer Affiliation Changes](#maintainer-affiliation-changes)
- [Maintainer Offboarding](#maintainer-offboarding)
  - [Voluntary Offboarding](#voluntary-offboarding)
  - [Removal of a Maintainer](#removal-of-a-maintainer)
  - [Access and Ownership Transition](#access-and-ownership-transition)
- [GitHub Project Administration](#github-project-administration)
- [Approving and Merging PRs](#approving-and-merging-prs)
- [Changes in Governance](#changes-in-governance)
- [NATS Sub-project Governance](#nats-sub-project-governance)
  - [Sub-project Addition/Removal Process](#sub-project-additionremoval-process)
  - [Community-Contributed Projects](#community-contributed-projects)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Review and Acceptance](#review-and-acceptance)
  - [Transition into the Project](#transition-into-the-project)
  - [Project or Repository Archival](#project-or-repository-archival)
- [Code of Conduct](#code-of-conduct)

## Principles

The NATS community adheres to the following principles:

- Open: NATS is open source. See repository guidelines and processes below.
- Welcoming and respectful: See Code of Conduct, below.
- Transparent and accessible: Work and collaboration are done in public.
- Merit: Ideas and contributions are accepted according to their technical merit and alignment with project objectives, scope, and design principles.

## Maintainer Roles

- Active Maintainers, are active within the nats-io organization and have been voted in via the voting process outlined below.
- Emeritus Maintainers, are inactive Maintainers that have chosen to step away from active project maintenance but are listed to preserve their contributions to the nats-io organization.

## Active Maintainer Role Expectations
Overall, Maintainers are responsible for the project as a whole and are expected to guide the general project direction as well as be the final reviewer on PRs and perform releases.
Maintainers may be specifically responsible for one or more components within a project, and are expected to contribute code and documentation, review PRs including ensuring quality of code, triage issues, proactively fix bugs, and perform maintenance tasks for these components.

## Emeritus Status
Emeritus status recognizes the individual's past contributions to NATS while indicating that they are no longer responsible for the project's day-to-day maintenance or governance.

A Maintainer may request Emeritus status voluntarily. The active Maintainers may also propose an Emeritus transition when a Maintainer has been inactive for an extended period and will follow the process for voting in the Project Decision Making and Voting section.

When a Maintainer transitions to Emeritus status:

- The change will be recorded in the project's Maintainer documentation.
- GitHub or other elevated permissions that are only required by active Maintainers may be removed.
- The individual will continue to be recognized as an Emeritus Maintainer but will have no voting rights.
- The transition should be recorded through a public pull request whenever practical.

Emeritus status is not intended as a disciplinary action and does not prevent an individual from continuing to participate in the NATS community.

### Returning to Active Maintainer Status

An Emeritus Maintainer who resumes sustained participation in the project may request a return to Active Maintainer status.

Before returning, the individual should demonstrate renewed familiarity with the current state of the project, its development practices, governance, and Maintainer responsibilities. Reactivation will follow the project's standard Maintainer approval process. Once approved, the Maintainer will be restored to the appropriate Maintainer lists, teams, communication channels, and repository permissions.

## Changes in Maintainership
New maintainers must be proposed by an existing maintainer and must be elected by a [formal vote](#formal-votes). Maintainers can be removed by a formal vote or can resign by notifying the maintainers.

## Project Decision Making and Voting

NATS governance is asynchronous. There is no standing governance meeting; proposals, discussion, and decisions happen in public on GitHub. Maintainers may meet ad hoc, but a decision reached in a meeting, on Slack, or on the mailing list takes effect only once it is recorded in the relevant GitHub issue or pull request.

### Decision Making

Decisions are made by consensus by default: a proposal made in public proceeds unless a Maintainer raises an objection that is not resolved through discussion. No formal tally is taken for these decisions.

Decisions are discussed and recorded in these places:

- Governance, including maintainer changes, changes to this document, adding sub-projects, and archiving or removing repositories: issues and pull requests in [nats-io/nats-general](https://github.com/nats-io/nats-general).
- Technical design that spans the server and clients: Architecture Decision Records in [nats-io/nats-architecture-and-design](https://github.com/nats-io/nats-architecture-and-design).
- Work within a single repository: that repository's issues and pull requests, under [Approving and Merging PRs](#approving-and-merging-prs).

The community Slack and Google Group are for discussion. Nothing decided there is final until it is recorded on GitHub.

Adding a sub-project, whether Maintainer-created or community-contributed, and archiving or removing a repository are proposed as an issue in nats-general. If no Maintainer objection remains unresolved, the proposal proceeds and the outcome is noted on the issue. If an objection cannot be resolved, any Maintainer may call a formal vote.

### Formal Votes

A formal vote is always required for:

- Adding a Maintainer, including returning an Emeritus Maintainer to active status.
- Removing a Maintainer, or moving a Maintainer to Emeritus status without their request.
- Changes to this governance document.

These votes pass with at least 2/3 of the organization votes cast. Any other decision goes to a formal vote when consensus cannot be reached and a Maintainer calls one; it passes with more than half of the organization votes cast, and a tie fails. Abstentions, and votes not received by the deadline, are not counted as votes cast.

The NATS project employs "organization voting" to ensure no single organization can dominate the project.

Maintainers employed by a single company or organization are allowed one (1) organization vote (i.e. each company or organization regardless of the number of maintainers currently employed by that company/organization receives one (1) organization vote). Independent maintainers (not currently affiliated with a company/organization as part of their NATS.io maintainership) receive one (1) organization vote.

For example, if two maintainers are employed by Company X, two by Company Y, two by Company Z, and one maintainer is an independent individual, a total of four "organization votes" are possible; one for X, one for Y, one for Z, and one for the independent individual.

All maintainers from an organization may cast a vote for that organization. If more than one maintainer in a company/organization casts a vote, the vote will be awarded to the majority opinion for that company/organization; an even split counts as an abstention for that organization. A Maintainer's organization is the affiliation listed in [MAINTAINERS.md](MAINTAINERS.md) when the vote opens.

Any Maintainer may call a formal vote by opening an issue in nats-general, or for a governance change, on its pull request, labeled `vote`. It states what is being voted on, the threshold, and a deadline, and mentions all active Maintainers. Maintainers reply Yes, No, or Abstain. After the deadline, the Maintainer who called the vote posts the tally, listing each organization, how its Maintainers voted, and the resulting organization vote, then states the outcome and closes the issue, or merges or closes the pull request. All formal votes are listed under the [`vote` label](https://github.com/nats-io/nats-general/labels/vote).

## Maintainer Affiliation Changes

Maintainer roles are held by individuals based on their contributions to and responsibilities within the project and are not tied to employment by, or affiliation with, a particular company or organization.

Maintainers are expected to keep their organizational affiliation current in the project's Maintainer documentation.

When a Maintainer changes employers, becomes independent, or otherwise changes their organizational affiliation, the Maintainer should:

- Notify the other Maintainers of the affiliation change.
- Update their affiliation in the project's Maintainer documentation through a pull request.
- Update any other project or CNCF records where affiliation is maintained, as appropriate.
- Review any project access, accounts, credentials, or resources that may have been provided through their previous organization and ensure that project responsibilities do not depend on employer-controlled resources.

A change in organizational affiliation does not, by itself, change an individual's Maintainer status, responsibilities, voting rights, or project permissions. If an affiliation change affects the Maintainer's ability to continue performing their project responsibilities, the Maintainer and the other active Maintainers should determine whether responsibilities need to be reassigned or whether transition to Emeritus status is appropriate.

The project will periodically review Maintainer affiliations to ensure that published information remains accurate and that project governance continues to reflect the individuals and organizations participating in project stewardship.

## Maintainer Offboarding

A Maintainer may leave their role voluntarily or may be removed through the project's established governance and voting process. In either case, the project will make reasonable efforts to ensure an orderly transition of the Maintainer's responsibilities and ongoing work.

### Voluntary Offboarding

A Maintainer who wishes to step down should notify the other Maintainers and, when possible, provide sufficient notice to allow their responsibilities to be transitioned.

The departing Maintainer should work with the remaining Maintainers to identify and transition responsibilities, including as applicable:

- Open issues, pull requests, and technical initiatives they are leading
- Release or operational responsibilities
- Repository, CI/CD, infrastructure, or automation ownership
- Security-related responsibilities
- Documentation or community responsibilities
- Other project-specific knowledge or work requiring continuity

Where appropriate, ownership of ongoing work should be transferred to another Maintainer or documented so that another contributor can assume responsibility.

Following the transition, the Maintainer may move to Emeritus Maintainer status if appropriate.

### Removal of a Maintainer

A Maintainer may be removed from their role through the project's established governance and voting process.

When a Maintainer is removed, the remaining Maintainers are responsible for reviewing the departing Maintainer's areas of ownership and ensuring that critical responsibilities and ongoing work are reassigned.

Removal should include a review of:

- Open issues, pull requests, and technical initiatives owned or led by the departing Maintainer
- Release, infrastructure, automation, or operational responsibilities
- Security responsibilities and access
- Project documentation and ownership records
- GitHub teams and repository permissions
- Project communication channels and other privileged project resources

When direct knowledge transfer from the departing Maintainer is not possible, the remaining Maintainers will identify new owners and document any information necessary to maintain project continuity.

### Access and Ownership Transition

As part of either voluntary or involuntary offboarding, project access should be reviewed and updated in a timely manner. Non-active maintainers will be removed from the nats-io organization.

The Maintainers should verify that ongoing responsibilities have an identified owner and that the departure does not create a material gap in the project's ability to maintain, release, secure, or govern the project.

## GitHub Project Administration
Maintainers will be added to the NATS GitHub organization. Departing or Emeritus status Maintainers will be removed from the nats-io organization.

## Approving and Merging PRs
All PRs must receive approval from at least one maintainer prior to merging.

## Changes in Governance
All changes in Governance require a [formal vote](#formal-votes) of the maintainers.

## NATS Sub-project Governance
The subprojects of NATS are a collection of clients, libraries, tools, and reference repositories. These sub-projects are closely related to the main project, serving as essential supplements that need to be released synchronously with the main version of nats-server when necessary. Some sub-projects are for exploratory/experimental development purposes.

### Sub-project Addition/Removal Process
Sub-projects are established via Maintainer creation or community-donated, Maintainer-reviewed addition. Both follow [Decision Making](#decision-making).

### Community-Contributed Projects

The NATS project welcomes community-developed projects that extend, integrate with, or otherwise provide meaningful functionality for the NATS ecosystem.

Community-contributed projects may be considered for inclusion within the NATS project when they demonstrate clear relevance to NATS and provide value that is appropriate to maintain or make available as part of the broader project.

### Acceptance Criteria

A community-contributed project may be considered for inclusion when it:

- Has a clear and meaningful relationship to NATS, such as providing an integration, client, tooling, operational capability, interoperability feature, or other functionality that benefits NATS users.
- Addresses a use case or capability that is reasonably relevant to the NATS community and complements the existing project ecosystem.
- Provides sufficient value or utility to justify its inclusion within the NATS project rather than remaining an independently maintained third-party project.
- Is technically compatible with the NATS project and does not unnecessarily duplicate existing functionality without a clear reason or benefit.
- Has sufficient documentation, testing, and code quality to allow the project to be reasonably evaluated and maintained.
- Uses a license compatible with the NATS project and CNCF requirements.
- Does not introduce dependencies, ownership arrangements, or other restrictions that would compromise the vendor-neutral governance of the NATS project.
- Has an identified maintainer or group of contributors willing to support the project during its transition and, where appropriate, after its acceptance.

Meeting these criteria does not automatically result in acceptance.

### Review and Acceptance

A proposal to include a community-contributed project should be submitted to the NATS maintainers for review. The proposal should describe:

- The purpose of the project and the problem it addresses.
- Its relationship and relevance to NATS.
- The expected benefit to the NATS community.
- Existing adoption or community usage, when available.
- Current maintainers and contributors.
- Any ongoing maintenance, infrastructure, security, or release requirements.
- The proposed location and ownership of the project within the NATS organization.

The Maintainers will evaluate the project based on its technical merit, relevance to NATS, benefit to the community, maintainability, security considerations, and alignment with the project's long-term direction.

Acceptance follows [Decision Making](#decision-making).

Acceptance of a community-contributed project does not provide any company, contributor, or organization with additional governance rights or preferential status within the NATS project.

### Transition into the Project

When a community-contributed project is accepted, the existing contributors and NATS Maintainers will coordinate the transition of the project into the NATS organization.

The transition should identify:

- The Maintainers responsible for the project.
- Repository ownership and permissions.
- Release and publishing responsibilities.
- CI/CD and other infrastructure requirements.
- Security and vulnerability reporting responsibilities.
- Documentation and support expectations.
- Any external accounts, credentials, package registries, domains, or other resources that need to be transferred or placed under project control.

Community contributors may continue to maintain the project subject to the same governance, contribution, and Maintainer requirements applicable to other NATS projects.

Projects accepted into the NATS organization become subject to NATS project governance and applicable CNCF policies.

### Project or Repository Archival

A sub-project or repository within the NATS organization may be considered for archival or removal when it is no longer actively maintained, is no longer relevant to the NATS ecosystem, has been superseded by another project or capability, or no longer provides sufficient value to justify continued maintenance within the organization. Before archiving or removing a repository, the Maintainers will consider its current usage, dependencies, security and support implications, and whether users require a reasonable migration or deprecation period. The decision follows [Decision Making](#decision-making) and, when practical, will be communicated publicly before the change takes effect.

Archived repositories should clearly indicate their status and, where applicable, direct users to a supported alternative. Removal from the NATS organization should generally be reserved for repositories that are inappropriate to retain, have been transferred to another responsible organization, or present legal, security, or other circumstances for which archival is insufficient.

## Code of Conduct

NATS follows the CNCF Code of Conduct:

[https://github.com/cncf/foundation/blob/main/code-of-conduct.md](https://github.com/cncf/foundation/blob/main/code-of-conduct.md)
