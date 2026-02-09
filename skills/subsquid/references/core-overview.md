---
name: subsquid-core-overview
description: Squid SDK architecture — processor, store, typegen, GraphQL; SQD Network and squids.
---

# Subsquid / Squid SDK Overview

Subsquid provides **SQD Network** (historical blockchain data API) and **Squid SDK** (TypeScript toolkit for building indexers). A **squid** is an indexing project that retrieves data from SQD Network (or RPC), transforms it in batches, and persists to a store (Postgres, files, BigQuery). All processing is **batch-based**: the handler receives `ctx.blocks` and should minimize per-item DB hits.

## Required components

- **Processor** — Main process and main object; `processor.run(store, handler)` is the entry point. Handles data retrieval and transformation.
  - `EvmBatchProcessor` (`@subsquid/evm-processor`) for EVM chains.
  - `SubstrateBatchProcessor` (`@subsquid/substrate-processor`) for Substrate-based chains.
- **Store** — Where processors persist data. Options:
  - `TypeormDatabase` (`@subsquid/typeorm-store` + `@subsquid/typeorm-codegen` + `@subsquid/typeorm-migration`) → PostgreSQL.
  - File store (`@subsquid/file-store`) → local/S3 files (CSV, JSON, Parquet).
  - BigQuery store (`@subsquid/bigquery-store`).

Any processor can be used with any store.

## Optional components

- **Typegen** — Generates decoding/utility code from ABIs or metadata: `squid-evm-typegen`, `squid-substrate-typegen`, `squid-ink-typegen`. Install with `--save-dev`.
- **GraphQL server** — For Postgres squids, data can be served via GraphQL (e.g. OpenReader `@subsquid/graphql-server` or other options; see [Serving GraphQL](https://docs.subsquid.io/sdk/resources/serving-graphql)).
- **Squid CLI** — `sqd` for init, run, deploy (templates, run processor + API, SQD Cloud).

## Data flow

1. Configure processor: set gateway (SQD Network URL) and/or RPC endpoint, finality, add data requests (e.g. `addLog()`, `addTransaction()`).
2. `processor.run(db, async (ctx) => { ... })`: handler receives batches of blocks; each block has `logs`, `transactions`, `traces`, `stateDiffs` (EVM).
3. Decode and transform in memory; batch upsert/insert via `ctx.store`.
4. Optionally run GraphQL server against the same DB.

## When to use

- Custom APIs from smart contract or chain data.
- Low-cost, performant data pipelines (batch ETL).
- Real-time indexing (<1s chain latency) when using RPC for hot blocks and gateway for history.

<!--
Source references:
- https://docs.subsquid.io/overview
- https://docs.subsquid.io/sdk/overview
-->
