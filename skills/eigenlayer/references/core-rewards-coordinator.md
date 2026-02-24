---
name: RewardsCoordinator
description: AVS rewards submissions (v1/v2), distribution roots, and claiming via merkle proofs.
metadata:
  author: hairy
---

# RewardsCoordinator

The **RewardsCoordinator** accepts ERC20 rewards from AVSs, keyed to operators (and their stakers) registered in the **AllocationManager**. Rewards are submitted with a time range; off-chain a **rewards updater** computes distributions and posts a **DistributionRoot** (merkle root); stakers and operators (or their claimers) **claim** with merkle proofs.

## Reward types

- **v1 (RewardsSubmission)**: AVS submits total amount and strategy weights; updater distributes by stake weight and default operator split.
- **v2 (OperatorDirectedRewardsSubmission)**: Per-operator amounts and custom AVS logic; operators can set AVS/operator set/PI splits (basis points).

## Flow

1. AVS: **createAVSRewardsSubmission** or **createOperatorDirectedAVSRewardsSubmission** (token, time range, amounts/weights).
2. Off-chain: rewards updater builds merkle tree of cumulative earnings per earner per token; posts root via **submitDistributionRoot** (or equivalent).
3. After activation delay, earners (or **claimerFor**) call **processClaim(claim, recipient)** with merkle proof; token is transferred to recipient.

## Important state

- **distributionRoots**: historic merkle roots (cumulative earnings).
- **claimerFor[earner]**: address that may call processClaim on behalf of earner.
- **cumulativeClaimed[earner][token]**: already claimed amount; claim pays (cumulativeInTree - cumulativeClaimed).
- **defaultOperatorSplitBips**, **_operatorAVSSplitBips**, **_operatorPISplitBips**, **_operatorSetSplitBips**: control operator vs staker split (used off-chain or in contract logic).

## Usage for agents

- AVS: create rewards submission for a time range and token; ensure operators are registered in AllocationManager for that period.
- Earner: set claimerFor if another address should claim; call processClaim with valid merkle proof and desired recipient.
- Use nonstandard ERC20s with caution (rebasing, fee-on-transfer, reentrancy).

<!--
Source references:
- https://github.com/Layr-Labs/eigenlayer-contracts
- sources/eigenlayer/docs/core/RewardsCoordinator.md
- ELIP-001 operator-directed rewards
-->
