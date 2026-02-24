---
name: bitvm
description: BitVM2—Groth16 SNARK verifier on Bitcoin, bridge CLI, chunk API, header chain and final SPV.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/BitVM/BitVM, scripts at https://github.com/antfu/skills
---

> Skill based on BitVM (BitVM/BitVM), generated from `sources/bitvm`. Doc path: `README.md`, `docs/chunk_instructions.md`, `DEMO_INSTRUCTIONS.md`, `prover/README.md`, `header-chain/README.md`, `final-spv/README.md`, `regtest/README.md`.

BitVM implements the BitVM2 optimistic paradigm: a Groth16 SNARK verifier executable on Bitcoin without soft forks, plus a trust-minimized bridge. Use for scripting u32/u4 arithmetic, hashes (SHA256, BLAKE3), bigint, BN254, chunked Groth16 verification, and peg-in/peg-out flows. **Do not use in production.**

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Overview | BitVM2 paradigm, SNARK verifier, component map, capabilities | [core-overview](references/core-overview.md) |
| Components | u32, u4, hash, bigint, BN254, Groth16, chunk, signatures, bridge | [core-components](references/core-components.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Bridge CLI | Keys, addresses, UTXOs, peg-in/peg-out, MuSig2, broadcast, env and config | [features-bridge-cli](references/features-bridge-cli.md) |
| Chunk API | Tapscripts, disprove logic, DataType/ElementType, hashing, tests | [features-chunk-api](references/features-chunk-api.md) |
| Header chain | Risc0 header chain circuit and prover binary, data and proving | [features-header-chain](references/features-header-chain.md) |
| Final SPV | Header verification, tx inclusion proof, 32-byte Blake3 digest | [features-final-spv](references/features-final-spv.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Demo flows | Funding UTXOs, happy peg-out, successful disprove, environment setup | [best-practices-demo-flows](references/best-practices-demo-flows.md) |
