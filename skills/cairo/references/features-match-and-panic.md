---
name: cairo-match-and-panic
description: Match expressions (enums and felt252) and panic, nopanic, and panic_with.
---

# Match and Panic

Match expressions select code by pattern; panic aborts execution unrecoverably. Functions can be marked `nopanic` or use `panic_with` for Option/Result.

## Match

**On enums:** One arm per variant; bind variant data. Arms that don’t return or panic must have the same type.

```cairo
match enum_var {
    Variant0(a, b, c) => { ... }
    Variant1(_) => { ... }
}
```

**On felt252:** Literal `0` and wildcard `_` only.

```cairo
match felt_var {
    0 => { ... }
    _ => { ... }
}
```

## Panic

**Basics:** `panic(data: Array<felt252>) -> never`. Panic runs destructors (Drop/Destruct) for live values so execution stays provable.

**nopanic:** Only nopanic functions can be called from a nopanic function. Trait functions marked `nopanic` require all impls to be nopanic (e.g. `Destruct::destruct`).

**panic_with:** For functions returning `Option` or `Result`; on `None`/`Err` call panic with given data and optionally create a wrapper (e.g. `unwrap`).

```cairo
#[panic_with('got none value', unwrap)]
fn identity(value: Option<u128>) -> Option<u128> { value }
```

## Key Points

- Match is exhaustive; use `_` for catch-all on felt252.
- Destructors must be nopanic because they run during panic.
- Use `panic_with` to get consistent panic messages and wrapper helpers.

<!--
Source references:
- https://github.com/starkware-libs/cairo
- sources/cairo/docs/reference/src/components/cairo/modules/language_constructs/pages/match-expressions.adoc
- sources/cairo/docs/reference/src/components/cairo/modules/language_constructs/pages/panic.adoc
-->
