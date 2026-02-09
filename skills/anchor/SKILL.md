---
name: anchor
description: Anchor framework for Solana programs — program structure, PDAs, CPI, IDL, errors, events, zero-copy, constraints, account types, and CLI for agent-driven tooling.
metadata:
  author: hairy
  version: "2026.2.9"
  source: Generated from https://github.com/coral-xyz/anchor, scripts located at https://github.com/antfu/skills
---

> Skill is based on Anchor v0.32.1, generated 2026-02-09.

Concise reference for building Solana programs with Anchor: macros, accounts, PDAs, CPI, IDL, custom errors, events, zero-copy, constraints, account types, and CLI.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Program Structure | declare_id, #[program], #[derive(Accounts)], #[account], Context | [core-program-structure](references/core-program-structure.md) |
| PDA | seeds, bump, init, IDL/client resolution, PDA signer | [core-pda](references/core-pda.md) |
| CPI | CpiContext, transfer, PDA signer, invoke/invoke_signed | [core-cpi](references/core-cpi.md) |
| IDL | Instructions, accounts, discriminators, client usage | [core-idl](references/core-idl.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Custom Errors | error_code, err!, require! macros, client handling | [features-errors](references/features-errors.md) |
| Events | emit!, emit_cpi!, #[event], addEventListener, event-cpi | [features-events](references/features-events.md) |
| Zero-Copy | AccountLoader, #[account(zero_copy)], load/load_mut/load_init | [features-zero-copy](references/features-zero-copy.md) |

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Account Constraints | signer, mut, init, seeds/bump, has_one, address, owner | [references-account-constraints](references/references-account-constraints.md) |
| Account Types | Account, Signer, Program, AccountLoader, Interface types | [references-account-types](references/references-account-types.md) |
| CLI | build, deploy, test, idl, keys, account, expand, upgrade, verify | [references-cli](references/references-cli.md) |
