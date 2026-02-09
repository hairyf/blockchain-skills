---
name: getblock-api-overview
description: GetBlock API scope — 100+ chains, JSON-RPC/WebSocket/GraphQL/REST, shared and dedicated nodes, add-ons (DAS, Firehose, Blockbook, Yellowstone Geyser).
---

# GetBlock API Overview

GetBlock provides node and API access for 100+ blockchains (EVM and non-EVM, L1/L2). Agents can assume standard RPC interfaces; the main integration task is endpoint URL and authentication.

## Interfaces

- **JSON-RPC** (HTTP and WebSocket)
- **GraphQL**, **REST** where supported per chain
- Endpoint is created per protocol/network/API type in the dashboard; one URL per combination.

## Node types

- **Shared nodes**: CU-based limits, multiple tokens per plan; suitable for most apps and scripts.
- **Dedicated nodes**: No CU/RPS limits; custom plans.

## Add-ons and extended APIs

- **Yellowstone Geyser (gRPC)**: Solana real-time streaming (accounts, transactions, slots). See `features-yellowstone-grpc.md`.
- **DAS API**, **Firehose**, **Blockbook**: Documented in GetBlock add-ons; use when the app needs those specific APIs.

Full node list and method specs: GetBlock API Reference and nodes/pricing pages.

<!--
Source references:
- https://github.com/GetBlock-io/getblock-docs
- api-reference/overview.md
- README.md
-->
