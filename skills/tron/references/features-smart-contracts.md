---
name: tron-features-smart-contracts
description: TRON smart contract model, constant vs inconstant calls, and TVM basics.
---

# TRON Smart Contracts

TRON supports Solidity-like smart contracts on the **TVM** (TRON Virtual Machine). Contracts are defined by bytecode, ABI, and metadata (origin_address, contract_address, call_value, consume_user_resource_percent, origin_energy_limit, etc.).

## Contract creation and triggering

- **Deploy**: `CreateSmartContract` → HTTP `wallet/deploycontract`. Parameters include owner_address, bytecode, ABI, name, fee_limit, origin_energy_limit, etc.
- **Call**: `TriggerSmartContract` → HTTP `wallet/triggersmartcontract`. Parameters: owner_address, contract_address, function_selector, parameter (ABI-encoded), call_value (TRX), fee_limit.

## Constant vs inconstant

- **Constant (view/pure)**: Decorated with view/pure/constant. Executed on the node; result returned; **no transaction** broadcast. Use for read-only queries.
- **Inconstant**: State-changing; must be broadcast as a transaction. Exception: dynamic `CREATE` inside a contract is always treated as inconstant.

## Message calls and delegate call

- **Message calls**: Contract can call other contracts or send TRX; each call has initiator, recipient, data, value, fees. Remaining energy can be distributed in internal calls. OutOfEnergy in internal call returns false without reverting outer state; only energy for that call is consumed.
- **Delegate call / call code**: Target code runs in caller’s context (storage, address, balance); only code loaded from target. Used for libraries and reusable logic.

## CREATE and address

- **CREATE**: New contract with new address. TRON address = f(creation_tx_id, nonce). Nonce = contract creation sequence number of root call. Contracts created via CREATE do not store ABI on-chain.

## Usage for agents

- Read-only: use triggersmartcontract with view/pure function and do not broadcast; parse return value from response.
- State-changing: build trigger tx, set fee_limit, sign, broadcast. Estimate fee_limit from similar calls or use a safe cap.
- Deploy: deploycontract with bytecode + ABI; set origin_energy_limit and fee_limit.

<!--
Source references:
- sources/tron/docs/contracts/contract.md
- sources/tron/docs/mechanism-algorithm/system-contracts.md
-->
