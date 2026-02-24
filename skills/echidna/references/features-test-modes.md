---
name: Echidna test modes
description: property, assertion, overflow, exploration, and optimization modes.
---

# Test modes

Set **`testMode`** in config to choose what Echidna checks or optimizes.

## Modes

| testMode | Purpose |
|----------|---------|
| `property` | Falsify `echidna_*` (or custom prefix) boolean invariants. Default. |
| `assertion` | Falsify Solidity `assert(...)`; find inputs that trigger assertion failure. |
| `overflow` | Historical overflow checks (legacy; modern Solidity has built-in checks). |
| `exploration` | Maximize coverage / exploration without a specific invariant. |
| `optimization` | Optimize a numeric return value (e.g. maximize/minimize a function’s return). |

## Property mode

Default. Define functions like `echidna_invariant_name()` returning bool; Echidna tries to find call sequences that make them return false.

## Assertion mode

No need for `echidna_` functions. Echidna tries to reach any `assert(...)` and make it fail. Useful for finding assertion violations (e.g. internal invariants or safety checks).

Example config:

```yaml
testMode: assertion
```

## Exploration mode

Focus on covering as much code as possible. Use when you want to stress the contract or build a corpus without a specific property.

## Optimization mode

Target a function that returns a numeric value; Echidna tries to maximize (or minimize) that value. Used for e.g. “find the maximum value achievable by this function.”

## Key points

- Most use cases: `property` (invariants) or `assertion` (assert failures).
- In assertion mode, ensure the contract under test contains `assert(...)` in reachable code.
- Symbolic execution (see features-symbolic.md) can be combined with assertion mode for deeper exploration.

<!--
Source references:
- https://github.com/crytic/echidna (README.md)
- sources/echidna/README.md
- sources/echidna/tests/solidity/basic/default.yaml
- sources/echidna/tests/solidity/symbolic/verify.yaml
-->
