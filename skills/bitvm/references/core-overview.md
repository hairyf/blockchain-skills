---
name: bitvm-overview
description: BitVM2 paradigm, SNARK verifier on Bitcoin, and component map for agents.
metadata:
  author: hairy
---

# BitVM Overview

BitVM is the official implementation of **BitVM2**: an optimistic paradigm to run a **Groth16 SNARK verifier** on Bitcoin without soft forks. The codebase follows [Arkworks](https://github.com/arkworks-rs) and implements a trust-minimized Bitcoin bridge.

**Warning:** Do not use in production.

## Capabilities

- **Groth16 on Bitcoin**: Verify ZK proofs (BN254, Groth16) via Bitcoin script in an optimistic challenge game.
- **Modular Bitcoin scripts**: Reusable Taproot scripts for u32/u4 arithmetic, hashes (SHA256, BLAKE3), big integers, and BN254 curve operations.
- **Bridge CLI**: Manage keys (depositor, operator, verifier, withdrawer), peg-in/peg-out flows, MuSig2 signing, and broadcast of assert/disprove transactions.
- **Chunked verifier**: Groth16 verifier split into chunks with deterministic I/O; verifiers can disprove invalid operator assertions.
- **Header chain & SPV**: Risc0-based header chain prover and final-SPV circuit for proving tx inclusion and compressing public values (Blake3).

## Component Map

| Component | Path | Purpose |
|-----------|------|---------|
| u32 | `bitvm/src/u32/` | add, sub, or, xor, rotation, shift for hashes |
| u4 | `bitvm/src/u4/` | 4-bit arithmetic (efficient hash construction) |
| hash | `bitvm/src/hash/` | SHA256 (headers, difficulty), BLAKE3 (chunker state) |
| bigint | `bitvm/src/bigint/` | Variable-length add, sub, mul, div, inverse |
| bn254 | `bitvm/src/bn254/` | Fq/Fr/Fq2/Fq6/Fq12, G1/G2, pairing (Algorithm 9) |
| groth16 | `bitvm/src/groth16/` | Verifier (~1 GB script), precomputed hints |
| chunk | `bitvm/src/chunk/` | Chunking, tapscripts (MSM, mul, point ops), disprove API |
| signatures | `bitvm/src/signatures/` | Bit commitment via Winternitz |
| bridge | `bridge/` | Roles, connectors, tx construction, Bitcoin client |

## BitVM1

Deprecated BitVM1 lives on branch `1dce989d1963b90c35391b77b451c6823302d503`; this skill covers BitVM2 only.

<!--
Source references:
- sources/bitvm/README.md
- https://bitvm.org/bitvm2
- https://bitvm.org/snark
-->
