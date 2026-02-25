---
name: solana-kit-transactions
description: Build, sign, and send transaction messages with pipe, fee payer, lifetime, instructions, and send-and-confirm.
---

# Transactions (Kit)

Transactions are built immutably with `pipe`: create message, set fee payer, set lifetime, append instructions, then sign and send. Use signer objects so Kit can collect and invoke signers automatically.

## Build with pipe

```ts
import {
  createTransactionMessage,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  appendTransactionMessageInstructions,
  signTransactionMessageWithSigners,
  assertIsSendableTransaction,
} from '@solana/kit';

const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

const transactionMessage = pipe(
  createTransactionMessage({ version: 0 }),
  (tx) => setTransactionMessageFeePayerSigner(wallet, tx),
  (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
  (tx) => appendTransactionMessageInstructions([createAccountIx, initializeMintIx], tx),
);
```

## Fee payer and lifetime

- **Fee payer**: `setTransactionMessageFeePayerSigner(signer, tx)` or `setTransactionMessageFeePayer(address, tx)`.
- **Blockhash lifetime**: `setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx)` (from `rpc.getLatestBlockhash().send()`).
- **Durable nonce**: `setTransactionMessageLifetimeUsingDurableNonce({ nonce, nonceAccountAddress, nonceAuthorityAddress }, tx)` for long-lived or offline signing.

## Adding instructions

- Single: `appendTransactionMessageInstruction(instruction, tx)` or `prependTransactionMessageInstruction(instruction, tx)`.
- Multiple: `appendTransactionMessageInstructions([...], tx)` / `prependTransactionMessageInstructions([...], tx)`.

Instructions come from program clients (e.g. `getCreateAccountInstruction`, `getInitializeMintInstruction`).

## Compute unit limit (optional)

Use Compute Budget to set or estimate CU limit before signing:

```ts
import { estimateComputeUnitLimitFactory, getSetComputeUnitLimitInstruction } from '@solana-program/compute-budget';
import { appendTransactionMessageInstruction } from '@solana/kit';

const estimateComputeUnitLimit = estimateComputeUnitLimitFactory({ rpc });
const units = await estimateComputeUnitLimit(transactionMessage);
const txWithLimit = appendTransactionMessageInstruction(
  getSetComputeUnitLimitInstruction({ units }),
  transactionMessage,
);
```

## Sign and send

```ts
const transaction = await signTransactionMessageWithSigners(transactionMessage);
assertIsSendableTransaction(transaction);
// Signature available before send:
const signature = getSignatureFromTransaction(transaction);
await sendAndConfirmTransaction(transaction, { commitment: 'confirmed' });
```

Use `sendAndConfirmTransactionFactory({ rpc, rpcSubscriptions })` for blockhash lifetime; use `sendAndConfirmDurableNonceTransactionFactory` for durable-nonce transactions.

## Serialization

- Encode for send: `getBase64EncodedWireTransaction(transaction)`.
- Decode from RPC: `getTransactionDecoder().decode(bytes)`; message: `getCompiledTransactionMessageDecoder().decode(transaction.messageBytes)`; decompile: `decompileTransactionMessage(compiledMessage)`.

## Key points

- Always set fee payer and lifetime before appending instructions. Use signers so `signTransactionMessageWithSigners` can sign.
- After signing, call `assertIsSendableTransaction(transaction)`; then send or get signature via `getSignatureFromTransaction(transaction)`.

<!--
Source references:
- sources/solana-kit/docs/content/docs/getting-started/build-transaction.mdx
- sources/solana-kit/docs/content/docs/getting-started/send-transaction.mdx
- sources/solana-kit/docs/content/docs/concepts/transactions.mdx
-->
