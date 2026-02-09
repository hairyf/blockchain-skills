---
name: solana-clients-javascript
description: JavaScript/TypeScript clients for Solana — @solana/kit, @solana/web3.js, @solana/client, and SPL packages.
---

# Solana — JavaScript/TypeScript Clients

## Recommended: @solana/kit

- **@solana/kit**: Main SDK (addresses, transactions, RPC, subscriptions). Use for new code.
- **@solana-program/system**, **@solana-program/token**, **@solana-program/token-2022**, **@solana-program/memo**, **@solana-program/compute-budget**: Program helpers.
- RPC: `createSolanaRpc(url)`, `createSolanaRpcSubscriptions(wsUrl)`. Use `rpc.getLatestBlockhash().send()`, `rpc.getAccountInfo(...).send()`, etc.
- Transactions: `createTransactionMessage`, `appendTransactionMessageInstructions`, `signTransactionMessageWithSigners`, `sendAndConfirmTransactionFactory`.

## Legacy: @solana/web3.js

- **@solana/web3.js**: Connection, Keypair, Transaction, sendAndConfirmTransaction.
- **@solana/spl-token**: Token, Token-2022, Associated Token Account.
- **@solana/spl-memo**: Memo program.
- Use for compatibility with existing codebases.

## Headless: @solana/client

- **@solana/client**: Headless runtime (RPC, wallets, transactions, subscriptions). For non-React apps that need a single store.

## Sending SOL (Kit)

```ts
import { getTransferSolInstruction } from "@solana-program/system";
const ix = getTransferSolInstruction({
  source: sender,
  destination: recipientAddress,
  amount: lamports(amountLamports)
});
// Append ix to transaction message, sign, send.
```

## Key points

- Prefer Kit + program packages for new projects; use web3.js + @solana/spl-token where legacy is required.
- Always use a commitment (e.g. `confirmed`) for sendAndConfirm and RPC calls where consistency matters.

<!--
Source references:
- https://solana.com/docs/clients/official/javascript
- https://solana.com/docs/frontend/client
- https://github.com/solana-foundation/solana-com
-->
