---
name: Mempool WebSocket live data
description: Subscribe to live blocks, mempool blocks, stats, and 2h chart via WebSocket.
---

# Mempool WebSocket API

Clients connect to the same host/port as the HTTP API (e.g. `wss://mempool.space/ws` or `ws://localhost:8999`). After connection, send a **want** message to subscribe to live data.

## Valid subscriptions (want)

From `websocket-handler.ts`, the valid `want` values are:

- **`blocks`** — new blocks
- **`mempool-blocks`** — projected mempool blocks (fee tiers)
- **`live-2h-chart`** — 2h fee/size chart data
- **`stats`** — tx/sec and similar statistics
- **`tomahawk`** — Tomahawk-specific data

## Subscription format

Send a JSON message:

```json
{ "action": "want", "data": ["blocks", "mempool-blocks", "stats"] }
```

You can also **track** addresses, transactions, or mempool txids by sending:

- **Track address:** `{ "action": "track-address", "data": "<address>" }`
- **Track tx:** `{ "action": "track-tx", "data": "<txid>" }`
- **Track mempool:** `{ "action": "track-mempool", "data": true }` (or track specific txids)

Server pushes updates as JSON; initial state for blocks, mempool-blocks, fees, and difficulty can also be obtained via **GET /api/v1/init-data** without opening a WebSocket.

## Initial data

On connect, the server does not send a full init blob over the wire by default; the client can request the same payload via REST:

```bash
curl -s "https://mempool.space/api/v1/init-data"
```

That response includes `mempool-blocks`, `fees`, `da` (difficulty adjustment), `backend`, `mempoolInfo`, `vBytesPerSecond`, `blocks`, `conversions`, etc., which matches what the WebSocket layer uses for its internal `serializedInitData`.

## When to use WebSocket vs REST

- **REST:** One-off queries (fees, block by hash, tx, address), scripting, init-data snapshot.
- **WebSocket:** Live blocks, live mempool blocks, live stats, or tracking specific addresses/txs for real-time updates.

<!--
Source references:
- sources/mempool/backend/src/api/websocket-handler.ts (wantable, connection handling)
- sources/mempool/frontend/src/app/docs/api-docs/api-docs-data.ts (wsApiDocsData)
-->
