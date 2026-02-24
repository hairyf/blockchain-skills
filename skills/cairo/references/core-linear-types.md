---
name: cairo-linear-types
description: Move semantics, Copy, Drop, Destruct, Clone, and snapshot (@) for safe resource handling.
---

# Linear Types

Cairo uses move semantics by default: values are used exactly once. Copying and dropping are forbidden unless the type implements the appropriate trait.

## Usage

**Move:** After a value is passed or used, it cannot be used again unless it implements `Copy` or is used via snapshot `@`.

```cairo
struct A {}
fn main() {
    let a = A {};
    foo(a);
    foo(a);  // error: value was previously moved
}
```

**Copy:** Allow multiple uses by copying.

```cairo
#[derive(Copy)]
struct A {}
```

**Drop:** Allow values to go out of scope without being moved.

```cairo
#[derive(Drop)]
struct A {}
fn main() { A {}; }  // ok
```

**Destruct:** For types that cannot be dropped (e.g. contain `Felt252Dict`), provide custom teardown.

```cairo
#[derive(Destruct)]
struct A { d: Felt252Dict<u32> }
```

**Clone:** Explicit copy when `Copy` is not appropriate (e.g. types containing `Array`).

**Snapshot `@T`:** Immutable view; does not move the value. Always copyable and droppable.

## Pitfalls and solutions

| Problem | Solution |
|--------|----------|
| "Value was previously moved" | Use `@` snapshot, `ref` parameter, derive `Copy`/`Clone`, or add impl generic `Copy<T>`/`Clone<T>`. |
| "Value was not dropped" | Derive `Drop` or `Destruct`, deconstruct with `let A { .. } = a` or `match`, or call a function that consumes the value. |

**Restrictions:** `Copy` cannot be implemented if any field is non-copyable (e.g. `Array`). `Drop` cannot be implemented if any field is non-droppable (e.g. `Dict`). Destructors must be `nopanic`.

## Key Points

- Default: move only, no implicit copy or drop.
- Snapshot `@` does not move; use for read-only sharing.
- Use `Destruct` for types holding dictionaries; implement manually as `nopanic` if needed.

<!--
Source references:
- https://github.com/starkware-libs/cairo
- sources/cairo/docs/reference/src/components/cairo/modules/language_semantics/pages/linear-types.adoc
-->
