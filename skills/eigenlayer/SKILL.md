---
name: eigenlayer
description: EigenLayer restaking protocol—strategies, delegation, EigenPods, AVSs, operator sets, slashing, rewards, and multichain.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/Layr-Labs/eigenlayer-contracts, scripts located at https://github.com/antfu/skills
---

> Skill is based on EigenLayer contracts (eigenlayer-contracts) as of 2026-02-24, generated from `sources/eigenlayer/docs/`.

EigenLayer enables restaking of LSTs, native ETH, and ERC-20s on Ethereum; stakers delegate to operators who run AVSs (Actively Validated Services). AVSs use operator sets and allocations for slashable stake and rewards; optional TaskMailbox and multichain support task-based execution and consumption of L1 stake on destination chains.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Core Overview | System components, roles, contract layout | [core-overview](references/core-overview.md) |
| StrategyManager | Deposit shares, StrategyFactory, StrategyBase, withdrawals via DelegationManager | [core-strategy-manager](references/core-strategy-manager.md) |
| DelegationManager | Operator registration, delegation, withdrawal queue and completion | [core-delegation-manager](references/core-delegation-manager.md) |
| Shares Accounting | Deposit vs withdrawable shares, scaling factors, slashing (ELIP-002) | [core-shares-accounting](references/core-shares-accounting.md) |
| EigenPodManager | Beacon chain ETH strategy, createPod, stake, native restaking | [core-eigenpod-manager](references/core-eigenpod-manager.md) |
| EigenPod | Withdrawal credentials, fee recipient, checkpoints, beacon proofs | [core-eigenpod](references/core-eigenpod.md) |
| AllocationManager | AVS metadata, operator sets, allocations, slashing | [core-allocation-manager](references/core-allocation-manager.md) |
| RewardsCoordinator | Rewards submissions (v1/v2), distribution roots, claiming | [core-rewards-coordinator](references/core-rewards-coordinator.md) |
| AVSDirectory | Legacy operator–AVS registration (deprecated) | [core-avs-directory](references/core-avs-directory.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Permissions | PermissionController (admins/appointees), KeyRegistrar | [features-permissions](references/features-permissions.md) |
| AVS Integration | Operator sets, opt-in, slashing, ReleaseManager, TaskMailbox | [features-avs-integration](references/features-avs-integration.md) |
| TaskMailbox | Task creation, executor sets, result verification, certificates | [features-task-mailbox](references/features-task-mailbox.md) |
| Multichain | CrossChainRegistry, OperatorTableUpdater, CertificateVerifiers | [features-multichain](references/features-multichain.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Withdrawals | Queue and complete as shares or tokens; EigenPod/validator exits | [best-practices-withdrawals](references/best-practices-withdrawals.md) |
| Slashing | Objectively attributable slashing, task duration, operator sets | [best-practices-slashing](references/best-practices-slashing.md) |
