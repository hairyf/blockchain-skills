---
name: Gas balancing
description: Gas cost calibration for syscalls — reference hardware, full and targeted balancing with lotus-bench.
---

# Gas Balancing

Gas balancing aligns syscall gas costs with a target of ~10 gas per nanosecond on reference hardware (TR3970x, 128GB RAM). Used by protocol/actor developers and node operators tuning or auditing gas.

## Full gas balancing (lotus-bench)

- **Enable tracing**: Set `EnableDetailedTracing = true` in `chain/vm/runtime.go` before building.
- **Import and trace**: `./lotus-bench import --car <path-to-CAR-export> [--start-epoch N] [--end-epoch M]`. State for start-epoch must be in the CAR or already computed. Produces **bench.json** (all syscalls and timings; can be large).
- **Analyze**: `./lotus-bench import analyze bench.json`. Outputs means, standard deviations, covariances in nanoseconds; target gas ≈ 10× nanosecond value. Use correlation strength when covariances are used.
- **Special case**: OnIpldPut compute gas is based on flush-to-disk time; during execution objects are in memory. Use `vm/flush_copy_ms` and `vm/flush_copy_count` to estimate OnIpldPut compute cost.

## Targeted gas balancing (single syscall)

When full balancing is infeasible (new syscall or cost), use **in-vivo** benchmarks: run the syscall during real block execution. In-vitro (standalone) benchmarks are often inaccurate.

- **Hook**: Best place is the message execution loop in `chain/stmgr/stmgr.go`, `ApplyBlocks()`. Optionally run once every N messages if the syscall is expensive.
- **Measure**: Time the syscall in context; convert to gas with same 10 gas/ns target.

## Usage for agents

- When adding or changing syscall costs: run lotus-bench import on a representative chain export (mainnet or testnet slice), then analyze bench.json and map ns → gas. For single-syscall work, add a timed hook in ApplyBlocks and compute gas from observed time.
- Do not rely on standalone micro-benchmarks for final gas values; use chain execution context.

## Key points

- Reference hardware may change; document what you used when publishing gas updates.
- bench.json size can be very large; ensure sufficient disk for import.
- OnIpldPut and any syscall that does I/O need special handling (flush metrics or in-vivo with real storage).

<!--
Source references:
- sources/filecoin/documentation/misc/gas_balancing.md
- chain/vm/runtime.go (EnableDetailedTracing)
- chain/stmgr/stmgr.go (ApplyBlocks)
-->
