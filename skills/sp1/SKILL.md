---
name: sp1
description: SP1 zkVM—prove arbitrary Rust (RISC-V) programs with the SDK, CLI, recursion, and precompiles.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/succinctlabs/sp1, scripts at https://github.com/antfu/skills
---

> Skill based on SP1 (zkVM v6 Hypercube), generated from `sources/sp1`. Doc path: `sources/sp1/` (README, DEVELOPMENT.md, crates/*/README.md, examples), plus https://docs.succinct.xyz/docs/sp1 (introduction, quickstart, recommended-workflow).

SP1 is a zero-knowledge virtual machine that proves correct execution of RISC-V programs. Write provable logic in Rust (or other LLVM→RISC-V languages), build an ELF with the succinct toolchain, and use the SDK to execute, prove, and verify. No custom circuits; use Plonk or Groth16 proofs, recursion for aggregation, and precompiles to extend the zkVM.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Overview | Program vs script, ELF, entrypoint, project layout | [core-overview](references/core-overview.md) |
| Program I/O | read, commit, SP1Stdin, public values | [core-program-io](references/core-program-io.md) |
| CLI and build | cargo prove new/build, project structure | [core-cli-and-build](references/core-cli-and-build.md) |
| Proving and verification | ProverClient, execute, setup, prove, verify | [core-proving-and-verification](references/core-proving-and-verification.md) |

## Features

### Proof formats and verification

| Topic | Description | Reference |
|-------|-------------|-----------|
| Proof formats | Plonk, Groth16, compressed; bytes for Solidity | [features-proof-formats](references/features-proof-formats.md) |
| Recursion | Verifying proofs in the zkVM, aggregation | [features-recursion](references/features-recursion.md) |

### Extending the zkVM

| Topic | Description | Reference |
|-------|-------------|-----------|
| Precompiles | Adding custom chips (syscall, MachineAir, AIR) | [features-precompiles](references/features-precompiles.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Workflow | Execute-only during dev, reuse client, crate layout, prover network | [best-practices-workflow](references/best-practices-workflow.md) |
