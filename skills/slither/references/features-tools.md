---
name: slither-built-in-tools
description: CLI tools that ship with Slither: flatten, ERC check, mutator, upgradeability, doc, interface, storage.
---

# Slither Built-in Tools

Separate executables for specific tasks. Use when you need flattening, ERC conformance, mutation testing, upgradeability checks, or storage inspection.

## Common tools

| Command | Purpose |
|--------|--------|
| `slither-flat` | Flatten Solidity project into a single file (Etherscan verification, debugging). |
| `slither-check-erc` | Check ERC conformance (e.g. ERC20, ERC721): required functions and signatures. |
| `slither-check-upgradeability` | Analyze upgradeable/proxy contracts for common issues. |
| `slither-doctor` | Diagnose environment issues that prevent Slither from running. |
| `slither-mutate` | Mutation testing: generate mutants to measure test/detector effectiveness. |
| `slither-doc` | Generate documentation (inheritance, functions, modifiers). |
| `slither-interface` | Generate Solidity interfaces from contract implementations. |
| `slither-read-storage` | Read storage slots of deployed contracts. |
| `slither-prop` | Path finding and property generation (e.g. for fuzzers). |
| `slither-simil` | Code similarity (duplication, similar vulnerabilities). |
| `slither-format` | Apply automatic patches for some bugs. |

## When to use

- **CI / verification:** `slither-flat` for single-file verification; `slither-check-erc` for standard compliance.
- **Upgradeable contracts:** `slither-check-upgradeability` for proxy/storage layout issues.
- **Testing quality:** `slither-mutate` to see if tests/detectors catch simple mutations.
- **Debugging:** `slither-doctor` if runs fail; `slither-read-storage` for on-chain state.
- **Documentation:** `slither-doc`, `slither-interface` for generated docs/interfaces.

All tools accept the same kind of target as `slither` (directory, file, or Etherscan address when applicable).

<!--
Source references:
- sources/slither/docs/src/tools/README.md
-->
