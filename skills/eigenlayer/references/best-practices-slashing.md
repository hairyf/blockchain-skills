---
name: Slashing and AVS Design
description: Objectively attributable slashing, task duration, and operator set configuration.
metadata:
  author: hairy
---

# Slashing and AVS Design

Slashing in EigenLayer should be **on-chain-checkable** and **objectively attributable**. AVSs should define tasks with finite duration and use AllocationManager operator sets and slasher configuration correctly.

## Objectively attributable behavior

- **Do** slash for: double-signing, invalid state roots, proof-of-custody violations, invalid cross-chain attestations—anything that can be verified on-chain with a proof.
- **Avoid** slashing for: inactivity, “subjective” misbehavior, or conditions that are not verifiable on-chain. Operators and other AVSs may avoid or penalize AVSs that use subjective slashing.

## Task duration

- Each task (if using a task-based model) should have a bounded duration so operator stake is not “at stake” indefinitely. Recommend aligning max task duration with operator expectations (e.g. MAX_TASK_SLA = DEALLOCATION_DELAY/2 in TaskMailbox so deallocation cannot be used to escape slashing for in-flight tasks).

## Operator sets and slasher

- AVS creates operator sets with **createOperatorSets** (or CreateSetParamsV2 with slasher). One slasher per operator set (v1.9.0+); **slashOperator** must be called with the slasher address that is registered for that set.
- Only the AVS (or its PermissionController appointee) should be able to call slashOperator for that AVS’s sets; slasher contract should enforce that only valid proofs lead to slashing.

## Single point of interaction

- Prefer a single AVS contract (e.g. ServiceManager) that talks to AllocationManager, RewardsCoordinator, and TaskMailbox. Multiple contracts that each call core make operator and staker flows harder to reason about and audit.

## Usage for agents

- When implementing AVS slashing: require a proof (e.g. from a dispute resolution or verification contract) that is checked on-chain before calling AllocationManager.slashOperator.
- When designing tasks: set SLA and max duration so that (1) operators have enough time to complete, (2) stake is not locked indefinitely, (3) deallocation cannot be used to avoid slashing for that task.
- Document slashing conditions clearly so operators and restakers can assess risk.

<!--
Source references:
- https://github.com/Layr-Labs/eigenlayer-contracts
- sources/eigenlayer/docs/experimental/AVS-Guide.md
- sources/eigenlayer/docs/core/AllocationManager.md
- ELIP-002
-->
