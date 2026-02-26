---
name: openzeppelin-account-abstraction
description: ERC-4337 overview—UserOperation, EntryPoint, bundlers, account and paymaster roles.
---

# Account Abstraction (ERC-4337)

ERC-4337 defines an alternative mempool and execution flow for “user operations” without protocol changes. OpenZeppelin provides contracts that implement accounts, validation, and integration points; paymasters and full bundler logic are in community/other packages.

## UserOperation

**PackedUserOperation** carries: `sender`, `nonce`, `initCode` (factory + data or empty), `callData`, `accountGasLimits` (verification + call gas), `preVerificationGas`, `gasFees`, `paymasterAndData`, `signature`. Bundlers charge users via `preVerificationGas` and `gasFees`; `preVerificationGas` is not standardized and depends on calldata and bundler. Use **ERC4337Utils** for struct encoding and helpers.

## EntryPoint

A singleton **EntryPoint** contract executes UserOperations. Accounts trust the EntryPoint (e.g. canonical address on mainnet). EntryPoint’s `handleOps(ops, beneficiary)` runs validation then execution; the bundler is refunded and can set `beneficiary` to receive fees.

## Roles

- **Account**: validates the UserOp (`validateUserOp`) and executes it (e.g. via fallback or **IAccountExecute** / **ERC7821**). Must implement **IAccount**.
- **Factory**: creates accounts; accepts init data and returns the account address. Salt must tie to initial owner to avoid frontrunning.
- **Bundler**: off-chain; submits bundles to EntryPoint and pays gas, gets refund from EntryPoint.
- **Paymaster** (optional): sponsors gas or allows ERC-20 payment; see community contracts/docs.

## ERC-7562 (Validation Rules)

Bundlers rely on validation being restricted (e.g. no arbitrary state changes) so they can safely simulate. **ERC-7562** constrains what accounts can do during `validateUserOp`. Accounts that only read their own storage and do fixed checks are generally safe; complex validation (e.g. calling other accounts) may break ERC-7562 and require a private bundler.

## Key Points

- UserOp flows: bundler → EntryPoint → account validate → account execute (and paymaster if present).
- Build accounts from OpenZeppelin Account + signer + optional ERC7821/ERC7739; see accounts and multisig references.
- Respect ERC-7562 if you want compatibility with permissionless bundlers.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/account-abstraction.adoc
- EIP-4337, ERC-7562
-->
