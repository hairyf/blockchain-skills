---
name: Mempool fees and mempool state
description: Recommended fees, precise fees, mempool blocks, transaction times, and mempool endpoints.
---

# Fees and Mempool State

## Recommended fees

- **GET /api/v1/fees/recommended**  
  Returns estimated fee tiers (e.g. `fastestFee`, `halfHourFee`, `hourFee`, `economyFee`, `minimumFee`) in sat/vB. Returns 503 when backend is not in sync.

- **GET /api/v1/fees/precise**  
  Same idea with more precise values (floats). Use when building transactions that need exact fee estimates.

```bash
curl -s "https://mempool.space/api/v1/fees/recommended"
# {"fastestFee":12,"halfHourFee":10,"hourFee":8,"economyFee":6,"minimumFee":2}
```

## Mempool blocks (projected)

- **GET /api/v1/fees/mempool-blocks**  
  Returns the current set of *projected* mempool blocks (next blocks by fee rate). Each block has `blockSize`, `blockVSize`, `nTx`, `totalFees`, `medianFee`, `feeRange`. Used to show “next block” vs “in 3 blocks” fee estimates.

## Transaction times (batch)

- **GET /api/v1/transaction-times?txId=txid1&txId=txid2**  
  Query parameter `txId` can be repeated. Returns estimated confirmation times for given txids (based on fee rate and mempool). Useful for “when will my tx confirm?” without polling tx status.

## Mempool contents (Electrum/non-Esplora only)

When `MEMPOOL.BACKEND !== 'esplora'`:

- **GET /api/v1/mempool** — Mempool summary (e.g. tx count, size, min fee).
- **GET /api/v1/mempool/txids** — List of txids in mempool.
- **GET /api/v1/mempool/recent** — Recent mempool transactions.

With Esplora backend, mempool data is served by the Esplora API; use the same paths against the Esplora base URL if needed.

## CPFP

- **GET /api/v1/cpfp/:txId** — CPFP (child-pays-for-parent) info for a given txid.
- **POST /api/v1/cpfp** — Get CPFP info for a set of transactions (body: array of txids or similar as per backend).

Use these when building or analyzing replacement or CPFP strategies.

<!--
Source references:
- sources/mempool/backend/src/api/bitcoin/bitcoin.routes.ts (getRecommendedFees, getMempoolBlocks, getTransactionTimes, getMempool, getCpfp)
- sources/mempool/backend/src/api/fee-api.ts
- sources/mempool/backend/src/api/mempool-blocks.ts
-->
