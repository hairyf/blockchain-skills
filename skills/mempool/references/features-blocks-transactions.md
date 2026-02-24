---
name: Mempool blocks and transactions API
description: Block list, block by hash, transactions, push tx, RBF, and related endpoints.
---

# Blocks and Transactions

## Blocks

- **GET /api/v1/blocks** — List of recent blocks (optional `?height= N` for single height).
- **GET /api/v1/blocks/:height** — Blocks at given height (can return multiple for reorgs).
- **GET /api/v1/block/:hash** — Block by hash (full block object).
- **GET /api/v1/block/:hash/summary** — Block with stripped/summary tx list.
- **GET /api/v1/block/:hash/txids** — Transaction IDs in block.
- **GET /api/v1/block/:hash/txs** — Full transactions in block (optional `/:index` for single tx).
- **GET /api/v1/block/:hash/header** — Raw block header (hex).
- **GET /api/v1/block/:hash/raw** — Raw block (hex).
- **GET /api/v1/block-height/:height** — Block hash for height.
- **GET /api/v1/blocks/tip/height** — Current tip height.
- **GET /api/v1/blocks/tip/hash** — Current tip hash.
- **GET /api/v1/blocks-bulk/:from** and **/api/v1/blocks-bulk/:from/:to** — Bulk block hashes.
- **GET /api/v1/block/:hash/audit-summary** — Block audit summary (when audit enabled).
- **GET /api/v1/chain-tips**, **/api/v1/stale-tips** — Chain tips and stale tips.

All hashes and heights are as in the backend; use the appropriate network base URL (mainnet/testnet/signet/liquid).

## Transactions (non-Esplora backend)

When `MEMPOOL.BACKEND !== 'esplora'`:

- **GET /api/v1/tx/:txId** — Transaction by txid.
- **GET /api/v1/tx/:txId/hex** — Raw tx hex.
- **GET /api/v1/tx/:txId/status** — Confirmation status (confirmed height, block hash, etc.).
- **GET /api/v1/tx/:txId/outspends** — Outspend status for each output.
- **GET /api/v1/tx/:txId/merkle-proof** — Merkle proof (for SPV).
- **GET /api/v1/tx/:txId/rbf** — RBF history for this tx.
- **GET /api/v1/tx/:txId/cached** — Cached version if available.
- **POST /api/v1/tx** — Broadcast raw tx (body: raw hex).
- **POST /api/v1/tx/push** — Broadcast (form or body); backend accepts hex.
- **POST /api/v1/txs/package** — Submit package (multiple txs).
- **POST /api/v1/psbt/addparents** — Add parent tx to PSBT for RBF/CPFP.
- **POST /api/v1/prevouts** — Get prevout info for a set of outpoints (body as per backend).
- **GET /api/v1/txs/outspends** — Batched outspends (POST body with txids).
- **GET /api/v1/replacements**, **/api/v1/fullrbf/replacements** — RBF replacement sets.

With Esplora backend, use the Esplora REST API for these; the Mempool backend proxies or delegates.

## Practical examples

```bash
# Tip height
curl -s "https://mempool.space/api/v1/blocks/tip/height"

# Block by hash
curl -s "https://mempool.space/api/v1/block/0000000000000000000123456789abcdef.../txids"

# Transaction status
curl -s "https://mempool.space/api/v1/tx/<txid>/status"

# Broadcast (POST body = raw hex)
curl -s -X POST "https://mempool.space/api/v1/tx" -H "Content-Type: text/plain" -d "<hex>"
```

<!--
Source references:
- sources/mempool/backend/src/api/bitcoin/bitcoin.routes.ts
- sources/mempool/frontend/src/app/docs/api-docs/api-docs-data.ts (restApiDocsData)
-->
