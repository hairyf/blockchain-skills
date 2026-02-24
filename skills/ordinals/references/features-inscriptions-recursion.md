---
name: features-inscriptions-recursion
description: Recursive endpoints for on-chain data and content of other inscriptions.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ordinals/ord (docs/src/inscriptions/recursion.md)
---

# Inscription Recursion

Recursion is an exception to sandboxing: whitelisted endpoints allow inscriptions to fetch on-chain data and other inscriptions' content. Recursive endpoints have **backwards-compatibility** guarantees: they will not be removed, and returned object fields will not be renamed or change type. New fields may be added or order changed; clients must tolerate extra fields and not rely on field order.

## Use cases

- Remixing or composing content from other inscriptions.
- Publishing shared resources (code, images, styles) referenced by many inscriptions.
- Generative art: algorithm inscribed as JS, instantiated with unique seeds from multiple inscriptions.
- Profile/collection art: assets in separate inscriptions combined in one (e.g. collage).

## Key endpoints (recursive)

| Endpoint | Description |
|----------|-------------|
| `GET /content/<INSCRIPTION_ID>` | Raw content of the inscription (binary or text). |
| `GET /r/blockheight` | Latest block height (JSON number). |
| `GET /r/blockhash` | Latest block hash (JSON string). |
| `GET /r/blockhash/<HEIGHT>` | Block hash at height. |
| `GET /r/blocktime` | UNIX timestamp of latest block. |
| `GET /r/blockinfo/<HEIGHT_or_HASH>` | Block info JSON (height, hash, fees, etc.). |
| `GET /r/inscription/<INSCRIPTION_ID>` | Inscription metadata (content_type, fee, satpoint, etc.). |
| `GET /r/metadata/<INSCRIPTION_ID>` | Hex-encoded CBOR metadata. |
| `GET /r/children/<INSCRIPTION_ID>` | First 100 child IDs; `/r/children/<ID>/<PAGE>`, `.../inscriptions`, `.../inscriptions/<PAGE>`. |
| `GET /r/parents/<INSCRIPTION_ID>` | First 100 parent IDs; `.../inscriptions`, `.../inscriptions/<PAGE>`. |
| `GET /r/sat/<SAT_NUMBER>` | First 100 inscription IDs on sat (requires `--index-sats`). `.../at/<INDEX>`, `.../at/<INDEX>/content` for specific index (-1 = latest). |
| `GET /r/tx/<TXID>` | Hex-encoded raw transaction. |
| `GET /r/utxo/<OUTPOINT>` | Assets in UTXO (inscriptions, runes, sat_ranges, value). |
| `GET /r/undelegated-content/<INSCRIPTION_ID>` | Undelegated content (when delegate is set). |

Plain-text variants (no JSON): `/blockheight`, `/blockhash`, `/blockhash/<HEIGHT>`, `/blocktime`.

## Example (fetch content)

```bash
curl -s "http://0.0.0.0:80/content/6fb976ab49dcec017f1e201e84395983204ae1a7c2abf7ced0a85d692e442799i0" -o skull.jpg
```

Inscription HTML/JS can request these URLs from the same origin as the server; the server resolves them and returns on-chain data.

<!--
Source references:
- sources/ordinals/docs/src/inscriptions/recursion.md
-->
