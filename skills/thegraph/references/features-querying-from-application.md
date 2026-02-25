---
name: thegraph-features-querying-from-application
description: GraphQL endpoints (Studio vs Network), graph-client, Apollo, URQL, and API key usage for querying from apps.
---

# The Graph — Querying from an Application

Subgraphs are queried via GraphQL. Use the correct endpoint and secure API key handling when building apps.

## Endpoints

- **Subgraph Studio** (testing only, rate-limited):
  `https://api.studio.thegraph.com/query/<ID>/<SUBGRAPH_NAME>/<VERSION>`
- **The Graph Network** (production):
  `https://gateway.thegraph.com/api/<API_KEY>/subgraphs/id/<SUBGRAPH_ID>`

Use the Network endpoint with an API key for production; pass the key in the URL path or as `Authorization: Bearer <API_KEY>`.

## API keys

- Create and manage keys in [Subgraph Studio](https://thegraph.com/studio/) → API Keys.
- Store keys in environment variables or a secrets manager; do not hardcode or expose in client-side code.
- Optional: set spending limits, restrict domains, limit which subgraphs the key can query.

## Graph Client

The Graph's `graph-client` (`@graphprotocol/client-cli`) supports cross-chain subgraph queries, block tracking, and auto-pagination. Integrates with Apollo, URQL, React Query.

1. Install: `yarn add -D @graphprotocol/client-cli`.
2. Define queries in `.graphql` files.
3. Configure `.graphclientrc.yml` with `sources` (each with `handler.graphql.endpoint`) and `documents`.
4. Run `graphclient build` to generate typed documents.
5. Use generated types and `execute(ExampleQueryDocument, {})` in app code.

## Apollo and URQL

Use the Network URL as `uri`/`url`; pass variables for parameters. Prefer graph-client when you need cross-subgraph queries or typed generation.

## Key points

- Prefer the Network endpoint and API key in URL or Bearer header for production.
- Restrict API keys by domain and subgraph in Studio to limit exposure.

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/querying/from-an-application/
- https://thegraph.com/docs/en/subgraphs/querying/managing-api-keys/
-->
