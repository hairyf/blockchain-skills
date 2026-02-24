---
name: risc0
description: Verifiable computation with the RISC Zero zkVM—guest/host code, receipts, proving options, and Ethereum verification.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/risc0/risc0
---

> Skill is based on RISC Zero (risc0/risc0), generated at the listed date.

RISC Zero is a zero-knowledge verifiable computing platform based on zk-STARKs and RISC-V. The zkVM runs arbitrary code (Rust, C, C++) and produces receipts (journal + seal) that anyone can verify with the program’s image ID, without re-running the program or seeing private inputs. Use it for coprocessors, attestation, and on-chain verification (e.g. Ethereum via Groth16 verifier contracts).

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| zkVM overview | Guest, host, method, image ID, journal, receipt, seal | [core-zkvm-overview](references/core-zkvm-overview.md) |
| Guest code | Entry macro, env read/write/commit, no_std | [core-guest-code](references/core-guest-code.md) |
| Host code | ExecutorEnv, prove, verify, journal decode | [core-host-code](references/core-host-code.md) |
| Receipts | Structure, verify, journal, serialization, receipt kinds | [core-receipts](references/core-receipts.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Proving options | Dev-mode, local, remote (Boundless), prove_with_opts | [features-proving-options](references/features-proving-options.md) |
| Precompiles | Crypto precompiles, patched crates (sha2, k256, etc.) | [features-precompiles](references/features-precompiles.md) |
| Proof composition | Verify receipts in guest, assumptions, resolve | [features-composition](references/features-composition.md) |
| Recursion | Segment → lift → join → Groth16, receipt kinds | [features-recursion](references/features-recursion.md) |
| Ethereum integration | Verifier contracts, Groth16, shrink-wrapping | [features-blockchain-ethereum](references/features-blockchain-ethereum.md) |

## Best practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Guest optimization | Cycles, paging, precompiles, profiling, alignment | [best-practices-guest-optimization](references/best-practices-guest-optimization.md) |

## Advanced

| Topic | Description | Reference |
|-------|-------------|-----------|
| Security model | Components, soundness, ZK caveats, audits | [advanced-security-model](references/advanced-security-model.md) |
