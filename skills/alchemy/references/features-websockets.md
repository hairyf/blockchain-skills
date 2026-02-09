---
name: alchemy-websockets
description: Alchemy WebSockets — subscriptions, AlchemySubscription, reconnection and backfill.
---

# WebSocket Namespace

`alchemy.ws` provides subscription APIs compatible with Ethers.js WebSocketProvider, plus Alchemy-specific subscription types. The SDK handles reconnection and backfills missed events (up to ~120 blocks).

## Methods

- **on(eventNameOrFilter, listener)** — subscribe; returns subscription handle.
- **once(eventNameOrFilter, listener)** — subscribe for next event only.
- **off(eventName, listener?)** — remove listener(s) for event.
- **removeAllListeners()** — remove all listeners.
- **listenerCount(eventName?)** — count listeners (Promise).
- **listeners(eventName?)** — array of listeners (Promise).

## Event Names

Standard Ethers events: `'block'`, `'pending'`, `'error'`, etc. Alchemy-specific: use `AlchemySubscription` enum (e.g. `PENDING_TRANSACTIONS`, `MINED_TRANSACTIONS`) and pass an object with `method` and optional filters.

## Usage

```ts
import { Alchemy, AlchemySubscription } from 'alchemy-sdk';

const alchemy = new Alchemy();

// Standard block events
alchemy.ws.on('block', blockNumber => console.log('block', blockNumber));

// Alchemy pending transactions (optionally filtered)
alchemy.ws.on(
  { method: AlchemySubscription.PENDING_TRANSACTIONS, toAddress: 'vitalik.eth' },
  res => console.log(res)
);

// One-time
alchemy.ws.once(
  { method: AlchemySubscription.PENDING_TRANSACTIONS },
  res => console.log(res)
);

alchemy.ws.removeAllListeners();
```

## Key Points

- Resilient delivery: events that arrive while the socket is down are backfilled after reconnect (within ~120 blocks).
- Outgoing requests over a down socket are retried on reconnect; still implement error handling.
- Use `AlchemySubscription` for Alchemy-specific subscription types; filter with `toAddress`, `fromAddress`, etc. in the options object.

<!--
Source references:
- sources/alchemy/docs-md/classes/WebSocketNamespace.md
- sources/alchemy/docs-md/README.md
- sources/alchemy/docs-md/enums/AlchemySubscription.md
-->
