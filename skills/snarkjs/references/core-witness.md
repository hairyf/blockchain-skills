---
name: snarkjs Witness calculation
description: Compute and validate the witness (wire values) for an R1CS circuit from JSON input.
metadata:
  author: hairy
---

# Witness (wtns)

The witness is the vector of all wire values for a given input. snarkjs can calculate it from the circom-generated WASM and validate it against the R1CS.

## CLI

**Calculate witness** (input JSON → .wtns file):

```sh
snarkjs wtns calculate circuit_js/circuit.wasm input.json witness.wtns
```

**Check witness** against the circuit:

```sh
snarkjs wtns check circuit.r1cs witness.wtns
```

## Programmatic (Node)

```js
const snarkjs = require("snarkjs");

// input: object with signal names and values (numbers or decimal strings for bigints)
const input = { a: 3, b: 11 };
const wasmPath = "circuit_js/circuit.wasm";
const wtnsPath = "witness.wtns";

await snarkjs.wtns.calculate(input, wasmPath, wtnsPath);
// optional: { memorySize: 0 } to minimize initial allocation (e.g. browser)
await snarkjs.wtns.calculate(input, wasmPath, wtnsPath, { memorySize: 0 });
```

## Key points

- Input JSON: use **quoted numbers** for large integers to avoid JSON precision loss (e.g. `"a": "12345678901234567890"`).
- WASM is produced by circom with `--wasm`; the witness calculator is in `circuit_js/`.
- Alternative: run `node circuit_js/generate_witness.js circuit_js/circuit.wasm input.json witness.wtns` (circom output).
- For **fullProve** (witness + proof in one step), witness is computed internally; you pass `input.json` and `circuit.wasm` (Groth16) or `witness.json` and `circuit.wasm` (PLONK/FFLONK).

<!--
Source references:
- https://github.com/iden3/snarkjs (README.md, src/wtns_calculate.js)
-->
