---
name: sp1-features-proof-formats
description: Plonk, Groth16, and compressed proofs; bytes for Solidity.
---

# SP1 Proof Formats

SP1 supports multiple proof backends. Choose based on verification context: on-chain (Groth16 often preferred for size/speed), in-SDK verification, or compressed/recursive proofs.

## Plonk (default)

```rust
let proof = client.prove(&pk, &stdin).plonk().run().unwrap();
client.verify(&proof, &vk).expect("verification failed");
```

Plonk proofs are verified natively in the SDK. Good for development and when you don’t need an on-chain verifier.

## Groth16 (EVM-friendly)

```rust
let proof = client.prove(&pk, &stdin).groth16().run().unwrap();

// On-chain: use proof bytes and vk
let solidity_proof = proof.bytes();
let public_values_bytes = proof.public_values.as_slice();
// Pass to Solidity verifier contract

// SDK verify
client.verify(&proof, &vk).expect("verification failed");
proof.save("proof.bin").expect("save failed");
```

Groth16 proofs are short and fast to verify on EVM. Use `proof.bytes()` and the verifying key (e.g. `vk.bytes32()`) with the contract. The `sp1-verifier` crate and pre-generated BN254 verification keys are used for both Groth16 and Plonk.

## Compressed / recursion

For aggregation or recursion, proofs can be compressed or used as subproofs inside another program. The recursion program runs in the zkVM and verifies SP1 proofs via `sp1_zkvm::lib::verify::verify_sp1_proof`; see the recursion/aggregation examples and the recursion crate README.

## Key points

- **Plonk**: default, SDK verify only.
- **Groth16**: use for EVM verification; `proof.bytes()` and public values for the contract.
- Verification keys for Groth16/Plonk live in `sp1-verifier` (bn254-vk) and in `~/.sp1/circuits/` after setup.

<!--
Source references:
- sources/sp1/examples/fibonacci/script/bin/groth16_bn254.rs
- sources/sp1/examples/fibonacci/script/src/main.rs
- sources/sp1/crates/verifier/README.md
- sources/sp1/crates/sdk/CHANGELOG.md
-->
