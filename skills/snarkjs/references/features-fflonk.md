---
name: snarkjs FFLONK prove and verify
description: Setup, prove, and verify with FFLONK (beta); universal setup like PLONK.
metadata:
  author: hairy
---

# FFLONK proving and verification

FFLONK is a proving system that, like PLONK, only requires the universal Phase 1 (powers of tau). It is documented as beta. zkey format is distinct (see `doc/fflonk_zkey_format.md` in the repo).

## CLI

**Setup**:

```sh
snarkjs fflonk setup circuit.r1cs pot14_final.ptau circuit.zkey
```

**Prove**:

```sh
snarkjs fflonk prove circuit.zkey witness.wtns proof.json public.json
```

**Full prove**:

```sh
snarkjs fflonk fullprove witness.json circuit.wasm circuit.zkey proof.json public.json
```

**Verify**:

```sh
snarkjs zkey export verificationkey circuit.zkey verification_key.json
snarkjs fflonk verify verification_key.json public.json proof.json
```

**Export Solidity verifier**:

```sh
snarkjs fflonk export solidityverifier circuit.zkey verifier.sol
```

**Export Solidity calldata**:

```sh
snarkjs fflonk export calldata public.json proof.json
```

## Node API

```js
const snarkjs = require("snarkjs");

const { proof, publicSignals } = await snarkjs.fflonk.fullProve(
  { a: 3, b: 11 },
  "circuit.wasm",
  "circuit.zkey"
);

const vKey = JSON.parse(fs.readFileSync("verification_key.json"));
const ok = await snarkjs.fflonk.verify(vKey, publicSignals, proof);
```

## Key points

- No circuit-specific Phase 2; single `fflonk setup` from ptau.
- FFLONK zkey has a different binary format (protocol ID 10) and more sections than Groth16/PLONK; use FFLONK-specific export/verify commands.
- Use `fflonk export solidityverifier` and `fflonk export calldata` (not the generic `zkey export` for verifier/calldata when targeting FFLONK).

<!--
Source references:
- https://github.com/iden3/snarkjs (README.md, doc/fflonk_zkey_format.md, src/fflonk.js)
-->
