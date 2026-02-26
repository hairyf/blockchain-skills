---
name: TronBox contract abstraction
description: Contract instance from artifacts.require — new(), at(), deployed(), call(), link, and defaults.
---

# TronBox Contract Abstraction

Contract abstractions are created via `contract(binary)` (used internally when you call `artifacts.require('ContractName')`). The result is a class-like object with ABI, bytecode, and network state used for deploy and calls.

## Creating an abstraction

- **artifacts.require('ContractName')** or **artifacts.require('./path/Contract.sol')** returns the abstraction (see [core-artifacts-resolver](core-artifacts-resolver.md)). Contract.initTronWeb() is called so TronWrap is set before use.

## Key methods

- **new(...args)** – Deploy a new instance. Last argument can be an options object (e.g. `feeLimit`, `callValue`, or EVM `value`). Returns a Promise that resolves to the deployed contract instance. Fails if bytecode has unlinked libraries (deploy libraries first and link).
- **at(address)** – Return an abstraction instance bound to `address`. Call **deployed()** on the result to load methods.
- **deployed()** – Return a Promise that resolves to the same contract with ABI methods attached (e.g. `contractInstance.methodName(args)` for view/call, or send with options). Resolves against the current network_id; fails if the contract has no address on that network.
- **call(methodName, ...args)** – Invoke a contract method (view or state-changing; TronWrap routes to call vs send by ABI). Last argument can be an options object (e.g. `from`, `feeLimit`, `callValue`).
- **link(libraryContractOrName, address)** – Set a library link for bytecode (used before deploy). Can pass a contract abstraction or `(name, address)`.
- **setNetwork(network_id)** – Set the network id for address/lookup.
- **defaults(class_defaults)** – Set default options merged into deploy/call options.

## Properties

- **contractName**, **abi**, **bytecode**, **deployedBytecode**, **address** (when deployed), **network**, **networks**, **transactionHash**, **binary** (bytecode with links applied), **links**.

## Usage for agents

- In migrations and tests use `artifacts.require('ContractName')` then `deployer.deploy(Contract)` or `contract.new(...args)` / `contract.at(address).then(c => c.deployed())`.
- For view calls use `instance.methodName(args)` after `deployed()` or `at(address).then(c => c.deployed())`; the abstraction exposes each ABI function as a callable that returns a Promise.
- Unlinked library error: deploy the library, call `deployer.link(Lib, Consumer)` (or contract.link(Lib, Lib.address)), then deploy the consumer.

<!--
Source references:
- sources/tronbox/src/components/Contract/index.js
- sources/tronbox/src/components/Contract/contract.js
-->
