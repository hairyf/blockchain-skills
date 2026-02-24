---
name: halo2-features-lookup-tables
description: Lookup arguments and table assignment in halo2_proofs
metadata:
  author: hairy
---

# Lookup Tables

Lookup arguments constrain that values in advice (or other) columns appear in a fixed table. Tables are assigned via `TableLayouter`; the constraint is declared in `ConstraintSystem::lookup`.

## Declaring a lookup

In `Circuit::configure`:

```rust
let table_col = meta.lookup_table_column();
meta.enable_equality(advice_col); // if advice is used in the lookup input

meta.lookup(|meta| {
    let a = meta.query_advice(advice_col, Rotation::cur());
    vec![(a, table_col)]
});
```

- **Input**: One or more `Expression<F>` (e.g. from `query_advice`). Must not contain a simple selector.
- **Table**: One or more `TableColumn`; each pair `(input_expr, table_column)` means “input must appear in that table column”.

## Filling the table

Tables are filled in `synthesize` using the layouter’s table API. The default layouter provides `assign_table` (or equivalent) that gives a `TableLayouter`:

```rust
layouter.assign_table(|| "my_table", |mut table| {
    for (i, value) in table_values.iter().enumerate() {
        table.assign_cell(|| "cell", table_col, i, || Value::known(Assigned::from(*value)))?;
    }
    Ok(())
})?;
```

- Table columns are assigned starting at row 0; the same table column must not be used in more than one `assign_table` (or equivalent) scope for the same table.
- Row 0 is often used as a default; the rest are the allowed values for the lookup.

## Multiple columns and multiple lookups

- One lookup can have multiple pairs: `vec![(a, t1), (b, t2)]` constrains `a` in table `t1` and `b` in table `t2`.
- You can call `meta.lookup` multiple times for different lookup arguments.

## Key points

- **`TableColumn`** is created with `meta.lookup_table_column()` and used both in `meta.lookup(...)` and in `assign_cell` on the table layouter.
- Input expressions to lookup must not contain a simple selector; use rotations (e.g. `Rotation::cur()`) as needed.
- Table assignment is fixed at synthesis time; ensure the table contains all values the prover will use for the lookup inputs.

<!--
Source references:
- https://github.com/zcash/halo2
- halo2_proofs/src/plonk/circuit.rs (lookup, lookup_table_column)
- halo2_proofs/src/circuit/table_layouter.rs (TableLayouter, assign_cell)
- halo2_proofs/src/plonk/lookup/
-->
