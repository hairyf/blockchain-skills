---
name: openzeppelin-accounts
description: ERC-4337 smart accounts—Account, signers, factory, ERC-1271, batched execution, UserOp.
---

# Smart Accounts (ERC-4337)

Smart accounts validate and execute user operations via ERC-4337. OpenZeppelin's **Account** provides the base; you plug in a signer (AbstractSigner implementation) and optional extensions (ERC-1271, ERC7821 batched execution, token holders). Use for account abstraction: gas sponsoring, batched execution, and custom validation (ECDSA, P256, RSA, EIP-7702, ERC-7913, multisig).

## Signers

Implement `_rawSignatureValidation(bytes32 hash, bytes memory signature)` by inheriting an **AbstractSigner** implementation:

- **SignerECDSA**: EOA signatures.
- **SignerP256**: secp256r1 (passkeys, FIDO, secure enclaves).
- **SignerRSA**: RSA / X.509.
- **SignerEIP7702**: EOA delegated to this account (EIP-7702).
- **SignerERC7913**: generic ERC-7913 (verifier + key).
- **MultiSignerERC7913** / **MultiSignerERC7913Weighted**: multisig (see features-multisig).

Return true if valid. Use **ERC7739** (replay protection per account/chain) when implementing ERC-1271 to avoid signature replay across accounts; expose `isValidSignature(hash, signature)` returning `IERC1271.isValidSignature.selector` when valid.

Account doesn't natively receive ERC-721/ERC-1155; inherit **ERC721Holder** and **ERC1155Holder** if the account must hold such tokens.

## Factory and Initialization

Accounts are usually deployed by a **factory** via `initCode` in the UserOperation (factory address + calldata). Use **Clones** (minimal proxy) for cheap deployment; salt must include owner/signer so the address is deterministic and not frontrunnable. After deployment, call an initializer (e.g. `initializeECDSA(signer)`) so the account has a signer set; never leave an account uninitialized.

## Batched Execution (ERC-7821)

Inherit **ERC7821** so the account can execute a batch of calls in one UserOp. Override `_erc7821AuthorizedExecutor(caller, mode, executionData)` to allow the entry point (and optionally self) to execute batches. Batch encoding follows ERC-7579-style format (call type `0x01` for batch); mode includes batch selector and exec type.

## UserOperation flow

1. **Prepare**: Set `sender`, `nonce`, `callData`, `accountGasLimits` (verificationGasLimit, callGasLimit), `preVerificationGas`, `gasFees`, `paymasterAndData`. If account not deployed, set `initCode = abi.encodePacked(factory, factoryCalldata)`.
2. **Sign**: Hash the UserOp with EIP-712 (EntryPoint domain, PackedUserOperation types); sign with the account's signer. Put result in `signature`.
3. **Send**: Call EntryPoint's `handleOps([userOp], beneficiary)`. Use a bundler in production for gas estimation and reliability.

Gas: `verificationGasLimit` covers validation; `callGasLimit` covers execution; bundlers often fill gas fees.

## Key Points

- Choose one AbstractSigner (or multisig) and optionally ERC7821, ERC7739, token holders.
- Factory must bind salt to initial owner/signer to prevent frontrunning. Always initialize the account when using a factory.
- Use ERC-7739 for ERC-1271 to prevent cross-account replay. For EOA delegation to an Account, use SignerEIP7702; see EOA delegation reference.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/accounts.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/account-abstraction.adoc
- EIP-4337, ERC-7821, ERC-7739
-->
