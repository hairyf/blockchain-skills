---
name: anchor-pda
description: Program Derived Addresses (PDA) in Anchor — seeds, bump, init, and IDL/client resolution.
---

# Anchor PDA (Program Derived Addresses)

PDAs are deterministic addresses derived from seeds and a program ID. Anchor validates them via account constraints.

## Constraints

- **`seeds`** — Array of seeds (static bytes or account refs, e.g. `signer.key().as_ref()`). Use `[]` for no optional seeds.
- **`bump`** — Bump seed; use alone for auto-calculation, or `bump = account.bump_seed` when stored on account (saves CUs).
- **`seeds::program`** — Program ID for derivation; only when deriving a PDA for another program.

`seeds` and `bump` must be used together.

## Examples

```rust
// Static seed only
#[account(seeds = [b"hello_world"], bump)]
pub pda_account: SystemAccount<'info>,

// Multiple seeds, one from signer
#[account(seeds = [b"hello_world", signer.key().as_ref()], bump)]
pub pda_account: SystemAccount<'info>,

// Stored bump (compute optimization)
#[account(seeds = [b"hello_world"], bump = pda_account.bump_seed)]
pub pda_account: Account<'info, CustomAccount>,

// PDA from another program
#[account(seeds = [b"hello_world"], bump, seeds::program = other_program.key())]
pub pda_account: SystemAccount<'info>,
```

## Init with PDA

Use `init` with `seeds` and `bump` to create an account at a PDA. Requires `payer` and `space` (include 8-byte discriminator).

```rust
#[account(
    init,
    payer = signer,
    space = 8 + 1,
    seeds = [b"hello_world", signer.key().as_ref()],
    bump,
)]
pub pda_account: Account<'info, CustomAccount>,
```

## PDA Signer (CPI)

For CPIs where the PDA must sign, build signer seeds and pass to `CpiContext::with_signer`:

```rust
let bump_seed = ctx.bumps.pda_account;
let signer_seeds: &[&[&[u8]]] = &[&[b"pda", seed.as_ref(), &[bump_seed]]];
let cpi_context = CpiContext::new(program_id, accounts).with_signer(signer_seeds);
```

## IDL and Client

PDA seeds in `#[account(seeds = ...)]` are reflected in the IDL. The Anchor TS client can resolve PDA addresses from the IDL (e.g. using provider wallet as signer for account refs), so you often don't need to derive PDAs manually when calling `program.methods.instruction().accounts({...}).rpc()`.

<!--
Source references:
- docs/content/docs/basics/pda.mdx
-->
