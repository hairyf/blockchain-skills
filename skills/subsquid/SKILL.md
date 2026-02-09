---
name: subsquid
description: Subsquid (Squid SDK) — batch-based blockchain indexers, EVM/Substrate processors, typegen, GraphQL API.
metadata:
  author: hairy
  version: "2026.2.9"
  source: Generated from https://github.com/subsquid/docs
---

> Skill based on Subsquid docs, generated 2026-02-09. Official docs: https://docs.subsquid.io

Subsquid provides SQD Network (historical blockchain data API) and Squid SDK — a TypeScript toolkit for building batch-based indexers (squids). Squids use processors (EVM or Substrate), stores (Postgres, file, BigQuery), optional typegen for decoding, and optional GraphQL serving.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Overview | Squid SDK architecture — processor, store, typegen, GraphQL; SQD Network | [core-overview](references/core-overview.md) |
| EVM Processor | EvmBatchProcessor — gateway, RPC, addLog, setFields, batch context | [core-evm-processor](references/core-evm-processor.md) |
| Schema & TypeORM | schema.graphql, typeorm-codegen, TypeormDatabase, store API | [core-schema-typeorm](references/core-schema-typeorm.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| EVM Typegen | squid-evm-typegen — ABI → decoding and state-query facades | [features-evm-typegen](references/features-evm-typegen.md) |
| CLI | sqd init, run, deploy; templates and project layout | [features-cli](references/features-cli.md) |
| GraphQL | OpenReader — schema-based GraphQL API from Postgres | [features-graphql](references/features-graphql.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Batch Processing | In-memory aggregation, batch writes, avoid per-item DB ops | [best-practices-batch-processing](references/best-practices-batch-processing.md) |

## External Links

- [Subsquid Docs](https://docs.subsquid.io)
- [Subsquid GitHub](https://github.com/subsquid/docs)
- [Squid SDK (squid-sdk)](https://github.com/subsquid/squid-sdk)
