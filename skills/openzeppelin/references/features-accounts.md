---
name: openzeppelin-accounts
description: ERC-4337 smart accounts, Account contract, signers, factory deployment, UserOp, and batched execution.
---

# Smart Accounts (ERC-4337)

OpenZeppelin’s `Account` implements ERC-4337 user-operation handling. You provide signature validation via an `AbstractSigner` (implement `_rawSignatureValidation`). Use for account abstraction: gas sponsoring, batched execution, and custom validation (ECDSA, P256, RSA, EIP-7702, ERC-7913, multisig).

## Signers

- **SignerECDSA**: EOA signatures.
- **SignerP256**: secp256r1 (passkeys, FIDO, secure enclaves).
- **SignerRSA**: PKI / X.509.
- **SignerEIP7702**: EOA delegated to this account (EIP-7702).
- **SignerERC7913**: generic ERC-7913 (verifier + key).
- **MultiSignerERC7913** / **MultiSignerERC7913Weighted**: threshold/weighted multisig.

Implement `_rawSignatureValidation(bytes32 hash, bytes memory signature)` and return true if valid. Use ERC-7739 to bind signatures to account address/chainId and avoid replay across accounts; expose `isValidSignature(hash, signature)` returning `IERC1271.isValidSignature.selector` when valid.

## Setup and factory

Accounts are often deployed by a **factory** via `initCode` in the UserOperation (factory address + calldata). Use the Clones library for minimal clones; include the owner/signer in the clone salt so the address is deterministic and frontrunning is prevented. After deployment, call an initializer (e.g. `initializeECDSA(signer)`) so the account has a signer set; leaving it uninitialized can make it unusable.

Inherit **ERC721Holder** and **ERC1155Holder** if the account should receive ERC-721/ERC-1155 tokens (they require receiver callbacks).

## Batched execution (ERC-7821)

ERC-7821 adds batched execution. Override `_erc7821AuthorizedExecutor(caller, mode, executionData)` to allow the entry point (and optionally self) to execute batches. Encode batch as ERC-7579-style execution data (call type `0x01` for batch, default exec type). Use `execute(mode, batch)` from the account; mode includes batch selector and exec type.

## UserOperation flow

1. **Prepare**: Set `sender`, `nonce`, `callData`, `accountGasLimits` (verificationGasLimit, callGasLimit), `preVerificationGas`, `gasFees`, `paymasterAndData`. If account not deployed, set `initCode = abi.encodePacked(factory, factoryCalldata)`.
2. **Sign**: Hash the UserOp with EIP-712 (EntryPoint domain, PackedUserOperation types); sign with the account’s scheme. Put result in `signature`.
3. **Send**: Call EntryPoint’s `handleOps([userOp], beneficiary)`.

Gas: `verificationGasLimit` covers validation and paymaster; `callGasLimit` covers execution; unused gas above a threshold is penalized. Use a bundler for estimation and ordering when possible.

## Key points

- Always initialize the account (set signer) when using a factory; otherwise the account has no key.
- Use ERC-7739 (or equivalent) so signatures are bound to account and chain.
- For EOA delegation to an Account, use SignerEIP7702 and the EOA as sender; see EOA delegation reference.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/accounts.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/account-abstraction.adoc
-->
