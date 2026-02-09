---
name: openzeppelin-overview
description: OpenZeppelin Contracts library overview, inheritance, and usage patterns.
---

# OpenZeppelin Contracts Overview

OpenZeppelin Contracts is a library for secure smart contract development. Use it via **inheritance** (e.g. `contract MyToken is ERC20`) or **libraries** via `using X for type` (e.g. `using ECDSA for bytes32`).

## Usage

- **Install:** `npm install @openzeppelin/contracts` (Hardhat) or `forge install OpenZeppelin/openzeppelin-contracts` (Foundry). Use tagged releases, not `master`.
- **Import and inherit:** Only the contracts and functions you use are deployed; no need to worry about gas bloat.
- **Do not copy-paste or modify** library code; use the installed package as-is for security.

## Extending Contracts

- Override parent behavior with `override` and optionally call `super.functionName()` to extend rather than replace.
- Only a subset of functions are designed to be overridden; overriding others may rely on internal details and break across releases.
- Custom overrides, especially to hooks, can introduce security risks—review against the source you are customizing.

## Key Points

- Contracts are expected to be used via inheritance; libraries use `using for`.
- Semantic versioning: patch/minor are generally backwards compatible; **major versions are not** (especially upgrade/storage).
- NPM tags: `latest` = audited, `dev` = final but unaudited, `next` = release candidates.

<!--
Source references:
- https://docs.openzeppelin.com/contracts/
- sources/openzeppelin/docs/modules/ROOT/pages/index.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/extending-contracts.adoc
-->
