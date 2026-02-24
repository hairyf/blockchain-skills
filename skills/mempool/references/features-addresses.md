---
name: Mempool address and scripthash API
description: Address details, transaction history, and UTXO endpoints (Electrum/Esplora backend).
---

# Addresses and Scripthash

Address and scripthash endpoints require an **Electrum** or **Esplora** backend (`MEMPOOL.BACKEND` not `"none"`). With `BACKEND: "none"`, these are unavailable.

## Address

- **GET /api/v1/address/:address**  
  Address summary: `chain_stats` and `mempool_stats` (tx_count, funded_txo_count/sum, spent_txo_count/sum).

- **GET /api/v1/address/:address/txs**  
  Transaction list (newest first). Returns up to 50 mempool + first 25 confirmed; use `after_txid` query to paginate confirmed.

- **GET /api/v1/address/:address/txs/summary**  
  Transaction list in summary form (e.g. txid, status, fee).

- **GET /api/v1/address/:address/utxo**  
  Unspent outputs (UTXOs) for the address.

- **GET /api/v1/validate-address/:address**  
  Address validation (format/checksum).

- **GET /api/v1/address-prefix/:prefix**  
  Lookup by address prefix (if supported by backend).

## Scripthash

- **GET /api/v1/scripthash/:scripthash**  
  Same shape as address: chain_stats, mempool_stats.

- **GET /api/v1/scripthash/:scripthash/txs**  
  Transaction list for scripthash.

- **GET /api/v1/scripthash/:scripthash/txs/summary**  
  Summary list.

- **GET /api/v1/scripthash/:scripthash/utxo**  
  UTXOs for the scripthash.

Scripthash is the hex-encoded script hash (as used in Electrum protocol).

## Pagination and limits

- Address txs: default 25 confirmed + 50 mempool; use `after_txid=<txid>` for next page of confirmed.
- Server may enforce `MAX_TRACKED_ADDRESSES` for WebSocket tracking; REST has no per-address limit documented beyond normal rate limits.

## Example

```bash
# Address stats
curl -s "https://mempool.space/api/v1/address/1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv"

# Address txs (paginate with after_txid)
curl -s "https://mempool.space/api/v1/address/1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv/txs?after_txid=<txid>"

# UTXOs
curl -s "https://mempool.space/api/v1/address/1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv/utxo"
```

<!--
Source references:
- sources/mempool/backend/src/api/bitcoin/bitcoin.routes.ts (getAddress, getAddressTransactions, getAddressUtxo, getScriptHash, etc.)
- sources/mempool/frontend/src/app/docs/api-docs/api-docs-data.ts (get-address, get-address-transactions, get-address-utxo)
-->
