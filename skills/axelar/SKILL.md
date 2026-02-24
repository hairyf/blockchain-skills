---
name: axelar
description: Axelar network — cross-chain transfers, GMP, axelard CLI, nexus, EVM Gateway, axelarnet
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/axelarnetwork/axelar-core, scripts located at https://github.com/antfu/skills
---

> Skill is based on axelar-core (Git SHA f303a5a), generated 2026-02-24.

Axelar is a cross-chain overlay network (Cosmos SDK app **axelard**) that enables cross-chain asset transfers and General Message Passing (GMP) between EVM and Cosmos chains. The **nexus** module registers chains and assets and tracks transfers; the **evm** module manages Gateway contracts and signed commands on EVM chains; **axelarnet** handles IBC and Cosmos contract calls.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Overview | Network, axelard, Gateway, nexus, vald | [core-overview](references/core-overview.md) |
| Nexus | Chains, assets, transfers, deposit addresses, rate limits | [core-nexus](references/core-nexus.md) |

## Features

### EVM and Gateway

| Topic | Description | Reference |
|-------|-------------|-----------|
| EVM Gateway | Gateway contract, commands, batched execution, tokens | [features-evm-gateway](references/features-evm-gateway.md) |

### Cosmos / IBC

| Topic | Description | Reference |
|-------|-------------|-----------|
| Axelarnet | Cosmos chains, IBC, call-contract, route-message | [features-axelarnet](references/features-axelarnet.md) |

### Multisig and TSS

| Topic | Description | Reference |
|-------|-------------|-----------|
| Multisig & TSS | Keygen, key ID, rotation, vald | [features-multisig-tss](references/features-multisig-tss.md) |

### CLI

| Topic | Description | Reference |
|-------|-------------|-----------|
| CLI Queries | Query patterns for nexus, evm, multisig | [features-cli-queries](references/features-cli-queries.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Rate limits and fees | Rate limits, transfer fees, chain maintainers | [best-practices-rate-limits-and-fees](references/best-practices-rate-limits-and-fees.md) |
