---
name: ChainIndexer
description: Enabling, backfilling, and maintaining ChainIndexer for Eth RPC and Actor Events APIs.
---

# ChainIndexer

The **ChainIndexer** indexes chain data for the **Ethereum (eth_*)** and **Actor Events** APIs. It is disabled by default. You must enable and backfill it if you use `EnableEthRPC` or `EnableActorEventsAPI`.

## When required

- **EnableEthRPC = true** (Ethereum JSON-RPC) → ChainIndexer required.
- **EnableActorEventsAPI = true** (GetActorEventsRaw, SubscribeActorEventsRaw) → ChainIndexer required.
- If you do not serve public RPC and do not need Eth or Actor Events, leave these false and skip ChainIndexer.

## Config

```toml
[Fevm]
  EnableEthRPC = true

[Events]
  EnableActorEventsAPI = true

[ChainIndexer]
  EnableIndexer = true
  # Optional: GC old index data. Default 0 = keep all.
  GCRetentionEpochs = 0   # or e.g. 10000
```

If Eth or Events are enabled but ChainIndexer is not, Lotus exits at startup.

## Garbage collection

- **GCRetentionEpochs &gt; 0**: Indexer periodically drops data for epochs older than `(current_head_height - GCRetentionEpochs)`. Default 0 keeps all.
- Size and retention trade-offs are documented in the chain-indexer operator doc (backfill disk space, etc.).

## Backfill

- **Existing LOTUS_PATH**: Follow the multi-step upgrade in the docs: create backfilled `chainindex.db`, optionally create a copyable db, update other nodes, cleanup. Use `lotus index validate-backfill` to verify.
- **Snapshot import**: You can enable indexer when importing from snapshot; follow “Upgrade when importing chain state from a snapshot” in the doc.
- Backfill timing and disk requirements depend on chain height and config; see operator doc for numbers and recommendations.

## Usage for agents

- Enabling Eth or Events: set config as above, enable ChainIndexer, run backfill (or snapshot import) before relying on Eth/Events APIs.
- Validate: use `lotus index validate-backfill` and any ChainValidateIndex RPC mentioned in the doc.
- Downgrade: document describes downgrade steps if you disable indexer or APIs.

## Key points

- EnableIndexer must be set explicitly so operators are aware of extra workload and storage.
- RPC providers and high-performance nodes that serve Eth or Events need backfill and regular checks as described in the operator doc.
- Regular checks and terminology (previous indexing vs ChainIndexer) are in the same doc.

<!--
Source references:
- sources/filecoin/documentation/en/chain-indexer-overview-for-operators.md
- sources/filecoin/documentation/en/default-lotus-config.toml (Fevm, Events, ChainIndexer)
-->
