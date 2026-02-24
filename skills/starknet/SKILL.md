---
name: starknet
description: Starknet JSON-RPC and Wallet API specifications—node read/write/trace/WS, wallet RPC, types, and versioning.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/starkware-libs/starknet-specs, scripts at https://github.com/antfu/skills
---

> Skill based on Starknet specs (starkware-libs/starknet-specs), generated from `sources/starknet`. Doc path: `sources/starknet/` (README.md, starknet_vs_ethereum_node_apis.md, api/release.md, api/*.json, wallet-api/wallet_rpc.json).

Starknet specifications define the node JSON-RPC API (read, write, trace, WebSocket) and the Wallet RPC for dApp–wallet interaction. The node API mirrors Ethereum naming with a `starknet_` prefix and uses field elements, block tags, and structured errors. Use this skill when implementing or calling Starknet RPC clients, indexers, or wallet integrations.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Overview and types | Field elements, block tags, naming, result key | [core-overview-and-types](references/core-overview-and-types.md) |
| RPC method mapping | Ethereum → Starknet method mapping and differences | [core-rpc-method-mapping](references/core-rpc-method-mapping.md) |

## Features

### Node API

| Topic | Description | Reference |
|-------|-------------|-----------|
| Node read API | Blocks, transactions, state, call, events, chain info | [features-node-read-api](references/features-node-read-api.md) |
| Node write API | addInvokeTransaction, addDeclareTransaction, addDeployAccountTransaction | [features-node-write-api](references/features-node-write-api.md) |
| WebSocket API | Subscriptions (new heads, events, tx status, receipts, reorgs) | [features-websocket-api](references/features-websocket-api.md) |
| Trace API | traceTransaction, simulateTransactions, traceBlockTransactions | [features-trace-api](references/features-trace-api.md) |
| Executables API | getCompiledCasm | [features-executables-api](references/features-executables-api.md) |

### Wallet

| Topic | Description | Reference |
|-------|-------------|-----------|
| Wallet API | supportedSpecs, requestAccounts, permissions, signing | [features-wallet-api](references/features-wallet-api.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| API versioning | Draft / RC / Recommendation, semver, release process | [best-practices-api-versioning](references/best-practices-api-versioning.md) |
