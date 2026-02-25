---
name: features-constants
description: Constants — top-level and in contract/trait, virtual, abstract, override.
---

# Constants

Immutable compile-time values. Can be simple, virtual (overridable in contract), or abstract (must be provided by contract).

## Usage

**Simple constant (top-level or in contract/trait):**

```tact
const MY_CONSTANT: Int = 42;

contract C {
    const FEE: Int = ton("0.01");
}
```

**Virtual and abstract in traits:**

```tact
trait MyTrait {
    virtual const MY_FEE: Int = ton("1.0");
}

trait MyAbstractTrait {
    abstract const MY_DEV_FEE: Int;
}

contract MyContract with MyTrait, MyAbstractTrait {
    override const MY_FEE: Int = ton("0.5");
    override const MY_DEV_FEE: Int = ton("1000");
}
```

Use for exit codes, feature flags, or config that the compiler can fold:

```tact
trait Treasure {
    virtual const ENABLE_TIMELOCK: Bool = true;
    receive("Execute") {
        if (self.ENABLE_TIMELOCK) { }
    }
}
contract MyContract with Treasure {
    override const ENABLE_TIMELOCK: Bool = false;  // branch removed at compile time
}
```

## Key points

- Constants are compile-time; no reassignment.
- Virtual: default in trait, overridable with `override` in contract.
- Abstract: no default; contract must declare `override const ...`.
- Trait constructors are not allowed; use constants (or fields) to pass config into traits.

<!--
Source references:
- sources/ton-tact/docs/src/content/docs/book/constants.mdx
-->
