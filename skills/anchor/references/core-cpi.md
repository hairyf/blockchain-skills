---
name: anchor-cpi
description: Cross Program Invocation (CPI) in Anchor — CpiContext, transfer, PDA signer, invoke/invoke_signed.
---

# Anchor CPI (Cross Program Invocation)

CPI = one program calling another. Same mental model as an instruction: program ID, accounts, instruction data.

## Anchor pattern (recommended)

1. Include the target program and its accounts in your `#[derive(Accounts)]` struct.
2. Build a `CpiContext` with program ID and accounts.
3. Call the Anchor helper (e.g. `transfer`) or the target program’s cpi module.

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

#[derive(Accounts)]
pub struct SolTransfer<'info> {
    #[account(mut)]
    sender: Signer<'info>,
    #[account(mut)]
    recipient: SystemAccount<'info>,
    system_program: Program<'info, System>,
}
```

## PDA as signer

When the “from” (or any signer) is a PDA, derive signer seeds and pass them to the CPI context:

```rust
let bump = ctx.bumps.pda_account;
let signer_seeds: &[&[&[u8]]] = &[&[b"pda", recipient.key().as_ref(), &[bump]]];
let cpi_ctx = CpiContext::new(program_id, Transfer { from, to })
    .with_signer(signer_seeds);
transfer(cpi_ctx, amount)?;
```

## Low-level: invoke / invoke_signed

Equivalent without Anchor helpers:

- Build instruction (e.g. `system_instruction::transfer(...)`).
- Call `invoke(instruction, &[from, to, program])` or `invoke_signed(instruction, accounts, signer_seeds)` for PDA signer.

Manual construction: build `Instruction { program_id, accounts: AccountMeta::new/readonly, data }` and then invoke/invoke_signed.

<!--
Source references:
- docs/content/docs/basics/cpi.mdx
-->
