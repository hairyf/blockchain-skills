---
name: cairo
description: Cairo language and compiler—Rust-like syntax, Sierra/CASM pipeline, Starknet contracts, linear types, and tooling.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/starkware-libs/cairo, scripts at https://github.com/antfu/skills
---

> Skill based on Cairo (starkware-libs/cairo), generated from `sources/cairo`. Doc path: `sources/cairo/docs/reference/src/components/cairo/modules/`.

Cairo is a Turing-complete language for provable programs (Starknet, general computation). It uses a Rust-like syntax, Sierra as an intermediate representation, and compiles to CASM. Use this skill for writing and compiling Cairo programs and Starknet contracts, and for understanding types, traits, and linear semantics.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Modules and crates | Crates, modules, use, super, file layout | [core-modules-and-crates](references/core-modules-and-crates.md) |
| Functions | Signatures, mut/ref, methods, implicits, nopanic, local compilability | [core-functions](references/core-functions.md) |
| Structs and enums | Definitions, instantiation, destructuring, match | [core-structs-and-enums](references/core-structs-and-enums.md) |
| Traits and impls | Traits, named impls (of), impl generics, dispatch | [core-traits-and-impls](references/core-traits-and-impls.md) |
| Types and generics | Type system, generics, Array, Felt252Dict, fixed arrays | [core-types-and-generics](references/core-types-and-generics.md) |
| Linear types | Move, Copy, Drop, Destruct, Clone, snapshot (@) | [core-linear-types](references/core-linear-types.md) |
| Derive and prelude | Derive macro, common traits, prelude | [core-derive-and-prelude](references/core-derive-and-prelude.md) |

## Features

### Starknet

| Topic | Description | Reference |
|-------|-------------|-----------|
| Starknet contracts | Storage, entry points, events, ABI, dispatchers, syscalls | [features-starknet-contracts](references/features-starknet-contracts.md) |

### Tooling

| Topic | Description | Reference |
|-------|-------------|-----------|
| CLI and compilation | cairo-compile, sierra-compile, cairo-run, starknet-compile | [features-cli-and-compilation](references/features-cli-and-compilation.md) |
| Match and panic | Match (enum/felt252), panic, nopanic, panic_with | [features-match-and-panic](references/features-match-and-panic.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Naming and memory | Conventions, struct copy semantics, array/dict patterns | [best-practices-naming-and-memory](references/best-practices-naming-and-memory.md) |
