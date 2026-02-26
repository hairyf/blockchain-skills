---
name: solana-core-versioned-transactions
description: Versioned transactions on Solana — v0 message, Address Lookup Tables support, maxSupportedTransactionVersion for RPC and clients.
---

# Solana Core — Versioned Transactions

Versioned transactions enable extra runtime features (e.g. Address Lookup Tables). Onchain programs do not need changes; **client code must** set `maxSupportedTransactionVersion` on RPC calls that return transactions to avoid errors.

## Transaction versions

- **legacy** — Older format; no lookup tables.
- **0** — Adds support for [Address Lookup Tables](references/advanced-lookup-tables.md).

## maxSupportedTransactionVersion (required)

RPC methods that return transactions (e.g. `getBlock`, `getTransaction`) **should** include the highest version your app supports. If omitted, only `legacy` is allowed and the RPC **will fail** when a version `0` transaction is returned.

### web3.js

```js
const block = await connection.getBlock(slot, { maxSupportedTransactionVersion: 0 });
const tx = await connection.getTransaction(signature, { maxSupportedTransactionVersion: 0 });
```

### JSON-RPC

Include in the options object: `"maxSupportedTransactionVersion": 0`.

## Creating a v0 transaction (web3.js)

Build a `TransactionMessage` with `payerKey`, `recentBlockhash`, and `instructions`, then compile to v0 and wrap in `VersionedTransaction`:

```js
const messageV0 = new web3.TransactionMessage({
  payerKey: payer.publicKey,
  recentBlockhash: blockhash,
  instructions,
}).compileToV0Message();
const transaction = new web3.VersionedTransaction(messageV0);
transaction.sign([payer]);
```

Sign **before** calling `sendTransaction`; `sendTransaction` for versioned transactions does not accept signers as a second argument.

## Key points

- Use version `0` when using Address Lookup Tables or when parsing blocks/transactions that may contain v0.
- Always set `maxSupportedTransactionVersion: 0` (or higher when new versions exist) on getBlock/getTransaction and similar RPC calls.
- VersionedTransaction must be signed before sendTransaction.

<!-- Source: https://solana.com/developers/guides/advanced/versions, https://github.com/solana-foundation/solana-com -->
