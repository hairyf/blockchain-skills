---
name: PermissionController and KeyRegistrar
description: Admins, appointees, and operator key registration for AVSs and operators.
metadata:
  author: hairy
---

# PermissionController and KeyRegistrar

**PermissionController** lets **AVSs** and **operators** (not stakers) delegate calling rights to other addresses. **KeyRegistrar** lets operators register keys (e.g. for BLS/ECDSA) used by AVSs and multichain.

## PermissionController roles

- **Account**: The address that “holds” protocol state (e.g. operator address in DelegationManager, AVS address in AllocationManager). Only accounts that are AVSs or operators can use PermissionController.
- **Admins**: Can perform any PermissionController-gated action for the account (e.g. modifyOperatorDetails, modifyAllocations, slashOperator). Add via **addPendingAdmin**; pending accepts with **acceptAdmin**. If any admin is set, the account must explicitly add itself as admin to remain able to act.
- **Appointees**: Granted permission for specific (target contract, selector) pairs. Used for limited delegation (e.g. only setClaimerFor, or only registerForOperatorSets).

## Operator-enabled methods (examples)

- DelegationManager: modifyOperatorDetails, updateOperatorMetadataURI, undelegate.
- AllocationManager: modifyAllocations, registerForOperatorSets, deregisterFromOperatorSets, setAllocationDelay.
- RewardsCoordinator: setClaimerFor, setOperatorAVSSplit, setOperatorPISplit.

## AVS-enabled methods (examples)

- AllocationManager: slashOperator, deregisterFromOperatorSets, setAVSRegistrar, updateAVSMetadataURI, createOperatorSets, add/remove strategies.
- RewardsCoordinator: createOperatorDirectedAVSRewardsSubmission, setClaimerFor.

## KeyRegistrar

- Operators (and AVSs) register **key type** and **key data** (e.g. BLS pubkey, ECDSA address) for use by AVSs and by multichain (OperatorTableCalculator, certificate verification).
- Required for multichain: AVS must set KeyType in KeyRegistrar even if keys are stored elsewhere, so generation/transport can resolve operator tables.

## Usage for agents

- Operator key rotation: add new admin (or appointee) then use it for modifyOperatorDetails / modifyAllocations; optionally remove old key.
- AVS: set appointee for slashOperator only, or admin for full AVS control.
- Multichain AVS: ensure KeyRegistrar has correct key type for the AVS/operator set.

<!--
Source references:
- https://github.com/Layr-Labs/eigenlayer-contracts
- sources/eigenlayer/docs/permissions/PermissionController.md
- sources/eigenlayer/docs/permissions/KeyRegistrar.md
-->
