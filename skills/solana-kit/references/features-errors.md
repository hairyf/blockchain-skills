---
name: solana-kit-errors
description: SolanaError — typed error codes, context, isSolanaError; production messages stripped for bundle size.
---

# Errors (Kit)

Kit uses a typed error system: **SolanaError** with a **code**, **message**, and optional **context**. Use `isSolanaError(e)` or `isSolanaError(e, code)` to detect and narrow; context is typed when the code is known. Error messages are stripped in production builds to keep bundle size small.

## Detect and handle

```ts
import {
  isSolanaError,
  SOLANA_ERROR__TRANSACTION__SIGNATURES_MISSING,
  SOLANA_ERROR__TRANSACTION__EXCEEDS_SIZE_LIMIT,
} from '@solana/kit';

try {
  assertIsSendableTransaction(transaction);
  await sendAndConfirmTransaction(transaction, { commitment: 'confirmed' });
} catch (e) {
  if (isSolanaError(e, SOLANA_ERROR__TRANSACTION__SIGNATURES_MISSING)) {
    console.error('Missing signatures for:', e.context.addresses.join(', '));
  } else if (isSolanaError(e, SOLANA_ERROR__TRANSACTION__EXCEEDS_SIZE_LIMIT)) {
    console.error(`Size limit ${e.context.transactionSizeLimit}, actual ${e.context.transactionSize}`);
  }
  throw e;
}
```

## Generic check

```ts
if (isSolanaError(e)) {
  // e is SolanaError; use e.code, e.context as needed
}
```

## Key points

- Always use `isSolanaError(e)` or `isSolanaError(e, code)` in catch blocks to get typed context.
- Error codes are in the `SolanaErrorCode` union; context shape depends on the code. See package `@solana/errors` or Kit API docs for full list.

<!--
Source references:
- sources/solana-kit/docs/content/docs/concepts/errors.mdx
-->
