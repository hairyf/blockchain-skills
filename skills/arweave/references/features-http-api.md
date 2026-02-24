---
name: features-http-api
description: Arweave node HTTP API — info, transactions, blocks, wallet, price, peers, POST tx.
---

# Arweave HTTP API

The node exposes an HTTP interface (default port often 1984). All IDs and binary fields use base64url.

## Network and Peers

| Endpoint   | Method | Description |
|------------|--------|-------------|
| `/info`    | GET    | Network info: `network`, `version`, `height`, `blocks`, `peers`. |
| `/peers`   | GET    | List of peer addresses (e.g. `["127.0.0.1:1985","127.0.0.1:1986"]`). |

## Transactions

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/tx/{id}` | GET | Full transaction JSON. |
| `/tx/{id}/status` | GET | `block_indep_hash`, `block_height`, `number_of_confirmations`. |
| `/tx/{id}/{field}` | GET | Single field: `id`, `last_tx`, `owner`, `target`, `quantity`, `data`, `reward`, `signature`. |
| `/tx/{id}/data.html` | GET | Data segment decoded (e.g. HTML for archived pages). |
| `/tx` | POST | Submit signed transaction (JSON body). |
| `/price/{byte_size}` | GET | Estimated cost in winston for given data size; use 0 for transfer-only. |

## Blocks

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/block/hash/{block_id}` | GET | Block by indep_hash. |
| `/block/height/{height}` | GET | Block by height. |
| `/current_block` | GET | Current network head block. |

## Wallet

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/wallet/{address}/balance` | GET | Balance in winston (string). |
| `/wallet/{address}/last_tx` | GET | Last tx ID from this wallet. |
| `/wallet/{address}/txs[/{earliest_tx}]` | GET | Tx IDs from wallet. |
| `/wallet/{address}/deposits[/{earliest_deposit}]` | GET | Transfer tx IDs to wallet. |

## Usage

Base URL example: `http://127.0.0.1:1984`. POST body for `/tx`:

```json
{
  "last_tx": "",
  "owner": "",
  "target": "",
  "quantity": "",
  "data": "",
  "reward": "",
  "signature": ""
}
```

Use string values for `quantity` and `reward`. Empty `last_tx` for first tx from wallet.

## Key Points

- All monetary and size-related values in responses are winston strings.
- Use `indep_hash` from block JSON when calling `/block/hash/{block_id}`.
- Price endpoint is pessimistic (accounts for possible difficulty change).

<!--
Source references:
- https://github.com/ArweaveTeam/arweave (http_iface_docs.md)
- https://documenter.getpostman.com/view/5500657/RWgm2g1r
-->
