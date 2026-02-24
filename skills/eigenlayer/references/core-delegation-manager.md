---
name: DelegationManager
description: Operator registration, delegation, undelegation, and withdrawal queue and completion.
metadata:
  author: hairy
---

# DelegationManager

The **DelegationManager** sits between StrategyManager/EigenPodManager and operators. It handles: (1) operator registration and metadata, (2) staker delegation/undelegation, (3) withdrawal queue and completion (shares or tokens), (4) slashing accounting (deposit scaling factors, withdrawable shares).

## Key Parameters

- **MIN_WITHDRAWAL_DELAY_BLOCKS**: mainnet 100800 (~14 days), testnet 50.
- **beaconChainETHStrategy**: pseudo-address `0xbeaC0eeEeeeeEEeEeEEEEeeEEeEeeeEeeEEBEaC0` (not a real contract).

## Becoming an Operator

```solidity
function registerAsOperator(
    address initDelegationApprover,
    uint32 allocationDelay,
    string calldata metadataURI
) external;
```

- Caller becomes operator and is permanently self-delegated.
- `initDelegationApprover`: if set, stakers need this address’s signature to delegate to this operator.
- `allocationDelay`: blocks before new allocations take effect (used by AllocationManager).

```solidity
function modifyOperatorDetails(address operator, address newDelegationApprover) external;
function updateOperatorMetadataURI(address operator, string calldata metadataURI) external;
```

- PermissionController: operator or their admin/appointee can call.

## Delegation and Withdrawals

- **delegateTo(operator, signature)**: Staker delegates existing deposit shares to `operator`. Signature required if operator has a delegation approver.
- **undelegate(staker)**: Staker undelegates; triggers queuing a full withdrawal of their shares (withdrawal delay applies).
- **queueWithdrawals(Withdrawal[])**  
  Queues withdrawals: specify (strategies, shares). Shares are decremented from staker and operator; after delay, staker can complete.
- **completeQueuedWithdrawals(withdrawals, tokensToWithdraw, middlewareTimesIndexes, receiveAsTokens)**  
  Completes queued withdrawals: either re-credit shares to staker or withdraw as tokens. For tokens, provide strategy list and recipient; StrategyManager/EigenPodManager perform actual token/ETH transfer.

## Withdrawable shares

- **getWithdrawableShares(staker, strategies)** returns withdrawable share amounts (deposit shares × deposit scaling factor × slashing factors). Use this to know how much can be withdrawn or delegated.
- Operator shares in DelegationManager are the sum of delegated stakers’ withdrawable shares per strategy.

## Slashing

When AllocationManager slashes an operator, DelegationManager updates slashing state; stakers under that operator see reduced withdrawable shares via deposit scaling factor. No iteration over stakers—slashing is applied asynchronously through these factors.

## Usage for agents

- Register operator once; then use AllocationManager for AVS operator sets and allocations.
- Staker flow: deposit (StrategyManager/EigenPodManager) → delegateTo → (optional) queueWithdrawals → after delay completeQueuedWithdrawals.
- Check withdrawable amounts with getWithdrawableShares before queueing withdrawals or showing UI.

<!--
Source references:
- https://github.com/Layr-Labs/eigenlayer-contracts
- sources/eigenlayer/docs/core/DelegationManager.md
-->
