---
name: openzeppelin-accounts
description: Smart accounts (ERC-4337)—Account, signers, factory, ERC-1271, batched execution, UserOp.
---

# Smart Accounts (ERC-4337)

Smart accounts validate and execute user operations via ERC-4337. OpenZeppelin’s **Account** provides the base; you plug in a signer (AbstractSigner implementation) and optional extensions (ERC-1271, ERC7821 batched execution, token holders).

## Minimum: Account + Signer

Implement `_rawSignatureValidation(bytes32 hash, bytes memory signature)` by inheriting an **AbstractSigner** implementation:

- **SignerECDSA**: EOA signatures.
- **SignerP256**: secp256r1 (passkeys, FIDO).
- **SignerRSA**: RSA / X.509.
- **SignerEIP7702**: EOA delegated to this account (EIP-7702).
- **SignerERC7913**: generic ERC-7913 (verifier + key).
- **MultiSignerERC7913** / **MultiSignerERC7913Weighted**: multisig (see features-multisig).

Account doesn’t natively receive ERC-721/ERC-1155; inherit **ERC721Holder** and **ERC1155Holder** if the account must hold such tokens.

## Factory and Initialization

Accounts are usually deployed by a **factory** (same transaction as first UserOp via `initCode`). Use **Clones** (minimal proxy) for cheap deployment; salt must include owner/signer so the address is deterministic and not frontrunnable.

```solidity
// Factory: clone implementation with salt = f(owner/signer)
// Account: Initializable + initialize(signer) in initializer
function initializeECDSA(address signer) public initializer {
    _setSigner(signer);
}
```

Never leave an account uninitialized (no signer set).

## ERC-1271

Expose `isValidSignature(bytes32 hash, bytes calldata signature)` for contract signature checks (e.g. off-chain signers). Implement via your signer:

```solidity
function isValidSignature(bytes32 hash, bytes calldata signature) public view override returns (bytes4) {
    return _rawSignatureValidation(hash, signature) ? IERC1271.isValidSignature.selector : bytes4(0xffffffff);
}
```

Use **ERC7739** (replay protection per account/chain) when implementing ERC-1271 to avoid signature replay across accounts.

## Batched Execution (ERC-7821)

Inherit **ERC7821** so the account can execute a batch of calls in one UserOp. Allow the entry point to run batches:

```solidity
function _erc7821AuthorizedExecutor(address caller, bytes32 mode, bytes calldata executionData)
    internal view virtual override returns (bool) {
    return caller == address(entryPoint()) || super._erc7821AuthorizedExecutor(caller, mode, executionData);
}
```

Batch encoding follows ERC-7579-style format (e.g. viem encode for `(target, value, data)[]`); mode `0x01...` is the standard batch call type.

## Preparing and Sending a UserOp

- Build **PackedUserOperation**: sender, nonce, initCode (if first deploy), callData, accountGasLimits, preVerificationGas, gasFees, paymasterAndData, signature.
- Sign with EIP-712 (EntryPoint domain + PackedUserOperation types) using the account’s signer; set `signature`.
- Send via EntryPoint’s `handleOps([userOp], beneficiary)`. Use a bundler in production for gas estimation and reliability.

Gas: set `verificationGasLimit` (validation), `callGasLimit` (execution), `preVerificationGas` (overhead); bundlers often fill gas fees.

## Key Points

- Choose one AbstractSigner (or multisig) and optionally ERC7821, ERC7739, token holders.
- Factory must bind salt to initial owner/signer to prevent frontrunning.
- Use ERC7739 for ERC-1271 to prevent cross-account replay.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/accounts.adoc
- EIP-4337, ERC-7821, ERC-7739
-->
