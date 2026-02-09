---
name: envio-overview
description: Envio products — HyperSync, HyperIndex, HyperRPC; when to use each.
---

# Envio Overview

Envio provides high-performance blockchain data access and indexing. Three main products:

## Products

- **HyperSync**: Raw blockchain data API (Rust, 70+ EVM + Fuel). Direct replacement for JSON-RPC; up to ~2000x faster. Use when you need raw data at max speed or custom pipelines.
- **HyperIndex**: Full indexing framework built on HyperSync. Schema, event handlers, GraphQL API. Use when you need structured, queryable data and an indexer.
- **HyperRPC**: Read-only JSON-RPC–compatible endpoint. Drop-in for existing RPC code; ~5x faster for read-heavy workloads. Use when you need minimal integration change.

## Choosing

- **HyperSync**: New data layer, advanced filtering, field selection, maximum performance.
- **HyperIndex**: End-to-end indexer (config, schema, handlers, Hasura GraphQL).
- **HyperRPC**: Simple RPC replacement; tools that expect standard `eth_*` methods.

## Key Points

- HyperIndex is powered by HyperSync; HyperRPC uses HyperSync under the hood.
- API tokens (`ENVIO_API_TOKEN`) are required for HyperSync/HyperRPC (and for HyperIndex when using HyperSync); get them at https://envio.dev/app/api-tokens.
- Supported: 80+ EVM chains and Fuel; URLs by network at docs (e.g. `https://eth.hypersync.xyz`, `https://arbitrum.hypersync.xyz`).

<!--
Source references:
- https://docs.envio.dev/docs/HyperSync/overview
- https://docs.envio.dev/docs/HyperIndex/overview
- https://docs.envio.dev/docs/HyperRPC/overview-hyperrpc
-->
