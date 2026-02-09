---
name: thegraph-features-substreams
description: Substreams — parallel indexing, Rust modules, WASM, multi-chain and multi-sink for agent-driven indexing beyond subgraphs.
---

# The Graph — Substreams

Substreams is a parallel blockchain indexing stack used to speed up subgraph indexing and support non-EVM chains and multiple sinks.

## Overview

- **Input**: Blockchain data (blocks, traces, account changes).
- **Program**: Rust code that defines transformations; compiled to WASM.
- **Execution**: Substreams provider feeds data to the WASM module; transformations run in parallel.
- **Sinks**: Subgraph, Postgres, Clickhouse, Mongo, etc.

## Benefits

- Faster indexing via parallelized engine.
- Multi-chain: EVM, Solana, Injective, Starknet, Vara.
- Richer data: trace-level on EVM, account changes on Solana; fork/disconnect handling.

## Typical flow

1. Write Rust modules that map blocks/streams to your output types.
2. Build WASM: one CLI command.
3. Send WASM to a Substreams endpoint; provider runs it and can write to a chosen sink (e.g. subgraph).

Example (conceptual): extract block number/hash/parent from an Ethereum block in Rust, output a custom type; package as WASM and run via Substreams.

## Key points

- Substreams docs and registry are maintained by StreamingFast: https://docs.substreams.dev.
- Use for high-throughput or non-EVM indexing; subgraphs remain the primary query interface for many apps.

<!--
Source references:
- https://thegraph.com/docs/en/substreams/introduction/
- https://docs.substreams.dev
-->
