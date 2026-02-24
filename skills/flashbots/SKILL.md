---
name: flashbots
description: MEV-Boost middleware for PoS Ethereum — proposer-builder separation, relays, timing games, and Builder API.
metadata:
  author: hairy
  version: "2026.02.24"
  source: Generated from https://github.com/flashbots/mev-boost, scripts located at https://github.com/antfu/skills
---

> Skill based on mev-boost (flashbots/mev-boost), generated at 2026-02-24.

MEV-Boost is open-source middleware run by validators to access a competitive block-building market. It implements out-of-protocol proposer-builder separation (PBS): relays aggregate blocks from builders, and MEV-Boost selects the highest bid for the consensus client.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| PBS overview | Roles (validators, relays, builders), block proposal flow | [core-pbs-overview](references/core-pbs-overview.md) |
| Builder API | Endpoints (status, registerValidator, getHeader, getPayload), request flow | [core-api](references/core-api.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Relays and CLI | Relay URLs, network flags, min-bid, relay-check, timeouts, metrics | [features-relays-config](references/features-relays-config.md) |
| Timing games | Delaying and repeating getHeader to capture better bids; YAML config | [features-timing-games](references/features-timing-games.md) |
| YAML config | Config file path, hot reload, structure, relay list | [features-config-yaml](references/features-config-yaml.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Validator and relay | Trust assumptions, relay selection, min-bid, proposer boost, security | [best-practices-validator](references/best-practices-validator.md) |

## Advanced

| Topic | Description | Reference |
|-------|-------------|-----------|
| test-cli | Generate validator data, register, getHeader, getPayload for testing | [advanced-test-cli](references/advanced-test-cli.md) |
