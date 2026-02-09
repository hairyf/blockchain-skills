---
name: solidity-yul
description: Yul — intermediate language used by Solidity and inline assembly.
---

# Yul

Yul is an intermediate language used in the Solidity compiler and in inline assembly. It is EVM-targeted and supports other backends (e.g. Ewasm).

## When to Use

- Inline assembly in Solidity (see `features-assembly`) for low-level logic.
- Standalone Yul for very gas-optimized or fixed layout code (e.g. custom creation code).

## Concepts

- **Blocks:** `{ }` with statements.
- **Variables:** Declared with `let x := value` or assigned; typed only by usage.
- **Literals:** Decimal or hex (e.g. `0x20`).
- **Functions:** `function f(a, b) -> x, y { ... }`; return via variable names.
- **Control flow:** `if cond { }`, `for { } cond { } { }`, `switch value case n { } default { }`.

## EVM Opcodes

Yul exposes EVM opcodes as builtins: e.g. `add`, `sload`, `sstore`, `mload`, `mstore`, `call`, `delegatecall`, `create`, `create2`. Use `returndatasize`, `returndatacopy` after external calls when decoding return data.

## Object / Subobject

Standalone Yul can be structured as objects with code and data subobjects; Solidity inline assembly is a single block. For full Yul object format and deployment, see compiler docs.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/yul.html
-->
