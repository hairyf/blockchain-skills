---
name: ton-api
description: TON data access, liteservers, TON Center, TonAPI, dTON.
---

# TON API and Data Access

Access TON via public liteservers, hosted APIs, or self-hosted nodes.

## Options (summary)

| Feature              | Public liteservers | TON Center v2 | TON Center v3 | TonAPI | dTON |
| -------------------- | ------------------ | ------------- | ------------ | ------ | ----- |
| Self-hosted          | ✅                 | ✅            | ✅           | ❌     | ❌    |
| Indexer (DB/queries) | ❌                 | ❌            | ✅           | ✅     | ✅    |
| Proofs               | ✅                 | ❌            | ❌           | ❌     | ❌    |

- **Liteservers**: raw RPC; cryptographic proofs; config: mainnet [global.config.json](https://ton-blockchain.github.io/global.config.json), testnet [testnet-global.config.json](https://ton-blockchain.github.io/testnet-global.config.json). Run your own node/liteserver for full control.
- **TON Center v2**: HTTP API (toncenter.com); no proofs; can self-host (ton-http-api).
- **TON Center v3**: indexer + API; archival; no proofs; open-source (ton-indexer).
- **TonAPI**: REST/Swagger; indexer; not self-hosted; OpenTonAPI is limited open-source.
- **dTON**: GraphQL (dton.io); indexer; not self-hosted.

**Indexer** = service keeps derived DB (traces, jettons, NFTs, etc.). **Proofs** = responses verifiable with network crypto (liteserver/tonlib).

## When to use

- Need **proofs** or full control → liteserver (or run node).
- Need **indexed** data (history, tokens, traces) → v3, TonAPI, or dTON.
- Simple REST, quick integration → TonAPI or TON Center v2/v3.

Mainnet/testnet endpoints and deploy/source links are in ecosystem/api/overview and per-service docs.

## Key points

- Liteservers = RPC + proofs; TON Center v2/v3 = HTTP API; v3/TonAPI/dTON = indexer.
- Self-host: liteserver, v2 (ton-http-api), v3 (ton-indexer). TonAPI/dTON = hosted only.
- Choose by: proofs vs indexed data vs ease of integration.

<!--
Source references:
- https://github.com/ton-org/docs (ecosystem/api/overview.mdx)
- ecosystem/api/toncenter, ecosystem/node
-->
