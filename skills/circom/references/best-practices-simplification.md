---
name: best-practices-simplification
description: When to use --O0, --O1, --O2; PLONK vs Groth16; large circuits and --O2round.
---

# Constraint Simplification

- **`--O1`** (default): Removes simple equalities (signal = constant, signal = signal). Use for **PLONK**; full linear simplification (--O2) is not compatible with PLONK.
- **`--O2`**: Applies Gauss elimination to remove linear constraints; can greatly reduce constraint count and proof cost for **Groth16**. Compilation is slower and uses more memory; for very large circuits it can run for a long time or OOM. Prefer using **`--O2`** only in later stages or with **`--O2round N`** to cap rounds.
- **`--O0`**: No simplification; useful for debugging or when you need to preserve every constraint.

Use **`--simplification_substitution`** to inspect which substitutions were applied (see simplification JSON format).

<!--
Source references:
- https://docs.circom.io/getting-started/compilation-options/
- https://docs.circom.io/circom-language/circom-insight/simplification/
- https://github.com/iden3/circom
-->
