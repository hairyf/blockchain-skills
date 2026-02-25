---
name: openzeppelin-account-abstraction
description: ERC-4337 stack overview—UserOperation, EntryPoint, Bundler, Account, Factory, Paymaster.
---

# Account Abstraction (ERC-4337 Overview)

ERC-4337 defines an account-abstraction stack without protocol changes: UserOperations go through an alternative mempool and are executed via an EntryPoint. Accounts can use arbitrary validation (not only ECDSA) and benefit from batching and gas sponsorship.

## Components

- **UserOperation** (e.g. `PackedUserOperation`): pseudo-transaction with `sender`, `nonce`, `initCode` (factory + data), `callData`, `accountGasLimits` (verification + call gas), `preVerificationGas`, `gasFees`, `paymasterAndData`, `signature`. Bundlers use gas fields to cover costs and charge users.
- **EntryPoint**: singleton contract that runs `validateUserOp` on the account then executes the op. Trusted by the account. Same address across many networks for the canonical EntryPoint.
- **Bundler**: off-chain infra that collects UserOps, calls EntryPoint’s `handleOps(ops, beneficiary)`, pays gas and is refunded during execution. Beneficiary receives collected fees.
- **Account**: implements validation (e.g. `validateUserOp`) and execution (e.g. fallback, ERC-7821 batch, or custom). Must conform to the expected validation interface.
- **Factory**: creates accounts; `initCode = abi.encodePacked(factoryAddress, factoryCalldata)`. Deployer chooses salt/params so address is deterministic.
- **Paymaster**: optional; sponsors gas or lets users pay in ERC-20. See community-contracts paymasters for implementation.

Use `ERC4337Utils` for working with the UserOperation struct and related ERC-4337 values.

## Validation (ERC-7562)

Bundlers call `validateUserOp` on the sender; ERC-7562 restricts what accounts can do during validation so bundlers are protected from arbitrary state changes. Accounts that only read their own storage for signature checks are typically fine; cross-account or heavy validation can violate ERC-7562 and may require a private bundler.

## Key points

- UserOp flows: Bundler → EntryPoint → Account (validate then execute). Factory used when account not yet deployed (`initCode`).
- For building an account or factory, see the Accounts and EOA Delegation references. For paymasters, see OpenZeppelin community-contracts.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/account-abstraction.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/accounts.adoc
-->
