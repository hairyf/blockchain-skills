---
name: sp1-features-recursion
description: Verifying SP1 proofs inside the zkVM and proof aggregation.
---

# SP1 Recursion

You can verify SP1 proofs inside another zkVM program (recursion). That allows aggregating many proofs into one, or building proof chains.

## Verifying a proof in the zkVM

Inside the zkVM program, use the verifier from `sp1_zkvm::lib::verify`:

```rust
#![no_main]
sp1_zkvm::entrypoint!(main);

use sha2::{Digest, Sha256};

pub fn main() {
    let vkey = sp1_zkvm::io::read::<[u32; 8]>();
    let public_values = sp1_zkvm::io::read::<Vec<u8>>();
    let digest = Sha256::digest(&public_values);
    sp1_zkvm::lib::verify::verify_sp1_proof(vkey, &digest.into());
    // If we get here, the proof was valid; commit aggregated result, etc.
    sp1_zkvm::io::commit_slice(&digest);
}
```

The recursion program receives the verification key and the committed public values (or their digest) and verifies the proof. The vkey and public values must match what the outer prover produced.

## Aggregation pattern

A typical aggregation program:

1. Reads a list of (vkey, public_values) pairs (from previous proofs).
2. Verifies each with `verify_sp1_proof(vkey, &public_values_digest)`.
3. Combines the results (e.g. Merkle root of (vkey, public_values)) and commits that.

See `examples/aggregation/program`: it reads vkeys and public values, verifies each proof, builds a Merkle tree over (vkey, public_value) leaves, and commits the root.

## Debugging recursion

Recursion runs in a separate runtime. On panic you may see a `TRAP` error. For a backtrace:

```bash
RUST_BACKTRACE=1 RUSTFLAGS="-g" SP1_DEBUG=true cargo test ...
```

## Key points

- Use `verify_sp1_proof(vkey, &digest)` in the zkVM; the digest is over the public values the proof commits to.
- Aggregation = many proofs → one recursion program that verifies each and commits a single aggregate (e.g. root).
- Recursion crate and tests live under `crates/recursion`; see README for recursion-specific build/test.

<!--
Source references:
- sources/sp1/examples/aggregation/program/src/main.rs
- sources/sp1/crates/recursion/README.md
- sources/sp1/crates/zkvm (verify API)
-->
