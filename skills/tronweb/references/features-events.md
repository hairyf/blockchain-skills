---
name: tronweb-events
description: Event server API — get events by contract, transaction, or block.
---

# Events

Query contract events via the event server. Requires `eventServer` to be set on the TronWeb instance.

## By contract address

```typescript
const res = await tronWeb.event.getEventsByContractAddress(contractAddress, options);
// or tronWeb.getEventResult(contractAddress, options)

// options: eventName, blockNumber, onlyUnconfirmed, onlyConfirmed,
//          minBlockTimestamp, maxBlockTimestamp, orderBy, fingerprint, limit (default 20, max 200)
```

## By transaction or block

```typescript
const res = await tronWeb.event.getEventsByTransactionID(txId, { only_unconfirmed?, only_confirmed? });
// or tronWeb.getEventByTransactionID(txId, options)

await tronWeb.event.getEventsByBlockNumber(blockNumber, { only_confirmed?, limit?, fingerprint? });
await tronWeb.event.getEventsOfLatestBlock({ only_confirmed? });
```

## Event server

```typescript
tronWeb.event.setServer(eventServer, healthcheck?);
// Call when configuring a separate event server or changing URL.
```

Response shape: `{ success, data?, error? }`; on success use `data`; on failure the API throws with `res.error`.

## Key Points

- Event server is separate from full/solidity nodes; set via constructor or `setEventServer` / `setEventHeader`.
- Limit for contract events is capped at 200.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (src/lib/event.ts, tronweb.ts)
- https://tronweb.network/docu/docs/intro/
-->
