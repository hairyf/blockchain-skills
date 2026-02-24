---
name: starknet-websocket-api
description: Starknet WebSocket subscriptions—new heads, events, transaction status, receipts, reorgs.
---

# WebSocket API

The Starknet WebSocket API (schema: `starknet_ws_api.json`) allows clients to subscribe to real-time updates: new blocks, events, transaction status, new transaction receipts, new transactions, and reorgs.

## Subscription Methods

- **starknet_subscribeNewHeads** — New block headers. Params per schema (if any). Returns subscription id.
- **starknet_subscriptionNewHeads** — Subscription type for new heads (used in subscription notifications).
- **starknet_subscribeEvents** — Events matching a filter. Params: event filter. Returns subscription id.
- **starknet_subscriptionEvents** — Subscription type for events.
- **starknet_subscribeTransactionStatus** — Status updates for a transaction. Params: transaction hash(es) or identifier. Returns subscription id.
- **starknet_subscriptionTransactionStatus** — Subscription type for transaction status.
- **starknet_subscribeNewTransactionReceipts** — New transaction receipts as they are finalized. Returns subscription id.
- **starknet_subscriptionNewTransactionReceipts** — Subscription type for new receipts.
- **starknet_subscribeNewTransactions** — New transactions (e.g. pending or accepted). Returns subscription id.
- **starknet_subscriptionNewTransaction** — Subscription type for new transactions.
- **starknet_subscriptionReorg** — Reorganization notifications (block reorgs).
- **starknet_unsubscribe** — Unsubscribe by subscription id. Params: subscription id.

## Usage for Agents

- Use WebSocket when building indexers, dashboards, or bots that need real-time block/event/tx updates.
- Connect to the node’s WebSocket endpoint (see node docs), then send JSON-RPC requests with method `starknet_subscribe*`; the server will push notifications with the corresponding `starknet_subscription*` type.
- Always pair subscriptions with `starknet_unsubscribe` when disconnecting or cleaning up to avoid leaking server-side state.
- For event subscriptions, pass the same filter shape used in `starknet_getEvents` (EVENT_FILTER) where applicable.

<!--
Source references:
- https://github.com/starkware-libs/starknet-specs api/starknet_ws_api.json
-->
