---
name: anchor-account-types
description: Anchor account types — Account, Signer, Program, AccountLoader, UncheckedAccount, Interface types.
---

# Anchor Account Types

Types for fields in `#[derive(Accounts)]` structs. They enforce ownership and (where applicable) deserialization.

## Core types

- **`Account<'info, T>`** — Owned by program, deserialized as `T`. Use for `#[account]` structs.
- **`Signer<'info>`** — Validates account signed the transaction. Prefer over raw `#[account(signer)]` when no extra constraints.
- **`Program<'info, T>`** — Validates account is the program `T` (e.g. `System`, or custom program type for CPI).
- **`SystemAccount<'info>`** — Account owned by System Program; no data parsing.
- **`AccountLoader<'info, T>`** — Zero-copy; use with `#[account(zero_copy)]` and `load` / `load_mut` / `load_init`.
- **`UncheckedAccount<'info>`** / **`AccountInfo<'info>`** — No validation. Use only when necessary and add `/// CHECK:` and manual checks.

## Optional and boxed

- **`Option<Account<'info, T>>`** — Optional account; client can omit.
- **`Box<Account<'info, T>>`** — Same as Account but boxed to reduce stack size.

## SPL / interfaces

- **`InterfaceAccount<'info, T>`** — Account conforming to an interface (e.g. SPL Mint, TokenAccount).
- **`Interface<'info, T>`** — Program implementing an interface (e.g. Token program or Token-2022).

Use with `anchor_spl::token_interface::{Mint, TokenAccount, TokenInterface}` for token-agnostic code.

<!--
Source references:
- docs/content/docs/references/account-types.mdx
- https://docs.rs/anchor-lang/latest/anchor_lang/accounts/
-->
