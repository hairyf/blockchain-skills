---
name: Mempool REST API overview
description: Base URL, API prefix, and main endpoint groups for the Mempool Bitcoin/Liquid explorer API.
---

# Mempool REST API Overview

Mempool exposes a REST API used by mempool.space and self-hosted instances. All endpoints use the prefix **`/api/v1/`**. Base URL is the instance root (e.g. `https://mempool.space` or `http://localhost:8999`).

## Base URL and prefix

- **Prefix:** `API_URL_PREFIX` from config, default `/api/v1/`
- **Example:** `GET https://mempool.space/api/v1/fees/recommended`

When building requests, agents should use the instance base URL + `/api/v1/` + path. For public mempool.space, use `https://mempool.space`; for testnet/signet/liquid use the same host with the appropriate subdomain or path (e.g. testnet.mempool.space, liquid.network).

## Main endpoint groups

| Group | Path pattern | Purpose |
|-------|----------------|--------|
| **Fees & mempool** | `fees/recommended`, `fees/mempool-blocks`, `mempool`, `mempool/txids` | Recommended fees, projected blocks, mempool state |
| **Blocks** | `blocks`, `block/:hash`, `block/:hash/txids`, `blocks/tip/height` | Block list, block by hash, block txids, tip |
| **Transactions** | `tx/:txId`, `tx/:txId/status`, `tx/:txId/outspends`, `tx/push` (POST) | Transaction details, status, outspends, broadcast |
| **Addresses** | `address/:address`, `address/:address/txs`, `address/:address/utxo` | Address stats, tx history, UTXOs (requires Electrum/Esplora backend) |
| **Difficulty & init** | `difficulty-adjustment`, `init-data`, `backend-info` | DA stats, WebSocket init payload, backend info |
| **Mining** | `mining/pools`, `mining/hashrate/:interval`, `mining/blocks/...` | Pools, hashrate, block fees/rewards (indexing + DB) |
| **Lightning** | `lightning/search`, `lightning/nodes/...`, `lightning/channels/...` | When LIGHTNING.ENABLED |
| **Liquid** | Liquid-specific routes under same prefix | When network is Liquid |
| **Acceleration** | `services/accelerator/accelerations`, `services/accelerator/estimate` (POST) | When MEMPOOL_SERVICES.ACCELERATIONS |

Backend routes are registered in `backend/src/index.ts` via `setUpHttpApiRoutes()`; Bitcoin core routes live in `backend/src/api/bitcoin/bitcoin.routes.ts`. Some routes (e.g. `mempool`, `tx/:txId`, `address/:address`) are only available when `MEMPOOL.BACKEND !== 'esplora'` (Electrum or none); with Esplora backend, those are served by the Esplora REST API.

## Practical usage

```bash
# Recommended fees (sat/vB)
curl -s "https://mempool.space/api/v1/fees/recommended"

# Block tip height
curl -s "https://mempool.space/api/v1/blocks/tip/height"

# Init data (same as WebSocket initial payload)
curl -s "https://mempool.space/api/v1/init-data"
```

Use `init-data` when you need a one-off snapshot of mempool blocks, fees, difficulty adjustment, and backend info without opening a WebSocket.

<!--
Source references:
- sources/mempool/backend/src/index.ts (setUpHttpApiRoutes)
- sources/mempool/backend/src/api/bitcoin/bitcoin.routes.ts
- sources/mempool/frontend/src/app/docs/api-docs/api-docs-data.ts
-->
