---
name: features-anonymous-tuples
description: Anonymous components, tuples for multiple outputs, _ for ignored outputs, array element-wise <==.
---

# Anonymous Components and Tuples

## Anonymous component syntax

**`temp_name(args)(inputs)`** — instantiate template, assign inputs, and (optionally) capture output in one expression. Inputs can be given by position or by name (since 2.1.1): `Template(n)(b <== in[1], a <== in[0])`.

```circom
// Instead of component + manual wiring:
signal out <== A(n)(in[0], in[1]);
```

Only **`<==`, `==>`, `=`** are allowed for anonymous component output (not `<--`/`-->`). For **multiple outputs** use a **tuple**:

```circom
signal output o1, o2, o3;
(o1, o2, o3) <== Temp(args)(inputs);
```

**No output**: use as statement `Temp(args)(inputs);`.

## Ignoring outputs with _

Use **`_`** to ignore one or more outputs:

```circom
_ <== A(n)(in[0], in[1], in[2]);
(_, out1, _) <== A(n)(in);
```

Useful with `--inspect`: `_ <== comp.out;` or `_ <== comp.out[i]` to mark intentionally unused signals.

## Tuples and element-wise array assignment

Tuples allow multiple assignment: `(a, b, c) = (1, a+1, A(2));` (element-wise, left-to-right). For **signal arrays** of the same size, **`out <== in`** is element-wise:

```circom
signal input in[n];
signal output out[n];
out <== in;
```

Same size required. Combines naturally with anonymous components: `o <== Ex(4,4)(i);` where `Ex` has input/output arrays.

<!--
Source references:
- https://docs.circom.io/circom-language/anonymous-components-and-tuples/
- https://github.com/iden3/circom
-->
