---
name: EigenPodManager and Native ETH Restaking
description: Beacon chain ETH strategy, createPod, stake, and withdrawal processing.
metadata:
  author: hairy
---

# EigenPodManager and Native ETH Restaking

The **EigenPodManager** manages the virtual **beacon chain ETH strategy** (address `0xbeaC0eeEeeeeEEeEeEEEEeeEEeEeeeEeeEEBEaC0`). It creates **EigenPods** and forwards balance/share updates to the DelegationManager.

## Key Parameters

- **beaconChainETHStrategy**: `0xbeaC0eeEeeeeEEeEeEEEEeeEEeEeeeEeeEEBEaC0` (pseudo-address, not a contract).
- **ethPOS**: Beacon deposit contract.
- EigenPods deployed via Create2 + beacon proxy (one per staker).

## Depositing (Native ETH)

1. **createPod()**  
   Deploys an EigenPod for the caller (Pod Owner). One pod per address. Reverts if pod already exists.

2. **stake(pubkey, signature, depositDataRoot)**  
   Stakes a new validator on the caller’s pod (creates pod if needed). Sends 32 ETH to ethPOS; validator’s withdrawal credentials should point to the pod (0x01 or 0x02).

3. In **EigenPod**: **verifyWithdrawalCredentials** proves validator’s withdrawal credentials point to the pod; **verifyCheckpointProofs** (and related) complete checkpoints so the Pod Owner receives deposit shares for beacon balance and pod ETH balance.

Balance *increases* (e.g. rewards, partial withdrawals) → more deposit shares.  
Balance *decreases* (slashing, inactivity) → no reduction in deposit shares; instead **beaconChainSlashingFactor** is reduced, so withdrawable shares drop (see DelegationManager / shares accounting).

## Withdrawal Processing

- Withdrawals are always via **DelegationManager**: queue withdrawal for `beaconChainETHStrategy` shares, then complete as shares or as tokens.
- Completing as tokens may require the pod to have sufficient ETH (e.g. from partial withdrawals or exits). Validator exits: user must process exits and proof in EigenPod so balance is available; then complete the queued withdrawal as tokens.

## Usage for agents

- Native restaking flow: `EigenPodManager.createPod()` → `EigenPodManager.stake(...)` → set validator withdrawal credentials to pod → `EigenPod.verifyWithdrawalCredentials` → later `EigenPod.verifyCheckpointProofs` to get/update shares.
- Withdraw: use DelegationManager `queueWithdrawals` with beaconChainETHStrategy, then `completeQueuedWithdrawals`. For token payout, ensure pod has ETH (checkpoints, exits) before completing.

<!--
Source references:
- https://github.com/Layr-Labs/eigenlayer-contracts
- sources/eigenlayer/docs/core/EigenPodManager.md
-->
