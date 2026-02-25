---
name: thegraph-best-practices-querying
description: GraphQL query best practices — static queries, variables, @include/@skip, request batching, fragments.
---

# The Graph — Querying Best Practices

Write static, well-structured GraphQL queries and use variables, conditional fields, and batching so subgraph queries are efficient and cacheable.

## Static queries and variables

- **Avoid** building query strings with string interpolation (e.g. `${id}`, `${fields.join()}`). It blocks server-side caching and static analysis.
- **Use** static query strings and pass values via **variables**: `query GetToken($id: ID!) { token(id: $id) { id owner } }` with `variables: { id }`.
- Variables are validated and sanitized by the API; tools can type-check and generate types from the static query.

## Conditional fields

- **@include(if: $bool)**: Include a field only when the variable is true.
- **@skip(if: $bool)**: Omit a field when the variable is true.

Use these so one static query fetches only the fields needed for the current view, keeping payloads small.

## Ask only for what you need

- List every field you need; there is no "fetch all fields."
- Limit collection sizes with **first** (and **skip** if needed). Defaults can return up to 100 entities per collection; nested collections multiply that (e.g. 100 tokens × 100 transactions each). Set `first` on nested collections to match what the UI actually uses.

## One query for multiple records

- For several entities by id: use the plural field with `where: { id_in: [id1, id2, id3] }` instead of multiple single-entity queries.
- For filtered lists: use `where` (e.g. `volume_gt: "..."`) on the plural field.

## Combine operations in one request

- Put multiple root fields in a single query so one HTTP request returns all needed data (e.g. `tokens(first: 50) { ... }` and `counters { ... }` in the same `query`). Reduces round trips and keeps the client simple.

## Fragments

- Define **fragments** on entity types for repeated selections (e.g. `fragment DelegateItem on Transcoder { id active status }`) and spread them: `newDelegate { ...DelegateItem }`, `oldDelegate { ...DelegateItem }`.
- Use one fragment per logical "shape" of data; improves readability and type generation. Fragments must be on the correct type and cannot be on scalars (e.g. not on `BigInt`).

## GraphQL rules (summary)

- Use each query name and each field once per operation as required by the API.
- Complex types need a selection set; variables must match argument types.
- Prefer graph-client (or a typed client) for cross-subgraph queries, block tracking, and pagination.

## Key points

- Static queries + variables improve caching, security, and tooling.
- Use `first` (and `@include`/`@skip`) to limit payload size; batch with one query and fragments for clarity and fewer requests.

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/querying/best-practices/
-->
