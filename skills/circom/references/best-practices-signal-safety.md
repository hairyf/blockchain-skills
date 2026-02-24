---
name: best-practices-signal-safety
description: Prefer <==/==>; use <--/--> only when necessary and add ===; use --inspect to catch underconstrained and replaceable <--.
---

# Signal and Constraint Safety

## Prefer constrained assignment

Use **`<==`** and **`==>`** so the compiler adds the matching R1CS constraint. Reserve **`<--`** and **`-->`** for expressions that cannot be written as quadratic constraints (e.g. bit extraction, conditional inverse).

When using `<--`, **always** add an explicit **`===`** constraint that defines the relationship (e.g. `out[k] * (out[k]-1) === 0` for a bit, or `a*c === b` when `a <-- b/c`).

## Use --inspect

Compile with **`--inspect`** to get warnings for:

- Signals (including subcomponent I/O) that do not appear in any constraint — fix or mark with `_ <== signal;` if intentional.
- Assignments **`<--`** that could be **`<==`** (e.g. `out <-- in/4` when `in/4` is linear) — replace with `<==` when suggested.

Addressing these reduces risk of underconstrained or inconsistent circuits.

<!--
Source references:
- https://docs.circom.io/circom-language/signals/
- https://docs.circom.io/circom-language/constraint-generation/
- https://docs.circom.io/circom-language/code-quality/inspect/
- https://github.com/iden3/circom
-->
