---
name: tronweb-transaction-lifecycle
description: Sign → broadcast → getTransactionInfo; handling receipt and FAILED transactions.
---

# Transaction lifecycle

After building and signing a transaction, broadcast it and poll for the result. Handle success, FAILED, and timeouts so agents and UIs give clear feedback.

## Flow

```typescript
const tx = await tronWeb.transactionBuilder.triggerSmartContract(...);
const signed = await tronWeb.trx.sign(tx);
const result = await tronWeb.trx.sendRawTransaction(signed);
// result: { result: true, txid: '...' } or { result: false, code: '...', message: '...' }
```

Then wait for confirmation and inspect the receipt:

```typescript
const info = await tronWeb.trx.getTransactionInfo(result.txid);
// info.receipt.result === 'SUCCESS' | 'FAILED' | undefined (pending)
// info.receipt.energy_usage_total, contractResult, etc.
```

## Handling result

- **Broadcast result.result === false** — Node rejected (e.g. invalid tx, duplicate); use result.code and result.message.
- **info.receipt.result === 'SUCCESS'** — Transaction confirmed and succeeded.
- **info.receipt.result === 'FAILED'** — Transaction confirmed but reverted (e.g. contract revert, out of energy). Check contractResult for revert reason when available.
- **info not found or receipt.result undefined** — Still pending; poll getTransactionInfo until confirmed or timeout.

Polling: wait a few seconds between calls; stop after N attempts or when receipt.result is defined. Use getConfirmedCurrentBlock to align with "confirmed" view if needed.

## Key points

- Always check broadcast result before assuming the tx was submitted; then use getTransactionInfo for on-chain outcome.
- For contract calls, FAILED usually means revert or resource limit; surface receipt and contractResult to the user or agent.
- Ref block expiration (e.g. 60s) means the tx can become invalid if not broadcast in time; build with getCurrentRefBlockParams when building manually.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (src/lib/trx.ts)
- https://tronweb.network/docu/docs/intro/
-->