---
name: features-scoping
description: Scoping of signals, buses, components (top-level or known-condition if); var block scope; component signal visibility.
---

# Scoping

circom uses **static scoping** (C/Rust-like). Signals, buses, and components must be in the **top-level block** of the template or, since 2.1.5, inside an **if** block whose condition is **known** at compile time.

```circom
// Error: aux inside for
for (var i = 0; i < N; i++) {
  signal aux;
  aux <== in[i]*in[i];
}

// OK: signal inside if with known condition
if (i < n) {
  signal out <== 2;
  i = out;
}
```

A signal declared inside an `if` is visible only in that block. **Var** can be in any block; visibility is limited to that block.

## Component and signal visibility

From a template T that has component `c`, only **input and output** signals of `c` are visible as `c.inputName`, `c.outputName`. No access to intermediate signals of `c` or to signals of subcomponents of `c` (e.g. `c.comp2.x` is invalid if `comp2` is inside `c`).

<!--
Source references:
- https://docs.circom.io/circom-language/scoping/
- https://github.com/iden3/circom
-->
