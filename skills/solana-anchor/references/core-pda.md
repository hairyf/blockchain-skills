---
name: Program Derived Addresses (PDA)
description: Using PDAs in Anchor—seeds, bump, seeds::program, init, and IDL resolution.
---

# Program Derived Addresses (PDA)

PDAs are deterministic addresses derived from seeds and a program ID (off the Ed25519 curve). In Anchor you declare them with account constraints; the runtime validates the address and stores the bump on the accounts struct.

## Constraints

- **`seeds = [...]`** – Array of byte slices: literals (e.g. `b"vault"`) and/or references (e.g. `user.key().as_ref()`). Use `[]` for no extra seeds.
- **`bump`** – Valid bump for the PDA. Use plain `bump` to have Anchor find it, or `bump = account.bump_seed` when the bump is stored on an account to save CUs.
- **`seeds::program = other_program.key()`** – Derive the PDA from another program’s ID (for cross-program PDAs).

`seeds` and `bump` are used together.

## Init with PDA

Create an account whose address is a PDA with `init`, `seeds`, `bump`, plus `payer` and `space`:

```rust
#[account(
    init,
    payer = signer,
    space = 8 + 8,
    seeds = [b"counter", signer.key().as_ref()],
    bump,
)]
pub counter: Account<'info, Counter>,
```

Remember 8 bytes for the account discriminator in `space`.

## Bump in handler

Use `ctx.bumps.<account_name>` for CPIs that require this PDA as signer:

```rust
let bump = ctx.bumps.pda_account;
let signer_seeds: &[&[&[u8]]] = &[&[b"pda", recipient.key().as_ref(), &[bump]]];
```

## PDA in the IDL

PDA seeds are reflected in the IDL (`pda.seeds` with `kind: "const"` or `kind: "account"`). The TypeScript client can then resolve the PDA from the IDL and provider (e.g. wallet) without manually calling `findProgramAddressSync`.

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/basics/pda.mdx)
-->
