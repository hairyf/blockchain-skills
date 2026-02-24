---
name: halo2-core-circuit-api
description: Circuit trait, configure, synthesize, and floor planner in halo2_proofs
metadata:
  author: hairy
---

# Circuit API

Define a PLONK circuit by implementing the `Circuit<F>` trait. The backend uses `configure` to learn the constraint system and `synthesize` to fill in witnesses.

## Trait definition

```rust
use halo2_proofs::plonk::{Circuit, ConstraintSystem, Error};

pub trait Circuit<F: Field> {
    type Config: Clone;
    type FloorPlanner: FloorPlanner;

    fn without_witnesses(&self) -> Self;
    fn configure(meta: &mut ConstraintSystem<F>) -> Self::Config;
    fn synthesize(&self, config: Self::Config, layouter: impl Layouter<F>) -> Result<(), Error>;
}
```

- **`without_witnesses`**: Return a copy of the circuit with no witness values (e.g. `Self::default()`). Used during key generation when no private inputs exist.
- **`configure`**: Describe gates, columns, lookups, and equality; return a `Config` that stores column and selector references for use in `synthesize`.
- **`synthesize`**: Assign advice/fixed/instance cells and enable selectors using the layouter. Called once per proof with the actual witness.

## Usage

```rust
use ff::Field;
use halo2_proofs::{
    circuit::{Layouter, SimpleFloorPlanner, Value},
    plonk::{Advice, Circuit, Column, ConstraintSystem, Error, Selector},
    poly::Rotation,
};

#[derive(Default)]
struct MyCircuit<F: Field> {
    a: Value<F>,
    b: Value<F>,
}

impl<F: Field> Circuit<F> for MyCircuit<F> {
    type Config = (Column<Advice>, Column<Advice>, Selector);
    type FloorPlanner = SimpleFloorPlanner;

    fn without_witnesses(&self) -> Self {
        Self::default()
    }

    fn configure(meta: &mut ConstraintSystem<F>) -> Self::Config {
        let a = meta.advice_column();
        let b = meta.advice_column();
        meta.enable_equality(a);
        meta.enable_equality(b);
        let s = meta.selector();
        meta.create_gate("my_gate", |meta| {
            let a = meta.query_advice(a, Rotation::cur());
            let b = meta.query_advice(b, Rotation::cur());
            let s = meta.query_selector(s);
            vec![s * (a * b - meta.query_advice(b, Rotation::next()))]
        });
        (a, b, s)
    }

    fn synthesize(&self, config: Self::Config, mut layouter: impl Layouter<F>) -> Result<(), Error> {
        let (a, b, s) = config;
        layouter.assign_region(|| "region", |mut region| {
            s.enable(&mut region, 0)?;
            region.assign_advice(|| "a", a, 0, || self.a)?;
            region.assign_advice(|| "b", b, 0, || self.b)?;
            region.assign_advice(|| "b_next", b, 1, || self.a * self.b)?;
            Ok(())
        })
    }
}
```

## Key points

- Config is created once in `configure` and reused in `synthesize`; store columns and selectors there.
- Use `Value::known(x)` for witnesses during proving and `Value::unknown()` (or omit) when witnesses are not available (e.g. keygen).
- `FloorPlanner` controls how regions are placed in the table; `SimpleFloorPlanner` is the default and places regions sequentially.

<!--
Source references:
- https://github.com/zcash/halo2
- halo2_proofs/src/plonk/circuit.rs (Circuit, FloorPlanner)
- halo2_proofs/examples/simple-example.rs
-->
