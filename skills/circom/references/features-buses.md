---
name: features-buses
description: Signal buses—definition, input/output, tagging, nested and parameterized buses; circuit input format.
---

# Buses (circom 2.2+)

**Buses** group related signals under one name (struct-like). They can be inputs, outputs, or intermediates and can be tagged.

## Definition and use

```circom
bus Point() {
  signal x;
  signal y;
}

template Edwards2Montgomery() {
  input Point() {edwards_point} in;
  output Point() {montgomery_point} out;
  out.x <-- (1 + in.y) / (1 - in.y);
  out.y <-- out.x / in.x;
  out.x * (1 - in.y) === (1 + in.y);
  out.y * in.x === out.x;
}
```

Assignments between buses require **same type**; otherwise assign field by field (e.g. `b2.x <== b1.x`). The compiler checks bus type and field tags on instantiation.

## Nested and parameterized buses

Buses can contain other buses (no recursion). Parameters must be known at compile time:

```circom
bus PointN(dim) { signal x[dim]; }
bus Line(dim) {
  PointN(dim) start;
  PointN(dim) end;
}
```

## Circuit inputs (main)

For input buses to main, provide values either as **serialized array** (all fields in definition order) or **JSON** with field names; do not mix within one bus. Public input buses cannot be tagged.

<!--
Source references:
- https://docs.circom.io/circom-language/buses/
- https://github.com/iden3/circom
-->
