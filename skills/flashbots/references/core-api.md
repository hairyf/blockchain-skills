---
name: MEV-Boost Builder API
description: HTTP API endpoints and request flow that mev-boost exposes to consensus clients and forwards to relays.
---

# MEV-Boost API

MEV-Boost implements the [Builder API](https://ethereum.github.io/builder-specs) as a proxy: the consensus client talks to MEV-Boost; MEV-Boost talks to relays.

## Endpoints (paths)

| Path | Purpose |
|------|---------|
| `GET /eth/v1/builder/status` | Health/status |
| `POST /eth/v1/builder/validators` | Register validator (signed registration payload) |
| `GET /eth/v1/builder/header/{slot}/{parent_hash}/{pubkey}` | Get best header for slot (MEV-Boost requests all relays, picks highest bid) |
| `POST /eth/v1/builder/blinded_blocks` | Submit signed blinded block; receive full payload (getPayload) |
| `POST /eth/v2/builder/blinded_blocks` | V2 variant of blinded blocks |

## Request flow (block proposal)

1. **registerValidator** — On startup / validator load, consensus client sends signed validator registration (fee recipient, gas limit, etc.) to MEV-Boost; MEV-Boost forwards to each relay.
2. **getHeader** — For a given `slot`, `parent_hash`, `pubkey`, MEV-Boost requests headers from every relay, verifies and compares bids, returns the single best header to the consensus client.
3. **getPayload (submitBlindedBlock)** — Consensus client sends the signed blinded beacon block; MEV-Boost identifies which relay had that bid, requests the full payload from that relay, verifies and returns it.

## Implementation notes for agents

- When simulating or testing the flow, use the same request/response shapes as the Builder Spec (JSON, specific field names).
- Relays are identified by URL; format is typically `https://<pubkey>@<host>`.
- Timeouts: `getHeader` and `getPayload` have configurable timeouts (defaults 950 ms and 4000 ms respectively); ensure consensus client deadlines are compatible.

<!--
Source references:
- https://github.com/flashbots/mev-boost (README.md, API section)
- https://ethereum.github.io/builder-specs
- sources/flashbots/server/params/paths.go
-->
