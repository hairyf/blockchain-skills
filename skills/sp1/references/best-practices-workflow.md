---
name: sp1-best-practices-workflow
description: Recommended development workflow and performance tips for SP1.
---

# SP1 Best Practices and Workflow

## Develop with execute-only first

While iterating on the program, run only execution (no proof):

```rust
let (public_values, report) = client.execute(ELF, &stdin).run().unwrap();
```

Check that `public_values` and the execution report (cycle counts, etc.) match expectations. Proof generation will only succeed if execution is correct; proving is slower and more resource-heavy. For programs over ~1M cycles, prefer execute-only during day-to-day dev and run full proving in CI or before release.

## Reuse ProverClient

Create `ProverClient` once and reuse it. Initialization loads proving parameters and can be slow. For concurrent or repeated use, wrap in `Arc<ProverClient>`.

## Crate layout

Keep the program crate (the one with `sp1_zkvm::entrypoint!(main)`) minimal. Put business logic in a separate crate that the program depends on. Benefits:

- Unit test the logic without the zkVM target.
- Share types between program and script.
- Clear separation between “proved entrypoint” and “reusable logic.”

## Prover network for production

For non-trivial or production workloads, use the Succinct Prover Network instead of local CPU proving. Set the appropriate env (e.g. `SP1_PROVER`) and use the same `ProverClient` API; proofs are generated in the cloud with better latency and cost. See the prover network docs for setup.

## Cycle count and cost

Use the execution report’s cycle (and syscall) counts to estimate proving time and cost. Small programs have a large fixed overhead; per-cycle efficiency improves for larger programs.

## Debugging

- **Constraint failures**: run tests with `RUST_LOG=info RUST_BACKTRACE=1` and the `--features debug` feature to get clearer failure info.
- **Recursion panics**: use `RUST_BACKTRACE=1 RUSTFLAGS="-g" SP1_DEBUG=true` when running recursion tests.

<!--
Source references:
- https://docs.succinct.xyz/docs/sp1/getting-started/recommended-workflow
- sources/sp1/DEVELOPMENT.md
- sources/sp1/crates/recursion/README.md
-->
