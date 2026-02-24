---
name: sp1-core-overview
description: SP1 zkVM overview—program vs script, ELF, entrypoint, and project layout.
---

# SP1 Core Overview

SP1 is a zero-knowledge virtual machine (zkVM) that proves correct execution of RISC-V programs. You write provable logic in Rust (or other LLVM→RISC-V languages); the same code runs in the zkVM and produces a proof. No custom circuits or ZK DSLs.

## Program vs script

- **Program**: The code that runs *inside* the zkVM and is proven. Lives in the `program/` crate. Compiled to a RISC-V ELF with the `succinct` Rust toolchain.
- **Script**: Host-side code that builds the program, feeds inputs, runs the prover/verifier, and reads public values. Lives in the `script/` crate. Uses `sp1_sdk` and `include_elf!` to load the program ELF.

Program and script communicate via **stdin** (host → program) and **public values** (program → host, committed with `sp1_zkvm::io::commit`).

## Entrypoint

Programs must use the zkVM entrypoint macro and have no standard main:

```rust
#![no_main]
sp1_zkvm::entrypoint!(main);

pub fn main() {
    // provable logic here
}
```

The macro wraps `main` so it runs correctly inside the zkVM. Keep the program crate minimal; put most logic in a separate crate so you can unit test without the zkVM target.

## ELF and build

The program is built with `cargo prove build` (or via `script/build.rs` calling `sp1_build::build_program`). Output is an ELF in `target/elf-compilation`. The script loads it with:

```rust
const ELF: &[u8] = include_elf!("your-program-name");
```

Program crate name (in its `Cargo.toml`) must match the name passed to `include_elf!`.

## Key points

- SP1 proves arbitrary Rust (and other RISC-V-compilable) code; V6 uses the Hypercube proof system.
- MSRV: Rust 1.79.
- Prover and verifier are open source (MIT/Apache 2.0).

<!--
Source references:
- https://docs.succinct.xyz/docs/sp1/introduction
- https://docs.succinct.xyz/docs/sp1/getting-started/quickstart
- sources/sp1/README.md
- sources/sp1/crates/build/README.md
-->
