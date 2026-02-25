---
name: solana-core-rent
description: Rent and rent exemption on Solana — minimum balance for account size, getMinimumBalanceForRentExemption, reclaim on close.
---

# Solana Core — Rent

Accounts pay rent for storage. Accounts that hold at least the **rent-exempt minimum** are not charged rent and can exist indefinitely. When an account is closed, lamports (including rent-exempt balance) are reclaimed by the close authority or the account owner.

## Minimum balance for rent exemption

- **RPC**: `getMinimumBalanceForRentExemption(space)` — returns lamports required for the given account data size (in bytes) to be rent-exempt.
- **Kit**: `rpc.getMinimumBalanceForRentExemption(space).send()` (space as bigint).
- **web3.js**: `connection.getMinimumBalanceForRentExemption(space)`.
- **Rust**: `rpc_client.get_minimum_balance_for_rent_exemption(data_len).await`.
- **Python**: `rpc.get_minimum_balance_for_rent_exemption(space)`.

When creating an account, fund it with at least this amount (plus transaction fees) so it is rent-exempt. Rent can be reclaimed in full when the account is closed.

## Key points

- Pass the account data size (bytes) to get the rent-exempt minimum in lamports.
- Use when creating accounts (mints, token accounts, PDAs, etc.) so they stay rent-exempt.

<!-- Source: https://solana.com/developers/cookbook/accounts/calculate-rent, https://github.com/solana-foundation/solana-com -->