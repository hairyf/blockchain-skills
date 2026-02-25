---
name: thegraph
description: The Graph — subgraph manifest, schema, mappings, GraphQL API, templates, Substreams, and performance practices for agent-driven indexing.
metadata:
  author: hairy
  version: "2026.2.9"
  source: Generated from https://github.com/graphprotocol/docs, scripts at https://github.com/antfu/skills
---

> Skill based on The Graph docs (graphprotocol/docs), generated 2026-02-09. Official docs: https://thegraph.com/docs

The Graph indexes blockchain data into queryable subgraphs. Subgraphs are defined by a manifest (subgraph.yaml), a GraphQL schema, and AssemblyScript mappings; they are queried via GraphQL. Substreams provide parallel, multi-chain indexing with multiple sinks.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Subgraph Manifest | Data sources, event/call/block handlers, indexer hints | [core-subgraph-manifest](references/core-subgraph-manifest.md) |
| Schema | Entities, scalars, relationships, @derivedFrom, fulltext | [core-schema](references/core-schema.md) |
| Mappings | AssemblyScript handlers, graph-ts, codegen, store API | [core-mappings](references/core-mappings.md) |
| GraphQL API | Queries, filtering, pagination, sorting, time-travel | [core-graphql-api](references/core-graphql-api.md) |
| Subgraph ID vs Deployment ID | When to use which for querying; version pinning | [core-deployment-id-vs-subgraph-id](references/core-deployment-id-vs-subgraph-id.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Performance | Avoid eth_calls, immutable entities, Bytes ids, @derivedFrom, pruning | [best-practices-performance](references/best-practices-performance.md) |
| Grafting & Hotfix | Reuse indexed data for hotfix deployment; when to use and avoid | [best-practices-grafting-hotfix](references/best-practices-grafting-hotfix.md) |
| Timeseries & Aggregations | @entity(timeseries), @aggregation, intervals, dimensions | [best-practices-timeseries](references/best-practices-timeseries.md) |
| Querying | Static queries, variables, @include/@skip, batching, fragments | [best-practices-querying](references/best-practices-querying.md) |

## Features

### Subgraph Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Data Source Templates | Dynamic contracts, factory pattern, create/createWithContext | [features-data-source-templates](references/features-data-source-templates.md) |
| Deployment & Publishing | Deploy to Studio, publish to network, CLI, GRT signal | [features-deployment-publishing](references/features-deployment-publishing.md) |
| Querying from Application | Endpoints, graph-client, Apollo, URQL, API keys | [features-querying-from-application](references/features-querying-from-application.md) |
| Unit Testing (Matchstick) | graph test, describe/test, assertions, mocking, coverage | [features-unit-testing](references/features-unit-testing.md) |
| Subgraph Composition | Combine up to 5 source subgraphs; immutable entities, same chain | [features-subgraph-composition](references/features-subgraph-composition.md) |
| Subgraph Linter | Static analysis: entity overwrite, null safety, undeclared eth_calls | [features-subgraph-linter](references/features-subgraph-linter.md) |
| Debug Forking | Fork remote store at block X for fast local debugging | [features-debug-forking](references/features-debug-forking.md) |
| Graph Node Dev (gnd) | Local node with optional IPFS, auto Postgres, --watch | [features-graph-node-dev](references/features-graph-node-dev.md) |

### Indexing

| Topic | Description | Reference |
|-------|-------------|-----------|
| Substreams | Parallel indexing, Rust/WASM, multi-chain, multi-sink | [features-substreams](references/features-substreams.md) |
| Substreams Sinks | SQL, PubSub, stream, KV; official vs community | [features-substreams-sinks](references/features-substreams-sinks.md) |

## External Links

- [The Graph Docs](https://thegraph.com/docs)
- [graphprotocol/docs GitHub](https://github.com/graphprotocol/docs)
- [graph-tooling (graph-ts)](https://github.com/graphprotocol/graph-tooling)
- [Substreams docs](https://docs.substreams.dev)
