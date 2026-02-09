---
name: thegraph-core-schema
description: GraphQL schema for subgraphs — entities, scalars, relationships, @derivedFrom, fulltext search for agent-driven schema design.
---

# The Graph — Subgraph Schema

The schema `schema.graphql` defines entities and relationships that mappings write to and the GraphQL API exposes.

## Entities

- Every queryable type must have `@entity`. Required field: `id: Bytes!` or `id: String!` (prefer `Bytes!` for performance).
- Use `@entity(immutable: true)` for entities that are never updated after creation; faster to write and query.

```graphql
type Gravatar @entity(immutable: true) {
  id: Bytes!
  owner: Bytes
  displayName: String
  imageUrl: String
}
```

## Scalars

| Type       | Use case |
|-----------|----------|
| Bytes     | Hashes, addresses |
| String    | Text |
| Boolean   | Flags |
| Int       | 32-bit signed |
| Int8      | 64-bit signed (e.g. i64 from chain) |
| BigInt    | uint32..uint256, int64..int256 |
| BigDecimal| High-precision decimals |
| Timestamp | i64 microseconds (timeseries) |

## Relationships

- **One-to-many**: Store the reference on the "many" side; on the "one" side use `@derivedFrom(field: "otherEntity")` so the reverse lookup is virtual and not stored. Storing the "many" side only is much more performant.

```graphql
type Token @entity(immutable: true) {
  id: Bytes!
  tokenBalances: [TokenBalance!]! @derivedFrom(field: "token")
}

type TokenBalance @entity {
  id: Bytes!
  amount: Int!
  token: Token!
}
```

- Many-to-many: Prefer a mapping entity (e.g. `UserOrganization`) with one row per pair and both sides using `@derivedFrom`.

## Fulltext search

Add a `_Schema_` type with `@fulltext`:

```graphql
type _Schema_
  @fulltext(
    name: "bandSearch"
    language: en
    algorithm: rank
    include: [{ entity: "Band", fields: [{ name: "name" }, { name: "description" }] }]
  )
type Band @entity { id: Bytes!  name: String!  description: String! }
```

Declare `fullTextSearch` under `features` in the manifest when using `specVersion` >= 0.0.4.

## Key points

- Design entities around query needs and object relationships, not 1:1 with events.
- Use `Bytes!` for ids when possible; avoid storing arrays of entities on the "many" side—use `@derivedFrom` instead.

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/developing/creating/ql-schema/
-->
