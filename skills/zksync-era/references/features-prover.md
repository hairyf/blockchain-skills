---
name: zksync-era-prover
description: ZK terminology, Boojum, circuit layout, and repos (Boojum, zkevm_circuits, test harness).
metadata:
  author: hairy
---

# Prover and ZK Terminology

The **prover** consumes executed L1 batches and produces validity proofs. It proves **state diffs** (account/storage changes) so the new state root is correct. Proofs are verified by the Verifier contract on L1.

## Terminology (agent-oriented)

- **Arithmetization**: Encode computation as polynomial equations for ZK verification.
- **Constraint system**: Variables and gates; a **witness** is an assignment satisfying all constraints.
- **Circuit**: Encodes the computation (e.g. one opcode or one sub-computation); **geometry** = rows/columns of the witness table (~164 base witness columns at ZKsync); **constraint degree** ≤ 8.
- **Lookup table**: Predefined table to check relations without extra constraints (e.g. range checks).
- **State diffs**: Differences in accounts/storage before vs after processing a block; what the prover proves.
- **Worker**: Multi-threaded proving (e.g. polynomial ops in parallel).

## Boojum and circuits

**Boojum** is the low-level ZK library ([era-boojum](https://github.com/matter-labs/era-boojum)). **zkevm_circuits** define the circuits; **zkevm_test_harness** runs circuit tests. Base layer includes MainVM (opcode execution), CodeDecommitter, Keccak/SHA256 round functions, storage sorter/application, log/L1-message sorters and hashers, etc. Circuits communicate via queues; multiple instances of a circuit type can be combined to handle larger execution (FSM input/output in public inputs).

## Running circuit tests

```bash
rustup default nightly-2023-08-23
cargo update
cargo test basic_test --release -- --nocapture
```

(Run from era-zkevm_test_harness; test can take several minutes.)

## Agent usage

- When debugging or extending proving: know that the prover proves state diff validity and that circuit geometry and sealing criteria (e.g. pubdata, opcode count) are aligned.
- When reading specs: “satisfiable” = witness satisfies constraints; “verifier” = L1 contract that checks the proof.

<!--
Source references:
- sources/zksync-era/docs/src/specs/prover/zk_terminology.md
- sources/zksync-era/docs/src/specs/prover/getting_started.md
- sources/zksync-era/docs/src/specs/prover/circuits/overview.md
-->
