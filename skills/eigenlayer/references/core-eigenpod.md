---
name: EigenPod
description: Per-staker pod for validator withdrawal credentials, fee recipient, checkpoints, and beacon proofs.
metadata:
  author: hairy
---

# EigenPod

An **EigenPod** is a per-staker contract (Pod Owner) created via EigenPodManager. It can serve as **withdrawal credentials** and/or **fee recipient** for one or more beacon chain validators. It verifies beacon state proofs and runs **checkpoints** to update the Pod Owner’s deposit shares in the beacon chain ETH strategy.

## Roles

- **Pod Owner**: Staker who owns the pod; receives deposit shares; can set Proof Submitter.
- **Proof Submitter**: Optional hot wallet allowed to call proof/checkpoint methods (e.g. `verifyWithdrawalCredentials`, `verifyCheckpointProofs`).

## Restaking flow

1. Point validator’s withdrawal credentials (and optionally fee recipient) to the EigenPod address.
2. **verifyWithdrawalCredentials(validatorIndex, validatorSignature, proofs)**  
   Proves to the pod that the validator’s withdrawal credentials point to this pod; validator enters “active validator set.”
3. **verifyCheckpointProofs(proofs)**  
   Submits one proof per active validator; when all are submitted, the checkpoint completes: pod balance and beacon balance deltas are applied, Pod Owner’s deposit shares in EigenPodManager are updated (rewards/partial withdrawals increase shares; exits can free balance for withdrawal).

## Checkpoint structure (conceptual)

- One checkpoint at a time per pod.
- Tracks: beacon block root, proofs remaining, pod balance (Gwei), balance deltas, previous beacon balance.
- Completing a checkpoint: proofs for every active validator; then shares and (if applicable) beaconChainSlashingFactor are updated.

## Staleness and exits

- **Staleness proofs** can remove validators that have exited or dropped balance without full proof set.
- For full exit: user processes validator exit and proofs so ETH lands in the pod; then they can complete a DelegationManager withdrawal “as tokens.”

## Usage for agents

- After staking (EigenPodManager.stake), validators must have withdrawal credentials (and optionally fee recipient) set to the pod.
- Call `verifyWithdrawalCredentials` once per validator to add them to the active set.
- Call `verifyCheckpointProofs` (and related) to complete checkpoints and credit shares for new balance; repeat as new rewards/withdrawals occur.
- Use Proof Submitter for automation; Pod Owner keeps custody.

<!--
Source references:
- https://github.com/Layr-Labs/eigenlayer-contracts
- sources/eigenlayer/docs/core/EigenPod.md
-->
