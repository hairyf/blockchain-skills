---
name: solidity-control-structures
description: Control structures, function calls (internal/external), revert, try/catch.
---

# Expressions and Control Structures

## Control Structures

`if`, `else`, `while`, `do`, `for`, `break`, `continue`, `return` — C/JS semantics. Parentheses required for conditionals; braces can be omitted for single-statement bodies. No non-boolean to boolean conversion.

**Exception handling:** `try`/`catch` only for external calls and contract creation. Use `revert` for custom errors.

## Function Calls

**Internal:** Direct/recursive calls within same contract; implemented as jumps; memory not cleared. Avoid deep recursion (EVM stack limit 1024).

**External:** `this.g(8)` or `c.g(2)` — message call. All arguments copied to memory. Cannot use `this` in constructor.

Specify value and gas: `feed.info{value: 10, gas: 800}()`. The parentheses perform the call; without them the options are lost. Callee must be `payable` for `value`.

Calls to non-existing contracts: compiler uses `extcodesize` to check; exception if no code. Exception skipped when return data is decoded (ABI decoder catches it).

**Return data:** Low-level `call` returns `(bool success, bytes memory data)`. Use `abi.decode(data, (T))` to decode.

## Revert and Assert

- `require(condition, "message")` or `require(condition)` — revert with optional message or custom error.
- `revert()` / `revert("message")` / `revert CustomError(args)` — abort and revert.
- `assert(condition)` — for invariants; should never fail. Uses `Panic` error in 0.8+.

Use custom errors instead of string messages for gas efficiency.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/control-structures.html
-->
