---
name: solana-core-programs-pda
description: Solana programs (smart contracts) and program-derived addresses (PDA) derivation and usage.
---

# Solana Core — Programs and PDAs

## Programs

- On Solana, **programs** are the executable (smart contracts). Stored in executable accounts.
- Each program exposes **instructions**; clients send transactions containing those instructions.
- System Program, Token Program, Token-2022, Compute Budget, etc. are built-in programs.

## Program-derived address (PDA)

- **PDA** = address derived from `(program_id, seeds)` so it lies off the Ed25519 curve (no private key).
- **Canonical bump**: Single byte 255→0 used in derivation; first valid off-curve bump is stored and reused.
- Programs can **sign** for PDAs derived from their program ID (via CPI with `invoke_signed` and signer seeds).

## Derivation (Rust)

```rust
use solana_sdk::pubkey::Pubkey;
pubkey::find_program_address(&[b"seed", owner.as_ref()], &program_id)
// returns (PDA, bump)
```

## Creating PDA accounts

- Deriving the address does **not** create the account. The program must allocate and assign owner in an instruction (e.g. `create_account` or program-specific init).
- Pass the PDA and bump (and seeds) when the program needs to sign for the PDA in CPIs.

## Key points

- Use PDAs for deterministic addresses (e.g. user state, vaults) and for program signing without keypairs.
- Always store and use the canonical bump when invoking instructions that require the PDA as signer.

<!--
Source references:
- https://solana.com/docs/core/programs
- https://solana.com/docs/core/pda
- https://github.com/solana-foundation/solana-com
-->
