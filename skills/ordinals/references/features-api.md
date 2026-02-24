---
name: features-api
description: ord server JSON API—Accept header and main endpoints for blocks, inscriptions, addresses, runes.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ordinals/ord (docs/src/guides/api.md)
---

# ord Server JSON API

By default `ord server` returns HTML. Send **`Accept: application/json`** to get JSON from the same endpoints. Response shape mirrors the HTML structure.

## Key endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/blockcount` | Latest block height (number). |
| GET | `/blockhash` | Latest block hash. |
| GET | `/blockhash/<HEIGHT>` | Block hash at height. |
| GET | `/block/<HEIGHT_or_HASH>` | Block info: hash, height, inscriptions, runes, transactions. |
| GET | `/address/<ADDRESS>` | Outputs, inscriptions, sat_balance, runes_balances (requires `--index-addresses`). |
| GET | `/inscription/<INSCRIPTION_ID>` | Inscription metadata (id, number, content_type, satpoint, etc.). |
| GET | `/content/<INSCRIPTION_ID>` | Raw content (binary/text). |
| GET | `/sat/<SAT_NUMBER>` | Inscription IDs on that sat (requires `--index-sats`). |
| GET | `/rune/<RUNE_ID>` | Rune info (when runes indexed). |
| GET | `/runes` | List runes (paginated). |

Many more exist (output, tx, children, parents, etc.). Recursive endpoints live under `/r/` (see features-inscriptions-recursion).

## Example

```bash
curl -s -H "Accept: application/json" "http://0.0.0.0:80/block/0"
curl -s -H "Accept: application/json" "http://0.0.0.0:80/address/bc1p..."
```

## Index flags

- `--index-addresses`: Enable address balance and inscription listing by address.
- `--index-sats`: Enable sat-level index (inscriptions per sat, `/sat/<N>`, `/r/sat/...`).
- Without these, endpoints that depend on them return 404 or empty data.

<!--
Source references:
- sources/ordinals/docs/src/guides/api.md
-->
