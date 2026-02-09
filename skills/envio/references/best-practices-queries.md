---
name: hypersync-query-best-practices
description: HyperSync query design — field selection, join modes, limits, and streaming.
---

# HyperSync Query Best Practices

## Field Selection

Request only the fields you need in `fieldSelection` for block, transaction, log, and trace. This reduces payload size and improves speed.

```javascript
fieldSelection: {
  block: ["number", "timestamp"],
  log: ["address", "topic0", "data"],
  transaction: ["from", "to", "value"],
}
```

Use **snake_case** for field names (e.g. `block_number`, not `blockNumber`).

## Join Mode

- **JoinNothing**: Only rows matching your selection (logs/transactions/traces). Smallest responses.
- **Default**: Matched items plus their related transaction and block. Good balance.
- **JoinAll**: Matched item plus all related logs, traces, and block. Use when you need full context (e.g. all logs for a tx).

Choose JoinNothing when you only need the selected entity and no related data.

## Limits and Pagination

- **max_num_blocks**, **max_num_logs**, **max_num_transactions**, **max_num_traces**: Approximate caps; server may slightly exceed to finish a block group.
- Use **stream** for large ranges instead of a single huge query; loop on `recv()` and set `from_block` to `next_block`.
- **to_block**: Set when you need a fixed upper bound (exclusive).

## Chain Tip and Rollbacks

Stream/collect are not intended for real-time use at the chain tip where reorgs occur. For tip data, use one-off get-style requests and implement rollback handling (e.g. using rollback_guard in the response).

## Resource Management

- Call **close()** on stream handles when done to avoid leaks, especially with multiple streams.
- For very large or analytical workloads, consider **collect_parquet** (or equivalent) instead of holding full JSON in memory.

<!--
Source references:
- https://docs.envio.dev/docs/HyperSync/hypersync-query
- https://docs.envio.dev/docs/HyperSync/quickstart
-->
