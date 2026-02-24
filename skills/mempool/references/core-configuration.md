---
name: Mempool backend configuration
description: mempool-config.json and environment overrides for self-hosted Mempool backend.
---

# Mempool Backend Configuration

The backend reads `mempool-config.json` (or path from `MEMPOOL_CONFIG_FILE`). For Docker, all keys can be overridden via environment variables in `docker-compose.yml` (see `docker/README.md`).

## Key sections (agent-relevant)

- **MEMPOOL** — `NETWORK` (mainnet, testnet, signet, testnet4, regtest), `BACKEND` (electrum, esplora, none), `API_URL_PREFIX` (default `/api/v1/`), `HTTP_PORT`, `POLL_RATE_MS`, `INDEXING_BLOCKS_AMOUNT`, `BLOCKS_SUMMARIES_INDEXING`, `CPFP_INDEXING`, `AUTOMATIC_POOLS_UPDATE`, `MAX_TRACKED_ADDRESSES`, `UNIX_SOCKET_PATH`.
- **CORE_RPC** — Bitcoin Core RPC (`HOST`, `PORT`, `USERNAME`, `PASSWORD`, `TIMEOUT`). Required for block/mempool data; with `BACKEND: "none"` address lookups are disabled.
- **ELECTRUM** / **ESPLORA** — Electrum or Esplora backend for address/script hash lookups. Electrum: `HOST`, `PORT`, `TLS_ENABLED`. Esplora: `REST_API_URL` or `UNIX_SOCKET_PATH`.
- **DATABASE** — MariaDB/MySQL for indexing (`ENABLED`, `HOST`, `PORT`, `DATABASE`, `USERNAME`, `PASSWORD`). Required for mining dashboard, statistics, Lightning explorer.
- **STATISTICS** — `ENABLED`, `TX_PER_SECOND_SAMPLE_PERIOD`. Requires DATABASE.
- **LIGHTNING** — `ENABLED`, `BACKEND` (lnd, clightning). LND: `TLS_CERT_PATH`, `MACAROON_PATH`, `REST_API_URL`. CLIGHTNING: `SOCKET`.
- **MEMPOOL_SERVICES.ACCELERATIONS** — When true, acceleration routes are registered.

## Environment overrides (Docker)

Map config keys to env vars: section key in UPPER_SNAKE_CASE, e.g. `MEMPOOL_NETWORK`, `MEMPOOL_BACKEND`, `CORE_RPC_HOST`, `CORE_RPC_PORT`, `ELECTRUM_HOST`, `ELECTRUM_PORT`, `DATABASE_ENABLED`, `LIGHTNING_ENABLED`, etc. See `docker/README.md` for the full list.

## Backend behavior

- With **BACKEND: "none"**: no address/scripthash APIs; blocks and mempool from Bitcoin Core only.
- With **BACKEND: "electrum"** or **"esplora"**: address and scripthash endpoints are available (delegated to Electrum or Esplora).
- **Reindex:** `npm run start -- --reindex=blocks,hashrates` truncates specified tables at startup (with delay). Used for mining/Lightning re-indexing.
- **Pools update:** `npm run start -- --update-pools` updates mining pool definitions at startup.

<!--
Source references:
- sources/mempool/backend/mempool-config.sample.json
- sources/mempool/docker/README.md
- sources/mempool/backend/README.md
-->
