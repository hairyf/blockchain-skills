---
name: ton-wallets
description: Standard TON wallets (V4, V5, Highload), comparison and use cases.
---

# Standard TON Wallets

In TON, wallets are smart contracts. They handle signing, replay protection (seqno or query_id), and optionally gasless transfers. Choose by throughput and features.

## Comparison

| Feature | V4 | V5 | Highload |
|--------|----|----|----------|
| **Replay protection** | Seqno | Seqno | query_id / batch_id |
| **Messages per request** | Up to 4 | Up to 255 | Up to 2B per timeout |
| **Gasless** | No | Yes | No |
| **Plugins** | Yes | Yes | No |
| **Subwallet ID** | Yes | Yes | Yes |

Multisig: multiple owners, configurable N-of-M; higher cost and coordination. Preprocessed: lowest per-message cost, no plugins.

## Use cases

- **Retail / dApps**: V5 (recommended) or V4 — gasless, plugins, 255 messages per request.
- **Payment gateways / exchanges**: Highload — high throughput, query_id-based tracking.
- **Shared custody**: Multisig — N-of-M, audit trail, higher fees.

## Key points

- Wallet = smart contract; address = contract address. User signs off-chain; wallet receives external message and sends internal messages.
- Seqno: incrementing nonce per valid submission; common replay protection. Highload uses query_id/batch_id instead.
- Prefer V5 for new apps (gasless, 255 messages). Use Highload only when you need massive throughput and can implement query_id tracking.

<!--
Source references:
- https://github.com/ton-org/docs (standard/wallets/comparison.mdx, standard/wallets/v4.mdx, standard/wallets/v5.mdx, standard/wallets/highload/overview.mdx)
-->
