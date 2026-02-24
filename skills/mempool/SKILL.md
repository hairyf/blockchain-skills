---
name: mempool
description: Mempool.space REST and WebSocket API for Bitcoin (and Liquid) mempool, blocks, transactions, addresses, fees, mining, and Lightning explorer.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/mempool/mempool, scripts located at https://github.com/antfu/skills
---

> Skill is based on mempool (mempool.space) backend and frontend API surface, generated at 2026-02-24.

Mempool is the open-source mempool visualizer, block explorer, and API service behind mempool.space. It provides REST and WebSocket APIs for fees, blocks, transactions, addresses (with Electrum/Esplora), mining pools and hashrate, optional Lightning explorer, and Liquid assets. Use this skill when building agents or tools that query or stream Bitcoin/Liquid chain and mempool data.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| REST API overview | Base URL, prefix `/api/v1/`, main endpoint groups | [core-rest-api](references/core-rest-api.md) |
| WebSocket | Live blocks, mempool-blocks, stats, want/track actions | [core-websocket](references/core-websocket.md) |
| Configuration | mempool-config.json, env overrides, backend behavior | [core-configuration](references/core-configuration.md) |

## Features

### Fees and Mempool

| Topic | Description | Reference |
|-------|-------------|-----------|
| Fees and mempool state | Recommended/precise fees, mempool blocks, transaction times, CPFP | [features-fees-mempool](references/features-fees-mempool.md) |

### Blocks and Transactions

| Topic | Description | Reference |
|-------|-------------|-----------|
| Blocks and transactions | Block list/hash/txids/txs, tx status/outspends, push tx, RBF | [features-blocks-transactions](references/features-blocks-transactions.md) |

### Addresses

| Topic | Description | Reference |
|-------|-------------|-----------|
| Addresses and scripthash | Address stats, txs, UTXO, validation (Electrum/Esplora) | [features-addresses](references/features-addresses.md) |

### Liquid and Lightning

| Topic | Description | Reference |
|-------|-------------|-----------|
| Liquid | Assets, icons, supply (Liquid network) | [features-liquid](references/features-liquid.md) |
| Lightning and mining | Lightning search/nodes/channels; mining pools, hashrate, statistics | [features-lightning-mining-statistics](references/features-lightning-mining-statistics.md) |

### Services

| Topic | Description | Reference |
|-------|-------------|-----------|
| Acceleration and services | Accelerator API, wallet/stratum when enabled | [features-acceleration-services](references/features-acceleration-services.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| API usage | Network selection, init-data vs WebSocket, pagination, 503 handling | [best-practices-api-usage](references/best-practices-api-usage.md) |
