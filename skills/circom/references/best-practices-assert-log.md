---
name: best-practices-assert-log
description: assert (compile-time vs witness-time) and log() for debugging circuits.
---

# Assert and Log

## assert(condition)

- **Known condition** (only template params/constants): evaluated at **compile time**. If false, compilation fails with "False assert reached".
- **Unknown condition** (involves signals): an **assert** is emitted in the **witness generation** code. If the condition fails at witness time, the witness is not produced.

```circom
assert(n > 0);           // compile-time if n is template param
assert(in <= 254);       // witness-time check
```

Constraints added with **`===`** also insert an assert in the witness by default; disable with **`--sanity_check 0`**.

## log (debugging)

**`log(expr)`** / **`log("msg", expr1, expr2, ...)`** / **`log()`** (newline) — prints to **stderr** during witness generation. Use for debugging only; no stdin/stdout. Parameters must be non-conditional expressions (no `? :` in the logged expression).

```circom
log(135);
log("value of c.b is", c.b);
log();
```

<!--
Source references:
- https://docs.circom.io/circom-language/code-quality/code-assertion/
- https://docs.circom.io/circom-language/code-quality/debugging-operations/
- https://github.com/iden3/circom
-->
