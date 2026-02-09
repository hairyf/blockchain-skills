---
name: solana-tokens-basics
description: SPL Token and Token-2022 basics — mint, token account, transfer, approve, burn, freeze.
---

# Solana — SPL Token Basics

- **Token Program** and **Token-2022** (extensions) share the same base instructions. Examples apply to both unless noted.
- **Mint**: Issuer of tokens; holds mint authority and optional freeze authority.
- **Token account**: Holds a balance of one mint; owned by Token program; associated with owner (wallet/program).

## Common instructions

- **Create mint**: InitializeMint (decimals, mint_authority, freeze_authority).
- **Create token account**: CreateAccount or CreateAssociatedTokenAccount (ATA).
- **Mint tokens**: MintTo (mint, destination token account, amount; requires mint_authority).
- **Transfer**: Transfer or TransferChecked (source, destination, amount; optional decimals for Checked).
- **Approve / revoke delegate**: Approve, Revoke (delegate can transfer up to amount).
- **Burn**: Burn, BurnChecked.
- **Freeze / thaw**: FreezeAccount, ThawAccount (requires freeze_authority).

## Associated Token Account (ATA)

- One token account per (owner, mint) with deterministic address: PDA(owner, token_program_id, mint).
- Use **getOrCreateAssociatedTokenAccount** (or program equivalent) so the destination has a token account for the mint before transfer.

## TypeScript (Kit)

- Use **@solana-program/token** or **@solana-program/token-2022** for instruction builders (create mint, create ATA, mintTo, transfer, etc.).
- Legacy: **@solana/spl-token** (getAssociatedTokenAddressSync, createAssociatedTokenAccountInstruction, createTransferInstruction, etc.).

## Key points

- Always ensure the recipient has an ATA for the mint when transferring; create it if missing.
- For Token-2022 use the Token-2022 program ID and extension-specific instructions (e.g. metadata, transfer fee) where needed.

<!--
Source references:
- https://solana.com/docs/tokens/basics
- https://github.com/solana-foundation/solana-com
-->
