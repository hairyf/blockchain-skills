---
name: solana-kit-rpc
description: RPC client — read/write to the chain via HTTP (getBalance, getAccountInfo, getLatestBlockhash, sendTransaction, etc.).
---

# RPC (Kit)

RPC is the HTTP interface to a Solana node. Use it to read state (balances, accounts, blockhash) and send transactions. Kit types follow the [Solana JSON RPC HTTP](https://solana.com/docs/rpc/http) API.

## Create and use

```ts
import { address, createSolanaRpc } from '@solana/kit';

const rpc = createSolanaRpc('https://api.devnet.solana.com');
const { value: balance } = await rpc.getBalance(address('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb')).send();
```

All RPC methods return a **call object**; call `.send()` to execute. The result is typically `{ value: T }`.

## Common methods (agent use)

- **getBalance(address)** — lamports for an account.
- **getAccountInfo(address)** / **getMultipleAccounts(address[])** — account data (encoding options affect format).
- **getLatestBlockhash()** — `{ blockhash, lastValidBlockHeight }` for transaction lifetime (blockhash strategy).
- **getMinimumBalanceForRentExemption(size)** — min lamports for rent-exempt account of given size.
- **sendTransaction(encoded, options)** — submit transaction (usually via Kit helpers that encode and set options).
- **simulateTransaction(...)** — simulate without sending.

## Packages

RPC is in `@solana/kit`. Standalone: `@solana/rpc`. Sub-packages: `@solana/rpc-api`, `@solana/rpc-spec`, `@solana/rpc-types`, `@solana/rpc-transport-http`, etc., for custom implementations.

## Key points

- Use `.send()` on the return value of any RPC method to run the request.
- Public endpoints: `https://api.mainnet-beta.solana.com`, `https://api.testnet.solana.com`, `https://api.devnet.solana.com`. Prefer a dedicated RPC for production.

<!--
Source references:
- sources/solana-kit/docs/content/docs/concepts/rpc.mdx
-->
