---
name: Mempool acceleration and optional services
description: Accelerator API and wallet/stratum services when MEMPOOL_SERVICES or WALLETS are enabled.
---

# Acceleration (MEMPOOL_SERVICES.ACCELERATIONS)

When the backend is configured with **MEMPOOL_SERVICES.ACCELERATIONS** (and optional MEMPOOL_SERVICES.API for proxy), acceleration routes are registered:

- **GET /api/v1/services/accelerator/accelerations** — List active accelerations (from local mempool state).
- **GET /api/v1/services/accelerator/accelerations/:txid** — Acceleration info for a txid (from DB/repository).
- **GET /api/v1/services/accelerator/accelerations/history** — History (optional `blockHeight` query).
- **GET /api/v1/services/accelerator/accelerations/history/aggregated** — Proxied to MEMPOOL_SERVICES.API.
- **GET /api/v1/services/accelerator/accelerations/stats** — Proxied to MEMPOOL_SERVICES.API.
- **POST /api/v1/services/accelerator/estimate** — Get acceleration cost estimate (body as per service).

Use these to query or request transaction acceleration (e.g. paid boost into the next block).

# Mining routes acceleration endpoints

The **mining** module also exposes acceleration endpoints under `/api/v1/` when indexing is on:

- **GET /api/v1/accelerations/pool/:slug**, **/accelerations/block/:height**, **/accelerations/recent/:interval**, **/accelerations/total**, **/accelerations**
- **POST /api/v1/acceleration/request/:txid**

These are in `mining-routes.ts` and may overlap or complement the services/accelerator routes depending on deployment.

# Wallet and Stratum (optional)

- **WALLETS.ENABLED** — Registers **services** routes, e.g. **GET /api/v1/wallet/:walletId** for wallet info. Used for supported wallet integrations.
- **STRATUM.ENABLED** — Backend connects to stratum WebSocket and can expose stratum-related state; no separate REST route list was required for basic agent usage.

<!--
Source references:
- sources/mempool/backend/src/api/acceleration/acceleration.routes.ts
- sources/mempool/backend/src/api/services/services-routes.ts
- sources/mempool/backend/src/api/mining/mining-routes.ts (acceleration endpoints)
- sources/mempool/backend/src/index.ts
-->
