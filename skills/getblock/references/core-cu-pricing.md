---
name: getblock-cu-pricing
description: GetBlock Compute Units (CU) — how CUs are calculated (chain × method multiplier), plan limits, and why it matters for heavy vs light calls.
---

# GetBlock Compute Units (CU)

Shared node plans use **Compute Units (CU)** to measure and price API usage. One request can cost multiple CUs depending on chain and method.

## Formula

```text
Total CU = Chain Multiplier × Method Multiplier
```

- **Chain multiplier**: Reflects network resource intensity (e.g. Ethereum 20, Solana/Sui/TON 50, Bitcoin 10).
- **Method multiplier**: Light methods (e.g. `eth_blockNumber`) = 1; heavy methods (e.g. `trace_replayBlockTransactions`, archive/trace) have higher multipliers.

Example: `debug_traceTransaction` on Ethereum = 20 × 2 = **40 CU**.

## Why it matters for agents

- Prefer light methods when only block number or single tx is needed; avoid trace/replay when not required.
- Archive and trace calls consume more CUs; use when necessary for historical state or debugging.
- CU balance is shared across all shared-node endpoints; track usage on the dashboard.

## Plans (summary)

Free: 50k CU/day, 20 RPS, 2 tokens. Paid tiers: higher CU/month, RPS, and token limits. Dedicated nodes are not CU-limited. See GetBlock pricing page for exact plan table.

<!--
Source references:
- https://github.com/GetBlock-io/getblock-docs
- getting-started/plans-and-limits/what-counts-as-a-cu.md
- getting-started/plans-and-limits/cu-and-rate-limits.md
-->
