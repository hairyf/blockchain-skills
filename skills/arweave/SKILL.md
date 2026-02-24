---
name: arweave
description: Arweave protocol and node API — permanent storage, HTTP interface, transactions, blocks, gateways, path manifests.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ArweaveTeam/arweave
---

> Skill based on Arweave (official Erlang node/gateway), generated 2026-02-24. Docs from `sources/arweave/` (README, http_iface_docs, http_post_unsigned_tx_docs, doc/).

Arweave is a distributed, cryptographically verified permanent archive. Data is stored in a decentralised peer-to-peer Blockweave; amounts are in winston (1 AR = 10^12 winston). The node exposes an HTTP API for transactions, blocks, wallets, price, and peers; gateways serve content by domain with optional path manifests and custom domains.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Protocol Overview | Blockweave, AR/winston, node vs gateway | [core-protocol-overview](references/core-protocol-overview.md) |
| Transactions | TX structure, id, owner, target, quantity, data, reward, signature, tags | [core-transactions](references/core-transactions.md) |
| Blocks | Block fields, indep_hash vs hash, height, current block | [core-blocks](references/core-blocks.md) |
| Wallets and Balances | Address, balance, last_tx, txs, deposits | [core-wallets-balances](references/core-wallets-balances.md) |

## Features

### HTTP and Internal API

| Topic | Description | Reference |
|-------|-------------|-----------|
| HTTP API | Info, tx, block, wallet, price, peers, POST tx | [features-http-api](references/features-http-api.md) |
| Internal API | Wallet generation, unsigned tx (internal_api_secret) | [features-internal-api](references/features-internal-api.md) |

### Gateway and Data

| Topic | Description | Reference |
|-------|-------------|-----------|
| Path Manifests | Multi-path apps, manifest schema, index path | [features-path-manifests](references/features-path-manifests.md) |
| Gateway Setup | TLS, main domain, custom domains, DNS TXT | [features-gateway](references/features-gateway.md) |
| IPFS Pinning | ipfs_pin, IPFS_Add tag, monitoring | [features-ipfs-pinning](references/features-ipfs-pinning.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Units and Encoding | Winston strings, base64url, Content-Type tags | [best-practices-units-and-encoding](references/best-practices-units-and-encoding.md) |

## External Links

- [arweave.org](https://www.arweave.org)
- [Yellow paper](https://yellow-paper.arweave.dev)
- [ArweaveTeam/arweave GitHub](https://github.com/ArweaveTeam/arweave)
- [HTTP API Postman](https://documenter.getpostman.com/view/5500657/RWgm2g1r)
