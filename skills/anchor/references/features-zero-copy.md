---
name: anchor-zero-copy
description: Zero-copy deserialization in Anchor — AccountLoader, #[account(zero_copy)], load/load_mut/load_init, space limits.
---

# Anchor Zero-Copy

Zero-copy lets the program use account data in place (no full deserialize/serialize). Use for large accounts (> ~1KB), order books, event queues; saves CUs and supports up to 10MB accounts.

## Setup

Add to `Cargo.toml`:

```toml
bytemuck = { version = "1.20", features = ["min_const_generics"] }
anchor-lang = "0.32"
```

## Define zero-copy account

```rust
#[account(zero_copy)]
pub struct Data {
    pub data: [u8; 10232],  // fixed size; no Vec/String
}
```

Nested structs: use `#[zero_copy]` (no `account`) and ensure they are `Copy` + `repr(C)` (Anchor derives Zeroable, Pod, etc.).

## AccountLoader in Accounts struct

```rust
pub data_account: AccountLoader<'info, Data>,
```

- **Init**: `#[account(init, payer = payer, space = 8 + 10232)]` — max 10240 bytes with `init` (CPI limit).
- **Larger than 10240**: use `#[account(zero)]` (discriminator not set), create account via SystemProgram in a separate instruction, then in program use `load_init()` to set discriminator and init data. Max account 10MB (10_485_760 bytes); reserve 8 for discriminator.

## Access in instructions

- **First init**: `let account = &mut ctx.accounts.data_account.load_init()?;` then set fields.
- **Update**: `let account = &mut ctx.accounts.data_account.load_mut()?;`
- **Read-only**: `let account = ctx.accounts.data_account.load()?;`

## Pitfalls

- Always `space = 8 + size_of::<T>()` (8-byte discriminator).
- All fields must be fixed-size/Copy (no `Vec`, `String`).
- Use `#[accessor(Type)]` for byte arrays that represent other types (e.g. `Pubkey`) to get safe accessors.
- Validate array indices to avoid panics.

<!--
Source references:
- docs/content/docs/features/zero-copy.mdx
-->
