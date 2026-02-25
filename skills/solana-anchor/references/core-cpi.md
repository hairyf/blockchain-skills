---
name: Cross-Program Invocation (CPI)
description: How to perform CPIs in Anchor—CpiContext, PDA signers, and invoke/invoke_signed.
---

# Cross-Program Invocation (CPI)

CPI = one program calling another. In Anchor you typically build a `CpiContext` and call a helper (e.g. `transfer`) or use `invoke` / `invoke_signed` with raw instructions.

## Basic CPI (e.g. System Program transfer)

1. Include the target program in your `Accounts` struct (e.g. `system_program: Program<'info, System>`).
2. Build accounts for the callee (e.g. `from`, `to`).
3. Create `CpiContext::new(program_id, accounts)` and call the helper:

```rust
use anchor_lang::system_program::{transfer, Transfer};

pub fn sol_transfer(ctx: Context<SolTransfer>, amount: u64) -> Result<()> {
    let cpi_ctx = CpiContext::new(
        ctx.accounts.system_program.to_account_info(),
        Transfer {
            from: ctx.accounts.sender.to_account_info(),
            to: ctx.accounts.recipient.to_account_info(),
        },
    );
    transfer(cpi_ctx, amount)?;
    Ok(())
}
```

## CPI with PDA signer

When the “signer” is a PDA, use the same seeds/bump as in the accounts struct and attach them to the CPI context:

```rust
let bump = ctx.bumps.pda_account;
let signer_seeds: &[&[&[u8]]] = &[&[b"pda", recipient.key().as_ref(), &[bump]]];

let cpi_ctx = CpiContext::new(program_id, Transfer { from, to })
    .with_signer(signer_seeds);
transfer(cpi_ctx, amount)?;
```

Get the bump from `ctx.bumps.<account_name>`. The accounts struct must use `seeds` and `bump` so the PDA is validated and the bump is available.

## Lower-level: invoke and invoke_signed

- **`invoke(&instruction, &[account_infos...])`** – when no program signer is needed.
- **`invoke_signed(&instruction, &[account_infos...], signer_seeds)`** – when a PDA must sign.

Build the instruction (e.g. via `system_instruction::transfer` or manual `Instruction { program_id, accounts, data }`), then pass the right `AccountInfo` slice and, for PDAs, the same seeds used to derive the PDA.

## Key points

- Always pass the correct account metas (writable/signer) and order expected by the callee.
- For PDA signers, `signer_seeds` must match the PDA derivation (seeds + bump).
- Use `ctx.bumps` so you don’t recalculate the bump in the handler.

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/basics/cpi.mdx)
-->
