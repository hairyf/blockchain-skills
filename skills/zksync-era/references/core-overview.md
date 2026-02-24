---
name: zksync-era-protocol-overview
description: ZK Stack protocol overview—sequencer, prover, L1 contract, blocks/batches, state diff, and Boojum.
metadata:
  author: hairy
---

# Protocol Overview

ZK Stack powers zero-knowledge rollups that settle on Ethereum. The rollup uses a zkEVM for execution and publishes state diffs plus validity proofs to L1. Key roles: **sequencer** (collects and executes L2 transactions), **prover** (produces proofs of correct execution), and **L1 contract** (verifies proofs and finalizes state).

## Flow

1. User submits a transaction to the sequencer (L2 RPC or via L1 priority queue).
2. Sequencer executes the block with the zkEVM and gives a soft confirmation.
3. Prover builds a cryptographic proof of the batch execution (Boojum proof system).
4. Executor facet on L1 receives batch data and proof: `commitBatches` → `proveBatches` → `executeBatches`.
5. L1 contract verifies the proof and updates the rollup state; data availability is provided via state diff (and optionally blobs).

## Concepts

- **Blocks vs batches**: L2 blocks (miniblocks) are created frequently (~2s) for UX/explorer compatibility. L1 batches are the unit of proof: one batch = one Bootloader execution containing many transactions.
- **State diff**: Instead of publishing full transaction data, the rollup publishes how storage/state changed, reducing cost and enabling shared slot optimizations.
- **Boojum**: The current proof system; proofs can be generated with ~16GB GPU RAM, supporting decentralized proving.

## When to use

- Reasoning about L2 execution, finality, or operator roles.
- Implementing tooling that commits/proves/executes batches or reads L1 contract state.
- Understanding data flow from L2 to L1 (pubdata, proofs).

<!--
Source references:
- sources/zksync-era/docs/src/specs/introduction.md
- sources/zksync-era/docs/src/specs/overview.md
-->
