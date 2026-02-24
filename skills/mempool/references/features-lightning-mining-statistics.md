---
name: Mempool Lightning explorer and mining/statistics API
description: Lightning nodes/channels search and mining pools, hashrate, and statistics endpoints.
---

# Lightning Explorer (optional)

When **LIGHTNING.ENABLED** is true, Lightning routes are registered under `/api/v1/`:

- **GET /api/v1/lightning/search** — Search nodes and channels (query params as per backend).
- **GET /api/v1/lightning/nodes/world** — Nodes with geo (if MaxMind enabled).
- **GET /api/v1/lightning/channels/txids** — Channels by funding txids (POST body or query).

Backend can be **lnd** or **clightning**; config under `LND.*` or `CLIGHTNING.*`. Lightning data is synced into the database and served from there.

# Mining and hashrate (indexing + DB)

When **DATABASE.ENABLED** and **indexing** (e.g. `INDEXING_BLOCKS_AMOUNT`) and **MEMPOOL.ENABLED** are on, mining routes are available:

- **GET /api/v1/mining/pools** — List of known mining pools.
- **GET /api/v1/mining/pools/:interval** — Pools with hashrate/share over interval.
- **GET /api/v1/mining/pool/:slug** — Pool details.
- **GET /api/v1/mining/pool/:slug/hashrate** — Pool hashrate over time.
- **GET /api/v1/mining/pool/:slug/blocks** — Blocks mined by pool (optional `/:height`).
- **GET /api/v1/mining/hashrate/pools/:interval** — Pools hashrate time series.
- **GET /api/v1/mining/hashrate/:interval** — Network hashrate over interval.
- **GET /api/v1/mining/difficulty-adjustments** and **/mining/difficulty-adjustments/:interval** — Difficulty adjustments.
- **GET /api/v1/mining/reward-stats/:blockCount** — Reward stats.
- **GET /api/v1/mining/blocks/fees**, **/mining/blocks/fees/:interval** — Block fees.
- **GET /api/v1/mining/blocks/rewards/:interval**, **/mining/blocks/fee-rates/:interval**, **/mining/blocks/sizes-weights/:interval** — Block rewards, fee rates, sizes.
- **GET /api/v1/mining/blocks/predictions/:interval** — Block health predictions.
- **GET /api/v1/mining/blocks/audit/scores**, **/audit/scores/:height**, **/audit/score/:hash**, **/audit/:hash** — Audit scores and block audit.
- **GET /api/v1/mining/blocks/timestamp/:timestamp** — Block height from timestamp.
- **GET /api/v1/accelerations/pool/:slug**, **/accelerations/block/:height**, **/accelerations/recent/:interval**, **/accelerations/total**, **/accelerations** — Acceleration by pool/block/recent/total/active.
- **POST /api/v1/acceleration/request/:txid** — Request acceleration for a tx.

Intervals are typically like `24h`, `3d`, `1w`, `1m`, `3m`, `6m`, `1y`, `2y`, `3y` (see frontend api-docs-data).

# Statistics (DB)

When **STATISTICS.ENABLED** and **DATABASE.ENABLED** and **MEMPOOL.ENABLED**:

- **GET /api/v1/statistics/2h** (and other time ranges) — Tx/sec and other stats over the period.

<!--
Source references:
- sources/mempool/backend/src/api/explorer/general.routes.ts, nodes.routes.ts, channels.routes.ts
- sources/mempool/backend/src/api/mining/mining-routes.ts
- sources/mempool/backend/src/api/statistics/statistics.routes.ts
- sources/mempool/backend/src/index.ts (setUpHttpApiRoutes)
-->
