---
name: getblock-yellowstone-grpc
description: Solana real-time data via GetBlock Yellowstone Geyser gRPC — streams for accounts, transactions, blocks, slots; low latency, high throughput; backend-only.
---

# GetBlock Yellowstone gRPC (Solana)

Yellowstone gRPC is a Solana Geyser plugin that streams on-chain data with low latency. GetBlock exposes it for Solana applications that need real-time updates (e.g. indexers, MEV, live dashboards).

## Capabilities

- **Streams**: Account updates, transactions, blocks, slot notifications.
- **Filtering**: By account key, owner program, data patterns, commitment.
- **Unary RPCs**: Slot, block height, latest blockhash, valid blockhash on demand.

Data is pushed as it happens (often faster than standard RPC/WebSocket finality). gRPC is backend-only; not for browser clients.

## When to use

- Need continuous Solana account/tx/block updates without polling.
- Building indexers, arbitrage bots, or real-time analytics that react to chain events immediately.

Setup and connection details (endpoint, auth) are in GetBlock dashboard under Solana / Yellowstone Geyser add-on. Use the same access-token-in-URL pattern where applicable, or dedicated gRPC credentials as documented by GetBlock.

<!--
Source references:
- https://github.com/GetBlock-io/getblock-docs
- add-ons/yellowstone-grpc-api/overview.md
- guides/listening-to-high-value-sol-transactions-via-yellowstone-geyser-grpc-with-getblock.md
-->
