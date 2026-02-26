---
name: solana-kit-program-errors
description: Identify custom program errors from transaction failures with isProgramError.
---

# Program errors (Kit)

When a transaction fails, the RPC returns the failed instruction index but not the program’s custom error by default. Use `isProgramError()` from `@solana/programs` (or `@solana/kit`) to detect whether the failure came from a specific program and optionally match an error code.

## Usage

```ts
import { isProgramError } from '@solana/kit';

try {
  await sendAndConfirmTransaction(transaction, { commitment: 'confirmed' });
} catch (error) {
  if (isProgramError(error, transactionMessage, myProgramAddress, 42)) {
    // Custom program error code 42 from this program.
  } else if (isProgramError(error, transactionMessage, myProgramAddress)) {
    // Any custom program error from this program.
  } else {
    throw error;
  }
}
```

## Parameters

- **error:** The thrown value (typically from send/sendAndConfirm or RPC).
- **transactionMessage:** The transaction message that was executed. Required because the RPC only gives the instruction index; the message is used to resolve the program ID for that instruction.
- **programAddress:** The program address to attribute the error to.
- **code (optional):** If provided, the custom program error code must match this value.

## Key points

- Use when handling transaction failures to distinguish program-specific errors (e.g. insufficient funds, wrong state) from network or validation errors.
- Always pass the same transaction message that was sent; the helper uses it to map the failed instruction to a program.
- Combine with `isSolanaError()` for Kit’s own errors (e.g. block height exceeded, missing signatures) and use `isProgramError()` for on-program failure reasons.

<!--
Source references:
- sources/solana-kit/packages/programs/README.md
-->
