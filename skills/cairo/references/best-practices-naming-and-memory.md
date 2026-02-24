---
name: cairo-naming-and-memory
description: Naming conventions and memory/struct usage patterns for Cairo.
---

# Naming and Memory Practices

Follow Cairo naming conventions for consistency and tooling. Be aware of immutable memory and struct copy semantics when writing performance-sensitive code.

## Naming

| Item           | Convention   |
|----------------|-------------|
| Modules        | snake_case  |
| Types, traits  | PascalCase  |
| Enum variants | PascalCase  |
| Struct fields  | snake_case  |
| Functions, methods, variables | snake_case |
| Constants      | UPPER_CASE  |
| Type parameters| PascalCase (often single letter e.g. T) |

- Acronyms: `L1Handler` not `L1_Handler`; `rpc_call` not `RPC_call`.
- Avoid single-letter words except as last word or digit: `contract_class` not `c_class`.
- Unused variables must be prefixed with `_` (e.g. `_` or `_unused`).

## Memory and structs

- **Struct mutation:** Assigning to a member with `.` copies the whole struct. For multiple field updates, prefer one full struct literal assignment to avoid repeated copies.
- **Arrays:** No in-place element mutation; use `.append()` and `.pop_front()`. Iterate with `.span()` to avoid consuming the array.
- **Dictionaries:** Use `entry(key)` + `finalize(value)` for read-modify-write; types containing `Felt252Dict` must derive `Destruct`.

## Key Points

- Consistent naming improves readability and allows linter warnings.
- Minimize struct copies in hot paths; use snapshots `@` when only reading.
- Prefer `Span` and `entry`/`finalize` patterns over repeated indexing or redundant copies.

<!--
Source references:
- https://github.com/starkware-libs/cairo
- sources/cairo/docs/reference/src/components/cairo/modules/language_constructs/pages/naming-conventions.adoc
- sources/cairo/docs/reference/src/components/cairo/modules/language_constructs/pages/structs.adoc
- sources/cairo/docs/reference/src/components/cairo/modules/language_constructs/pages/array-types.adoc
-->
