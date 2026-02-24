---
name: halo2-features-mock-prover
description: MockProver for debugging circuits without full proving in halo2_proofs
metadata:
  author: hairy
---

# Mock Prover

`MockProver` runs the circuit with concrete values and checks all constraints locally. Use it to debug constraint violations without generating real proofs.

## Basic usage

```rust
use halo2_proofs::dev::MockProver;

let k = 4; // circuit size 2^k
let circuit = MyCircuit { a: Value::known(a), b: Value::known(b) };
let public_inputs = vec![expected_public];

let prover = MockProver::run(k, &circuit, vec![public_inputs]).unwrap();

assert_eq!(prover.verify(), Ok(()));
```

- **`MockProver::run(k, circuit, instances)`**: `instances` is `Vec<Vec<F>>` (one vec per instance column). Same shape as the `instances` argument to `create_proof`.
- **`prover.verify()`**: Returns `Ok(())` if all constraints and lookups pass, or `Err(Vec<VerifyFailure>)` with failure details.

## Interpreting failures

```rust
if let Err(failures) = prover.verify() {
    for f in failures {
        println!("{:?}", f);
    }
}
```

Common `VerifyFailure` variants:

- **`ConstraintNotSatisfied`**: A gate polynomial was non-zero (gate name, column, row).
- **`Lookup`**: A lookup input was not in the table (lookup name, row, etc.).
- **`Permutation`**: A permutation constraint failed (column, row).
- **`CellNotAssigned`**: A cell was used but never assigned.

Use these to locate the exact constraint or cell that failed.

## When to use

- After changing gates or assignments: run `MockProver` before spending time on full proving.
- To check that a circuit rejects bad inputs: pass wrong public inputs or wrong witness and assert `prover.verify().is_err()`.
- No params or keys needed; only the circuit and instance/public inputs.

## Key points

- Use the same `k` as you will use for real params; circuit must fit in 2^k rows.
- Instance list must match `constrain_instance` usage (one vec per instance column, correct length).
- MockProver is in the `dev` module and may not be enabled in all feature sets; typically available with default features.

<!--
Source references:
- https://github.com/zcash/halo2
- halo2_proofs/src/dev.rs (MockProver, VerifyFailure)
- halo2_proofs/examples/simple-example.rs
-->
