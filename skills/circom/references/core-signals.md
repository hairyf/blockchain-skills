---
name: core-signals
description: Signals in circom—input, output, intermediate; assignment operators and when to use <== vs <--; public vs private; immutability.
---

# Signals

Signals hold field elements in Z/pZ. Declare with `signal input`, `signal output`, or plain `signal` (intermediate). Arrays: `signal output out[N]`.

## Assignment operators

- **`<==` / `==>`** — Assign and add an R1CS constraint (safe). Prefer these.
- **`<--` / `-->`** — Assign only in witness; no constraint (dangerous). Use only when the expression cannot be expressed as a quadratic constraint (e.g. bit extraction); then add an explicit `===` constraint.

```circom
// Safe: constraint out === in[0]*in[1] is added
out <== in[0] * in[1];

// Dangerous: no constraint; must add one manually
out[k] <-- (in >> k) & 1;
out[k] * (out[k] - 1) === 0;  // enforce binary
```

Signals are **immutable**: once assigned, value cannot change. Double assignment is a compile error. At compile time signals are always treated as **unknown** (even if assigned a constant).

## Public vs private

Only the **main** component distinguishes public/private. Declare public inputs as `component main {public [in1,in2]} = MyTemplate();`. All outputs of main are public; inputs not in the list are private. Intermediate signals are never public.

```circom
component main {public [in1,in2]} = Multiplier2();
```

Output and intermediate signals can be initialized at declaration (since 2.0.4): `signal output out <== in1 * in2;`.

## Key points

- Use `<==`/`==>` unless the expression is non-quadratic; then use `<--`/`-->` and add `===` constraints.
- Only main’s input list and all of main’s outputs are visible outside the circuit.
- Access component I/O via dot notation (e.g. `comp.out`); intermediate signals are not visible.

<!--
Source references:
- https://docs.circom.io/circom-language/signals/
- https://github.com/iden3/circom
-->
