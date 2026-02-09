---
name: anchor-errors
description: Custom errors in Anchor — error_code enum, err!, require! macros, and client error handling.
---

# Anchor Custom Errors

Instruction handlers return `Result<T>`; `E` is Anchor’s `Error` (AnchorError or ProgramError). Use custom variants for business logic.

## Defining errors

```rust
#[error_code]
pub enum MyError {
    #[msg("My custom error message")]
    MyCustomError,
    #[msg("Amount must be between 10 and 100")]
    AmountOutOfRange,
}
```

Anchor assigns codes from 6000 and generates IDL/metadata. Use `#[msg("...")]` for the message returned to clients.

## Throwing errors

- **`err!(MyError::MyCustomError)`** — Return this error from the current function.
- **`require!(condition, MyError::Variant)`** — If `condition` is false, return the error.
- **`require_eq!`, `require_neq!`** — For non-pubkey equality checks.
- **`require_keys_eq!`, `require_keys_neq!`** — For pubkey comparison.
- **`require_gt!`, `require_gte!`** — Numeric comparisons.

Example:

```rust
require!(amount >= 10 && amount <= 100, CustomError::AmountOutOfRange);
```

## Client (TypeScript)

On failure, the client receives an error object with e.g. `errorCode.code`, `errorCode.number`, `errorMessage`, and optional `origin` / `comparedValues`. Match on `errorCode.code` or number for flow control.

<!--
Source references:
- docs/content/docs/features/errors.mdx
-->
