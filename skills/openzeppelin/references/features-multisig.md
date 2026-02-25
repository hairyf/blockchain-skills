---
name: openzeppelin-multisig
description: Multisig accounts with ERC-7913 signers, threshold and weighted variants.
---

# Multisig

Multi-signature accounts require multiple signers to approve operations. OpenZeppelin supports this via ERC-7913 signers: `SignerERC7913` (single signer), `MultiSignerERC7913` (threshold), and `MultiSignerERC7913Weighted` (weighted threshold). Use with the Account (ERC-4337) contract for smart account multisig.

## Single signer (ERC-7913)

`SignerERC7913`: one signer represented as `bytes` = `verifier || key`. Use for keys without an EVM address (e.g. hardware). Initialize the account with `_setSigner(signer)`; expose `setSigner` with `onlyEntryPointOrSelf` so the account or entry point can rotate the key. Do not leave the account uninitialized (no public key).

## Threshold multisig (MultiSignerERC7913)

Multiple signers, fixed threshold (e.g. 2-of-3). Initialize with `_addSigners(signers)` and `_setThreshold(threshold)`. Public management: `addSigners`, `removeSigners`, `setThreshold` (guard with `onlyEntryPointOrSelf`). Contract ensures threshold is reachable (e.g. threshold ≤ number of signers). Query: `isSigner(signer)`, `getSigners(start, end)`, `getSignerCount()`.

## Weighted multisig (MultiSignerERC7913Weighted)

Like `MultiSignerERC7913` but each signer has a weight; total weight of signing participants must meet or exceed the threshold. Initialize with `_addSigners(signers)`, `_setSignerWeights(signers, weights)`, `_setThreshold(threshold)`. Use when signers have different authority (e.g. board votes, social recovery). Threshold scale must match weights (e.g. weights 1,2,3 → threshold 4 means at least two signers). `_validateReachableThreshold()` ensures sum of weights ≥ threshold.

## Signature format

Multisig signature is `abi.encode(signers[], signatures[])`. `signers` must be sorted ascending by `keccak256(signer)`; `signatures` in the same order. Each signer uses ERC-7913 format (verifier + key); each signature is the signer’s own signature.

## Setup example (threshold)

```solidity
bytes[] memory signers = new bytes[](3);
signers[0] = ecdsaSigner;  // e.g. 20-byte EOA
signers[1] = abi.encodePacked(p256Verifier, pubKeyX, pubKeyY);
signers[2] = abi.encodePacked(rsaVerifier, abi.encode(rsaE, rsaN));
uint256 threshold = 2;
account.initialize(signers, threshold);
```

For weighted: `initialize(signers, weights, threshold)` and ensure threshold is achievable from the sum of weights.

## Key points

- Standard EIP-1271 assumes a single identity; ERC-7913 allows multiple signers and threshold/weighted rules.
- Use with `Account` + EIP712 + ERC7739 + ERC7821 (and token holders if the account holds NFTs/ERC1155). Restrict signer management to `onlyEntryPointOrSelf`.
- Any custom logic on top of multisigner contracts must keep the threshold reachable (e.g. after removing signers).

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/multisig.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/accounts.adoc
-->
