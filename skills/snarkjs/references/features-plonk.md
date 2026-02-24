---
name: snarkjs PLONK prove and verify
description: Setup, prove, and verify with PLONK; no circuit-specific trusted ceremony.
metadata:
  author: hairy
---

# PLONK proving and verification

PLONK is universal: a single Phase 1 (powers of tau) is enough; no circuit-specific Phase 2 ceremony. Setup is one command from ptau.

## CLI

**Setup** (from final ptau only):

```sh
snarkjs plonk setup circuit.r1cs pot14_final.ptau circuit_final.zkey
```

**Prove** (from existing witness):

```sh
snarkjs plonk prove circuit_final.zkey witness.wtns proof.json public.json
```

**Full prove** (witness + proof; PLONK uses `witness.json`):

```sh
snarkjs plonk fullprove witness.json circuit.wasm circuit_final.zkey proof.json public.json
```

**Verify** (need verification key; export from zkey if needed):

```sh
snarkjs zkey export verificationkey circuit_final.zkey verification_key.json
snarkjs plonk verify verification_key.json public.json proof.json
```

**Export Solidity calldata**:

```sh
snarkjs plonk export soliditycalldata public.json proof.json
```

## Node API

```js
const snarkjs = require("snarkjs");

// fullProve: (input, wasmPath, zkeyPath, logger, wtnsOptions, proverOptions)
const { proof, publicSignals } = await snarkjs.plonk.fullProve(
  { a: 3, b: 11 },
  "circuit.wasm",
  "circuit_final.zkey"
);

const vKey = JSON.parse(fs.readFileSync("verification_key.json"));
const ok = await snarkjs.plonk.verify(vKey, publicSignals, proof);
```

## Key points

- No zkey contribute/beacon: one `plonk setup` from ptau is sufficient.
- Input format for fullProve: object with signal names and values (same as witness input).
- Verification key is exported with `zkey export verificationkey` (same zkey export as Groth16).

<!--
Source references:
- https://github.com/iden3/snarkjs (README.md, src/plonk.js)
-->
