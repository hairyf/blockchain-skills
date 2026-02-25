---
name: solana-best-practices-compute
description: Optimize Compute Unit (CU) usage on Solana — limits, measurement, logging, data types, serialization, PDAs for agent and program development.
---

# Solana Best Practices — Compute Optimization

Minimizing compute usage improves inclusion likelihood, lowers priority fees, and keeps programs composable. Agents that build or simulate transactions should be aware of CU limits and optimization patterns.

## Compute limits

- **Max per transaction**: 1.4 million CU
- **Max per account per block**: 12 million CU
- **Max per block**: 60 million CU

Hitting per-account-per-block limit can throttle high-throughput use of a single program.

## Measuring compute (Rust programs)

Use the `compute_fn!` macro to measure snippets:

```rust
compute_fn!("My message" => {
    // code to measure
});
```

Output shows CU before/after. Store and reuse PDA bumps instead of calling `find_program_address` repeatedly to save CU.

## Optimization patterns

- **Logging**: Avoid non-essential logs; base58 and string concatenation are expensive. Prefer `.key().log()` for pubkeys.
- **Data types**: Prefer smaller types (e.g. `u8`) when sufficient; larger types cost more CU.
- **Serialization**: Prefer zero-copy / direct account data access where possible; can cut serialization CU significantly.
- **PDAs**: Store the bump in an account and use `create_program_address` with that bump instead of `find_program_address` in hot paths.

## Client-side (agents)

- Simulate transactions to choose a reasonable `SetComputeUnitLimit`; add `SetComputeUnitPrice` for priority when needed.
- Prefer versioned transactions and lookup tables to reduce transaction size and thus cost when many accounts are involved.

## Key points

- Stay under 1.4M CU per transaction; watch per-account-per-block usage at scale.
- Measure with compute_fn!; reduce logging, use smaller types and zero-copy; cache PDA bumps.

<!-- Source: https://solana.com/developers/guides/advanced/how-to-optimize-compute, https://github.com/solana-foundation/solana-com -->
