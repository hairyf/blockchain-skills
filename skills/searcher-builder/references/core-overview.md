---
name: Builder API overview
description: Ethereum Builder API purpose, proposer-builder separation context, and endpoint summary for block building.
metadata:
  author: hairy
---

# Builder API Overview

The Builder API is an interface for consensus-layer (CL) clients to obtain blocks built by external **builders**. It enables **proposer-builder separation (PBS)**: validators delegate block building to builders who compete on bid value; the proposer receives a blinded execution header and a payment, signs a blinded block, then the builder reveals the full payload.

## Roles

- **Builder**: Builds execution payloads, registers validator preferences, returns `SignedBuilderBid` for a slot/parent/pubkey, and reveals `ExecutionPayload` (and blobs when applicable) when the proposer submits a valid `SignedBlindedBeaconBlock`.
- **Proposer (validator)**: Registers with builders, requests a header via `getHeader`, signs the blinded block, then either receives the payload (v1) or relies on the builder to publish (v2).

Proposers typically connect to builders through **relays** or **builder multiplexers** (e.g. mev-boost, mev-rs, commit-boost).

## Base URL and versioning

- **Default base URL:** `http://localhost:18550` (configurable `server_url`).
- **Paths:** Under `/eth/v1/builder/` or `/eth/v2/builder/`; endpoints are **individually versioned** (v1 vs v2 is per-path, not a global API version).

## Endpoints summary

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/eth/v1/builder/validators` | Register or update validator block-building preferences (fee recipient, gas limit). |
| GET | `/eth/v1/builder/header/{slot}/{parent_hash}/{pubkey}` | Get execution payload header (SignedBuilderBid) for a slot. |
| POST | `/eth/v1/builder/blinded_blocks` | Submit signed blinded block; receive unblinded execution payload (v1, deprecated after Fulu). |
| POST | `/eth/v2/builder/blinded_blocks` | Submit signed blinded block; builder publishes block and blobs (v2). |
| GET | `/eth/v1/builder/status` | Health check. |

## Consensus versions

Supported consensus versions in payloads and headers: `bellatrix`, `capella`, `deneb`, `electra`, `fulu`. Response shapes (e.g. blob commitments, execution_requests) depend on the fork.

<!--
Source references:
- sources/searcher-builder/README.md
- sources/searcher-builder/builder-oapi.yaml
-->
