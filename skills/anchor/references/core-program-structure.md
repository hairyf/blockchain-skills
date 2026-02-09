---
name: anchor-program-structure
description: Anchor program structure, macros (declare_id, #[program], #[derive(Accounts)], #[account]), and instruction context.
---

# Anchor Program Structure

Anchor uses Rust macros to reduce boilerplate and enforce common security checks for Solana programs.

## Key Macros

- **`declare_id!`** — Program on-chain address (program ID). Sync with keypair: `anchor keys sync`.
- **`#[program]`** — Module containing instruction handlers. Each public function = one instruction.
- **`#[derive(Accounts)]`** — Struct listing accounts required by an instruction; implements validation and (de)serialization.
- **`#[account]`** — Custom account data struct: owner set to program, 8-byte discriminator, auto (de)serialization.

## Instruction Context

Handlers receive `Context<T>` as first parameter. `T` is the Accounts struct.

```rust
pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
    ctx.accounts.new_account.data = data;
    Ok(())
}
```

- `ctx.accounts` — Validated accounts
- `ctx.program_id` — Program pubkey
- `ctx.remaining_accounts` — Extra accounts not in the struct
- `ctx.bumps` — PDA bump seeds from the Accounts struct

## Account Validation

Two mechanisms used together:

1. **Constraints** — `#[account(...)]` on fields (e.g. `init`, `mut`, `seeds`, `bump`). See account-constraints.
2. **Account types** — `Account<'info, T>`, `Signer<'info>`, `Program<'info, System>`, etc. See account-types.

Validation runs before instruction logic; then use `ctx.accounts` safely.

## Account Discriminator

8-byte discriminator = first 8 bytes of `sha256("account:<AccountName>")`. Stored as first 8 bytes of account data. Allocate 8 bytes in `space` when using `init`: `space = 8 + 8` for an 8-byte field.

## Minimal Example

```rust
use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
mod hello_anchor {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
        ctx.accounts.new_account.data = data;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 8 + 8)]
    pub new_account: Account<'info, NewAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct NewAccount {
    data: u64,
}
```

<!--
Source references:
- https://github.com/coral-xyz/anchor/tree/master/docs
- docs/content/docs/basics/program-structure.mdx
-->
