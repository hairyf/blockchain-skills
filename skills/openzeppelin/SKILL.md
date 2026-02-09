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

## Features

### Upgradeable

| Topic | Description | Reference |
|-------|-------------|-----------|
| Upgradeable Contracts | contracts-upgradeable, initializers, namespaced storage | [features-upgradeable](references/features-upgradeable.md) |

### Utilities

| Topic | Description | Reference |
|-------|-------------|-----------|
| Utilities | ECDSA, MerkleProof, Math, ERC165, structures, StorageSlot, Multicall | [features-utilities](references/features-utilities.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Backwards Compatibility | Semantic versioning, storage layout, safe overrides | [best-practices-backwards-compatibility](references/best-practices-backwards-compatibility.md) |
