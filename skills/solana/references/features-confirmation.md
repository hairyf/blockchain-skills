---
name: solana-features-confirmation
description: Transaction confirmation and expiration on Solana — blockhash, commitment, and best practices for agents.
---

# Solana Features — Transaction Confirmation & Expiration

Transactions expire when their **recent blockhash** is too old. Confirmation means observing the transaction in a block at a given **commitment** level. Agents must handle blockhash freshness and choose commitment appropriately.

## Transaction and blockhash

- A transaction includes a **recent blockhash** used as a PoH timestamp.
- Validators keep a queue of recent blockhashes (e.g. ~300); a transaction is only processed if its blockhash is within the allowed window (e.g. ~151 most recent). Slots are ~400–600 ms, so a blockhash is typically valid for about **60–90 seconds**.
- If a transaction is submitted after its blockhash has left the window, it will be rejected (expired). Fetching a new blockhash and rebuilding the transaction is required.

## Confirmation flow

1. Build message and instructions.
2. Fetch a recent blockhash and attach it to the message.
3. Simulate (optional).
4. User/signer signs.
5. Send to RPC; leader includes it in a block.
6. Confirm by polling or subscription until the transaction appears at the desired commitment, or until expiry.

## Commitment levels

- **processed**: Not finalized; can be rolled back.
- **confirmed**: Vote threshold; still can be rolled back in theory.
- **finalized**: Fully confirmed by supermajority; safe for critical decisions.

Use `finalized` when you must assume the transaction is permanent; use `confirmed` for faster UX when rollback risk is acceptable.

## Best practices for agents

- **Refresh blockhash** shortly before signing/sending; avoid reusing old blockhashes.
- **Set `maxSupportedTransactionVersion`** (e.g. `0`) on RPC calls that return transactions (`getBlock`, `getTransaction`) when using versioned transactions to avoid RPC errors.
- **Poll or subscribe** (e.g. `getSignatureStatuses` or subscription) with the desired commitment; stop when status is confirmed/finalized or when the blockhash would be expired (then treat as failed and retry with a new blockhash if appropriate).
- **Timeout**: If confirmation does not occur within the blockhash validity window, consider the transaction expired and do not rely on it; retry with a new transaction and new blockhash if needed.

## Key points

- Blockhash age determines transaction validity; ~60–90 seconds typical.
- Confirm using commitment (processed / confirmed / finalized); use finalized for irreversibility.
- Always request a fresh blockhash when building/sending and specify max supported transaction version for versioned tx RPC responses.

<!--
Source references:
- https://solana.com/developers/guides/advanced/confirmation
- https://github.com/solana-foundation/solana-com
-->
