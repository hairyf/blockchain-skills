---
name: subsquid-best-practices-batch-processing
description: Batch processing patterns — in-memory aggregation, batch writes, avoid per-item DB ops.
---

# Batch Processing Best Practices

Squid SDK processes data in **batches**. The handler receives `ctx.blocks`; it should minimize DB round-trips by aggregating in memory and writing once per batch.

## Do: aggregate then batch write

1. Decode and normalize items from `ctx.blocks` into an in-memory structure (e.g. array or map keyed by entity id).
2. If you need existing entities, batch-load by ID set: `ctx.store.findBy(Entity, { id: In([...ids]) })`, put in a `Map`.
3. Apply business logic in memory (create/update map entries).
4. Single write at the end: `await ctx.store.upsert([...map.values()])` or `ctx.store.insert(entities)`.

```ts
processor.run(db, async (ctx) => {
  const gravatars = new Map<string, Gravatar>()
  for (const block of ctx.blocks) {
    for (const log of block.logs) {
      if (/* not relevant */) continue
      const data = extractData(log)
      gravatars.set(data.id, new Gravatar(data))
    }
  }
  await ctx.store.upsert([...gravatars.values()])
})
```

## Don’t: per-item DB writes in the loop

Avoid `await ctx.store.save(entity)` or `upsert` inside the inner loop. It drastically reduces throughput. Use an in-memory cache (e.g. `Map`) and one batch save per batch.

## EVM state queries

When using direct RPC state calls, batch them: use the generated Multicall facade (`--multicall` with squid-evm-typegen) or batch `eth_call` requests instead of one call per item.

## Migrating from handler-based code

When moving from subgraph-style handlers, you can keep per-item handler functions and call them from a loop over `ctx.blocks`/logs/transactions as an intermediate step; then refactor to the in-memory aggregate + single batch write pattern for better performance.

<!--
Source references:
- https://docs.subsquid.io/sdk/resources/batch-processing
-->
