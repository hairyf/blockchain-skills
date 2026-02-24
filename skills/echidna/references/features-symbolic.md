---
name: Echidna symbolic execution
description: Enabling symbolic execution worker and SMT solver options.
---

# Symbolic execution

Echidna can run an additional **symbolic execution** worker alongside fuzzing to explore paths that are hard to reach with random inputs. Enable it when you need deeper exploration (e.g. assertion mode or complex conditions).

## Enabling

In config:

```yaml
symExec: true
```

Optional tuning:

| Option | Purpose | Example |
|--------|---------|---------|
| `symExecNSolvers` | Number of SMT solvers | `1` |
| `symExecTimeout` | Timeout per SMT query (seconds) | `30` |
| `symExecMaxIters` | Revisits per branching point | `5` |
| `symExecAskSMTIters` | Revisits before asking SMT for reachability | `1` |
| `symExecTargets` | Whitelist of functions for symbolic exploration | `null` = all |
| `symExecMaxExplore` | Max states to explore | `10` |
| `symExecSMTSolver` | SMT solver: `"cvc5"`, `"z3"`, or `"bitwuzla"` | `"bitwuzla"` |

## Example

From tests (assertion mode + symbolic):

```yaml
testMode: assertion
symExec: true
symExecSMTSolver: z3
workers: 0
seqLen: 1
disableSlither: true
```

`workers: 0` disables parallel fuzzing workers (sometimes used with symbolic to avoid resource contention). `seqLen: 1` is a test choice, not required for symbolic.

## When to use

- **Assertion mode**: Finding inputs that violate `assert(...)` in deep branches.
- **Complex invariants**: When fuzzing alone rarely hits a condition (e.g. specific value or ordering).
- **Research / one-off**: Symbolic execution is heavier; use when you need more completeness on a small target.

## Key points

- Slither may be disabled when using symbolic (e.g. compatibility); set `disableSlither: true` if needed.
- SMT solver must be installed (Bitwuzla, Z3, or cvc5) for symbolic to work.
- Combine with `testMode: assertion` to target assertion failures with symbolic exploration.

<!--
Source references:
- https://github.com/crytic/echidna (README.md)
- sources/echidna/tests/solidity/symbolic/verify.yaml
- sources/echidna/tests/solidity/basic/default.yaml
-->
