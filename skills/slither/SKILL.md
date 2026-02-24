---
name: slither
description: Solidity & Vyper static analysis—detectors, printers, Python API, SlithIR, and tools for security and code comprehension.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/crytic/slither, scripts at https://github.com/antfu/skills
---

> Skill based on Slither (slither-analyzer v0.11.5), generated from `sources/slither`. Doc path: `sources/slither/docs/src/` and repo README.

Slither is a Solidity and Vyper static analysis framework. It runs vulnerability detectors, prints contract structure (call graph, CFG, inheritance, SlithIR), and exposes a Python API and SlithIR for custom analyses. Use it to find bugs, understand code, and integrate into CI or scripts.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| CLI usage | Targets, detector/printer selection, path filter, triage, config | [core-usage](references/core-usage.md) |
| Python API | Slither, CompilationUnit, Contract, Function, Node—load and traverse | [core-api](references/core-api.md) |
| SlithIR and analysis | IR, SSA, when to use irs vs irs_ssa, data dependency | [core-slithir-and-analysis](references/core-slithir-and-analysis.md) |

## Features

### Detectors and printers

| Topic | Description | Reference |
|-------|-------------|-----------|
| Detectors | Built-in detectors, impact/confidence, custom detector plugin | [features-detectors](references/features-detectors.md) |
| Printers | Call graph, CFG, inheritance, SlithIR, function summary, etc. | [features-printers](references/features-printers.md) |

### Tools

| Topic | Description | Reference |
|-------|-------------|-----------|
| Built-in tools | slither-flat, slither-check-erc, slither-check-upgradeability, slither-mutate, slither-doc, slither-read-storage, etc. | [features-tools](references/features-tools.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Suppression and output | Inline/block suppress, triage, JSON/SARIF/checklist, config file | [best-practices-suppression-and-output](references/best-practices-suppression-and-output.md) |
