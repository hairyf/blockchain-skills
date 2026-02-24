---
name: arbitrum
description: Arbitrum Nitro L2 stack—architecture, ADRs, gas model, BOLD dispute protocol, and repo conventions.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/OffchainLabs/nitro
---

> Skill is based on Arbitrum Nitro (OffchainLabs/nitro), generated from source at the listed date. Main docs live at [nitro-docs](https://github.com/OffchainLabs/nitro-docs) and [developer.arbitrum.io](https://developer.arbitrum.io/).

Nitro is the current Arbitrum L2 stack: Geth for execution, ArbOS for L2 chain services (bridges, batching, compression), and WASM-based interactive fraud proofs. The Nitro repo contains the node implementation, ADRs, and the BOLD dispute protocol integration; run/build and operator docs are in the external documentation.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Nitro overview | Stack (Geth, ArbOS, WASM proofs), where docs live, audits | [core-about](references/core-about.md) |
| ADRs | MADR format, templates, adding decisions under `docs/decisions/` | [core-decisions-adr](references/core-decisions-adr.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Multi-dimensional gas | ResourceKind categories, L1/L2 calldata, WASM (Stylus) metering | [features-multidimensional-gas](references/features-multidimensional-gas.md) |
| BOLD protocol | Dispute system, assertion poster/scanner, edge trackers, L2 state provider | [features-bold-protocol](references/features-bold-protocol.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Changelog fragments | Format, sections (Added/Changed/Configuration/Ignored), one file per PR | [best-practices-changelog](references/best-practices-changelog.md) |
| Constraint types (Go) | Avoid primitive constraint wrappers; keep checks at call sites | [best-practices-constraint-types](references/best-practices-constraint-types.md) |
