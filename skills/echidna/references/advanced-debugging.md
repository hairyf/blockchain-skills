---
name: Echidna performance debugging
description: Profiling and common causes of slow or memory-heavy campaigns.
---

# Performance debugging

When Echidna is slow or uses a lot of memory, use profiling and known patterns to narrow the cause.

## Profiling

Build with profiling and run with RTS options:

```sh
nix develop   # or nix-shell
cabal --enable-profiling run echidna -- contract.sol --config config.yaml +RTS -p -s
less echidna.prof
```

- **`-p`**: Produces `echidna.prof` with CPU and memory by function.
- **`-s`**: Summary to stderr (allocation, GC).

Inspect the `.prof` file to see which functions dominate CPU or allocation.

## Common causes

From the Echidna README and development notes:

1. **Costly functions in hot paths** — Optimize or reduce calls in the main fuzzing loop.
2. **Lazy data constructors accumulating thunks** — Use `force` from `Control.DeepSeq` to force evaluation and avoid memory buildup.
3. **Inefficient data structures in hot paths** — Replace with structures better suited to the access pattern.

## Reducing campaign cost

- Lower **`testLimit`** or **`seqLen`** for quicker iterations during development.
- Use **`filterFunctions`** to call fewer functions per sequence.
- Disable **`coverage`** or **`corpusDir`** temporarily to see if coverage/bookkeeping is the bottleneck.
- Set **`workers`** to 1 to avoid parallelism overhead when debugging.

## Key points

- Profiling is most reliable when running a minimal repro (small contract, short testLimit).
- For advanced profiling (e.g. eventlog), see GHC documentation or Haskell profiling guides.
- When reporting performance issues, include contract size, config (testLimit, seqLen, workers), and profiler output.

<!--
Source references:
- https://github.com/crytic/echidna (README.md)
- sources/echidna/README.md
- sources/echidna/CLAUDE.md
-->
