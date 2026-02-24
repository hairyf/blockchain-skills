---
name: Withdrawal Flows
description: Queue and complete withdrawals as shares or tokens; EigenPod and validator exits.
metadata:
  author: hairy
---

# Withdrawal Flows

All withdrawals go through **DelegationManager**: queue first, then after **MIN_WITHDRAWAL_DELAY_BLOCKS** complete as **shares** or as **tokens**. Never withdraw directly from StrategyManager or EigenPodManager.

## Queue

- **queueWithdrawals(Withdrawal[])**: Each withdrawal specifies (strategies[], shares[], withdrawer). Staker’s deposit shares and operator shares are reduced; withdrawal is stored with completion block.
- **undelegate(staker)** queues a full withdrawal of all staker’s shares (same delay).

## Complete as shares

- Use when the goal is to **redelegate** to another operator: complete queued withdrawal “as shares” so shares are re-credited to the staker; then call **delegateTo(newOperator, ...)**.
- **completeQueuedWithdrawals(..., receiveAsTokens = false)** with appropriate params.

## Complete as tokens

- Use when the user wants to exit to ERC20 or ETH. Provide the list of (strategy, token/recipient) for each withdrawal; StrategyManager/EigenPodManager will transfer tokens/ETH to the specified recipient.
- For **beacon chain ETH**: ensure the staker’s EigenPod has enough ETH to cover the withdrawal (e.g. partial withdrawals or validator exits already processed and checkpointed). If not, completion may revert or underflow.
- **completeQueuedWithdrawals(..., receiveAsTokens = true, tokensToWithdraw[], ...)**.

## EigenPod and validator exits

- Full exit of native ETH: staker must (1) exit validators on beacon chain, (2) submit proofs in EigenPod so balance is credited, (3) then complete the queued withdrawal as tokens.
- Partial withdrawals and consensus/execution rewards: use **verifyCheckpointProofs** (and related) so pod balance and shares update; then user can compound (leave in strategy) or queue withdrawal and complete as tokens.

## Usage for agents

- Always use DelegationManager for queue and complete; never call strategy or pod withdraw functions directly for “protocol” withdrawals.
- Before complete-as-tokens for beaconChainETHStrategy, check EigenPod balance and that checkpoint proofs are done so ETH is available.
- Respect MIN_WITHDRAWAL_DELAY_BLOCKS when showing “withdrawable at” time.

<!--
Source references:
- https://github.com/Layr-Labs/eigenlayer-contracts
- sources/eigenlayer/docs/README.md (Common User Flows)
- sources/eigenlayer/docs/core/DelegationManager.md
- sources/eigenlayer/docs/core/EigenPodManager.md
-->
