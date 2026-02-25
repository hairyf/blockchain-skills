---
name: tron-core-tvm
description: TRON Virtual Machine (TVM) - EVM compatibility, Bandwidth vs Energy, and contract deploy/trigger flow.
---

# TRON Virtual Machine (TVM)

TVM is TRON's execution environment for smart contracts. **EVM-compatible**: Solidity contracts compiled for Ethereum can run on TVM.

## Resource model (vs Ethereum gas)

- **Bandwidth**: Consumed by transaction size; all tx types. Not computation.
- **Energy**: Consumed only by contract deployment and execution. Staked or delegated; insufficient Energy paid in TRX (sun) up to fee_limit. No per-op gas; execution metered in Energy.
- Contract execution does not consume TRX except when Energy insufficient (then TRX burn up to fee_limit).

## Development flow

1. Compile Solidity (e.g. Remix); ABI and bytecode.
2. Deploy: wallet/deploycontract - owner_address, bytecode, ABI, name, fee_limit, origin_energy_limit, consume_user_resource_percent.
3. Trigger: wallet/triggersmartcontract - contract_address, function_selector (4-byte), parameter (ABI-encoded), call_value, fee_limit. View/pure: wallet/triggerconstantcontract (no broadcast).
4. Inspect: getcontract, gettransactioninfobyid (receipt, energy_usage).

## Usage for agents

Estimate Energy via triggerconstantcontract or eth_estimateGas; set fee_limit to cap TRX burn. Deploy with origin_energy_limit and fee_limit. Set consume_user_resource_percent if contract should consume caller Energy first. For debugging use TronIDE or Remix; check transaction info for revert reason and energy used.

<!-- Source: sources/tron/docs/contracts/tvm.md, sources/tron/docs/contracts/contract.md -->
