---
name: searcher-builder
description: Ethereum Builder API (builder-specs) for proposer-builder separation — validator registration, getHeader, submit blinded block, and fork-specific payloads.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ethereum/builder-specs, scripts located at https://github.com/antfu/skills
---

> Skill is based on Ethereum builder-specs (Builder API), generated at 2026-02-24.

The Builder API lets consensus-layer clients obtain blocks from external builders (proposer-builder separation). It covers validator registration, fetching execution payload headers (bids), submitting signed blinded blocks, and fork-specific types (Bellatrix through Fulu). Use this skill when implementing or integrating with builders, relays, or validator tooling that speak the Builder API.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Builder API overview | Purpose, PBS context, roles, base URL, endpoint summary | [core-overview](references/core-overview.md) |
| Endpoints | Validators, getHeader, blinded_blocks v1/v2, status — request/response | [core-endpoints](references/core-endpoints.md) |
| Types and signing | ValidatorRegistration, BuilderBid, SignedBuilderBid, blinded blocks, DOMAIN_APPLICATION_BUILDER | [core-types-and-signing](references/core-types-and-signing.md) |

## Features

### Registration and bidding

| Topic | Description | Reference |
|-------|-------------|-----------|
| Validator registration | Eligibility, process_registration, validation rules | [features-registration](references/features-registration.md) |
| getHeader and bidding | Bid eligibility, constructing BuilderBid, getHeader semantics | [features-get-header-and-bidding](references/features-get-header-and-bidding.md) |
| Submit blinded block | v1 vs v2, verification, payload reveal, builder publish | [features-submit-blinded-block](references/features-submit-blinded-block.md) |
| Fork versions | Bellatrix/Capella/Deneb/Electra/Fulu bid and payload differences | [features-fork-versions](references/features-fork-versions.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Encoding and headers | JSON vs SSZ, Content-Type, Accept, Eth-Consensus-Version, optional headers | [best-practices-encoding-and-headers](references/best-practices-encoding-and-headers.md) |
| Bid value verification | Deneb+ excluding withdrawals from bid value, relay verification | [best-practices-bid-value-verification](references/best-practices-bid-value-verification.md) |
