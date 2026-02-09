---
name: thegraph-core-graphql-api
description: Querying subgraphs — entities, filtering, pagination, sorting, time-travel, fulltext for agent-driven queries.
---

# The Graph — GraphQL API

Subgraphs expose a read-only GraphQL API. Each entity type gets root fields `entity(id: ID)` and `entities(...)`.

## Single and collection queries

```graphql
{ token(id: "1") { id owner } }
{ tokens(first: 10) { id owner } }
```

## Pagination

- `first: n` — limit; default sort is by id ascending.
- `skip: n` — offset (avoid large skip for performance).
- Prefer cursor-style: `where: { id_gt: $lastID }` with `first: 1000` and pass last id from previous page.

```graphql
query manyTokens($lastID: String) {
  tokens(first: 1000, where: { id_gt: $lastID }) { id owner }
}
```

## Sorting

```graphql
{ tokens(orderBy: price, orderDirection: asc) { id price } }
{ tokens(orderBy: owner__name, orderDirection: asc) { id owner { name } } }
```

## Filtering (where)

- Equality: `where: { outcome: "failed" }`
- Numeric: `_gt`, `_gte`, `_lt`, `_lte` (e.g. `deposit_gt: "10000000000"`)
- String: `_contains`, `_contains_nocase`, `_starts_with`, `_ends_with`, `_in`, `_not_in`
- Entity: `where: { application_: { id: "1" } }`
- Block: `_change_block: { number_gte: 100 }`
- Logic: `and: [...]`, `or: [...]` (comma in same object = AND)

## Time-travel

Query state at a block:

```graphql
{ challenges(block: { number: 8000000 }) { challenger outcome } }
{ challenges(block: { hash: "0x5a0b54..." }) { challenger outcome } }
```

Requires unpruned history (see manifest `indexerHints.prune`).

## Fulltext search

If the schema defines a fulltext directive (e.g. `bandSearch`):

```graphql
{ bandSearch(text: "breaks & electro") { id name description } }
```

Operators: `&` (and), `|` (or), `<->` (follow-by distance), `:*` (prefix, min 2 chars).

## Metadata

```graphql
{ _meta(block: { number: 123987 }) { block { number hash timestamp } deployment hasIndexingErrors } }
```

## Key points

- Filter operators: `_not`, `_in`, `_not_in`, `_contains`, etc.; type support varies (e.g. Boolean only `_not`, `_in`, `_not_in`).
- Prefer `and` and cursor-based pagination over large `skip` or heavy `or` for performance.

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/querying/graphql-api/
-->
