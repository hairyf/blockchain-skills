---
name: Maps in Tact
description: map<K,V>, emptyMap(), allowed key/value types, get/set, serialization, and gas considerations.
---

# Maps

The composite type **`map<K, V>`** associates keys of type `K` with values of type `V`. On TVM, maps are represented as Cells and are gas-intensive; nested maps hit limits sooner.

## Allowed types

- **Keys:** `Int`, `Address` (not optional).
- **Values:** `Int`, `Bool`, `Cell`, `Address`, any struct type, any message type (not optional, no map literals as value type).

## Usage

```tact
let m: map<Int, Int> = emptyMap();
m.set(key, value);
let v: Int? = m.get(key);
// Nested via wrapper struct:
struct AllowanceMap { unbox: map<Address, Int> }
let allowances: map<Address, AllowanceMap> = emptyMap();
```

- **`emptyMap()`** — Create empty map.
- **`.set(k, v)`** — Set entry.
- **`.get(k)`** — Returns optional value; use `!!` after null check or when certain.

## Serialization

Keys and/or values can use [integer serialization](/book/integers#serialization) (e.g. `Int as uint32`) to reduce storage. See the Maps reference for exact syntax (key/value serialization in map type declaration).

## Key points

- Maps are stored as Cells; minimize map usage and depth for gas.
- Use struct wrappers for nested maps: `map<Address, WrapperStruct>` where `WrapperStruct` contains a map.
- Key/value types cannot be optional.

<!--
Source references:
- https://docs.tact-lang.org/book/maps
- sources/ton-tact/docs/src/content/docs/book/maps.mdx
-->
