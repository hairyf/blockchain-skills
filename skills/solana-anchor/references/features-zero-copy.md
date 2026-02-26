---
name: Zero-Copy Deserialization
description: AccountLoader, #[account(zero_copy)], load_init/load_mut/load, and when to use zero-copy.
---

# Zero-Copy

Zero-copy lets programs use account data in place (no copy/deserialize into a heap struct). Use for large accounts (> ~1KB), order books, event queues, and compute-sensitive paths.

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
    pub data: [u8; 10232],
}
```

Only fixed-size, `Copy` types (no `Vec`, `String`). Nested structs use `#[zero_copy]` (no `account`).

## Use AccountLoader

- **`AccountLoader<'info, T>`** in the Accounts struct.
- **`load_init()?`** – First-time init; sets discriminator. Use with `init` or `zero` constraint.
- **`load_mut()?`** – Mutable access for updates (account must be `mut`).
- **`load()?`** – Read-only access.

## Init constraints

- **`init`** – Create account via CPI (max 10240 bytes total, including 8-byte discriminator). Use `space = 8 + data_size`, `payer`, and optionally `seeds`/`bump` for PDA.
- **`zero`** – Account must be uninitialized (discriminator zero). You create the account with SystemProgram elsewhere (e.g. client or another instruction), then call an instruction that uses `load_init()` to set discriminator and data. Allows up to 10MB.

## Pitfalls

- Always reserve 8 bytes for discriminator in `space` or when creating the account.
- Don’t use `Vec`/`String` in zero-copy structs; use fixed arrays.
- Validate array indices to avoid panics.
- For byte arrays that are logically Pubkeys, consider `#[accessor(Pubkey)]` for safe get/set.

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/features/zero-copy.mdx)
-->
