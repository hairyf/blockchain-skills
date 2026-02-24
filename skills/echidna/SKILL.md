---
name: echidna
description: Property-based fuzzing and assertion testing for Ethereum smart contracts with Echidna.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/crytic/echidna
---

> Skill is based on Echidna (crytic/echidna), generated from source at the listed date.

Echidna is a property-based fuzzer for Ethereum smart contracts. It generates random sequences of contract calls to falsify invariants (Solidity functions named with a prefix like `echidna_` that return bool) or to trigger Solidity `assert` failures. It supports coverage-guided fuzzing, corpus collection, multiple test modes, and integration with Foundry, Hardhat, and Truffle.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Invariants | Defining and running property invariants (echidna_ prefix, no args, return bool) | [core-invariants](references/core-invariants.md) |
| Configuration | YAML config (testMode, gas, coverage, corpus, workers, filtering) | [core-configuration](references/core-configuration.md) |
| CLI | Invocation, contract selection, output drivers (text, json, none) | [core-cli](references/core-cli.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Coverage and corpus | corpusDir, covered.txt, line markers, coverage reports | [features-coverage](references/features-coverage.md) |
| Build systems | Foundry, Hardhat, Truffle, echidna ., allContracts, solcLibs | [features-build-systems](references/features-build-systems.md) |
| Test modes | property, assertion, overflow, exploration, optimization | [features-test-modes](references/features-test-modes.md) |
| Function filtering | filterFunctions, filterBlacklist, whitelist/blacklist | [features-filtering](references/features-filtering.md) |
| Symbolic execution | symExec, SMT solver (cvc5, z3, bitwuzla), tuning options | [features-symbolic](references/features-symbolic.md) |
| FFI and cheatcodes | allowFFI, HEVM cheatcode support | [features-ffi-cheatcodes](references/features-ffi-cheatcodes.md) |

## Best practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Invariant patterns | Multi-sender, payable, gas/time, assertions vs invariants | [best-practices-invariants](references/best-practices-invariants.md) |

## Advanced

| Topic | Description | Reference |
|-------|-------------|-----------|
| JSON output | Campaign/Test/Transaction schema for CI and scripting | [advanced-json-output](references/advanced-json-output.md) |
| Debugging | Profiling (+RTS -p -s), common performance causes | [advanced-debugging](references/advanced-debugging.md) |
