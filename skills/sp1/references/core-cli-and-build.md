---
name: sp1-core-cli-and-build
description: cargo prove CLI, project creation, and building SP1 programs.
---

# SP1 CLI and Build

The `cargo prove` CLI is the main way to create projects, build programs, and run traces. Install via `sp1up` or from source with `cargo install --path crates/cli`.

## Create a project

```bash
cargo prove new --bare my-project
cd my-project
```

`--bare`: script + program only. Use `--evm` to also generate Solidity contracts for on-chain verification (requires Foundry; run `forge install` in `contracts/` after creation).

## Project layout

```text
.
├── program/           # zkVM program (RISC-V ELF)
│   ├── Cargo.toml
│   └── src/main.rs
├── rust-toolchain     # succinct toolchain for program
└── script/
    ├── Cargo.toml
    ├── build.rs       # builds program via sp1_build::build_program
    └── src/
        ├── main.rs
        └── bin/       # optional binaries (execute, prove, groth16, etc.)
```

The script’s `build.rs` typically calls:

```rust
fn main() {
    sp1_build::build_program("../program");
}
```

So the program ELF is built automatically when you build or run the script.

## Build the program

From the program directory:

```bash
cd program && cargo prove build
```

ELF is produced under `target/elf-compilation`. The script crate’s `build.rs` usually runs this so you don’t need to run it manually when developing.

## CLI development usage

```bash
# Run CLI from repo
cargo run --bin cargo-prove -- prove --help

# Run a subcommand (e.g. trace)
cargo run --bin cargo-prove -- prove trace --elf <path> --trace <path>
```

## Key points

- `cargo prove new --bare` or `--evm` creates the standard program/script layout.
- Program is built with the succinct toolchain; script uses `sp1_build::build_program` in `build.rs`.
- In monorepos, add the program’s `Cargo.toml` to `rust-analyzer.linkedProjects` for full IDE support.

<!--
Source references:
- https://docs.succinct.xyz/docs/sp1/getting-started/quickstart
- sources/sp1/crates/cli/README.md
- sources/sp1/crates/build/README.md
- sources/sp1/examples/fibonacci/script/build.rs
-->
