---
name: features-variables-data-types
description: var (mutable), arrays (known size), field elements; signal arrays; component arrays.
---

# Variables and Data Types

## Variables (var)

Declared with **`var`**; they are **mutable**. Assignment with `=`. No use of `=` inside expressions.

```circom
var x;
x = 234556;
var y = 0;
var z[3] = [1,2,3];
```

Vars hold field values or arithmetic expressions used when building constraints. Array size must be **known at compile time** (constants or template parameters). Declaration like `var z = [2,8,4]` is invalid—size must be explicit: `var z[3] = [2,8,4]`.

## Arrays

- **Var arrays**: `var x[n]`, `var dbl[16][2]`; access `m[i][j]` (no single-bracket matrix style `m[i,j]`).
- **Signal arrays**: `signal input in[3];`, `signal output out[2];` — size fixed, assign by index.
- **Component arrays**: `component c[N];` — same template for all elements, instantiate per index. Inline arrays of buses or anonymous components allowed (2.2.3+).

Array **indices in constraints** must be known (no signal as index). Array **length** must be known (no signal as size).

<!--
Source references:
- https://docs.circom.io/circom-language/variables-and-mutability/
- https://docs.circom.io/circom-language/data-types/
- https://docs.circom.io/circom-language/circom-insight/unknowns/
- https://github.com/iden3/circom
-->
