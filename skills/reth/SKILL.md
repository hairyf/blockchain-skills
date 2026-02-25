---
name: reth
description: Reth — modular Ethereum execution client (Rust); node, sync, RPC, storage, networking.
metadata:
  author: Hairy
  version: "2026.2.25"
  source: Generated from https://github.com/paradigmxyz/reth, scripts at https://github.com/antfu/skills
---

> Skill based on reth (paradigmxyz/reth), generated 2026-02-25. User docs: https://reth.rs

Reth is a modular, high-performance Ethereum full node in Rust. Execution layer compatible with Engine API. Uses staged sync, MDBX + static files, revm, and jsonrpsee RPC.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Project Layout | Crate structure, storage, net, stages, RPC, node | [core-project-layout](references/core-project-layout.md) |
| Database | DB trait, tables, DbTx/DbTxMut, codecs, providers | [core-database](references/core-database.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Staged Sync | Pipeline stages, HeaderStage, BodyStage, ExecutionStage, unwind | [features-staged-sync](references/features-staged-sync.md) |
| Networking | P2P tasks, NetworkConfig, FetchClient, ETH requests, tx propagation | [features-networking](references/features-networking.md) |
| RPC | Namespaces, transports, engine API, rpc-builder | [features-rpc](references/features-rpc.md) |
| Node Builder | Configuring and running a node programmatically | [features-node-builder](references/features-node-builder.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Development | Build, test, lint, PR workflow, commenting | [best-practices-development](references/best-practices-development.md) |

## External Links

- [reth.rs](https://reth.rs) — user docs
- [paradigmxyz/reth](https://github.com/paradigmxyz/reth)
- [Engine API spec](https://github.com/ethereum/execution-apis)
