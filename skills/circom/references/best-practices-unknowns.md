---
name: best-practices-unknowns
description: Known vs unknown at compile time—signals always unknown; constraints in control flow; array indices and sizes; bus parameters.
---

# Known vs Unknown

At compile time, **template parameters** and **constants** are **known**; **signals** are always **unknown**. Expressions that depend on any unknown are unknown.

## Implications

- **Constraints**: Do not generate constraints inside **if** or **for**/ **while** whose condition is unknown. Do not use a **var** that gets its value only in such a branch in a constraint.
- **Array size**: Must be known (constant or template param). `var array[in];` is invalid.
- **Array index in constraints**: Must be known. `out <== array[in];` is invalid (non-quadratic when index is unknown).
- **Bus parameters**: Bus definitions and usages must be parameterized only by known values.
- **Component parameters**: Template arguments at instantiation must be known.

When in doubt, use only template parameters and constants for sizes, indices, and branch conditions that guard constraint generation.

<!--
Source references:
- https://docs.circom.io/circom-language/circom-insight/unknowns/
- https://docs.circom.io/circom-language/control-flow/
- https://github.com/iden3/circom
-->
