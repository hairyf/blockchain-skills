---
name: thegraph-features-data-source-templates
description: Dynamic data sources — templates for factory/registry contracts, create/createWithContext, context in mappings.
---

# The Graph — Data Source Templates

Use templates when the set of contracts to index is not known upfront (e.g. factory creates many child contracts). Define a normal data source for the parent and **templates** (no address under `source`) for each child type.

## Manifest

```yaml
dataSources:
  - kind: ethereum/contract
    name: Factory
    network: mainnet
    source:
      address: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95'
      abi: Factory
    mapping:
      file: ./src/mappings/factory.ts
      # ... eventHandlers e.g. NewExchange(address,address)
templates:
  - name: Exchange
    kind: ethereum/contract
    network: mainnet
    source:
      abi: Exchange
    mapping:
      file: ./src/mappings/exchange.ts
      # ... eventHandlers for Exchange
```

## Instantiating in mapping

When the factory emits an event (e.g. new exchange address), create a data source from the template:

```typescript
import { Exchange } from '../generated/templates'

export function handleNewExchange(event: NewExchange): void {
  Exchange.create(event.params.exchange)
}
```

With context (e.g. trading pair from the event):

```typescript
import { Exchange } from '../generated/templates'

export function handleNewExchange(event: NewExchange): void {
  let context = new DataSourceContext()
  context.setString('tradingPair', event.params.tradingPair)
  Exchange.createWithContext(event.params.exchange, context)
}
```

In the template mapping, read context:

```typescript
import { dataSource } from '@graphprotocol/graph-ts'

let context = dataSource.context()
let tradingPair = context.getString('tradingPair')
```

## Key points

- A new data source only indexes from the block where it was created; it does not process prior blocks.
- For prior-block state, read contract state in the handler that creates the template and create entities representing that state.

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/developing/creating/subgraph-manifest/#data-source-templates
-->
