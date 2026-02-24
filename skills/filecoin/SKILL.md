---
name: filecoin
description: Lotus (Filecoin) node — chain, state, mpool, API, mining, events, and operations.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/filecoin-project/lotus, scripts located at https://github.com/antfu/skills
---

> Skill based on Lotus (filecoin-project/lotus), generated at 2026-02-24.

Lotus is the reference implementation of the Filecoin Distributed Storage Network. It provides a full node (lotus), storage miner (lotus-miner), and worker (lotus-worker) with JSON-RPC API for chain, state, message pool, gas, market, payment channels, multisig, and (when enabled) Eth and Actor Events.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Architecture | Tipsets, actors, sync, state, VM, repo, network flow, bitswap | [core-architecture](references/core-architecture.md) |
| CLI | lotus, lotus-miner, lotus-worker commands and common usage | [core-cli](references/core-cli.md) |
| API | API groups and key methods — Chain, State, Mpool, Gas, Market, Eth, Events | [core-api](references/core-api.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Message pool | Mpool API, CLI, config, message selection | [features-mpool](references/features-mpool.md) |
| Actor events | GetActorEventsRaw, SubscribeActorEventsRaw, event schemas | [features-actor-events](references/features-actor-events.md) |
| Block validation | Incoming block validation flow — PubSub, Syncer, VM checks | [features-block-validation](references/features-block-validation.md) |
| Mining and sealing | Create miner, owner/worker, sealing and PoRep concepts | [features-mining-and-sealing](references/features-mining-and-sealing.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Gas balancing | Syscall gas calibration with lotus-bench (full and targeted) | [best-practices-gas](references/best-practices-gas.md) |
| ChainIndexer | Enable, backfill, GC for Eth and Actor Events APIs | [best-practices-chain-indexer](references/best-practices-chain-indexer.md) |
| Config and environment | API, libp2p, repo paths, Fevm/Events/ChainIndexer, logging | [best-practices-config](references/best-practices-config.md) |

## External Links

- [Lotus docs](https://lotus.filecoin.io)
- [Filecoin spec](https://spec.filecoin.io)
- [filecoin-project/lotus](https://github.com/filecoin-project/lotus)
