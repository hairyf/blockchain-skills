---
name: solidity-internals
description: Internals — storage/memory/calldata layout, optimizer, source mappings, variable cleanup.
---

# Internals

## Storage Layout

- State variables are laid out in storage in declaration order.
- Packing: up to 32 bytes in one slot when possible (e.g. multiple small values). First item in a slot is lower-order bytes.
- Dynamic arrays: slot stores length; data at `keccak256(slot)`.
- Mappings: slot unused; value at `keccak256(hash(key), slot)`.
- Nested structures and dynamic types follow documented rules. Use when writing assembly or debugging storage.

## Memory Layout

- Contiguous; 32-byte aligned. Free memory pointer at 0x40.
- Arrays: length word then elements. Structs: consecutive 32-byte fields.
- Memory is cleared between external calls (not between internal calls). Use for temporary data and ABI encoding.

## Calldata Layout

- Read-only; used for external function parameters. Same ABI encoding as memory for decoding; no allocation. Prefer `calldata` for external read-only parameters to save gas.

## Variable Cleanup

Before use, the compiler may clear padding bits (e.g. for type safety). Relevant for assembly or when comparing raw storage/memory.

## Optimizer

EVM optimizer runs on opcodes (or Yul/IR if via-IR). Optimizer runs setting affects deployment vs runtime cost. See “Using the Compiler” for `--optimize-runs`.

## Source Mappings

Compiler output can include source mapping (e.g. for debugging). Format maps bytecode range to source file/line/column for stack trace and debugging tools.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html
- https://docs.soliditylang.org/en/latest/internals/layout_in_memory.html
- https://docs.soliditylang.org/en/latest/internals/layout_in_calldata.html
- https://docs.soliditylang.org/en/latest/internals/variable_cleanup.html
- https://docs.soliditylang.org/en/latest/internals/optimizer.html
- https://docs.soliditylang.org/en/latest/internals/source_mappings.html
-->
