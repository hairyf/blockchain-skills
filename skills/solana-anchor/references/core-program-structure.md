---
name: Anchor Program Structure
description: Core macros and structure of an Anchor program—declare_id, #[program], #[derive(Accounts)], #[account], and instruction context.
---

# Program Structure

Anchor uses Rust macros to reduce boilerplate and enforce common security checks. Key building blocks:

- **`declare_id!`** – Program’s on-chain address (program ID). Default comes from `target/deploy/<program>.json`; run `anchor keys sync` to sync after cloning.
- **`#[program]`** – Module containing instruction handlers. Each public function = one instruction.
- **`#[derive(Accounts)]`** – Struct listing and validating accounts for an instruction.
- **`#[account]`** – Custom account data struct (owner set to program, 8-byte discriminator, (de)serialization).

## Instruction context

Handlers take `Context<T>` as first argument; `T` is the accounts struct.

```rust
pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
    ctx.accounts.new_account.data = data;
    Ok(())
}
```

**Context fields:**

- `ctx.accounts` – Validated accounts from the `Accounts` struct
- `ctx.program_id` – Current program’s pubkey
- `ctx.remaining_accounts` – Extra accounts not in the struct
- `ctx.bumps` – PDA bump seeds from validation

Additional handler parameters are instruction arguments.

## Account validation

Two mechanisms:

1. **Account constraints** – `#[account(...)]` on each field (e.g. `init`, `mut`, `seeds`, `bump`).
2. **Account types** – `Account<T>`, `Signer`, `Program`, `SystemAccount`, etc., enforce type and checks.

Validation runs before the handler; then use `ctx.accounts` safely.

## Account discriminator

- First 8 bytes of account data = discriminator (first 8 bytes of `sha256("account:<AccountName>")`).
- Allocate **8 + data size** in `space` (e.g. `space = 8 + 8` for a `u64`).
- Used for init and for deserialization/validation.

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/basics/program-structure.mdx)
-->
