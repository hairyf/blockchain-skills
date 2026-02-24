---
name: EigenLayer Core Overview
description: System components, roles, and contract architecture for EigenLayer restaking protocol.
metadata:
  author: hairy
---

# EigenLayer Core Overview

EigenLayer is a protocol on Ethereum that introduces **restaking**: stakers deposit LSTs, native ETH, or ERC-20s; delegate to operators; operators run AVSs (Actively Validated Services) and can be slashed. Core contracts are upgradeable (transparent proxy) and work together for deposits, delegation, withdrawals, and slashing.

## System Components

| Component | Role |
|-----------|------|
| **StrategyManager** | Deposit/withdrawal share accounting for ERC20 strategies; whitelists strategies (StrategyFactory, StrategyBase, EigenStrategy). |
| **DelegationManager** | Operators (register, delegate to self); staker delegation/undelegation; withdrawal queue and completion; slashing integration. |
| **EigenPodManager** | Beacon chain ETH strategy; creates EigenPods; forwards pod balance updates to DelegationManager. |
| **EigenPod** | Per-staker contract: withdrawal credentials / fee recipient for validators; beacon state proofs; checkpointing for share updates. |
| **AllocationManager** | AVS metadata; operator sets; allocations/deallocations; slashing entry point for AVSs. |
| **AVSDirectory** | Legacy operator↔AVS registration (deprecated; use AllocationManager). |
| **RewardsCoordinator** | AVS rewards submissions (v1/v2); distribution roots; claim by stakers/operators via merkle proofs. |
| **PermissionController** | AVSs and operators delegate calls to admins/appointees (DelegationManager, AllocationManager, RewardsCoordinator). |

## Roles

- **Staker**: Deposits via StrategyManager (ERC20s) or EigenPodManager (native ETH); withdraws only via DelegationManager; may delegate to an operator.
- **Operator**: Registers in DelegationManager (self-delegation); opts into AVSs via AllocationManager operator sets; receives delegated stake; can be slashed by AVSs.

## Key Flows (for agents)

1. **Deposit**: StrategyManager `depositIntoStrategy(strategy, token, amount)` or EigenPodManager `createPod()` + stake/verifyWithdrawalCredentials + checkpoint.
2. **Delegate**: DelegationManager `delegateTo(operator, signature)`.
3. **Withdraw**: DelegationManager `queueWithdrawals` then after delay `completeQueuedWithdrawals` (as shares or as tokens).
4. **AVS**: AllocationManager for operator sets, allocations, and slashing; RewardsCoordinator for rewards; TaskMailbox for task-based execution (see features).

## Contract Locations

- Core: `src/contracts/core/` (StrategyManager, DelegationManager, AllocationManager, AVSDirectory, RewardsCoordinator, ReleaseManager).
- Pods: `src/contracts/pods/` (EigenPodManager, EigenPod).
- Strategies: `src/contracts/strategies/` (StrategyBase, StrategyFactory, EigenStrategy).
- Permissions: `src/contracts/permissions/` (PermissionController, KeyRegistrar, PauserRegistry).

<!--
Source references:
- https://github.com/Layr-Labs/eigenlayer-contracts
- sources/eigenlayer/docs/README.md
-->
