---
name: thegraph-best-practices-timeseries
description: Timeseries and aggregations — @entity(timeseries: true), @aggregation, intervals, dimensions; faster indexing and queries.
---

# The Graph — Timeseries and Aggregations

Timeseries entities store immutable, time-ordered data points; aggregation entities compute sums, counts, min/max, etc. over intervals. This reduces mapping work and speeds up queries (spec 1.1.0+).

## Timeseries entity

- **Annotation**: `@entity(timeseries: true)`. Timeseries entities are always immutable.
- **Required fields**: `id: Int8!` (auto-incremented), `timestamp: Timestamp!` (block timestamp).
- **Use**: Raw data points (e.g. price, amount per block or event).

```graphql
type Data @entity(timeseries: true) {
  id: Int8!
  timestamp: Timestamp!
  amount: BigDecimal!
}
```

## Aggregation entity

- **Annotation**: `@aggregation(intervals: ["hour", "day"], source: "Data")` — source is the timeseries entity name.
- **Fields**: `id`, `timestamp`, plus fields with `@aggregate(fn: "sum"|"count"|"min"|"max"|"first"|"last", arg: "fieldOrExpression", cumulative: true?)`.
- **arg**: Field name from the source entity or an expression (e.g. `priceUSD * amount`). Supports SQL-like expressions.

```graphql
type Stats @aggregation(intervals: ["hour", "day"], source: "Data") {
  id: Int8!
  timestamp: Timestamp!
  sum: BigDecimal! @aggregate(fn: "sum", arg: "amount")
  count: Int8! @aggregate(fn: "count", cumulative: true)
}
```

## Dimensions

Non-aggregated fields in the aggregation entity group data (e.g. per token). Include them in the source timeseries and in the aggregation entity; use them in query `where` to filter by dimension and time range.

## Querying

Use the aggregation's query field with `interval`, `where` (dimensions + `timestamp_gte` / `timestamp_lt` in microseconds). Optional `current` can include the current partial interval.

## Key points

- Use timeseries for high-volume, append-only data; aggregations for precomputed rollups.
- Prefer database-managed aggregations over doing the same in mapping code.

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/best-practices/timeseries/
- https://github.com/graphprotocol/graph-node/blob/master/docs/aggregations.md
-->
