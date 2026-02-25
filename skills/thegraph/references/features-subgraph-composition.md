---
name: thegraph-features-subgraph-composition
description: Composable subgraphs — use up to 5 source subgraphs as data sources; immutable entities, same chain.
---

# The Graph — Subgraph Composition

Subgraph composition lets a **dependent** subgraph use one or more **source** subgraphs as data sources, merging their entities so you can build on existing indexed data without re-indexing chains.

## Overview

- **Source subgraphs**: Standard subgraphs that index chain data and expose entities.
- **Dependent (composed) subgraph**: Declares source subgraphs as data sources; its mappings react to entity changes from those sources (e.g. new/updated entities) and can create new entities. Combines data from up to **5 source subgraphs** into one API.

Benefits: reuse and mix existing data, faster development, fewer duplicate indexing jobs. All source subgraphs must be deployed before deploying the composed subgraph.

## Prerequisites

### Source subgraphs

- **specVersion 1.3.0 or later** (see [graph-node v0.37.0](https://github.com/graphprotocol/graph-node/releases/tag/v0.37.0)).
- **Immutable entities only**: Only immutable entities can be composed. Pruning is allowed on sources, but only immutable entities are visible to the dependent subgraph.
- Source subgraphs **cannot use grafting** on the entities that are composed.
- Aggregated entities can be composed; entities built on top of them cannot perform additional aggregations.

### Composed subgraph

- **Maximum 5 source subgraphs**.
- **Same chain**: All data sources must be from the same chain.
- **No nested composition**: You cannot use a composed subgraph as a source of another composed subgraph.
- **No mixing**: You cannot combine an onchain data source (event/call/block handlers) with a subgraph data source in the same composed subgraph—composed subgraphs use only subgraph data sources.

## Workflow

1. Deploy each **source** subgraph (each indexes its contracts and publishes entities).
2. In the **dependent** subgraph manifest, add data sources that reference the **deployment IDs** of those source subgraphs (not Subgraph IDs).
3. In the dependent schema, import or extend the source schemas and add any new entities/fields.
4. Write mappings that react to source entities (e.g. block handlers or entity triggers, depending on the API).
5. Build and deploy the composed subgraph. Update the manifest when a source’s deployment ID changes (e.g. after a new publish).

## Key points

- Use **Deployment ID** in the dependent manifest for each source subgraph; redeploying a source creates a new deployment ID.
- Keep source subgraphs immutable-entity-only where they are composed; avoid grafting on those entities.
- Example repo: [example-composable-subgraph](https://github.com/graphprotocol/example-composable-subgraph).

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/guides/subgraph-composition/
- https://github.com/graphprotocol/graph-node/releases/tag/v0.37.0
-->
