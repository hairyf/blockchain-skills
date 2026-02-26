---
name: openzeppelin-multisig
description: Multisig accounts with ERC-7913—SignerERC7913, MultiSignerERC7913, weighted threshold.
---

# Multisig (ERC-7913)

Multi-signature accounts require a threshold of signers to approve operations. OpenZeppelin implements this with **ERC-7913** signers: supports EOAs and non-EVM signers (e.g. P256, RSA), and threshold or weighted schemes. Use with the **Account** (ERC-4337) contract; see account-abstraction and accounts.

## Building blocks

- **SignerERC7913**: one ERC-7913 signer (format `verifier || key`) controls the account. Use for keys without an EVM address (e.g. hardware). Initialize with `_setSigner(signer)`; expose `setSigner` with `onlyEntryPointOrSelf`. Do not leave the account uninitialized.
- **MultiSignerERC7913**: multiple signers; operation valid when at least `threshold` distinct signers have signed. Initialize with `_addSigners(signers)` and `_setThreshold(threshold)`. Management: `addSigners`, `removeSigners`, `setThreshold` (guard with `onlyEntryPointOrSelf`). Query: `isSigner(signer)`, `getSigners(start, end)`, `getSignerCount()`.
- **MultiSignerERC7913Weighted**: each signer has a weight; total weight of signing signers must ≥ threshold. Initialize with `_addSigners(signers)`, `_setSignerWeights(signers, weights)`, `_setThreshold(threshold)`. Use when signers have different authority (e.g. board votes, social recovery). `_validateReachableThreshold()` ensures sum of weights ≥ threshold.

Multisig is implemented by composing Account + EIP712 + MultiSignerERC7913 (or Weighted) + ERC7739 + ERC7821 + token holders + Initializable.

## Setup (Threshold)

```solidity
function initialize(bytes[] memory signers, uint256 threshold) public initializer {
    _addSigners(signers);
    _setThreshold(threshold);
}
```

- `signers`: array of `bytes` (e.g. EOA address, or `verifier || key` for P256/RSA). Threshold must be ≤ number of signers.

## Setup (Weighted)

```solidity
function initialize(bytes[] memory signers, uint256[] memory weights, uint256 threshold) public initializer {
    _addSigners(signers);
    _setSignerWeights(signers, weights);
    _setThreshold(threshold);
}
```

Weights and threshold must use the same scale (e.g. weights 1,2,3 and threshold 4 means at least two signers).

## Signature format

Multisig payload: `abi.encode(bytes[] signers, bytes[] signatures)`. Signers array must be sorted by `keccak256(signer)` ascending; signatures in the same order. Each signer uses ERC-7913 format (verifier + key).

Example (threshold): `signers[0] = ecdsaSigner; signers[1] = abi.encodePacked(p256Verifier, pubKeyX, pubKeyY); ... account.initialize(signers, threshold);`. For weighted: `initialize(signers, weights, threshold)` and ensure threshold is achievable from the sum of weights.

## Key Points

- Use MultiSignerERC7913 for equal-weight multisig; use Weighted when signers have different power.
- Restrict signer management to `onlyEntryPointOrSelf` to avoid lockout. Any custom logic must keep the threshold reachable (e.g. after removing signers).
- EIP-1271 assumes a single identity; ERC-7913 allows multiple signers and threshold/weighted rules.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/multisig.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/accounts.adoc
- EIP-7913
-->
