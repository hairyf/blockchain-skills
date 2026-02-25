---
name: Account Constraints
description: Anchor #[account(...)] constraints—init, mut, seeds/bump, has_one, close, realloc, SPL, and #[instruction(...)].
---

# Account Constraints

Use `#[account(...)]` on fields of a `#[derive(Accounts)]` struct to validate accounts.

## Common constraints

| Constraint | Description |
|------------|-------------|
| **`signer`** | Account must have signed the transaction. |
| **`mut`** | Account is writable; Anchor will persist changes. |
| **`init`** | Create account via system program. Requires `payer` and `space`. |
| **`init_if_needed`** | Like `init` but only if account doesn’t exist (feature-gated). |
| **`seeds = [...], bump`** | Account must be the PDA for those seeds; `bump` stores or validates bump. |
| **`seeds::program = expr`** | Use another program’s ID for PDA derivation. |
| **`has_one = target`** | Field on the account must equal `target`’s key (e.g. `has_one = authority`). |
| **`address = expr`** | Account key must equal `expr`. |
| **`owner = expr`** | Account owner must equal `expr`. |
| **`executable`** | Account is executable (program). |
| **`constraint = expr`** | Custom boolean; use `@ CustomError` for custom error. |
| **`close = target`** | Close account and send lamports to `target`. |
| **`realloc = size`** | Resize account; use `realloc::payer` and `realloc::zero`. |
| **`dup`** | Allow same account as another mutable account (use with care). |
| **`zero`** | Discriminator must be zero (uninitialized); used for large zero-copy init. |

## SPL / Token

- **`token::mint`, `token::authority`** – Validate token account mint and authority.
- **`mint::authority`, `mint::decimals`** – Validate mint account.
- **`associated_token::mint`, `associated_token::authority`** – Create or validate ATA.
- **`*::token_program = expr`** – Override token program (e.g. Token-2022).

## Instruction args in constraints

Use `#[instruction(...)]` on the Accounts struct to use instruction arguments in constraints (same order as handler; can omit trailing args):

```rust
#[instruction(input: String)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 8 + 4 + input.len())]
    pub new_account: Account<'info, DataAccount>,
    // ...
}
```

Skipping an argument in the middle is not allowed.

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/references/account-constraints.mdx)
- https://docs.rs/anchor-lang/latest/anchor_lang/derive.Accounts.html
-->
