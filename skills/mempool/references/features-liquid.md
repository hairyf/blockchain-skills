---
name: Mempool Liquid assets API
description: Liquid network assets, icons, and asset-specific endpoints when running in Liquid mode.
---

# Liquid (Elements) Support

When the backend runs in **Liquid** mode (`Common.isLiquid()` i.e. network is `liquid` or `liquidtestnet`), Liquid-specific routes are registered. The same API prefix `/api/v1/` is used; base URL is typically a Liquid instance (e.g. liquid.network).

## Assets

- **GET /api/v1/assets/icons** — All asset icons (list or map).
- **GET /api/v1/asset/:assetId** — Asset metadata (id, name, ticker, etc.).
- **GET /api/v1/asset/:assetId/transactions** — Transactions involving the asset.
- **GET /api/v1/asset/:assetId/supply** — Supply info.
- **GET /api/v1/asset/:assetId/icon** — Single asset icon.

Asset IDs are Liquid asset identifiers (hex or registered id). Address format and UTXO semantics are Liquid-specific (confidential outputs, etc.); address and scripthash endpoints follow the same path pattern as Bitcoin but return Liquid-shaped data.

## Backend behavior

- Icons are loaded from config (e.g. `EXTERNAL_ASSETS`) and refreshed periodically; see `api/liquid/icons.ts`.
- Elements/Liquid block and tx parsing is handled by `elementsParser`; new blocks trigger federation UTXO updates when DATABASE is enabled.
- Use the same REST and WebSocket patterns as Bitcoin; only the network and response shapes (e.g. asset fields, confidential amounts) differ.

## Example

```bash
# Asset list/icons (Liquid instance)
curl -s "https://liquid.network/api/v1/assets/icons"

# Single asset
curl -s "https://liquid.network/api/v1/asset/<asset_id>"
```

<!--
Source references:
- sources/mempool/backend/src/api/liquid/liquid.routes.ts
- sources/mempool/backend/src/index.ts (isLiquid, liquid routes, icons)
- sources/mempool/backend/src/api/liquid/icons.ts
-->
