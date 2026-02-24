---
name: stacks-profiling
description: Profiling stacks-node and mining — logging, mock miner, tip-mine benchmark, flame graphs, SQLite.
---

# Profiling Stacks-Node and Mining

Techniques to find performance bottlenecks in the mining loop and node: config validation, debug logging, mock miner, event recording, historical mining, and CPU/SQLite profiling.

## Config and logging

Validate config:

```bash
cargo run -r -p stacks-node --bin stacks-node check-config --config ./sample/conf/mainnet-follower-conf.toml
```

Debug logging: `STACKS_LOG_DEBUG=1`. JSON logging: `STACKS_LOG_JSON=1` with feature `slog_json`.

## Mock miner and events

- Set `STACKS_DIR`, `STACKS_WORKING_DIR`, `STACKS_SNAPSHOT_DIR`.
- Download Hiro mainnet archive; extract to working dir. Run node with `mainnet-mockminer-conf.toml`; `$STACKS_WORKING_DIR` overrides config working dir.
- Run `stacks-events` to receive events, then start node with event observer (e.g. `STACKS_EVENT_OBSERVER=localhost:3700`). Archive events to a log file for replay.

## Historical mining (tip-mine)

Snapshot working dir, then run tip-mine benchmark:

```bash
export STACKS_TIP_MINE_BLOCK_HEIGHT=71294
export STACKS_TIP_MINE_NUM_TXS=100
cargo run -F disable-costs -r --bin stacks-inspect tip-mine $STACKS_SNAPSHOT_DIR $STACKS_DIR/events.log $STACKS_TIP_MINE_BLOCK_HEIGHT $STACKS_TIP_MINE_NUM_TXS
```

Use `disable-costs` to ignore block cost limits. Build once then run the binary directly for faster iteration.

## Flame graphs

- **Mac:** Install `flamegraph`; use DTrace:  
  `flamegraph --root -o perf.svg -e cpu-clock --min-width 1 --deterministic -- ./target/release/stacks-inspect tip-mine ...`
- **Linux:** Use `perf` (flamegraph-rs). If system perf is slow, build perf from kernel tree; set `PERF=~/linux/tools/perf/perf` when invoking flamegraph. May need `linker = "clang"` and lld flags in `.cargo/config.toml` (see flamegraph-rs docs).

## SQLite profiling

Enable SQLite trace with feature `profile-sqlite` and debug logging:

```bash
STACKS_LOG_DEBUG=1 cargo run -F profile-sqlite,disable-costs -r --bin stacks-inspect try-mine $STACKS_WORKING_DIR
```

Log lines include query text and millis.

<!--
Source references:
- sources/stacks/docs/profiling.md
- https://github.com/stacks-network/stacks-blockchain
-->
