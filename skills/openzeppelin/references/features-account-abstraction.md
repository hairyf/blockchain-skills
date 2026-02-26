---
name: openzeppelin-account-abstraction
description: ERC-4337 stack overview—UserOperation, EntryPoint, Bundler, Account, Factory, Paymaster.
---

# Account Abstraction (ERC-4337)

ERC-4337 defines an alternative mempool and execution flow for user operations without protocol changes. OpenZeppelin provides contracts that implement accounts, validation, and integration points; paymasters and full bundler logic are in community/other packages. Accounts can use arbitrary validation (not only ECDSA) and benefit from batching and gas sponsorship.

## Components

- **UserOperation** (e.g. `PackedUserOperation`): carries `sender`, `nonce`, `initCode` (factory + data or empty), `callData`, `accountGasLimits` (verification + call gas), `preVerificationGas`, `gasFees`, `paymasterAndData`, `signature`. Bundlers charge users via gas fields; use **ERC4337Utils** for struct encoding and helpers.
- **EntryPoint**: singleton contract that runs `validateUserOp` on the account then executes the op. Accounts trust the EntryPoint (e.g. canonical address on mainnet). `handleOps(ops, beneficiary)` runs validation then execution; the bundler is refunded and can set `beneficiary` to receive fees.
- **Bundler**: off-chain; collects UserOps, calls EntryPoint's `handleOps`, pays gas and is refunded during execution.
- **Account**: validates the UserOp (`validateUserOp`) and executes it (e.g. via fallback or **IAccountExecute** / **ERC7821**). Must implement **IAccount**.
- **Factory**: creates accounts; `initCode = abi.encodePacked(factoryAddress, factoryCalldata)`. Salt must tie to initial owner to avoid frontrunning.
- **Paymaster** (optional): sponsors gas or allows ERC-20 payment; see community-contracts/docs.

## Validation (ERC-7562)

Bundlers rely on validation being restricted (e.g. no arbitrary state changes) so they can safely simulate. **ERC-7562** constrains what accounts can do during `validateUserOp`. Accounts that only read their own storage and do fixed checks are generally safe; complex validation (e.g. calling other accounts) may break ERC-7562 and require a private bundler.

## Key Points

- UserOp flows: Bundler → EntryPoint → Account (validate then execute). Factory used when account not yet deployed (`initCode`).
- Build accounts from OpenZeppelin Account + signer + optional ERC7821/ERC7739; see accounts and multisig references.
- Respect ERC-7562 if you want compatibility with permissionless bundlers. For paymasters, see OpenZeppelin community-contracts.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/account-abstraction.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/accounts.adoc
- EIP-4337, ERC-7562
-->
