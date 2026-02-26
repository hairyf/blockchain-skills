---
name: openzeppelin-multisig
description: Multisig accounts with ERC-7913—SignerERC7913, MultiSignerERC7913, weighted threshold.
---

# Multisig (ERC-7913)

Multi-signature accounts require a threshold of signers to approve operations. OpenZeppelin implements this with **ERC-7913** signers: supports EOAs and non-EVM signers (e.g. P256, RSA), and threshold or weighted schemes.

## Building Blocks

- **SignerERC7913**: one ERC-7913 signer (format `verifier || key`) controls the account.
- **MultiSignerERC7913**: multiple signers; operation valid when at least `threshold` distinct signers have signed.
- **MultiSignerERC7913Weighted**: each signer has a weight; total weight of signing signers must ≥ threshold.

Use with the **Account** contract and ERC-4337 (see account-abstraction and accounts). Multisig is implemented by composing Account + EIP712 + MultiSignerERC7913 (or Weighted) + ERC7739 + ERC7821 + token holders + Initializable.

## Setup (Threshold)

```solidity
function initialize(bytes[] memory signers, uint256 threshold) public initializer {
    _addSigners(signers);
    _setThreshold(threshold);
}
```

- `signers`: array of `bytes` (e.g. EOA address, or `verifier || key` for P256/RSA).
- Threshold must be ≤ number of signers; contract validates reachability.

## Setup (Weighted)

```solidity
function initialize(bytes[] memory signers, uint256[] memory weights, uint256 threshold) public initializer {
    _addSigners(signers);
    _setSignerWeights(signers, weights);
    _setThreshold(threshold);
}
```

- Weights and threshold must use the same scale (e.g. weights 1,2,3 and threshold 4 means at least two signers).
- `_validateReachableThreshold()` ensures the sum of weights ≥ threshold; custom logic must keep this invariant.

## Signature Format

Multisig payload:

```solidity
abi.encode(
    bytes[] signers,   // signers participating, sorted by keccak256(signer)
    bytes[] signatures // one signature per signer, same order
)
```

Signers array must be sorted by `keccak256(signer)` ascending; signatures align by index.

## Management

- Add/remove signers and change threshold only via `onlyEntryPointOrSelf` (or your access control) to avoid lockout.
- Query: `isSigner(signer)`, `getSigners(start, end)`, `getSignerCount()`.

## Key Points

- Use MultiSignerERC7913 for equal-weight multisig; use Weighted when signers have different power.
- Ensure threshold is always reachable (sum of weights ≥ threshold, or threshold ≤ signer count).
- Signature encoding: signers sorted by keccak256, signatures in matching order.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/multisig.adoc
- EIP-7913
-->
