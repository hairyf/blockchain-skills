---
name: halo2-best-practices-floor-planning
description: Floor planning and circuit size in halo2_proofs
metadata:
  author: hairy
---

# Floor Planning and Circuit Size

The floor planner decides where each region is placed in the constraint table. Circuit size is determined by the number of rows (2^k); unused rows are padded.

## SimpleFloorPlanner

Default: places regions one after another in the order `assign_region` is called. No optimization across regions.

```rust
type FloorPlanner = SimpleFloorPlanner;
```

Use when:

- Circuit is small or regions are few.
- You want predictable layout for debugging.

## Choosing k

- **k** is the log of the maximum number of rows (e.g. `k = 4` ⇒ 16 rows).
- Circuit must use at most `2^k - (blinding_factors + 1)` rows for advice/instance; the rest are for the proof system.
- Pick the smallest k such that your circuit fits; larger k increases proof size and time.

```rust
let k = 4;
let prover = MockProver::run(k, &circuit, instance).unwrap();
// If verify() fails with "not enough rows", increase k.
```

## Regions and columns

- One **region** can use multiple columns and multiple rows; the floor planner assigns a starting row per region.
- Offsets inside a region are relative (0, 1, 2, …); do not assume absolute row numbers in chips.
- Reuse columns across regions (e.g. same advice column in many regions) to reduce total columns and help the backend.

## Custom floor planners

Implement `FloorPlanner::synthesize`: given the circuit’s `Config`, call `circuit.synthesize(config, &mut layouter)` once. Your layouter decides how `assign_region` maps to rows/columns. The **TracingFloorPlanner** (dev) can be used to inspect placement.

## Key points

- Start with `SimpleFloorPlanner`; switch only if you need better packing or custom layout.
- Use `MockProver::run(k, ...)` to confirm the circuit fits before keygen and proving.
- Fewer columns and reuse (same column, many regions) generally improve performance.

<!--
Source references:
- https://github.com/zcash/halo2
- halo2_proofs/src/plonk/circuit.rs (FloorPlanner)
- halo2_proofs/src/circuit/floor_planner/single_pass.rs, v1.rs
- halo2_proofs/src/dev/tfp.rs (TracingFloorPlanner)
-->
