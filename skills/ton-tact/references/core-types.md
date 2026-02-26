---
name: Tact type system
description: Primitive and composite types in Tact — Int, Bool, Address, Cell/Builder/Slice, String, optionals, maps, structs, messages, contracts, traits.
---

# Tact type system

Tact is statically typed. Every variable and value has a type: either a **primitive** or a **composite** type. Many types can be optional (`T?`).

## Primitive types

- **`Int`** — All numbers are 257-bit signed integers. Use [serialization](/book/integers#serialization) (e.g. `Int as uint32`) to reduce storage cost.
- **`Bool`** — `true` / `false`. Storing booleans is cheap (1 bit).
- **`Address`** — TON smart contract address.
- **`Cell`**, **`Builder`**, **`Slice`** — TVM primitives for data; see [Cells, Builders, Slices](/book/cells).
- **`String`** — Immutable text.
- **`StringBuilder`** — Gas-efficient string concatenation.

No implicit type conversion; e.g. adding two booleans is invalid.

## Composite types

- **`map<K, V>`** — Keys of type `K` to values of type `V`. Keys: `Int` or `Address`; values: primitives, structs, or message types. Create with `emptyMap()`.
- **Structs and messages** — Combine multiple fields; see [Structs and messages](/book/structs-and-messages). Structs are plain data; messages have a 32-bit opcode for routing.
- **Optionals** — Any primitive or struct/message type can be nullable: `T?` (includes `null`). Use `!!` for non-null assertion.
- **`bounced<M>`** — Only in bounced message receivers; partial representation of message `M` that fits bounce payload limits (≤224 bits of payload).

Contracts and traits are part of the type system but cannot be passed like structs; use `initOf` to get a contract’s initial state.

## Key points

- Prefer unsigned integer serialization (`Int as uint32`, etc.) to avoid sign-related bugs.
- Message opcodes can be auto-generated or set manually: `message(0x7362d09c) TokenNotification { ... }`.
- Map key/value types cannot be optional; nested optionals (`Int??`) are not allowed.

<!--
Source references:
- https://docs.tact-lang.org/book/types
- sources/ton-tact/docs/src/content/docs/book/types.mdx
- sources/ton-tact/docs/src/content/docs/zh-cn/book/types.mdx
-->
