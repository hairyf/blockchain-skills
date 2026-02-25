---
name: solidity-smtchecker
description: SMTChecker and formal verification — engines, targets, options, assertions.
---

# SMTChecker and Formal Verification

The SMTChecker performs automated proofs that code satisfies specifications given by `require` (assumptions) and `assert` (properties to prove). It also checks: arithmetic underflow/overflow (opt-in for >=0.8.7), division by zero, trivial/unreachable code, pop empty array, out-of-bounds access, insufficient balance for transfer.

## Enabling

Select an engine via CLI or Standard JSON. Default is no engine.

- **CLI:** `--model-checker-engine {all,bmc,chc,none}`
- **JSON:** `settings.modelChecker.engine`: `"all"` | `"bmc"` | `"chc"` | `"none"`

Engines: **BMC** (bounded, per-function, no multi-transaction) and **CHC** (Horn clauses, full contract lifecycle, supports loops). Both can run; CHC runs first, unproved properties go to BMC.

## Verification targets

- **CLI:** `--model-checker-targets "assert,underflow,overflow,divByZero,constantCondition,popEmptyArray,outOfBounds,balance"`
- **JSON:** `settings.modelChecker.targets`: array of those strings. Use `"default"` (CLI only) for all.

For Solidity >=0.8.7, underflow/overflow are **not** checked by default; add `"underflow"` and `"overflow"` explicitly if needed.

## Common options

- **Timeout:** `--model-checker-timeout <ms>` or `settings.modelChecker.timeout` (0 = no timeout).
- **Show proved/unproved/unsupported:** `--model-checker-show-proved-safe`, `--model-checker-show-unproved`, `--model-checker-show-unsupported` (or JSON equivalents).
- **Contracts to verify:** `--model-checker-contracts "source.sol:ContractName"` or `settings.modelChecker.contracts`: `{"source.sol": ["ContractName"]}` — only analyze those as deployed; reduces workload.
- **Trusted external calls:** `--model-checker-ext-calls=trusted` or `settings.modelChecker.extCalls: "trusted"` — assume external contract at an address matches compile-time type (use with care; can be unsound).
- **Solvers:** `--model-checker-solvers {all,cvc5,eld,smtlib2,z3}` or `settings.modelChecker.solvers` array. Default `z3` is usually sufficient.

## Usage patterns

- Use `require` for preconditions; SMTChecker treats them as assumptions.
- Use `assert` for invariants; SMTChecker tries to prove they never fail.
- For overflow checks (>=0.8.7): add `require(x < type(uint128).max);` etc., or enable `overflow`/`underflow` targets.
- Complex pure functions (e.g. `ecrecover`) are abstracted as uninterpreted functions; assertions about equal inputs giving equal outputs can still be proved.
- Reentrancy: external calls are treated as unknown; use modifiers (e.g. mutex) so the checker can infer invariants across calls.

## Warnings

- "might happen here" = solver could not prove either way (timeout or too hard).
- "happens here" = proven failure; a counterexample may be given.
- Unsupported features (e.g. assembly) are over-approximated; can cause false positives, never false negatives for proved properties.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/smtchecker.html
-->
