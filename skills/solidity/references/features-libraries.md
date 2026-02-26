---
name: solidity-libraries
description: Libraries — DELEGATECALL, internal vs external, storage refs, linking, call protection.
---

# Libraries

Libraries are deployed once; their code runs in the caller’s context via DELEGATECALL. No state variables, no inheritance, cannot receive ether or be destroyed. Internal library functions are inlined at compile time (JUMP); public/external library functions are real external calls (DELEGATECALL).

## Using a library

- **External style:** `Lib.f(args)` or `x.f()` with `using Lib for Type;` — results in DELEGATECALL unless the function is internal (see below).
- **Internal functions:** If a library only has internal (or private) functions, calls are inlined into the contract; no separate deployment needed. Internal functions can take memory types by reference.

## Storage references

Library functions can take `storage` reference parameters; only the storage address is passed. Idiomatic to name the first such parameter `self`. The calling contract’s storage is modified. Example: `function insert(Data storage self, uint value) public returns (bool)`.

## Linking and placeholders

Deployed bytecode contains placeholders (hash of fully qualified library name) where the library address must be inserted. Replace via compiler (library addresses) or linker. Do not deploy bytecode with unresolved placeholders.

## Call protection

If library code runs via CALL instead of DELEGATECALL (e.g. direct call to library address), it reverts unless the function is `view` or `pure`. The compiler injects a check comparing `address(this)` at runtime to the deployment-time address.

## Selectors and ABI

External library function selectors use an internal naming schema (not the same as contract ABI). Storage pointer types use identifiers like `mapping(K => V) storage` and are encoded as `uint256` (storage slot). Use `Lib.f.selector` to get the selector.

## Address

Get library address with `address(LibraryName)`.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/contracts.html#libraries
-->
