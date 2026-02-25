---
name: Account Types
description: Anchor account types for Accounts structs—Account, Signer, Program, AccountLoader, UncheckedAccount, etc.
---

# Account Types

Use these types as fields in `#[derive(Accounts)]` structs to validate and deserialize accounts.

| Type | Purpose |
|------|---------|
| **`Account<'info, T>`** | Owned by program, deserializes as `T`. Use for `#[account]` data. |
| **`Signer<'info>`** | Validates account signed the transaction. |
| **`Program<'info, T>`** | Validates account is the program `T` (e.g. `System`, `Token`). |
| **`SystemAccount<'info>`** | Owned by system program (generic data account). |
| **`AccountLoader<'info, T>`** | Zero-copy load for `#[account(zero_copy)]` types. Use `load()`, `load_mut()`, `load_init()`. |
| **`UncheckedAccount<'info>`** | No checks; use with `// CHECK` when you validate manually. |
| **`AccountInfo<'info>`** | Prefer `UncheckedAccount` to make “no checks” explicit. |
| **`Option<Account<'info, T>>`** | Optional account. |
| **`Box<Account<'info, T>>`** | Same as `Account` but boxed to reduce stack size. |
| **`Interface<'info, T>`** | Account must be one of a set of program IDs (e.g. Token or Token-2022). |
| **`InterfaceAccount<'info, T>`** | Token-style account (e.g. Mint, TokenAccount) for either program. |
| **`Sysvar<'info, T>`** | Sysvar account (e.g. `Rent`, `Clock`). |
| **`Migration<'info, From, To>`** | Migrate account from one schema to another (e.g. with `realloc`). |

## Snippets

```rust
// Typical program-owned account
pub my_data: Account<'info, MyData>,

// Signer
pub authority: Signer<'info>,

// System program for CPI
pub system_program: Program<'info, System>,

// Zero-copy large account
pub order_book: AccountLoader<'info, OrderBook>,

// Optional
pub optional_config: Option<Account<'info, Config>>,

// Unchecked (add // CHECK and validate in code)
/// CHECK: validated by has_one and constraint
pub other: UncheckedAccount<'info>,
```

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/references/account-types.mdx)
- https://docs.rs/anchor-lang/latest/anchor_lang/accounts/index.html
-->
