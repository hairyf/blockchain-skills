---
name: circom
description: Agent-oriented reference for the circom language and compiler—circuits, constraints, signals, templates, compilation, and safety.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/iden3/circom (mkdocs/docs), scripts located at https://github.com/antfu/skills
---

> Skill is based on circom 2.x, generated at 2026-02-24.

circom is a domain-specific language and compiler for defining arithmetic circuits used in zero-knowledge proving systems (e.g. with snarkjs). Circuits are built from parameterized templates and components; the compiler outputs R1CS (and optionally WASM/C++ witness generators). This skill focuses on language semantics, constraint generation, and practical usage for agents.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Signals | Input/output/intermediate, assignment operators, public/private, immutability | [core-signals](references/core-signals.md) |
| Templates and components | Definition, instantiation, dot notation, arrays, parallel and custom templates | [core-templates-components](references/core-templates-components.md) |
| Constraint generation | Quadratic constraints, ===, <== vs <-- + === | [core-constraints](references/core-constraints.md) |
| Main component | Entry point, public input list, single main | [core-main-component](references/core-main-component.md) |
| Pragma and include | Version, custom_templates, include, -l | [core-pragma-include](references/core-pragma-include.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Operators | Field, boolean, relational, bitwise; precedence; conditional ? : | [features-operators](references/features-operators.md) |
| Control flow | if/for/while, known vs unknown conditions, instantiation order | [features-control-flow](references/features-control-flow.md) |
| Functions | Pure computations, no signals/constraints, return on every path | [features-functions](references/features-functions.md) |
| Variables and data types | var, arrays (known size), field and signal arrays | [features-variables-data-types](references/features-variables-data-types.md) |
| Anonymous components and tuples | Inline instantiation, multiple outputs, _, array <== | [features-anonymous-tuples](references/features-anonymous-tuples.md) |
| Tags | Signal tags (e.g. binary, maxbit), inheritance, valued tags | [features-tags](references/features-tags.md) |
| Buses | Struct-like signal groups, tagging, nested/parameterized, input format | [features-buses](references/features-buses.md) |
| Compilation | CLI flags (r1cs, wasm, c, sym, O0/O1/O2, prime, -l, inspect) | [features-compilation](references/features-compilation.md) |
| Scoping | Signals/components at top-level or known-condition if; var block scope | [features-scoping](references/features-scoping.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Signal safety | Prefer <==/==>; use <-- only when needed and add ===; use --inspect | [best-practices-signal-safety](references/best-practices-signal-safety.md) |
| Assert and log | Compile-time vs witness-time assert; log() for debugging | [best-practices-assert-log](references/best-practices-assert-log.md) |
| Known vs unknown | Signals unknown; constraints and indices under known control flow | [best-practices-unknowns](references/best-practices-unknowns.md) |
| Simplification | When to use O0/O1/O2; PLONK vs Groth16; large circuits | [best-practices-simplification](references/best-practices-simplification.md) |
