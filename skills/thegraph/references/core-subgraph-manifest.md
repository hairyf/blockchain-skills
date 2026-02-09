---
name: thegraph-core-subgraph-manifest
description: Subgraph manifest (subgraph.yaml) — data sources, event/call/block handlers, templates, indexer hints for agent-driven subgraph definition.
---

# The Graph — Subgraph Manifest

The manifest `subgraph.yaml` defines which contracts and networks to index, which events/calls/blocks to react to, and how to map them to schema entities.

## Structure

- **schema**: `file: ./schema.graphql`
- **dataSources**: one entry per contract; each has `source`, `mapping` (abis, eventHandlers, callHandlers, blockHandlers), optional `context`
- **templates**: data sources without a fixed address (for factory/registry patterns)

## Minimal data source

```yaml
specVersion: 1.3.0
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum/contract
    name: Gravity
    network: mainnet
    source:
      address: '0x2E645469f354BB4F5c8a05B3b30A929361cf77eC'
      abi: Gravity
      startBlock: 6175244   # optional; use contract creation block when possible
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.9
      language: wasm/assemblyscript
      entities:
        - Gravatar
      abis:
        - name: Gravity
          file: ./abis/Gravity.json
      eventHandlers:
        - event: NewGravatar(uint256,address,string,string)
          handler: handleNewGravatar
      file: ./src/mapping.ts
```

## Handlers

- **eventHandlers**: `event: <Signature>`, `handler: <functionName>`. Optional `topic1`/`topic0` for filtering; `receipt: true` for transaction receipt in handler.
- **callHandlers**: `function: <signature>`, `handler: <functionName>`. Only trigger on external calls; require Parity tracing (not supported on BNB, Arbitrum, etc.).
- **blockHandlers**: `handler: <functionName>`. Optional `filter`: `kind: call` (blocks with calls to this contract), `kind: polling` with `every: n`, or `kind: once` (run once at start).

## Indexer hints

```yaml
indexerHints:
  prune: auto   # or "never" or a number of blocks to retain
```

Use `prune: never` or a block count if you need time-travel queries or grafting.

## Key points

- One subgraph can index multiple contracts (multiple entries in `dataSources`) but not multiple networks.
- List all entities written by this data source under `mapping.entities`.
- Use templates + `Template.create(address)` or `Template.createWithContext(address, context)` in mappings for dynamically created contracts.

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/developing/creating/subgraph-manifest/
- https://github.com/graphprotocol/graph-node/blob/master/docs/subgraph-manifest.md
-->
