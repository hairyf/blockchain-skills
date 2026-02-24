---
name: halmos
description: Symbolic testing for EVM smart contracts with Halmos (Foundry-style tests, SMT solvers).
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/a16z/halmos
---

> Skill is based on Halmos (a16z/halmos), generated from source at the listed date.

Halmos is a symbolic testing tool for EVM smart contracts. It uses a Solidity/Foundry frontend: you write `check_` or `invariant_` tests like fuzz tests, and Halmos verifies them for all possible inputs (within bounds) via symbolic execution and an SMT solver. It supports symbolic constructor args, invariant testing over call sequences, and configurable solvers (Yices, cvc5, Bitwuzla).

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Symbolic testing | How symbolic tests differ from fuzz tests; check_ structure; vm.assume vs bound | [core-symbolic-testing](references/core-symbolic-testing.md) |
| CLI and config | Invocation, --contract/--function, halmos.toml, @custom:halmos annotations | [core-cli-config](references/core-cli-config.md) |
| setUp and cheatcodes | Symbolic constructor args; svm.createUint256, createAddress, createBytes; halmos-cheatcodes | [core-setup-cheatcodes](references/core-setup-cheatcodes.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Invariant testing | invariant_ prefix, --invariant-depth, frontier states, running invariants | [features-invariant-testing](references/features-invariant-testing.md) |
| Solver options | --solver (yices, cvc5, bitwuzla), timeouts, --solver-threads, --solver-command | [features-solver-options](references/features-solver-options.md) |

## Best practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Writing tests | assume vs bound, assertion Panic(1), revert checks, dynamic types | [best-practices-writing-tests](references/best-practices-writing-tests.md) |
