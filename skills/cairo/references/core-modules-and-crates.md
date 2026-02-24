---
name: cairo-modules-and-crates
description: Cairo modules, crates, and use declarations for organizing and importing code.
---

# Modules and Crates

Crates are single compilation units with a root directory and root module in `lib.cairo`. Modules are named containers for items (structs, enums, functions, constants, traits).

## Usage

**Define a module** inline or in a separate file. File path follows the module hierarchy: `crate_name::a::b::c` → `<crate_root>/a/b/c.cairo`.

```cairo
// a.cairo

mod foo {
    // items
}

mod bar;  // defined in a/bar.cairo
```

**Scope:** Items in outer modules are not visible in inner modules. Use full paths or `use` to refer to them. Use `super` for the parent module.

```cairo
struct A {}
struct B {}

mod foo {
    use super::B;
    fn bar() {
        super::A {};  // allowed
        B {};         // allowed (imported)
        // A {};      // error: not in scope
    }
}
```

## Key Points

- One crate = one compilation unit; root = `lib.cairo`.
- Module hierarchy is defined by `mod` definitions; submodules use their name, parent uses `super`.
- Import with `use path::to::Item` or `use path::to::Item as Alias`.

<!--
Source references:
- https://github.com/starkware-libs/cairo
- sources/cairo/docs/reference/src/components/cairo/modules/language_constructs/pages/modules-and-source-files.adoc
-->
