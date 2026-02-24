---
name: optimism
description: OP Stack protocol—derivation, bridges, deposits/withdrawals, predeploys, fault proofs, and system config for L2 tooling and integration.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ethereum-optimism/specs, scripts at https://github.com/antfu/skills
---

> Skill based on OP Stack specs (ethereum-optimism/specs), generated from `sources/optimism`. Doc path: `sources/optimism/specs/`.

The OP Stack is the software stack powering Optimism (OP Mainnet), Base, and other L2s. It defines how the L2 chain is derived from L1, how deposits and withdrawals work, standard predeploys/precompiles, fault proof components, and system configuration. Use this skill when building or debugging L2 nodes, batchers, bridges, withdrawal tooling, or contract integrations.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Protocol overview | Architecture, L1/L2 contracts, rollup node, derivation loop, Engine API | [core-overview](references/core-overview.md) |
| Derivation | Sequencing window, batch/channel format, pipeline, payload attributes, Engine API versions | [core-derivation](references/core-derivation.md) |
| Bridges and messaging | Standard bridges, deposits (0x7E), withdrawals (prove/finalize), cross-domain messengers | [core-bridges-and-messaging](references/core-bridges-and-messaging.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Predeploys and precompiles | L2 predeploy addresses and interfaces; P256VERIFY and other precompiles | [features-predeploys-precompiles](references/features-predeploys-precompiles.md) |
| Fault proof | Program, VM, dispute game, pre-image oracle, L1 dispute contracts | [features-fault-proof](references/features-fault-proof.md) |
| Batcher and SystemConfig | Batch submitter loop; SystemConfig (batch inbox, batcher hash, fee scalars) | [features-batcher-and-system-config](references/features-batcher-and-system-config.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Deposits and withdrawals | Address aliasing on deposits, no aliasing on withdrawals, using l2Sender() on L1 | [best-practices-deposits-withdrawals](references/best-practices-deposits-withdrawals.md) |
