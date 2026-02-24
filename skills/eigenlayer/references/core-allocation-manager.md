---
name: AllocationManager
description: AVS metadata, operator sets, allocations, deallocations, and slashing entry point.
metadata:
  author: hairy
---

# AllocationManager

The **AllocationManager** is the AVS-facing core contract: AVS metadata, **operator sets**, operator registration/deregistration, **allocations** (slashable stake commitments), and **slashing**. An AVS is the address of a contract implementing the AVS logic (e.g. ServiceManagerBase); that address is the AVS “account” for PermissionController.

## Contract shape

- Uses **split contract pattern**: main contract (state-changing) + view contract for size limits; same external interface.
- Key delays: **ALLOCATION_CONFIGURATION_DELAY** (allocations take effect), **DEALLOCATION_DELAY** (deallocations), **SLASHER_CONFIGURATION_DELAY**.

## AVS metadata

- **updateAVSMetadataURI(metadataURI)**  
  AVS registers/updates its metadata URI. Required before creating operator sets.

## Operator sets

- **createOperatorSets(avs, CreateSetParams[])** (or CreateSetParamsV2[] with slasher).  
  AVS creates one or more operator sets; each set has strategies and optional slasher. From v1.9.0, one slasher per operator set stored in AllocationManager.
- **addStrategiesToOperatorSet** / **removeStrategiesFromOperatorSet**  
  AVS updates which strategies (and weights) are in an operator set.
- **registerForOperatorSets(operator, operatorSetKeys, salt, expiry, signature)**  
  Operator registers for the given sets (signature may be required).
- **deregisterFromOperatorSets(operator, operatorSetKeys)**  
  Operator (or AVS for some flows) deregisters; subject to deallocation delay for in-flight stake.

## Allocations and slashing

- **modifyAllocations(operatorSetKeys, newAllocations)**  
  Operator allocates a fraction of their delegated stake per strategy to be slashable by the given operator sets. Takes effect after allocation configuration delay.
- **slashOperator(operatorSetKey, operator, slasher, slashAmounts)**  
  AVS (via slasher) slashes an operator in an operator set; slash amounts per strategy. DelegationManager and StrategyManager/EigenPodManager apply share burns and scaling.

## PermissionController

- Operators: modifyAllocations, registerForOperatorSets, deregisterFromOperatorSets, setAllocationDelay (and DelegationManager/RewardsCoordinator methods).
- AVSs: slashOperator, createOperatorSets, add/remove strategies, updateAVSMetadataURI, setAVSRegistrar, etc.
- Caller must be the account or an admin/appointee for that account.

## Usage for agents

- AVS: register metadata → create operator sets (with strategies/slasher) → receive operator registrations → operators allocate → on misbehavior call slashOperator.
- Operator: registerAsOperator (DelegationManager) → registerForOperatorSets → modifyAllocations to put stake at risk for AVSs.
- Query view contract for operator set list, allocations, and slashing state (same interface as main contract).

<!--
Source references:
- https://github.com/Layr-Labs/eigenlayer-contracts
- sources/eigenlayer/docs/core/AllocationManager.md
- ELIP-002
-->
