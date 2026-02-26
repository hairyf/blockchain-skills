---
name: openzeppelin-contracts
description: Secure smart contract library—access control, tokens (ERC20/721/1155/4626/6909), upgradeable contracts, and utilities.
metadata:
  author: hairy
  version: "2026.2.9"
  source: Generated from https://github.com/OpenZeppelin/openzeppelin-contracts, scripts at https://github.com/antfu/skills
---

> Skill based on OpenZeppelin Contracts (docs as of 2026-02-09), generated from `sources/openzeppelin`.

OpenZeppelin Contracts is a library for secure smart contract development on EVM. Use via inheritance (e.g. ERC20, AccessControl) or `using for` (e.g. ECDSA, Math). Covers access control (Ownable, RBAC, AccessManager, TimelockController), tokens (ERC20, ERC721, ERC1155, ERC4626, ERC6909), upgradeable variants, and utilities (crypto, math, introspection, structures, storage).

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Overview | Library usage, inheritance, extending contracts | [core-overview](references/core-overview.md) |
| Access Control | Ownable, AccessControl (RBAC), AccessManager, TimelockController | [core-access-control](references/core-access-control.md) |
| Tokens | Token standards and when to use ERC20/721/1155/4626/6909 | [core-tokens](references/core-tokens.md) |
| ERC20 | Fungible tokens, decimals, transfer, supply | [core-erc20](references/core-erc20.md) |
| ERC721 | Non-fungible tokens, URI storage, minting | [core-erc721](references/core-erc721.md) |
| ERC1155 | Multi-token (fungible + NFT), batch ops, safe transfer to contracts | [core-erc1155](references/core-erc1155.md) |
| ERC4626 | Tokenized vaults, shares vs assets, inflation attack mitigation | [core-erc4626](references/core-erc4626.md) |
| ERC6909 | Multi-asset (no batch/callbacks), granular approvals, extensions | [core-erc6909](references/core-erc6909.md) |
| Extending Contracts | Inheritance, overrides, super, security when customizing | [core-extending-contracts](references/core-extending-contracts.md) |
| ERC20 Supply | Creating supply with _mint and _update, fixed and reward patterns | [core-erc20-supply](references/core-erc20-supply.md) |

## Features

### Upgradeable

| Topic | Description | Reference |
|-------|-------------|-----------|
| Upgradeable Contracts | contracts-upgradeable, initializers, namespaced storage | [features-upgradeable](references/features-upgradeable.md) |

### Governance & Accounts

| Topic | Description | Reference |
|-------|-------------|-----------|
| Account Abstraction | ERC-4337 stack: UserOperation, EntryPoint, Bundler, Paymaster | [features-account-abstraction](references/features-account-abstraction.md) |
| Governor | On-chain governance, ERC20Votes, quorum, timelock, proposal lifecycle | [features-governance](references/features-governance.md) |
| Multisig | ERC-7913 signers, threshold and weighted multisig with Account | [features-multisig](references/features-multisig.md) |
| Smart Accounts | ERC-4337 Account, signers, factory, UserOp, batched execution | [features-accounts](references/features-accounts.md) |
| EOA Delegation | EIP-7702 delegation to contracts, SignerEIP7702, authorization | [features-eoa-delegation](references/features-eoa-delegation.md) |

### Utilities

| Topic | Description | Reference |
|-------|-------------|-----------|
| Utilities | ECDSA, MerkleProof, Math, ERC165, structures, StorageSlot, Multicall | [features-utilities](references/features-utilities.md) |
| ERC20 Supply | _mint, _update, fixed supply, custom mint triggers | [features-erc20-supply](references/features-erc20-supply.md) |
| ERC2981 Royalties | NFT royalty signaling, default and per-token | [features-erc2981](references/features-erc2981.md) |
| Permit (EIP-2612) | Gasless ERC20 approval via signature, Nonces | [features-permit](references/features-permit.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Backwards Compatibility | Semantic versioning, storage layout, safe overrides | [best-practices-backwards-compatibility](references/best-practices-backwards-compatibility.md) |
| Security Patterns | ReentrancyGuard, Pausable, transient guard | [best-practices-security-patterns](references/best-practices-security-patterns.md) |
| Extending Contracts | Inheritance, overrides, super, security when customizing | [best-practices-extending-contracts](references/best-practices-extending-contracts.md) |
| EOA Restriction | Why not to restrict to EOAs only; use access control instead | [best-practices-eoa-restriction](references/best-practices-eoa-restriction.md) |
