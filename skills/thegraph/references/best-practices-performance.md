---
name: thegraph-best-practices-performance
description: Subgraph performance — avoid eth_calls, immutable entities, Bytes ids, @derivedFrom, pruning for agent-driven optimization.
---

# The Graph — Performance Best Practices

## Avoid eth_calls

Subgraphs are optimized for indexing events. `eth_calls` (contract read calls from mappings) slow indexing and depend on node responsiveness. Prefer contracts that emit all needed data in events. If you must call:

- Declare calls in the manifest (specVersion >= 1.2.0) so graph-node runs them in parallel before handlers and caches results:

```yaml
eventHandlers:
  - event: TransferWithPool(...)
    handler: handleTransferWithPool
    calls:
      ERC20.poolInfo: ERC20[event.address].getPoolInfo(event.params.to)
```

The handler still binds and calls; the result comes from cache.

## Immutable entities and Bytes as IDs

- Use `@entity(immutable: true)` for entities that are never updated; faster writes and queries.
- Use `id: Bytes!` instead of `String!` when the id is not human-readable; faster and smaller.

## @derivedFrom

Store one-to-many on the "many" side only; use `@derivedFrom(field: "token")` on the "one" side. Avoid storing arrays of entities on the many side—indexing and querying are much slower.

## Pruning

- `indexerHints.prune: auto` — minimal history; best query performance; no time-travel or grafting.
- Use `prune: never` or a block count if you need time-travel queries or grafting.

## Key points

- Emit data in events rather than reading via eth_call when you control or can change the contract.
- Call handlers and block handlers with `filter: kind: call` require Parity tracing; not supported on BNB, Arbitrum, etc.—use event handlers there.

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/best-practices/avoid-eth-calls/
- https://thegraph.com/docs/en/subgraphs/best-practices/immutable-entities-bytes-as-ids/
- https://thegraph.com/docs/en/subgraphs/best-practices/derivedfrom/
- https://thegraph.com/docs/en/subgraphs/best-practices/pruning/
-->
