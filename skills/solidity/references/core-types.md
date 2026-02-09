---
name: solidity-types
description: Solidity types — value types, reference types, mappings, operators, conversions.
---

# Types

Solidity is statically typed. No undefined/null; new variables have type-dependent default values. Use revert or return (value, success) for failure handling.

## Value Types

- **Booleans:** `bool` (true/false)
- **Integers:** `int`/`uint` in steps of 8 (e.g. `int8`..`int256`, `uint8`..`uint256`). `uint`/`int` = 256 bits.
- **Address:** `address`, `address payable` (has `transfer`/`send`). Literals: `0x...`
- **Bytes:** fixed-size `bytes1`..`bytes32`, dynamic `bytes` and `string`
- **Enums:** user-defined, finite set
- **Function types:** internal/external function references

## Reference Types

Must specify data location: `memory` (lifetime of call), `storage` (contract storage), `calldata` (read-only, for external params).

- **Arrays:** `T[]`, `T[k]`. Dynamic/storage arrays have `.push()`, `.push(x)`, `.pop()`. `bytes` and `string` are special arrays.
- **Structs:** user-defined types grouping variables
- **Mappings:** `mapping(KeyType => ValueType)`; only in storage; no length, no iteration. Nested mappings possible.

## Operators

Arithmetic, comparison, logical, bitwise, shift, ternary. No implicit non-boolean to boolean (e.g. `if (1)` invalid). See operator precedence table in docs.

## Conversions

Implicit: e.g. uint8 to uint256, contract to address. Explicit: e.g. `uint8(x)`, `address payable(x)`. Literals to type: `uint8(1)`.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/types.html
- https://docs.soliditylang.org/en/latest/types/value-types.html
- https://docs.soliditylang.org/en/latest/types/reference-types.html
- https://docs.soliditylang.org/en/latest/types/mapping-types.html
- https://docs.soliditylang.org/en/latest/types/operators.html
- https://docs.soliditylang.org/en/latest/types/conversion.html
-->
