---
name: sp1-introduction
description: What SP1 is, why use it, and how it fits into ZK development.
---

# SP1 Introduction

SP1 is a zero-knowledge virtual machine (zkVM) that proves correct execution of programs compiled for RISC-V. Programs can be written in Rust, C++, C, or any language that targets RISC-V. No custom circuits or crypto expertise are required: write normal code, compile, and generate a proof.

## Why Use SP1

- **Maintainability**: Standard Rust (with `std`), no custom DSLs. Easier to audit and evolve.
- **Faster development**: Avoid low-level ZK engineering; go from idea to mainnet sooner.
- **Performance**: State-of-the-art proving speed; production-ready and audited.

SP1 is open source (MIT/Apache 2.0) with both prover and verifier implementations. V6 introduces Hypercube, a multilinear proof system with improved performance and recursion.

## Key Concepts

- **zkVM**: The program runs in a RISC-V environment; the prover produces a ZK proof of that execution.
- **ELF**: The proven artifact is a RISC-V executable (ELF). Build with the `succinct` Rust toolchain via `cargo prove build`.
- **Program vs script**: The **program** crate runs inside the zkVM; the **script** crate runs on the host and performs setup, proving, and verification.

<!--
Source references:
- https://docs.succinct.xyz/docs/sp1/introduction
- https://github.com/succinctlabs/sp1 (README.md)
-->
