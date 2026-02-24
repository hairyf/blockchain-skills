---
name: cairo-derive-and-prelude
description: Derive macro for automatic trait implementations and prelude imports.
---

# Derive Macro and Prelude

The `#[derive(...)]` attribute generates implementations of common traits for structs and enums. The prelude brings standard items into scope.

## Derive

```cairo
#[derive(Copy, Drop, PartialEq)]
struct Foo { x: i32, y: i32 }

#[derive(Copy)]
struct FeltAndT<T, impl TCopy: Copy<T>> { f: felt252, t: T }
```

**Common derived traits:** `Copy`, `Clone`, `Drop`, `Destruct`, `Default`, `Debug`, `Hash`, `PanicDestruct`, `PartialEq`, `Serde`. All members must implement the same trait (or for `Default` on enums, only the `#[default]` variant’s members).

## Key Points

- Use `Drop` for types that can be discarded at scope exit; `Destruct` for types that need explicit teardown (e.g. containing `Felt252Dict`).
- `PanicDestruct` allows safe destruction during panic; required for destructors in panic paths.
- Prelude is automatically applied; no need to import basic types/traits for standard code.

<!--
Source references:
- https://github.com/starkware-libs/cairo
- sources/cairo/docs/reference/src/components/cairo/modules/language_constructs/pages/derive-macro.adoc
- sources/cairo/docs/reference/src/components/cairo/modules/language_constructs/pages/prelude.adoc
-->
