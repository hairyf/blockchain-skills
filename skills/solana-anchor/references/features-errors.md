---
name: Custom Errors
description: Defining and returning custom errors with #[error_code], err!, and require! macros.
---

# Custom Errors

Instruction handlers return `Result<T>`; errors use Anchor’s `Error` type (wraps `AnchorError` and `ProgramError`). Custom variants are defined with `#[error_code]` and returned via `err!` or `require!`.

## Defining errors

```rust
#[error_code]
pub enum MyError {
    #[msg("Amount must be >= 10")]
    AmountTooSmall,
    #[msg("Amount must be <= 100")]
    AmountTooLarge,
}
```

Anchor assigns codes starting at 6000 and generates the wiring. Use `#[msg("...")]` for the message returned to the client.

## Returning errors

- **`err!(MyError::AmountTooLarge)`** – Return this error.
- **`require!(condition, MyError::Variant)`** – If `condition` is false, return the error.

Other helpers: `require_eq!`, `require_neq!`, `require_gt!`, `require_gte!`, `require_keys_eq!`, `require_keys_neq!` (use `require_keys_*` for Pubkey comparison).

## Client

On failure, the TS client receives an error object with e.g. `errorCode.code`, `errorCode.number`, `errorMessage`, `origin`, `logs`. Use these for debugging and user-facing messages.

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/features/errors.mdx)
-->
