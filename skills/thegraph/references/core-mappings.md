---
name: thegraph-core-mappings
description: AssemblyScript mappings — event/call/block handlers, graph-ts store/ethereum API, codegen for agent-driven subgraph logic.
---

# The Graph — Mappings

Mappings are written in AssemblyScript (subset of TypeScript), compiled to WASM. They transform chain data into entities defined in the schema.

## Handler signature

For each handler in `subgraph.yaml`, export a function with the same name. Event handlers receive the event type (from codegen); call handlers receive a `*Call` type; block handlers receive `ethereum.Block`.

```typescript
import { NewGravatar, UpdatedGravatar } from '../generated/Gravity/Gravity'
import { Gravatar } from '../generated/schema'

export function handleNewGravatar(event: NewGravatar): void {
  let gravatar = new Gravatar(event.params.id)
  gravatar.owner = event.params.owner
  gravatar.displayName = event.params.displayName
  gravatar.imageUrl = event.params.imageUrl
  gravatar.save()
}

export function handleUpdatedGravatar(event: UpdatedGravatar): void {
  let gravatar = Gravatar.load(event.params.id)
  if (gravatar == null) gravatar = new Gravatar(event.params.id)
  gravatar.owner = event.params.owner
  gravatar.displayName = event.params.displayName
  gravatar.imageUrl = event.params.imageUrl
  gravatar.save()
}
```

## Codegen

Run before build/deploy after schema or ABI changes:

```sh
graph codegen [--output-dir <OUTPUT_DIR>] [<MANIFEST>]
```

This generates: contract/event/call types under `generated/<DataSourceName>/`, and entity classes in `generated/schema.ts`.

## Store API

- `Entity.load(id)`: load entity (returns null if missing).
- `new Entity(id)`: create new entity.
- `entity.save()`: write to store.

## Recommended IDs

- `event.transaction.hash` for one entity per tx.
- `event.transaction.hash.concatI32(event.logIndex.toI32())` for one per log.
- `Bytes.fromI32(dayID)` for daily aggregates (e.g. `event.block.timestamp.toI32() / 86400`).

## Contract bindings (eth_calls)

Bind and call read-only contract methods. Prefer emitting data in events to avoid eth_calls (they slow indexing). If needed, declare calls in the manifest (specVersion >= 1.2.0) so graph-node runs them in parallel before handlers:

```yaml
eventHandlers:
  - event: Transfer(...)
    handler: handleTransfer
    calls:
      ERC20.poolInfo: ERC20[event.address].getPoolInfo(event.params.to)
```

## Dynamic data sources

In a mapping, instantiate a template to start indexing a new contract:

```typescript
import { Exchange } from '../generated/templates'

export function handleNewExchange(event: NewExchange): void {
  Exchange.create(event.params.exchange)
  // Or with context:
  let ctx = new DataSourceContext()
  ctx.setString('tradingPair', event.params.tradingPair)
  Exchange.createWithContext(event.params.exchange, ctx)
}
```

Access context in the template mapping: `dataSource.context().getString('tradingPair')`.

## Key points

- All handler parameters and entity fields must be set before `save()`; required schema fields must be non-null.
- Use `@graphprotocol/graph-ts` for ByteArray, BigInt, BigDecimal, Address, store, and ethereum types.

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/developing/creating/assemblyscript-mappings/
- https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/
- https://github.com/graphprotocol/graph-tooling/tree/main/packages/ts
-->
