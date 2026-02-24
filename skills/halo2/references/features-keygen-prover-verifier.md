---
name: halo2-features-keygen-prover-verifier
description: Key generation, proof creation, and verification in halo2_proofs
metadata:
  author: hairy
---

# Key Generation, Prover, and Verifier

Generate proving/verifying keys from a circuit, create proofs with witnesses, and verify proofs with public inputs.

## Parameters

Use a curve that implements the halo2 backend (e.g. Pasta, BN256). Parameters are tied to circuit size `k` (number of rows ≤ 2^k):

```rust
use halo2_proofs::poly::commitment::Params;

let params = Params::new(k); // or load from file / Params::read
```

## Key generation

```rust
use halo2_proofs::plonk::{keygen_vk, keygen_pk, ProvingKey, VerifyingKey};

let vk = keygen_vk(&params, &circuit).expect("keygen_vk");
let pk = keygen_pk(&params, vk.clone(), &circuit).expect("keygen_pk");
```

- **`keygen_vk`**: Build verifying key from params and circuit (uses `Circuit::configure` and a dummy synthesis).
- **`keygen_pk`**: Build proving key from params, vk, and circuit. Circuit is typically `without_witnesses()` or default.

## Creating a proof

```rust
use halo2_proofs::plonk::create_proof;
use halo2_proofs::transcript::{Blake2bWrite, Challenge255, TranscriptWriterBuffer};

let mut rng = rand::thread_rng();
let circuit = MyCircuit { a: Value::known(a), b: Value::known(b) };
let instances = &[&[&[public_inputs][..]][..]]; // one circuit, one instance set

let mut transcript = Blake2bWrite::<_, _, Challenge255<_>>::init(vec![]);
create_proof(&params, &pk, &[circuit], instances, rng, &mut transcript)?;
let proof = transcript.finalize();
```

- **`instances`**: `&[&[&[F]]]` — per circuit, per instance column, list of public values. Must match `num_instance_columns` and be zero-padded to the expected length if needed.
- **Transcript**: Backend-specific; must match verifier (e.g. `Blake2bWrite` + `Challenge255`).

## Verifying

```rust
use halo2_proofs::plonk::verify_proof;

verify_proof(&params, pk.get_vk(), &[instances], &proof)?;
```

- **`instances`**: Same shape as at proving time (e.g. `&[&[&[F]]]` for one circuit and its instance columns).
- Verification is deterministic given params, vk, instances, and proof.

## Key points

- Use the same `k` (and params) for keygen, proving, and verifying; circuit must fit in 2^k rows.
- Public inputs are passed as `instances` and must match the cells constrained via `constrain_instance`.
- Proving key holds the verifying key; use `pk.get_vk()` when you only need to verify.

<!--
Source references:
- https://github.com/zcash/halo2
- halo2_proofs/src/plonk/keygen.rs (keygen_vk, create_proving_key)
- halo2_proofs/src/plonk/prover.rs (create_proof)
- halo2_proofs/src/plonk/verifier.rs (verify_proof)
-->
