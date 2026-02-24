---
name: sp1-core-program-io
description: Program I/O in the zkVM—read, commit, SP1Stdin, and public values.
---

# SP1 Program I/O

Programs running in the zkVM read inputs from the prover and expose outputs as public values. Types must match between script (writer) and program (reader).

## Reading input in the program

Use `sp1_zkvm::io::read` and `sp1_zkvm::io::read_vec` for typed input:

```rust
#![no_main]
sp1_zkvm::entrypoint!(main);

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct MyPoint {
    pub x: usize,
    pub y: usize,
}

pub fn main() {
    let n: u32 = sp1_zkvm::io::read();
    let point: MyPoint = sp1_zkvm::io::read();
    let bytes: Vec<u8> = sp1_zkvm::io::read_vec();
    // use n, point, bytes...
}
```

Any type that implements `Deserialize` (e.g. via Serde) can be read. Order and types must match what the script writes to `SP1Stdin`.

## Committing public values

Public values are the program’s attested output. Commit them so the verifier (and script) can read them:

```rust
sp1_zkvm::io::commit(&value);           // single value (Serialize)
sp1_zkvm::io::commit_slice(&[u8]);       // raw bytes
```

Only committed data is part of the public input to the proof; the rest is private.

## Writing input from the script

Build `SP1Stdin` and write in the same order the program reads:

```rust
use sp1_sdk::{SP1Stdin, ProverClient, include_elf};

let mut stdin = SP1Stdin::new();
stdin.write(&1000u32);
stdin.write(&my_struct);
stdin.write_vec(&byte_vec);

let client = ProverClient::from_env();
let (_, report) = client.execute(ELF, &stdin).run().unwrap();
```

## Reading public values in the script

After execution or after proving, read public values in the same order they were committed:

```rust
let (mut public_values, _) = client.execute(ELF, &stdin).run().unwrap();
// or from proof:
// let public_values = &proof.public_values;

let _ = public_values.read::<u32>();  // skip first (e.g. n)
let a = public_values.read::<u32>();
let b = public_values.read::<u32>();
```

## Key points

- `read` / `read_vec` in program ↔ `write` / `write_vec` in script; use the same types and order.
- `commit` / `commit_slice` define the public output; verifier checks these.
- Use Serde-compatible types for structured I/O; keep the program’s main thin and delegate to a library crate for testability.

<!--
Source references:
- https://docs.succinct.xyz/docs/sp1/getting-started/quickstart
- sources/sp1/examples/fibonacci/program/src/main.rs
- sources/sp1/examples/io/program/src/main.rs
- sources/sp1/examples/fibonacci/script/src/main.rs
-->
