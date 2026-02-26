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
| ERC1155 | Multi-token, batch ops, safe transfer, metadata URI | [core-erc1155](references/core-erc1155.md) |
| ERC4626 | Token vault, shares, inflation attack mitigation, fees | [core-erc4626](references/core-erc4626.md) |
| ERC6909 | Multi-token, no callbacks, granular approvals | [core-erc6909](references/core-erc6909.md) |
| Extending Contracts | Inheritance, overrides, super, security | [core-extending-contracts](references/core-extending-contracts.md) |

## Features

### Upgradeable

| Topic | Description | Reference |
|-------|-------------|-----------|
| Upgradeable Contracts | contracts-upgradeable, initializers, namespaced storage | [features-upgradeable](references/features-upgradeable.md) |

### Utilities

| Topic | Description | Reference |
|-------|-------------|-----------|
| Utilities | ECDSA, MerkleProof, Math, ERC165, structures, StorageSlot, Multicall | [features-utilities](references/features-utilities.md) |
| ERC20 Supply | _mint, _update, fixed supply, custom mint triggers | [features-erc20-supply](references/features-erc20-supply.md) |
| ERC2981 Royalties | NFT royalty signaling, default and per-token | [features-erc2981](references/features-erc2981.md) |
| Permit (EIP-2612) | Gasless ERC20 approval via signature, Nonces | [features-permit](references/features-permit.md) |

### Governance & Accounts

| Topic | Description | Reference |
|-------|-------------|-----------|
| Governance | Governor, ERC20Votes, timelock, proposal lifecycle | [features-governance](references/features-governance.md) |
| Multisig | ERC-7913 signers, MultiSignerERC7913, weighted threshold | [features-multisig](references/features-multisig.md) |
| Smart Accounts | Account, signers, factory, ERC-1271, batched execution | [features-accounts](references/features-accounts.md) |
| Account Abstraction | ERC-4337, UserOperation, EntryPoint, bundlers | [features-account-abstraction](references/features-account-abstraction.md) |
| EOA Delegation | EIP-7702, SignerEIP7702, set-code, ERC-4337 with EOAs | [features-eoa-delegation](references/features-eoa-delegation.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Backwards Compatibility | Semantic versioning, storage layout, safe overrides | [best-practices-backwards-compatibility](references/best-practices-backwards-compatibility.md) |
| Security Patterns | ReentrancyGuard, Pausable, transient guard | [best-practices-security-patterns](references/best-practices-security-patterns.md) |
