---
name: solana-core-transactions-instructions
description: Solana transaction format, signatures, message, and instructions for building and sending transactions.
---

# Solana Core — Transactions and Instructions

A **transaction** is a list of **instructions** executed in order. If any instruction fails, the whole transaction is rolled back (atomic).

## Transaction layout

- **Size limit**: 1232 bytes (signatures + message).
- **signatures**: Array of 64-byte signatures; first signer pays the base fee.
- **message**: Header, account keys, recent blockhash, instructions.

## Instruction

- **program_id**: Program to run.
- **accounts**: Account metas (pubkey, is_signer, is_writable).
- **data**: Opaque instruction bytes (program-specific).

## Building and sending (TypeScript — Kit)

```ts
import {
  createTransactionMessage,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  appendTransactionMessageInstructions,
  signTransactionMessageWithSigners,
  sendAndConfirmTransactionFactory
} from "@solana/kit";

const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
const message = pipe(
  createTransactionMessage({ version: 0 }),
  (tx) => setTransactionMessageFeePayerSigner(feePayer, tx),
  (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
  (tx) => appendTransactionMessageInstructions([instruction], tx)
);
const signed = await signTransactionMessageWithSigners(message);
await sendAndConfirmTransactionFactory({ rpc, rpcSubscriptions })(signed, { commitment: "confirmed" });
```

## Building and sending (Legacy web3.js)

```ts
import { Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
const tx = new Transaction().add(instruction);
const sig = await sendAndConfirmTransaction(connection, tx, [signer]);
```

## Key points

- Get a fresh **recent blockhash** for each transaction; it expires (~60–90 s).
- Fee payer must be the first signer and own a System Program account (can pay fees).
- Transaction signature = first signature; use it to look up the tx on-chain.

<!--
Source references:
- https://solana.com/docs/core/transactions
- https://solana.com/docs/core/instructions
- https://github.com/solana-foundation/solana-com
-->
