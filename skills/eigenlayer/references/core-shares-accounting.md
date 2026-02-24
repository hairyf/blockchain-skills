---
name: Shares Accounting
description: Deposit shares, withdrawable shares, deposit scaling factor, and slashing (ELIP-002).
metadata:
  author: hairy
---

# Shares Accounting

EigenLayer distinguishes **deposit shares**, **withdrawable shares**, and **operator shares**. Slashing is applied via scaling factors rather than iterating over stakers.

## Terminology

- **Deposit shares**: Held in StrategyManager / EigenPodManager; ~1:1 with deposited assets per strategy. Managed at deposit/withdrawal queue.
- **Withdrawable shares**: Deposit shares × deposit scaling factor × (beacon chain slashing factor) × operator magnitude. Not stored; computed in `DelegationManager.getWithdrawableShares(staker, strategies)`.
- **Operator shares**: Sum of all stakers’ withdrawable shares delegated to that operator, per strategy. Stored in DelegationManager.

## Stored Variables (per strategy)

- **Staker**: `s_n` deposit shares; `k_n` deposit scaling factor; `l_n` beacon chain slashing factor (EigenPod only).
- **Operator**: `m_n` magnitude; `op_n` operator shares (= sum of delegated withdrawable shares).

## Key formulas (conceptual)

- Withdrawable: `a_n = s_n * k_n * l_n * m_n`.
- On deposit: scaling factor is updated so the new deposit adds the right amount of withdrawable shares.
- On slashing: operator’s magnitude/slashing state changes; stakers’ withdrawable shares drop via `k_n` / `l_n` / `m_n`; deposit shares `s_n` unchanged until withdrawal.

## When to use

- **Deposits**: StrategyManager/EigenPodManager increase deposit shares and notify DelegationManager; DelegationManager updates scaling so new shares count as withdrawable.
- **Withdrawals**: Queue reduces deposit shares; completion pays out based on withdrawable value (shares or tokens).
- **Slashing**: AllocationManager triggers slashing; DelegationManager updates factors so withdrawable shares decrease; StrategyManager/EigenPodManager can burn slashed shares (tokens to burn address).

## Usage for agents

- Use `DelegationManager.getWithdrawableShares(staker, strategies)` for “how much can be withdrawn/delegated” and for UI/analytics.
- Do not assume 1:1 deposit shares to tokens after slashing; use withdrawable shares and strategy share-to-asset conversion for accurate amounts.
- Beacon chain ETH: EigenPodManager uses `beaconChainSlashingFactor` for validator slashing/inactivity; same scaling idea applies.

<!--
Source references:
- https://github.com/Layr-Labs/eigenlayer-contracts
- sources/eigenlayer/docs/core/accounting/SharesAccounting.md
- ELIP-002 Slashing via Unique Stake and Operator Sets
-->
