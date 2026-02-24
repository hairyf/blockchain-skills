---
name: features-control-flow
description: if/for/while in circom; known vs unknown conditions; constraint placement; component instantiation order.
---

# Control Flow

Standard constructs: **if (condition) block else block**, **for (init; condition; step) block**, **while (condition) block**. `else` is optional.

## Known vs unknown conditions

- **Constraint rule**: If a constraint is generated inside an `if` or loop, the **condition must be known** at compile time (no signal in the condition). Otherwise: "There are constraints depending on the value of the condition and it can be unknown during the constraint generation phase".
- **Var rule**: A `var` assigned only inside a branch/loop with an **unknown** condition is considered unknown and cannot be used in a constraint.

```circom
// Error: constraint inside if with unknown condition
if (in > N1) { c = A(); }

// OK: no constraint depends on unknown
if (in > N) { t = 2; }

// OK: condition uses only template params
if (N1 > N2) { t = 2; }
x === t;
```

For/while loop bounds and indices used in constraints must be known (template parameters or constants).

## Component instantiation order

Component execution is triggered when **all** its inputs are assigned, not by code order. So instantiation order can differ from the sequence of lines.

```circom
comp2.in[0] <== in[1];
comp2.in[1] <== in[2];
comp1.in[0] <== in[0];
comp1.in[1] <== in[3];
// comp2 may run before comp1
```

<!--
Source references:
- https://docs.circom.io/circom-language/control-flow/
- https://docs.circom.io/circom-language/circom-insight/unknowns/
- https://github.com/iden3/circom
-->
