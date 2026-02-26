---
name: Rust to TypeScript Type Conversion
description: How Anchor maps Rust types to TypeScript/IDL for client use.
---

# Type Conversion (Rust ↔ TypeScript)

When building or parsing instruction data and account data, the client uses these mappings.

## Primitives

| Rust | TypeScript | Example |
|------|------------|---------|
| bool | boolean | true |
| u8..i32 | number | 99 |
| u64, u128, i64, i128 | BN (e.g. anchor.BN) | new anchor.BN(99) |
| f32, f64 | number | 1.0 |
| String | string | "hello" |

## Collections

| Rust | TypeScript |
|------|------------|
| [T; N] | T[] |
| Vec<T> | T[] |
| Option<T> | T \| null \| undefined |

## Structs and enums

- **Structs** – Map to TS object types; field names and types match.
- **Enums** – Unit variant → `{ variant: {} }`; named → `{ variant: { field: value } }`; tuple → `{ variant: [a, b] }`.

Use the generated types in `target/types/<program>.ts` for type-safe clients.

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/references/type-conversion.mdx)
-->
