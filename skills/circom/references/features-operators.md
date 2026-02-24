---
name: features-operators
description: circom operators—field arithmetic, boolean, relational, bitwise; precedence (Rust-like); conditional ? : at top level only.
---

# Basic Operators

Arithmetic is modulo p (default bn128 prime). Precedence and associativity follow Rust.

## Field and conditional

- **Conditional** (top-level only, no nesting): `condition ? true_value : false_value`
- **Arithmetic**: `+`, `-`, `*`, `**`, `/`, `\` (integer division), `%`; compound `+=`, `-=`, `*=`, `**=`, `/=`, `\=`, `%=`, `++`, `--`
- **Boolean**: `&&`, `||`, `!`
- **Relational**: `<`, `>`, `<=`, `>=`, `==`, `!=` — defined via `val(x)` (signed interpretation in Z/pZ)

## Bitwise (mod p)

`&`, `|`, `~`, `^`, `>>`, `<<` and compound `&=`, `|=`, `^=`, `>>=`, `<<=`.

Shift semantics: for small k, `x >> k = x/(2**k)`; left shift uses field size and mask. For k in upper half, shifts wrap (e.g. `x >> k` becomes `x << (p-k)`).

## Example: IsZero and Num2Bits

```circom
template IsZero() {
  signal input in;
  signal output out;
  signal inv;
  inv <-- in!=0 ? 1/in : 0;
  out <== -in*inv + 1;
  in*out === 0;
}

template Num2Bits(n) {
  signal input in;
  signal output out[n];
  var lc1=0, e2=1;
  for (var i = 0; i<n; i++) {
    out[i] <-- (in >> i) & 1;
    out[i] * (out[i] - 1) === 0;
    lc1 += out[i] * e2;
    e2 = e2 + e2;
  }
  lc1 === in;
}
```

<!--
Source references:
- https://docs.circom.io/circom-language/basic-operators/
- https://github.com/iden3/circom
-->
