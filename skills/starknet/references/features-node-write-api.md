---
name: starknet-node-write-api
description: Starknet JSON-RPC write methods—invoke, declare, deploy account transactions.
---

# Node Write API

The Starknet Write API (schema: `starknet_write_api.json`) provides methods to submit transactions to the network. These are the main ways to change state or deploy contracts.

## Methods

### starknet_addInvokeTransaction

Submits an invoke transaction (e.g. calling a contract or sending tokens).

- **Params**: Transaction payload conforming to the write API schema (e.g. sender, calldata, signature, nonce, max_fee, etc.).
- **Result**: Transaction hash (and possibly other metadata per schema).
- **Errors**: Validation or execution errors as defined in the schema.

Use for: single contract calls, multi-calls from an account contract.

### starknet_addDeclareTransaction

Submits a declare transaction to register a new contract class (Cairo/Sierra) on chain.

- **Params**: Declare transaction payload (class data, sender, signature, nonce, max_fee, etc.).
- **Result**: Transaction hash and class hash (per schema).
- **Errors**: Invalid class, duplicate class, validation errors.

Use for: deploying new contract code (class) that can later be instantiated.

### starknet_addDeployAccountTransaction

Submits a deploy_account transaction to deploy an account contract (create contract from class at a precomputed address).

- **Params**: Deploy account transaction payload (class hash, contract address salt, constructor calldata, signature, nonce, max_fee, etc.).
- **Result**: Transaction hash and deployed contract address (per schema).
- **Errors**: Invalid class, address already in use, validation errors.

Use for: creating an account contract (or any contract) from a declared class.

## Usage for Agents

- Ensure transaction payloads match the OpenRPC schema in `starknet_write_api.json` (exact field names and types).
- Invoke: use for state-changing calls; estimate fees first with `starknet_estimateFee` (read API).
- Declare then deploy: first `starknet_addDeclareTransaction` to register the class, then `starknet_addDeployAccountTransaction` (or deploy via invoke where applicable) to create instances.
- Handle schema-defined errors for validation and execution failures.

<!--
Source references:
- https://github.com/starkware-libs/starknet-specs api/starknet_write_api.json
-->
