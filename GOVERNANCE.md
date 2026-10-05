# NATS Governance

This document defines the project governance for NATS.

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
New maintainers must be proposed by an existing maintainer and must be elected by a 2/3 majority organization vote. Maintainers can be removed by a 2/3 majority organization vote or can resign by notifying the maintainers.

## Project Decision Making and Voting

The NATS project employs "organization voting" to ensure no single organization can dominate the project. Ideally, all project decisions are resolved by consensus, but if this is not possible, maintainers may call a vote.

Maintainers employed by a single company or organization are allowed one (1) organization vote (i.e. each company or organization regardless of the number of maintainers currently employed by that company/organization receives one (1) organization vote). Independent maintainers (not currently affiliated with a company/organization as part of their NATS.io maintainership) receive one (1) organization vote.

For example, if two maintainers are employed by Company X, two by Company Y, two by Company Z, and one maintainer is an independent individual, a total of four "organization votes" are possible; one for X, one for Y, one for Z, and one for the independent individual.

All maintainers from an organization may cast a vote for that organization. If more than one maintainer in a company/organization casts a vote, the vote will be awarded to the majority opinion for that company/organization.

For formal votes, a specific statement of what is being voted on should be added to the relevant Github issue or PR. Maintainers should indicate their yes/no vote on that issue or PR, and after a suitable period of time, the votes will be tallied and the outcome noted. A vote not received in the timeframe specified in the issue or PR will be marked as an abstained vote.

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
All changes in Governance require a 2/3 majority organization vote of the maintainers.

## Code of Conduct

NATS follows the CNCF Code of Conduct:

[https://github.com/cncf/foundation/blob/main/code-of-conduct.md](https://github.com/cncf/foundation/blob/main/code-of-conduct.md)
