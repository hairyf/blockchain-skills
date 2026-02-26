---
name: solana-kit-transaction-confirmation
description: Transaction confirmation strategies — block height exceedence, recent signature, nonce invalidation, timeout.
---

# Transaction confirmation (Kit)

Kit provides configurable confirmation strategies for sent transactions: wait for a signature to reach a commitment level, react to blockhash expiry or nonce advancement, and time out. Use `@solana/transaction-confirmation` (or via `@solana/kit`).

## Recent signature confirmation

Resolves when the transaction reaches the target commitment; throws if the transaction fails.

```ts
import { createRecentSignatureConfirmationPromiseFactory } from '@solana/transaction-confirmation';

const getRecentSignatureConfirmationPromise = createRecentSignatureConfirmationPromiseFactory({
  rpc,
  rpcSubscriptions,
});

await getRecentSignatureConfirmationPromise({ commitment: 'confirmed', signature });
```

## Block height exceedence (blockhash expiry)

When the transaction uses a blockhash lifetime, it is invalid after that blockhash expires. This promise rejects when the current block height exceeds the last valid block height.

```ts
import { createBlockHeightExceedencePromiseFactory } from '@solana/transaction-confirmation';

const getBlockHeightExceedencePromise = createBlockHeightExceedencePromiseFactory({
  rpc,
  rpcSubscriptions,
});

await getBlockHeightExceedencePromise({ lastValidBlockHeight });
// Throws SOLANA_ERROR__BLOCK_HEIGHT_EXCEEDED when exceeded → re-sign and retry.
```

## Nonce invalidation (durable nonce)

For nonce-based transactions, reject when the nonce account value changes (nonce advanced).

```ts
import { createNonceInvalidationPromiseFactory } from '@solana/transaction-confirmation';

const getNonceInvalidationPromise = createNonceInvalidationPromiseFactory({
  rpc,
  rpcSubscriptions,
});

await getNonceInvalidationPromise({ currentNonceValue, nonceAccountAddress });
// Throws SOLANA_ERROR__NONCE_INVALID or SOLANA_ERROR__NONCE_ACCOUNT_NOT_FOUND.
```

## Timeout

When no other heuristic applies, race with a timeout: 30s for `processed`, 60s otherwise.

```ts
import { safeRace } from '@solana/promises';
import { getTimeoutPromise } from '@solana/transaction-confirmation';

await safeRace([
  getCustomTransactionConfirmationPromise(/* ... */),
  getTimeoutPromise({ commitment }),
]);
// TimeoutError (DOMException) on timeout.
```

## Custom strategies

- **Recent tx:** `waitForRecentTransactionConfirmation({ getBlockHeightExceedencePromise, getRecentSignatureConfirmationPromise })`.
- **Recent tx with timeout:** `waitForRecentTransactionConfirmationUntilTimeout({ getTimeoutPromise, getRecentSignatureConfirmationPromise })`.
- **Durable nonce:** `waitForDurableNonceTransactionConfirmation({ getNonceInvalidationPromise, getRecentSignatureConfirmationPromise })`.

Supply your own promise factories for each hook to plug in RPC/subscription clients and abort signals.

## Key points

- Use the factory that matches your transaction lifetime: blockhash vs nonce.
- Combine with `sendAndConfirmTransaction` (or equivalent) which typically uses these under the hood; use these APIs when building custom confirmation flows.
- Handle `SOLANA_ERROR__BLOCK_HEIGHT_EXCEEDED` and `SOLANA_ERROR__NONCE_INVALID` by re-signing and resending when appropriate.

<!--
Source references:
- sources/solana-kit/packages/transaction-confirmation/README.md
-->
