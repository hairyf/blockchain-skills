---
name: ton-tvm
description: TON Virtual Machine overview, stack, data types, gas, instructions.
---

# TVM Overview

**TVM** is a stack-based VM that runs smart contracts on TON. Execution is deterministic; every instruction consumes **gas**; gas exhaustion aborts the run.

## Data model

- No RAM; **stack** for scratchpad. Parameters in code or on stack.
- Values are **immutable**. Persistent data is an immutable tree of **cells**; read/write via **slices** and **builders**.
- No function pointers; code lives in **continuations** (executable slices).

## TVM state

- **Stack**: operands and results.
- **Control registers** `c0`–`c5`, `c7` (no c6).
- **Gas counter**: decremented per instruction; zero/negative ⇒ exception.
- **Current continuation (`cc`)**: next instructions to run.
- **Codepage (`cp`)**: instruction set; currently only `SETCP0` (codepage 0).

## Data types

| Type         | Description                          |
| ------------ | ------------------------------------ |
| Integer      | 257-bit signed; special NaN for faults |
| Cell         | ≤1023 bits + ≤4 refs                 |
| Slice        | Read cursor over a cell              |
| Builder      | Write cursor to build a cell         |
| Tuple        | 0–255 elements, any of the seven types |
| Continuation | Executable slice (TVM bitcode)       |
| Null         | Empty value                          |

## Initialization

On incoming message or get-method call, TVM is initialized from that message (stack, registers). See tvm/initialization.

## Instructions

Instructions are stack-based (e.g. pop operands, push results). Full reference: tvm/instructions (opcodes, Fift aliases, categories: stack_basic, cell ops, crypto, etc.). Use **get methods** for read-only queries; they run TVM without changing state.

## Key points

- Stack-based, deterministic, gas-limited; state = stack + registers + gas + continuation.
- Data in cells; manipulate via slices/builders; types include Cell, Slice, Builder, Integer, Tuple, Continuation, Null.
- Get methods are read-only entrypoints; all state changes go through messages and transactions.

<!--
Source references:
- https://github.com/ton-org/docs (tvm/overview.mdx, instructions.mdx, gas.mdx, registers.mdx, get-method.mdx)
- tvm/initialization, tvm/continuations, tvm/exit-codes
-->
