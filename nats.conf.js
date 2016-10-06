'use strict'

module.exports = {
  // Name of the organization or project this roadmap is generated for
  organization: 'NATS.io',

  // Include open and closed milestones where due date is after milestonesStartDate
  milestonesStartDate: '2016-09-01T00:00:00Z', // ISO formatted timestamp

  // Include open and closed milestones where due date is before milestonesEndDate
  milestonesEndDate: '2017-06-01T00:00:00Z', // ISO formatted timestamp

  // Github repository to open open a Pull Request with the generated roadmap
  targetRepo: "nats-io/roadmap",

  // List of projects that this roadmap covers
  projects: [
    {
      name: "NATS Overall",
      repos: [
        "nats-io/roadmap",
      ],
    },
    {
      name: "NATS Server",
      repos: [
        "nats-io/gnatsd",
      ],
    },
    {
      name: "NATS Streaming",
      repos: [
        "nats-io/nats-streaming-server",
      ],
    },
  ]
}
