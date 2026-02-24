---
name: snarkjs Groth16 prove and verify
description: Generate and verify Groth16 proofs via CLI and Node API; export Solidity calldata.
metadata:
  author: hairy
---

# Groth16 proving and verification

Groth16 produces short proofs (3 G1 points, 1 G2 point) and fast verification. It requires a circuit-specific trusted setup (zkey ceremony).

## CLI

**Prove** (witness must already exist):

```sh
snarkjs groth16 prove circuit_final.zkey witness.wtns proof.json public.json
```

**Full prove** (compute witness then prove in one step; Groth16 uses `input.json`):

```sh
snarkjs groth16 fullprove input.json circuit.wasm circuit_final.zkey proof.json public.json
```

**Verify**:

```sh
snarkjs groth16 verify verification_key.json public.json proof.json
```

**Export Solidity calldata** (for on-chain verifier):

```sh
snarkjs groth16 export soliditycalldata public.json proof.json
```

## Node API

```js
const snarkjs = require("snarkjs");
const fs = require("fs");

// One-shot: witness + proof
const { proof, publicSignals } = await snarkjs.groth16.fullProve(
  { a: 10, b: 21 },
  "circuit.wasm",
  "circuit_final.zkey"
);

// Verify
const vKey = JSON.parse(fs.readFileSync("verification_key.json"));
const ok = await snarkjs.groth16.verify(vKey, publicSignals, proof);
```

**Prove from existing witness** (e.g. when witness is computed elsewhere):

```js
const { proof, publicSignals } = await snarkjs.groth16.prove(
  "circuit_final.zkey",
  "witness.wtns",
  undefined,  // logger
  { singleThread: true }  // optional: for environments without worker threads
);
```

**Export Solidity calldata in code**:

```js
const calldata = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);
```

## Key points

- Inputs in `fullProve` can be numbers or decimal strings; use strings for big integers.
- Use `singleThread: true` in Bun, browser extensions, or SES when worker threads are unavailable.
- `public.json` holds public inputs and outputs; `proof.json` holds the proof. Both are needed for verification and for Solidity calldata.

<!--
Source references:
- https://github.com/iden3/snarkjs (README.md, src/groth16.js, src/groth16_fullprove.js, src/groth16_prove.js)
-->
