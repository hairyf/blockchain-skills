---
name: sp1-core-proving-and-verification
description: ProverClient, execute, setup, prove, and verify with the SP1 SDK.
---

# SP1 Proving and Verification

Use the `sp1_sdk` crate and `ProverClient` to execute programs (no proof), generate proofs, and verify them. Prefer executing during development; prove when you need a proof or are testing the full pipeline.

## Client and execute (no proof)

```rust
use sp1_sdk::{include_elf, utils, ProverClient, SP1Stdin};

const ELF: &[u8] = include_elf!("fibonacci-program");

fn main() {
    utils::setup_logger();

    let mut stdin = SP1Stdin::new();
    stdin.write(&1000u32);

    let client = ProverClient::from_env();
    let (mut public_values, report) = client.execute(ELF, &stdin).run().unwrap();

    println!("cycles: {}", report.total_instruction_count());
    let a = public_values.read::<u32>();
    let b = public_values.read::<u32>();
}
```

`client.execute(ELF, &stdin).run()` runs the program in the RISC-V runtime and returns public values and an execution report (cycle counts, etc.). No proof is generated—use this to iterate quickly.

## Setup and prove

```rust
let (pk, vk) = client.setup(ELF);
let proof = client.prove(&pk, &stdin).plonk().run().unwrap();
// or: .groth16().run().unwrap()
```

- `setup(elf)`: produce proving key `pk` and verification key `vk` for that ELF. Call once per program (or cache keys).
- `prove(&pk, &stdin)`: returns a builder; choose proof format (e.g. `.plonk()` or `.groth16()`) then `.run()`.

## Verify

```rust
client.verify(&proof, &vk).expect("verification failed");
```

Verification checks the proof and that the committed public values match. Read outputs from `proof.public_values` in the same order as `commit` in the program.

## Proof serialization

```rust
proof.save("proof-with-pis.bin").expect("saving proof failed");
let loaded = SP1ProofWithPublicValues::load("proof-with-pis.bin").unwrap();
client.verify(&loaded, &vk).expect("verification failed");
```

## Key points

- Use `ProverClient::from_env()`; it respects `SP1_PROVER` (e.g. for prover network or CPU).
- Initialize the client once and reuse it; setup and loading can be slow.
- For large programs, run with `--execute` only during dev to avoid proving every run; prove only when needed or in CI.

<!--
Source references:
- https://docs.succinct.xyz/docs/sp1/getting-started/quickstart
- sources/sp1/examples/fibonacci/script/src/main.rs
- sources/sp1/examples/fibonacci/script/bin/execute.rs
- sources/sp1/crates/sdk/src/cpu/mod.rs
- sources/sp1/crates/sdk/src/env/mod.rs
-->
