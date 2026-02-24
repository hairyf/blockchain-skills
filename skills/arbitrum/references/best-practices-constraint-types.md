---
name: arbitrum-constraint-types
description: When to avoid primitive constraint wrapper types in Nitro/BoLD Go code.
metadata:
  author: hairy
---

# Constraint Types in Go (Nitro/BoLD)

When a function repeatedly requires a value to satisfy a simple invariant (e.g. “must be positive”), it’s tempting to introduce a constrained type (e.g. `Pos64` wrapping `uint64`) so the invariant is enforced at construction. The Nitro/BoLD decision is to **avoid** such primitive constraint types and keep checking at call sites (status quo).

## Why not constrained wrappers?

Consider a `Pos64` type that only allows positive `uint64`:

- **Pro**: Single check at construction; functions take `Pos64` and don’t re-check.
- **Con**: The type no longer works with operators (`+`, `*`, `-`, `/`); you lose expressiveness and must call `.Val()` or similar everywhere.

The tradeoff was evaluated as:

- **New package (e.g. `util/chk`)**: Expressive and DRY, but operator use is lost.
- **Status quo (check in multiple places)**: Slightly repetitive, but when a function is promoted to public or moved, the invariant still holds at each caller.
- **Minimize checks (only at boundary)**: Fewer checks, but refactors (e.g. making a private function public) can easily introduce bugs.

## Decision

**Status quo**: Keep checking the constraint at each place that needs it (e.g. “virtual must be positive”). Do not introduce a shared constrained wrapper type for primitive values like `uint64` where operator support matters.

## Usage

- When adding new code that assumes “positive” or similar invariants, validate at the boundary (e.g. at public API or at the start of a function that documents the precondition) and document the precondition.
- Do not add a `Pos64`-style type to centralize the check if it would remove use of `+`/`-`/`*`/`/` on the value.

## Key points

- Prefer repeated, explicit checks over a constrained wrapper type when the wrapper would break normal operators.
- Keeping checks at each caller avoids subtle bugs when functions are refactored (e.g. private → public).

<!--
Source references:
- https://github.com/OffchainLabs/nitro (docs/decisions/0001-avoid-primitive-constraint-types.md)
-->
