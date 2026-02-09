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

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Performance | Avoid eth_calls, immutable entities, Bytes ids, @derivedFrom, pruning | [best-practices-performance](references/best-practices-performance.md) |

## Features

### Subgraph Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Data Source Templates | Dynamic contracts, factory pattern, create/createWithContext | [features-data-source-templates](references/features-data-source-templates.md) |

### Indexing

| Topic | Description | Reference |
|-------|-------------|-----------|
| Substreams | Parallel indexing, Rust/WASM, multi-chain, multi-sink | [features-substreams](references/features-substreams.md) |

## External Links

- [The Graph Docs](https://thegraph.com/docs)
- [graphprotocol/docs GitHub](https://github.com/graphprotocol/docs)
- [graph-tooling (graph-ts)](https://github.com/graphprotocol/graph-tooling)
- [Substreams docs](https://docs.substreams.dev)
