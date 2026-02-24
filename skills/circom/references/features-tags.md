---
name: features-tags
description: Signal tags (e.g. binary, maxbit)—declaration, inheritance, valued tags; tags on buses.
---

# Signal Tags (circom 2.1+)

Tags annotate signals (e.g. "binary", "maxbit"). The compiler **does not** check validity; the programmer must enforce meaning with constraints.

## Declaration and inheritance

```circom
signal input {binary} in[n];
signal output {maxbit} out;
```

On substitution, tags **inherit**: if `intermediate <== in` and `in` has tag `binary`, `intermediate` is treated as binary for later checks. Outputs can be tagged (e.g. `signal output {binary} out`) when constraints guarantee the property (e.g. via IsZero or explicit constraints).

## Valued tags

Tags can carry a value (e.g. bit width). Set before the signal receives a value; use in expressions with `.`:

```circom
signal output {maxbit} out;
out.maxbit = n;
lc1 ==> out;
```

Modifying a tag value after the signal is assigned is an error. For arrays, the tag applies to the whole array; access via the array name, e.g. `out.max = 10`.

## Tags on buses

Buses and their fields can be tagged in the same way (see buses reference).

<!--
Source references:
- https://docs.circom.io/circom-language/tags/
- https://github.com/iden3/circom
-->
