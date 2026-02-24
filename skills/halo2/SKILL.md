---
name: halo2
description: Skills for building and debugging PLONK circuits with halo2_proofs (zcash/halo2)
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/zcash/halo2, scripts located at https://github.com/antfu/skills
---

> The skill is based on halo2 (halo2_proofs) at the version recorded in GENERATION.md, generated at 2026-02-24.

halo2 is a Rust library for building PLONK-based zero-knowledge proofs. The main crates are **halo2_proofs** (circuit API, keygen, prover, verifier) and **halo2_gadgets** (reusable gadgets). This skill focuses on agent-oriented usage: defining circuits, configuring constraints, assigning witnesses, and debugging with the mock prover.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Circuit API | Circuit trait, configure, synthesize, FloorPlanner | [core-circuit-api](references/core-circuit-api.md) |
| Constraint system | Columns, gates, equality, lookups | [core-constraint-system](references/core-constraint-system.md) |
| Chip and region | Chip trait, Region, Layouter, assign_region, copy_advice | [core-chip-and-region](references/core-chip-and-region.md) |
| Columns and values | Column types, Value, Assigned, AssignedCell, Rotation | [core-columns-and-values](references/core-columns-and-values.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Lookup tables | Lookup argument, TableColumn, TableLayouter | [features-lookup-tables](references/features-lookup-tables.md) |
| Keygen, prover, verifier | Params, keygen_vk/keygen_pk, create_proof, verify_proof | [features-keygen-prover-verifier](references/features-keygen-prover-verifier.md) |
| Mock prover | MockProver::run, verify(), VerifyFailure | [features-mock-prover](references/features-mock-prover.md) |
| Parallelism | RAYON_NUM_THREADS, multicore feature | [features-parallelism](references/features-parallelism.md) |

## Best practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Floor planning | SimpleFloorPlanner, choosing k, regions | [best-practices-floor-planning](references/best-practices-floor-planning.md) |
