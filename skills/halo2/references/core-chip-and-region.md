---
name: halo2-core-chip-and-region
description: Chip trait, Region, Layouter, and assignment patterns in halo2_proofs
metadata:
  author: hairy
---

# Chip and Region

Chips encapsulate reusable constraint logic; regions are the scope in which advice/fixed cells and selectors are assigned. The layouter provides regions to the circuit’s `synthesize` implementation.

## Chip trait

```rust
use halo2_proofs::circuit::Chip;

pub trait Chip<F: Field>: Sized {
    type Config: Debug + Clone;
    type Loaded: Debug + Clone;

    fn config(&self) -> &Self::Config;
    fn loaded(&self) -> &Self::Loaded;
}
```

- **Config**: Built in `Circuit::configure`, stored in the chip, holds columns and selectors.
- **Loaded**: Optional state loaded at the start of synthesis (e.g. fixed data). Access via `Chip::load` in the layouter if needed.

Chips are constructed with `Config` (and optionally `Loaded`) and used inside `synthesize` to assign cells and enable selectors.

## Region operations

Inside `layouter.assign_region(|| "name", |mut region| { ... })`:

```rust
// Enable a selector at region-relative row offset
config.s_mul.enable(&mut region, 0)?;

// Assign advice (witness) cell
let cell = region.assign_advice(|| "label", config.advice[0], offset, || value)?;

// Assign constant into advice column (equality-constrained to constant)
region.assign_advice_from_constant(|| "constant", config.advice[0], 0, constant)?;

// Copy value from another cell and constrain equality (e.g. for cross-region wiring)
let b = a.copy_advice(|| "copy", &mut region, config.advice[1], 0)?;

// Constrain two cells to be equal
region.constrain_equal(cell_a.cell(), cell_b.cell())?;

// Expose a cell as public input (instance column)
layouter.constrain_instance(cell.cell(), config.instance, row)?;
```

- **Offsets** inside a region are relative (0, 1, 2, …). The floor planner assigns absolute rows; chips must not assume absolute positions.
- Use **`copy_advice`** or **`constrain_equal`** to wire values between regions or to instance column.

## Layouter

- **`assign_region`**: Run a closure that receives a `Region` and performs the assignments above. Multiple regions can be created; the floor planner places them.
- **`namespace`**: Wrap a sub-layouter for naming (e.g. `layouter.namespace(|| "load a", |layouter| { ... })`).
- **`constrain_instance`**: Bind an assigned cell to a given (instance column, row) for public inputs.

## Key points

- One region = one contiguous block of assignments; use multiple regions to let the floor planner reorder and pack.
- Selectors are enabled per region/offset; the same selector can be enabled in many regions.
- For cross-region equality, columns must have `enable_equality` and you must use `constrain_equal` or `copy_advice`.

<!--
Source references:
- https://github.com/zcash/halo2
- halo2_proofs/src/circuit.rs (Chip, Region, AssignedCell::copy_advice)
- halo2_proofs/src/circuit/layouter.rs (RegionLayouter, Layouter)
- halo2_proofs/examples/simple-example.rs
-->
