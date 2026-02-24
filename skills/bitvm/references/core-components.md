---
name: bitvm-components
description: BitVM script modules—u32, u4, hash, bigint, BN254, Groth16, chunk, signatures.
metadata:
  author: hairy
---

# BitVM Core Components

Reusable Bitcoin script building blocks under `bitvm/src/`. Use these when generating or reasoning about Taproot scripts for arithmetic, hashing, and curve operations.

## u32 and u4

- **u32** (`bitvm/src/u32/`): 32-bit operations for hash functions—add, sub, or, xor, rotation, shift. Entry for SHA256 and other word-based hashes.
- **u4** (`bitvm/src/u4/`): 4-bit arithmetic; more script-efficient for constructing hashes (e.g. BLAKE3 in chunker).

## Hash Functions

- **SHA256**: Block header comparison and Bitcoin difficulty checks.
- **BLAKE3**: Compressing intermediate states in the chunker; used with u4 for smaller scripts.

## Big Integer

- **bigint** (`bitvm/src/bigint/`): Variable-length big integers—add, sub, mul, div, inverse. Used for field and scalar arithmetic in curve operations.

## BN254

- **bn254** (`bitvm/src/bn254/`): BN254 elliptic curve in script.
  - Field chain: Fq, Fr, Fq2, Fq6, Fq12.
  - G1/G2 point ops, MSM, line evaluations.
  - Pairing per "On Proving Pairings" (Algorithm 9).

## Groth16

- **groth16** (`bitvm/src/groth16/`): Groth16 verifier over BN254. Script size ~1 GB; uses precomputed hints. Offchain checker and verifier entry points.

## Chunk

- **chunk** (`bitvm/src/chunk/`): Splits the Groth16 verifier into chunks so that: (1) no chunk succeeds on a valid proof alone, and (2) some chunks succeed when the proof is invalid (enabling disprove). Subdirs: `api`, `api_compiletime_utils`, `api_runtime_utils`, `elements`, `g16_runner_core`, `g16_runner_utils`, tapscripts for MSM/mul/point_ops, `wrap_hasher`, `wrap_wots`.

## Signatures

- **signatures** (`bitvm/src/signatures/`): Bit commitment using Winternitz (Lamport-style) short keys/signatures.

## Bridge

- **bridge** (`bridge/`): Context (roles), connectors, Bitcoin transaction construction, and client wrapper—used by the CLI for peg-in/peg-out and assert/disprove flows.

<!--
Source references:
- sources/bitvm/README.md
- bitvm/src/{u32,u4,hash,bigint,bn254,groth16,chunk,signatures}
-->
