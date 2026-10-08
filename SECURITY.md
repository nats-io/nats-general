# Security Policy

## Reporting Security Issues

The NATS maintainers take security seriously. We appreciate your efforts to responsibly disclose your findings.

We **do NOT provide a bug bounty program**.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them through either:

 * GitHub private vulnerability reporting
   + eg, for the [nats-server](https://github.com/nats-io/nats-server/security/advisories/new)
   + eg, for the [nats.go](https://github.com/nats-io/nats.go/security/advisories/new) client library
 * or, as a last resort, via email to <mailto:security@nats.io>
   + but we prefer using the GitHub flow

Please verify that issues are for the latest code, and that AI-generated
results are not false positive, and in line with our advisory policy.

Our advisory policy is published at <https://advisories.nats.io/advisory-policy>
and documents what is and is not a vulnerability.

All published advisories, across the entire NATS ecosystem, are published at
<https://advisories.nats.io/>.  Some subset of advisories for individual
components are also available as GHSA reports in GitHub on the applicable
repositories.

Note that the NATS Maintainers use frontier AI models to scan for security
issues ourselves, so the vast majority of AI reports today are duplicates of
fixes awaiting release.

When filing a report, please include:

* Description of the vulnerability
* Steps to reproduce the issue
* Affected versions
* Any potential impact you have identified


## Supported Versions

The NATS Maintainers normally support the most recent two series of releases,
in a pattern modelled after that of Go.  Where feasible, we will backport all
security fixes to those two series.

We reserve the right, in exceptional situations, to only backport to the
latest release series and drop support for the older one.
(This has never yet happened, but with extensive enough refactoring, it might
conceivably happen).


## Response Timeline

The NATS security team will acknowledge receipt of your report within 5 business days,
and will provide an estimated timeline for a fix (if applicable) within 10 business days.

The team will keep you informed of progress toward a fix and may ask for additional information.


## Disclosure Policy

When a security issue is confirmed, the NATS team will:

1. Develop and test a fix
2. Assign a secnote identifier if appropriate
   + A CVE will be requested, but release will not block upon a CVE being issued in time
3. Release a patched version
4. Publish a security advisory at <https://advisories.nats.io>.

The NATS team will, at their discretion, include people from outside NATS (eg,
to resolve upstream library issues), but will ensure that fixes are made
available to the public at the same time as they are made available to anyone
not directly involved in remediation of a particular issue.  There is no early
access program.


## Security Response Team

The Security Response team handles all reports of security vulnerabilities according to this policy.

At this time, the Maintainers can choose people to be present on the Security
team, and there is no more formalized process than a Maintainer vote as
needed.

### Who has access

#### GitHub

The GitHub private vulnerability reports are received by the administrators of
the repository chosen, which should be:
 1. the NATS Maintainers for that part of the ecosystem
 2. those NATS Maintainers chosen to be GitHub Organization Owners
 3. CNCF Enterprise Owners who are in in the NATS Organization

Primary responsibility for addressing issues lies with the NATS Maintainers
for that part of the ecosystem (eg, the Server maintainers for `nats-server`),
with the NATS Maintainers who are Organization owners having some oversight to
cover for shortfalls.

#### security@nats.io

This mailing-list contains a subset of NATS Maintainers, as chosen by the NATS
Maintainers.

At any given time, the list might have an alternative canonical name, to deal
with vagaries of the email setup, but it will always:
 * be restricted to official Maintainers
 * not be restricted to any one company

### The Security Response team

The Security Response team is those people who receive email from
security@nats.io and membership is:
 * anyone who has been through a NATS Maintainers vote;
 * anyone an existing member of the security team has added, at their
   discretion, choosing from NATS Maintainers (and only NATS Maintainers).

To date, the majority of members are those who were just grabbed for their
expertise and breadth of knowledge, rather than being formally voted.

Membership is not tied to employment by any company.  But equally, no member
can be forced to work for free on a sometimes stressful role, so in practice
people have chosen to not remain "on the hook" when not working for a company
directly supporting NATS.  Anyone can step down at any time.

Much security discussion takes place in Slack in a Team which is on a paid
tier (for history retention).  That Slack is run by Synadia Communications,
which has committed to adding external guests as needed, for non-Synadia NATS
Security team people as needed.

#### Conflicts of Interest

To date, all discussions regarding what suits the employer of a NATS
Maintainer versus what suits the NATS project have always explicitly looked to
what the NATS project needs and how to be responsible stewards.

Should there be a conflict of interest where this does not happen, this can be
raised to the NATS Maintainers or to the CNCF as a whole, but it hasn't
happened yet.  We have looked at how to formalize it but have settled on
waiting until an issue is raised, rather than trying to foresee all
eventualities.  The channels exist to raise disputes and that is sufficient.
