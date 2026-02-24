---
name: halo2-core-constraint-system
description: ConstraintSystem columns, gates, equality, and lookups in halo2_proofs
metadata:
  author: hairy
---

# Constraint System

`ConstraintSystem<F>` is built in `Circuit::configure` to declare columns, gates, and lookup arguments. All column and selector creation happens here; synthesis only assigns values.

## Column types

```rust
use halo2_proofs::plonk::{Advice, Column, ConstraintSystem, Fixed, Instance};

// Advice (witness) columns: prover fills these during synthesize
let advice = meta.advice_column();

// Fixed columns: same for all proofs (selectors get compiled here; constants go here too)
let fixed = meta.fixed_column();

// Instance column: public inputs; verifier provides these
let instance = meta.instance_column();

// For lookups: table columns (fixed at assignment time)
let table = meta.lookup_table_column();
```

## Enabling equality and constants

- **`meta.enable_equality(column)`**: Include column in the permutation argument so you can constrain equality between cells (e.g. `region.constrain_equal(a, b)` or `layouter.constrain_instance(...)`).
- **`meta.enable_constant(fixed_column)`**: Mark a fixed column as usable for constants; then use `region.assign_advice_from_constant` or the layouter’s constant API.

## Selectors and gates

```rust
use halo2_proofs::poly::Rotation;

let s_mul = meta.selector();

meta.create_gate("mul", |meta| {
    let lhs = meta.query_advice(advice[0], Rotation::cur());
    let rhs = meta.query_advice(advice[1], Rotation::cur());
    let out = meta.query_advice(advice[0], Rotation::next());
    let s = meta.query_selector(s_mul);
    // Constraint: when s = 1, lhs * rhs = out
    vec![s * (lhs * rhs - out)]
});
```

- **`meta.selector()`**: Simple selector; enable per row with `selector.enable(&mut region, offset)`.
- **`meta.complex_selector()`**: For gates that need more than one selector value per row.
- **`create_gate(name, f)`**: `f` receives `VirtualCells` to build expressions; return a non-empty list of expressions (each must equal zero). Use `Rotation::cur()`, `next()`, `prev()` for row offsets.

## Lookups

```rust
meta.lookup(|meta| {
    let a = meta.query_advice(advice_col, Rotation::cur());
    vec![(a, table_column)]
});
```

- **`meta.lookup(name, table_map)`**: `table_map` returns `Vec<(Expression<F>, TableColumn)>`. Input expressions must not contain a simple selector. Table columns are filled via the layouter’s table API (`assign_cell` on a `TableLayouter`).

## Minimum degree

- **`meta.set_minimum_degree(degree)`**: Force a minimum circuit degree (e.g. for the permutation argument). Use when you need a larger degree than the gates imply.

## Key points

- Do not create columns or gates outside `configure`; the prover/verifier use the same constraint system from keygen.
- Equality must be enabled on any column used in `constrain_equal` or for public inputs.
- Gates are additive: all returned expressions are constrained to zero; use selectors so constraints only apply where intended.

<!--
Source references:
- https://github.com/zcash/halo2
- halo2_proofs/src/plonk/circuit.rs (ConstraintSystem, create_gate, lookup, enable_equality)
-->
