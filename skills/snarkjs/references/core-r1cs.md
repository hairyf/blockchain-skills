---
name: snarkjs R1CS inspection
description: Inspect and export R1CS (constraint system) from circom-compiled circuits.
metadata:
  author: hairy
---

# R1CS (constraint system)

snarkjs operates on R1CS produced by [circom](https://github.com/iden3/circom). Use these commands to inspect and export the constraint system.

## CLI

**Circuit info** (curve, wire count, constraints, inputs/outputs):

```sh
snarkjs r1cs info circuit.r1cs
```

Example output: `# of Wires`, `# of Constraints`, `# of Private Inputs`, `# of Public Inputs`, `# of Outputs`.

**Print constraints** (human-readable with symbol file):

```sh
snarkjs r1cs print circuit.r1cs circuit.sym
```

**Export to JSON** (for tooling or debugging):

```sh
snarkjs r1cs export json circuit.r1cs circuit.r1cs.json
```

## Key points

- Generate `circuit.r1cs` and `circuit.sym` with circom: `circom circuit.circom --r1cs --wasm --sym`.
- Constraint count must not exceed the power used in the ptau (e.g. 2^14 for power 14).
- Use `r1cs info` to confirm curve and dimensions before running setup or proving.

<!--
Source references:
- https://github.com/iden3/snarkjs (README.md)
-->
