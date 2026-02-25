---
name: core-math
description: Math helpers — min, max, abs, sign, sqrt, log, log2, pow, pow2, divc, muldivc, mulShiftRight, mulShiftRightRound, mulShiftRightCeil.
---

# Math

Numeric helpers for contracts. Prefer specialized functions (log2, pow2) over general (log, pow) for gas.

## Usage

```tact
min(x, y);
max(x, y);
abs(x);
sign(x);        // 1, -1, or 0 (Tact 1.6+)
sqrt(num);      // 500+ gas; rounds to nearest, tie to even
```

**Division and multiplication:**

```tact
divc(x, y);              // ceil(x/y); div by 0 → exit 4
muldivc(x, y, z);        // ceil((x*y)/z)
mulShiftRight(x, y, z);  // floor((x*y)/2^z); z in 0..256
mulShiftRightRound(x, y, z);
mulShiftRightCeil(x, y, z);
```

**Logs and powers:**

```tact
log(num, base);   // floor; num>0, base≥2; prefer log2 for base 2
log2(num);        // cheaper than log(num, 2)
pow(base, exp);   // exp≥0; compile-time when constant
pow2(exp);        // cheaper than pow(2, exp)
```

## Key points

- Negative `num` in sqrt, or invalid range in log/pow, throws exit code 5.
- Constant arguments may be resolved at compile-time (see core-comptime).
- Use arithmetic over branching when possible (e.g. `1 + sign(x)` instead of ternary) for gas.

<!--
Source references:
- sources/ton-tact/docs/src/content/docs/ref/core-math.mdx
-->
