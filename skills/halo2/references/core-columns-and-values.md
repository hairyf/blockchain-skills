---
name: halo2-core-columns-and-values
description: Column types, Value, Assigned, AssignedCell, and Rotation in halo2_proofs
metadata:
  author: hairy
---

# Columns and Values

Column kinds, the `Value` and `Assigned` types for optional/witness data, and `AssignedCell` for in-circuit references.

## Column types

- **`Column<Advice>`**: Witness column; prover fills during synthesis. Use for private inputs and intermediate values.
- **`Column<Fixed>`**: Same for all proofs; used for selector polynomials (after compression) and constants.
- **`Column<Instance>`**: Public inputs; verifier provides; constrain with `layouter.constrain_instance(cell, instance_col, row)`.
- **`TableColumn`**: For lookup tables; assigned via `TableLayouter::assign_cell`; refer to same column in `meta.lookup_table_column()` and in the table layouter.

Columns are created in `ConstraintSystem` during `configure` and stored in circuit/chip config.

## Value\<T\>

Used when the value might be unknown (e.g. during keygen):

```rust
use halo2_proofs::circuit::Value;

// Known witness (e.g. during proving)
let v = Value::known(field_element);

// Unknown (e.g. during keygen or dummy runs)
let v = Value::unknown();

// Map and combine
let out = a.zip(b).map(|(a, b)| a * b);
```

Use `Value` in `assign_advice(..., || value)` and in circuit structs that hold optional witnesses.

## Assigned\<F\>

Represents a field element that may be stored as a fraction (for batch inversion):

- **`Assigned::Zero`**
- **`Assigned::Trivial(f)`**
- **`Assigned::Rational(num, denom)`** (denom zero is treated as zero)

Used inside regions and in `Value<Assigned<F>>` for assignment callbacks.

## AssignedCell\<V, F\>

A cell that has been assigned and optionally constrained:

```rust
let cell: AssignedCell<F, F> = region.assign_advice(|| "a", col, 0, || self.a)?;

// Copy value to another cell and constrain equality
let copied = cell.copy_advice(|| "copy", &mut region, other_col, 0)?;

// Expose as public
layouter.constrain_instance(cell.cell(), instance_col, row)?;
```

- **`cell.cell()`**: Get the `Cell` (region index, row offset, column) for equality/instance constraints.
- **`cell.value()`**: Get `Value<&V>`; use `value_field()` when `V` converts to `Assigned<F>`.

## Rotation

Row offset relative to “current” row in gate/lookup expressions:

- **`Rotation::cur()`**: 0
- **`Rotation::next()`**: 1
- **`Rotation::prev()`**: -1
- **`Rotation(i)`**: Arbitrary offset

Used in `meta.query_advice(column, Rotation::cur())` and similar in `create_gate` / `lookup`.

## Key points

- Use `Value` for any witness that might be missing (keygen vs prove).
- Use `AssignedCell` when you need to reference a cell for constraints or copying; use `cell.cell()` for `constrain_equal` / `constrain_instance`.
- Gate expressions use `Rotation` to refer to rows; more distinct rotations can increase cost.

<!--
Source references:
- https://github.com/zcash/halo2
- halo2_proofs/src/plonk/assigned.rs (Assigned)
- halo2_proofs/src/circuit/value.rs (Value)
- halo2_proofs/src/circuit.rs (AssignedCell, Cell)
- halo2_proofs/src/poly/domain.rs (Rotation)
-->
