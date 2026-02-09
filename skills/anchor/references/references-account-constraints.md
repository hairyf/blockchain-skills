---
name: anchor-account-constraints
description: Anchor account constraints — signer, mut, init, seeds/bump, has_one, address, owner, constraint.
---

# Anchor Account Constraints

Constraints are used in `#[account(...)]` on fields of a struct that `#[derive(Accounts)]`. They validate accounts before the instruction runs.

## Common constraints

| Constraint | Purpose |
|------------|--------|
| `signer` | Account must have signed the transaction |
| `mut` | Account is writable; Anchor persists changes |
| `init` | Create account via System CPI; requires `payer`, `space` (include 8-byte discriminator) |
| `init_if_needed` | Like init but only if account doesn’t exist; needs `init_if_needed` feature |
| `seeds = [...], bump` | Account must be PDA with these seeds (and optional `bump = expr` or `seeds::program`) |
| `has_one = <target>` | Account field must equal the key of `<target>` in the Accounts struct |
| `address = <expr>` | Account key must equal `<expr>` |
| `owner = <expr>` | Account owner must equal `<expr>` |
| `executable` | Account is executable (program) |
| `zero` | Account discriminator is zero (uninitialized); used for large zero-copy init |
| `dup` | Allow duplicate mutable account (otherwise Anchor disallows) |

Custom error: append `@ MyError::Variant` to a constraint, e.g. `#[account(address = expected @ MyError::WrongAddress)]`.

## Constraint combinations

- `init` is often used with `payer`, `space`, and with PDA: `seeds`, `bump`.
- For zero-copy init over 10240 bytes: use `zero` (no `init`), create account externally, then `load_init()` in the instruction.

Full list and signatures: [docs.rs anchor_lang Accounts](https://docs.rs/anchor-lang/latest/anchor_lang/derive.Accounts.html) and Anchor repo `lang/syn/src/codegen/accounts/constraints.rs`.

<!--
Source references:
- docs/content/docs/references/account-constraints.mdx
- https://github.com/coral-xyz/anchor
-->
