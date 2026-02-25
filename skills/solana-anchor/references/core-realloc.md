---
name: Account Reallocation
description: Resizing program accounts with the realloc constraint.
---

# Account Reallocation

Use #[account(realloc = <size>, ...)] to resize an existing account at the start of an instruction.

## Syntax

realloc = size - New total account size in bytes.
realloc::payer - Account that pays for extra rent when extending or receives refund when shrinking.
realloc::zero = true - Zero new bytes when extending; false leaves them uninitialized.

## Key points

- Realloc runs at instruction start. Compute new size like space for init (e.g. 8 + data).
- Use realloc::zero = true for safety when extending.
