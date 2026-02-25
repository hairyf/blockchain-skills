---
name: solana-features-staking
description: Solana staking — stake accounts, delegate/withdraw authorities, delegation warmup/cooldown, merge/split for agent-driven tooling.
---

# Solana Features — Staking

Staking SOL delegates tokens to validators to earn rewards and secure the network. Stake accounts are distinct from system (wallet) accounts and have dedicated authorities and lifecycle.

## Stake account vs system account

- **System account**: Send/receive SOL only; keypair controls the address.
- **Stake account**: Holds delegated stake; controlled by **stake authority** and **withdraw authority**, not necessarily by the address keypair. The address may have no keypair (e.g. when created via CLI with a one-off keypair only for uniqueness).

## Authorities

- **Stake authority** signs: delegate, deactivate, split, merge, set new stake authority.
- **Withdraw authority** signs: withdraw to wallet, set new withdraw authority, set new stake authority.

Set at creation; can be changed later. Withdraw authority has more power (can liquidate and reset stake authority). Use the same or different addresses for each.

## One validator per stake account

Each stake account delegates to a single validator. To delegate to multiple validators or split amounts, create multiple stake accounts (or split one into several).

## Delegation lifecycle

- **Warmup / cooldown**: Delegation and deactivation take multiple epochs to fully activate or deactivate; a fraction changes at each epoch. Total stake changing per epoch is limited. Duration is network-dependent.
- **Merge**: Two stake accounts with the same authorities and lockup can be merged when both are deactivated, or when merging inactive into activating during its activation epoch; or when both activated/activating with matching voter and vote credits.

## Lockup

Lockup can be set at creation; only withdraw and updating withdraw authority are blocked until date/epoch. Lockup can be modified by **lockup authority** or **custodian**. Delegation, deactivation, split, and changing stake authority still work during lockup.

## Destroying a stake account

Withdraw all SOL and leave the account undelegated; the account is no longer tracked (balance 0). Re-create manually if the same address is needed again.

## Usage (conceptual)

Agents that need to reason about staking should differentiate stake accounts (authorities, delegation state) from plain wallets; use RPC (e.g. getAccountInfo for stake program accounts) or CLI (solana stake-account, solana validators) to inspect state; create/delegate/withdraw/merge/split via Stake Program instructions, typically using official CLI or SDKs that wrap them.

## Key points

- Stake and withdraw authorities define who can perform which operations; secure the withdraw authority.
- One delegation per stake account; use multiple accounts or split for multiple validators or amounts.
- Warmup/cooldown and merge rules are epoch-based; check current network docs for exact limits.

<!--
Source references:
- https://solana.com/docs/references/staking
- https://solana.com/docs/references/staking/stake-accounts
- https://github.com/solana-foundation/solana-com
-->
