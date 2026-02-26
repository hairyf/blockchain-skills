---
name: Optionals in Tact
description: Optional types T?, null, non-null assertion !!, and constraints (no optional map keys, no nested optionals).
---

# Optionals

Any [primitive](/book/types#primitive-types), [struct][struct], or [message][message] type can be nullable by adding `?`: e.g. `Int?`, `Address?`, `MyStruct?`. The value can be `null` or a value of the inner type.

## Declaration and use

```tact
struct StOpt { opt: Int?; }
message MsOpt { opt: StOpt?; }

contract Optionals(opt: Int?, address: Address?) {
    fun reset(opt: Int?) {
        self.opt = opt;
        self.address = null;
    }
    receive(msg: MsOpt) {
        let opt: Int? = 12;
        if (msg.opt != null) {
            self.reset(msg.opt!!.opt);  // !! = non-null assertion
        }
    }
}
```

- Optional struct/message fields default to `null` if not provided.
- Local variables of optional type must be initialized (e.g. `let x: Int? = null;`).
- Use **`!!`** to assert non-null when you've already checked.

## Constraints

- **Map** key and value types cannot be optional: `map<Int?, Int>` is invalid.
- **Nested optionals** are not allowed: `Int??` is invalid.
- **`bounced<M>`** inner type cannot be optional.

## Key points

- Prefer `if (x != null) { use(x!!) }` or explicit checks over blind `!!`.
- For `let x: T? = null` you must give the type; it cannot be inferred.

<!--
Source references:
- https://docs.tact-lang.org/book/optionals
- sources/ton-tact/docs/src/content/docs/book/optionals.mdx
-->
