---
name: snarkjs zkey lifecycle
description: Create, contribute, verify, and export proving/verification keys (zkey) for Groth16; export Solidity verifier and calldata.
metadata:
  author: hairy
---

# zkey (proving/verification key)

The zkey holds the proving key and verification key plus Phase 2 contributions. Groth16 requires a circuit-specific trusted ceremony (zkey contribute/beacon); PLONK and FFLONK only need the Phase 1 ptau.

## Groth16 zkey ceremony (Phase 2)

**Initial zkey** (no contributions; do not use in production):

```sh
snarkjs groth16 setup circuit.r1cs pot14_final.ptau circuit_0000.zkey
```

**Contribute**:

```sh
snarkjs zkey contribute circuit_0000.zkey circuit_0001.zkey --name="Contributor" -v
snarkjs zkey contribute circuit_0001.zkey circuit_0002.zkey --name="Second" -v -e="entropy"
```

**Third-party** (Bellman-compatible):

```sh
snarkjs zkey export bellman circuit_0002.zkey challenge_0003
# external tool produces response_0003
snarkjs zkey import bellman circuit_0002.zkey response_0003 circuit_0003.zkey -n="Third"
```

**Verify zkey** (checks contributions and circuit match):

```sh
snarkjs zkey verify circuit.r1cs pot14_final.ptau circuit_0003.zkey
```

**Beacon** (finalize):

```sh
snarkjs zkey beacon circuit_0003.zkey circuit_final.zkey <hex_entropy> 10 -n="Final Beacon phase2"
```

## Export verification key and Solidity

**Verification key (JSON)**:

```sh
snarkjs zkey export verificationkey circuit_final.zkey verification_key.json
```

**Solidity verifier contract**:

```sh
snarkjs zkey export solidityverifier circuit_final.zkey verifier.sol
```

**Solidity calldata** (for Remix / on-chain verification):

```sh
snarkjs zkey export soliditycalldata public.json proof.json
```

Paste the output into the verifier contract’s `verifyProof` (or equivalent) in Remix.

## PLONK / FFLONK (no Phase 2)

One-step setup from ptau:

```sh
snarkjs plonk setup circuit.r1cs pot14_final.ptau circuit_final.zkey
snarkjs fflonk setup circuit.r1cs pot14_final.ptau circuit.zkey
```

Then use the same export commands (verification key, solidity verifier, solidity calldata) as needed.

## Key points

- **Groth16**: always contribute at least once and apply a beacon before using the zkey.
- **PLONK / FFLONK**: single setup from ptau; no zkey contribute/beacon.
- `zkey verify` ensures the zkey matches the given R1CS and ptau.

<!--
Source references:
- https://github.com/iden3/snarkjs (README.md)
-->
