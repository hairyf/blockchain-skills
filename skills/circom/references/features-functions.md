---
name: features-functions
description: circom functions—pure computations, no signals or constraints; return on every path.
---

# Functions

Functions compute values or expressions. They **cannot** declare signals or generate constraints (use templates for that).

## Syntax and rules

```circom
function funid(param1, ..., paramn) {
  // ...
  return x;
}
```

- Parameters and return can be numeric or arrays.
- Functions can be recursive.
- **Every execution path must end in a return**; otherwise: "In funid there are paths without return".
- Any use of signal or constraint operators inside a function causes "Template operator found".

## Example

```circom
function nbits(a) {
  var n = 1, r = 0;
  while (n-1 < a) {
    r++;
    n *= 2;
  }
  return r;
}
```

Use functions for compile-time or witness-time computations (e.g. array sizes, coefficients); use templates for circuit structure and constraints.

<!--
Source references:
- https://docs.circom.io/circom-language/functions/
- https://github.com/iden3/circom
-->
