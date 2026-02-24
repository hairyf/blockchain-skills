---
name: arbitrum-multidimensional-gas
description: Multi-dimensional (MultiGas) gas metering and ResourceKind categories in Nitro.
metadata:
  author: hairy
---

# Multi-Dimensional Gas Metering

Nitro uses a **multi-dimensional gas** model instead of a single `uint64` gas counter. Gas is tracked per **resource kind**, so consumption can be measured and priced separately (e.g. computation vs state growth vs L1/L2 calldata).

## ResourceKind categories

Each opcode’s dynamic gas is mapped to one or more of these kinds:

| Kind | Meaning | Examples |
|------|---------|----------|
| **ResourceKindComputation** | CPU-bound, no global state mutation | Opcode execution, memory expansion, call gas (EIP-150), value transfers (except new-account), CREATE/CREATE2, hashing, bloom updates |
| **ResourceKindStorageAccess** | Read (and write) access to global state | Account lookups (CALL, EXTCODESIZE, BALANCE), storage reads/writes, access list (EIP-2929/2930), Verkle proof traversal, DELEGATECALL/STATICCALL target resolution |
| **ResourceKindStorageGrowth** | Increase in persistent state size | New account creation, zero→nonzero storage, trie growth (EIP-4762), contract deployment deposit |
| **ResourceKindHistoryGrowth** | Append-only event log | LOG0–LOG4 |
| **ResourceKindL1Calldata** | Cost of posting data to L1 | L1 batch calldata |
| **ResourceKindL2Calldata** | L2 calldata processing | L2 tx calldata, precompile argument data |
| **ResourceKindWasmComputation** | Stylus WASM execution | WASM/Stylus program and contract execution |

## Usage

- **Pricing and policy**: Adjust cost per resource kind independently (e.g. raise L1 calldata cost without changing pure compute).
- **Analysis**: Reason about gas in terms of computation vs state vs L1/L2 data.
- **Stylus**: Stylus contracts are metered under `ResourceKindWasmComputation` (and any L2 calldata they use under `ResourceKindL2Calldata`).

## Key points

- Gas is multi-dimensional; each resource kind can have its own pricing.
- L1/L2 calldata and WASM computation are separate axes from EVM computation and storage.

<!--
Source references:
- https://github.com/OffchainLabs/nitro (docs/decisions/0002-multi-dimensional-gas-metering.md)
-->
