---
name: solana-kit-upgrade
description: Migrating from Web3.js — Connection → createSolanaRpc/createSolanaRpcSubscriptions, PublicKey → address(), patterns and compatible clients.
---

# Upgrade from Web3.js (Kit)

Kit (formerly Web3.js v2) is a functional, tree-shakeable rewrite. There is no single `Connection` class; use `createSolanaRpc` and `createSolanaRpcSubscriptions` and compose only what you need.

## Connection → RPC + RPC Subscriptions

| Web3.js | Kit |
|--------|-----|
| `new Connection(url, { commitment, wsEndpoint })` | `createSolanaRpc(url)` and `createSolanaRpcSubscriptions(wsUrl)` |
| `connection.getBalance(publicKey)` | `rpc.getBalance(address('...')).send()` → `result.value` |
| `connection.onAccountChange(publicKey, callback)` | `rpcSubscriptions.accountNotifications(address('...')).subscribe({ abortSignal })` then `for await` |

## PublicKey → Address

- Use `address('base58string')` from `@solana/kit`. Type is `Address`.
- No `PublicKey` class; addresses are nominal string types.

## Sending transactions

- Web3.js: `connection.sendTransaction(transaction, signers, options)`.
- Kit: Build `TransactionMessage` with `pipe`, set fee payer and lifetime, append instructions, then `signTransactionMessageWithSigners(message)` → `assertIsSendableTransaction(transaction)` → `sendAndConfirmTransaction(transaction, { commitment })` (from `sendAndConfirmTransactionFactory({ rpc, rpcSubscriptions })`).

## Compatible program clients

Use Codama-generated clients that match Kit’s instruction/account/codec patterns. Examples:

- `@solana-program/system`, `@solana-program/token`, `@solana-program/token-2022`
- `@solana-program/compute-budget`, `@solana-program/memo`, `@solana-program/address-lookup-table`, `@solana-program/stake`

Install only the programs your app uses. See the [compatible clients](/docs/compatible-clients) doc for the full table.

## Key points

- Tree-shaking: import only the functions you use from `@solana/kit` so unused code is dropped.
- No default commitment on the client; pass commitment per call (e.g. `getBalance(..., { commitment: 'confirmed' })` or in send/confirm options).

<!--
Source references:
- sources/solana-kit/docs/content/docs/upgrade-guide.mdx
- sources/solana-kit/docs/content/docs/compatible-clients.mdx
-->
