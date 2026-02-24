---
name: zksync-era
description: ZK Stack / zkSync Era—protocol specs, L1 contracts, Era VM, prover, compiler, L1–L2 communication, and data availability.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/matter-labs/zksync-era, scripts at https://github.com/antfu/skills
---

> Skill based on zkSync Era (ZK Stack), generated from `sources/zksync-era`. Doc path: `sources/zksync-era/docs/src/` (specs, guides).

zkSync Era is an EVM-compatible ZK rollup that settles on Ethereum. It uses a register-based zkEVM (Era VM), state-diff data availability, and the Boojum proof system. This skill focuses on protocol mechanics, L1 contracts, VM/compiler behavior, L1–L2 messaging, and pubdata for agents that implement tooling, integrate with L1/L2, or reason about execution and finality.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Protocol overview | Sequencer, prover, L1 contract, blocks/batches, state diff, Boojum | [core-overview](references/core-overview.md) |
| Blocks and batches | L2 blocks vs L1 batches, sealing criteria, try-and-rollback, virtual blocks | [core-blocks-batches](references/core-blocks-batches.md) |
| L1 smart contracts | Diamond proxy, facets (Getters, Admin, Mailbox, Executor), bridges, governance | [core-l1-contracts](references/core-l1-contracts.md) |
| Era VM | Register machine, instructions, near/far calls, fat pointers, bootloader | [core-era-vm](references/core-era-vm.md) |

## Features

### L1–L2 and communication

| Topic | Description | Reference |
|-------|-------------|-----------|
| L1–L2 communication | Priority ops, requestL2Transaction, address aliasing, L2→L1 logs/messages | [features-l1-l2-communication](references/features-l1-l2-communication.md) |

### Prover and compiler

| Topic | Description | Reference |
|-------|-------------|-----------|
| Prover | ZK terminology, Boojum, circuits, test harness | [features-prover](references/features-prover.md) |
| Compiler and system contracts | zksolc, Yul/EVMLA→EraVM, system contracts, auxiliary heap | [features-compiler-system-contracts](references/features-compiler-system-contracts.md) |

### Transactions and data

| Topic | Description | Reference |
|-------|-------------|-----------|
| Transactions | Types (Legacy, EIP-1559, 0x71, L1Tx), lifecycle, mempool, state keeper | [features-transactions](references/features-transactions.md) |
| Data availability | Pubdata categories, state diff, Boojum packing, L2 state reconstruction | [features-data-availability](references/features-data-availability.md) |
