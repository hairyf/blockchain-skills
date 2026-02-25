---
name: Token Integration (SPL)
description: Using anchor-spl for Token Program and Token 2022; mints, token accounts, ATAs, and constraints.
---

# Token Integration (SPL)

Use the `anchor-spl` crate to interact with Solana's Token Program and Token Extension Program (Token 2022) from Anchor programs. Add `anchor-spl` and enable `anchor-spl/idl-build` in your program's `Cargo.toml`.

## Setup

```toml
[features]
idl-build = ["anchor-lang/idl-build", "anchor-spl/idl-build"]

[dependencies]
anchor-lang = "0.32.1"
anchor-spl = "0.32.1"
```

## Key modules

| Module | Use |
|--------|-----|
| `token` | Legacy Token Program instructions and account types |
| `token_2022` | Token 2022 base instructions |
| `token_2022_extensions` | Token 2022 extension instructions |
| `token_interface` | Types that work with both Token and Token 2022 (`Mint`, `TokenAccount`, `TokenInterface`) |
| `associated_token` | Associated Token Account instruction |

Prefer `token_interface` when you want one code path for both programs: `InterfaceAccount<'info, Mint>`, `Interface<'info, TokenInterface>`.

## Create a mint

Use `InterfaceAccount<'info, Mint>` and `Interface<'info, TokenInterface>`. Constraint `init` plus mint constraints create the mint.

**Keypair-based mint:**

```rust
use anchor_spl::token_interface::{Mint, TokenInterface};

#[account(
    init,
    payer = signer,
    mint::decimals = 6,
    mint::authority = signer.key(),
    mint::freeze_authority = signer.key(),
)]
pub mint: InterfaceAccount<'info, Mint>,
pub token_program: Interface<'info, TokenInterface>,
```

**PDA mint** (deterministic address; same PDA can be `mint::authority` for CPI minting):

```rust
#[account(
    init,
    payer = signer,
    mint::decimals = 6,
    mint::authority = mint.key(),
    mint::freeze_authority = mint.key(),
    seeds = [b"mint"],
    bump
)]
pub mint: InterfaceAccount<'info, Mint>,
```

Constraints: `payer`, `mint::decimals`, `mint::authority` (required), `mint::freeze_authority` (optional). Use `seeds` and `bump` for PDA mints.

## Create a token account

Token accounts hold a balance of one mint for one owner. Use `InterfaceAccount<'info, TokenAccount>` (from `token_interface`) for accounts that may be either Token or Token 2022.

**Associated Token Account (ATA):** Use `anchor_spl::associated_token::Create` or the Associated Token Program; address is PDA(owner, token_program, mint). Constraint `init` with `associated_token::mint = ..., associated_token::authority = ...` when creating ATAs from Anchor.

**PDA token account:** Use `init`, `payer`, `token::mint`, `token::authority`, and `seeds`/`bump` for the token account PDA.

## Token 2022 extensions

Token 2022 adds extensions (e.g. TransferFeeConfig, NonTransferable, MemoTransfer). Most extensions are set at mint or account creation and cannot be added later. Enable extensions via the appropriate `token_2022`/`token_2022_extensions` instructions and account types when building mints or token accounts. Some extensions are mutually exclusive.

## Key points

- Use `token_interface` for programs that support both Token and Token 2022.
- Mint authority and freeze authority are set at init; mint address is fixed.
- ATA address = PDA(owner, token_program, mint) via Associated Token Program.
- Pass the correct program id (`spl_token::ID` or `spl_token_2022::ID`) in client and in account structs.

<!--
Source references:
- https://github.com/solana-foundation/anchor/tree/master/docs/content/docs/tokens
- https://github.com/solana-foundation/anchor/tree/master/docs/content/docs/tokens/basics/create-mint.mdx
- https://github.com/solana-foundation/anchor/tree/master/docs/content/docs/tokens/basics/create-token-account.mdx
- https://github.com/solana-foundation/anchor/tree/master/docs/content/docs/tokens/extensions.mdx
-->
