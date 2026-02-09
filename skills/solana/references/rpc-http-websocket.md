---
name: solana-rpc-http-websocket
description: Solana RPC — HTTP methods (getAccountInfo, getBalance, getBlock, etc.) and WebSocket subscriptions.
---

# Solana — RPC (HTTP and WebSocket)

## HTTP (common methods)

- **getLatestBlockhash**: For transaction lifetime; use in message.
- **getAccountInfo**: Account data, lamports, owner, executable.
- **getBalance**: Lamport balance for address.
- **getBlock**, **getBlockHeight**, **getBlocks**, **getBlockProduction**: Block data.
- **getTransaction**, **getSignatureStatuses**: Transaction status and confirmation.
- **sendTransaction**: Submit serialized transaction.
- **getMultipleAccountsInfo** (or getMultipleAccounts): Batch account fetch.
- **simulateTransaction**: Simulate without sending; use for CU estimate and debugging.

## WebSocket subscriptions

- **accountSubscribe** / **accountUnsubscribe**: Account data changes.
- **programSubscribe** / **programUnsubscribe**: Accounts owned by a program.
- **signatureSubscribe** / **signatureUnsubscribe**: Transaction confirmation.
- **slotSubscribe**, **slotsUpdatesSubscribe**, **rootSubscribe**, **voteSubscribe**: Slot and vote updates.
- **logsSubscribe** / **logsUnsubscribe**: Transaction logs (program logs).

## Commitment

- **processed**, **confirmed**, **finalized**. Use `confirmed` for fast feedback; `finalized` for irreversible.
- Pass commitment in RPC options and in sendAndConfirm/similar helpers.

## Key points

- Prefer **getMultipleAccounts** for many accounts; use subscriptions for real-time account or signature updates.
- Deprecated methods (e.g. getConfirmedBlock) are superseded by non–“confirmed” names; use current API.

<!--
Source references:
- https://solana.com/docs/rpc
- https://solana.com/docs/rpc/http
- https://solana.com/docs/rpc/websocket
- https://github.com/solana-foundation/solana-com
-->
