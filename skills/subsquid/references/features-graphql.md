---
name: subsquid-features-graphql
description: Serving GraphQL from Postgres squids — OpenReader and schema-based API.
---

# Serving GraphQL (OpenReader)

Postgres-backed squids can expose data via a GraphQL API. **OpenReader** (`@subsquid/graphql-server`) builds an API from the same `schema.graphql` used for TypeORM codegen.

## Run server

```bash
npx squid-graphql-server
```

Listens on `GQL_PORT` (default `4350`). DB connection uses `DB_*` env vars. In SQD Cloud, typically run as `api:` service in the deployment manifest.

## API shape

- **`squidStatus { height }`** — Last processed block.
- **`{entityName}ById(id)`** — Get entity by ID.
- **`{entityName}ByUniqueInput(...)`** — Get by unique field(s).
- **`{entityName}sConnection(...)`** — List with filters, AND/OR, nested/cross-relation fields, Relay-style cursor pagination.

Custom scalars: `DateTime` (ISO), `Bytes` (hex with `0x`), `BigInt` (string).

OpenReader is one option; the docs recommend checking [Serving GraphQL](https://docs.subsquid.io/sdk/resources/serving-graphql) for current alternatives (OpenReader has limitations around subscriptions and Apollo v3).

<!--
Source references:
- https://docs.subsquid.io/sdk/reference/openreader-server/overview
- https://docs.subsquid.io/sdk/resources/serving-graphql
-->
