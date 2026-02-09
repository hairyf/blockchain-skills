---
name: openzeppelin-backwards-compatibility
description: Semantic versioning, storage layout, and safe overrides for OpenZeppelin Contracts.
---

# Backwards Compatibility

OpenZeppelin Contracts use semantic versioning. Patch and minor are generally backwards compatible; major releases are not (especially storage and upgrades).

## API

- Backwards-compatible releases: mostly additions or internal changes. Exceptions: security fixes (breaking changes noted in changelog), draft/pre-final ERCs in `draft-*.sol` (no guarantee), and virtual/override surface—only a subset of functions are designed to be overridden.
- Struct members with underscore prefix are internal; access only via library/contract APIs.
- Revert error format and data are not guaranteed stable unless specified.

## Storage Layout

- Minor and patch preserve **storage layout**. Upgrading a proxy from one minor to another is safe for layout; new state may need initializing.
- **Major releases:** storage layout is not compatible; do not upgrade a live contract across major versions.
- Use OpenZeppelin Upgrades Plugins or CLI to validate storage when upgrading.

## Overrides

- Prefer overriding only documented extension points. Overriding other functions may depend on internals and break on updates.
- When Solidity reports ambiguous inherited functions, add an override that calls `super.functionName()`.
- Custom overrides (especially hooks) can invalidate security assumptions; revalidate when upgrading the library.

## Key Points

- Never upgrade a deployed proxy across major versions (e.g. 4.x → 5.x).
- Draft ERCs (`draft-*.sol`) can change in breaking ways.
- When extending contracts, re-check overrides and storage after upgrading OpenZeppelin.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/backwards-compatibility.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/extending-contracts.adoc
-->
