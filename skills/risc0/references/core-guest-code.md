---
name: risc0 guest code
description: Writing zkVM guest programs—env APIs, entry macro, no_std, reading/writing and committing.
---

# Guest Code

The **guest** is the code executed and proven inside the zkVM. It runs in a RISC-V (riscv32im) environment with a restricted runtime.

## Boilerplate

```rust
#![no_std]
#![no_main]

risc0_zkvm_guest::entry!(main);

fn main() {
    // read inputs, compute, commit outputs
}
```

- `#![no_std]` — No standard library for size/performance.
- `#![no_main]` — Guest is not a standalone binary.
- `risc0_zkvm_guest::entry!(main)` — Declares the guest entry point for the host.

## Reading inputs

- `env::read<T>()` — Deserialize one value from host (host uses `ExecutorEnv::builder().write(&t)`).
- `env::read_slice(bytes)` — Read raw bytes (no deserialization).
- `env::stdin()` — Byte-oriented input (e.g. `stdin().read_to_end(&mut vec)`).

## Writing to host (private)

- `env::write(&t)`, `env::write_slice`, `env::stdout()`, `env::stderr()` — Send data to host only; not in the receipt.

## Committing to journal (public)

- `env::commit(&t)` — Commit a value to the journal (public output).
- `env::commit_slice(slice)` — Commit raw bytes.

Only journal data is part of the receipt and visible to verifiers.

## Debugging and measurement

- `env::cycle_count()` — Current execution cycles (for optimization).
- `env::log(msg)` — Debug logging.

Use the `risc0_zkvm::guest::env` module; see [docs.rs/risc0-zkvm](https://docs.rs/risc0-zkvm) for the full guest API.

<!--
Source references:
- sources/risc0/website/api_versioned_docs/version-3.0/zkvm/guest-code-101.md
-->
