---
name: foundry-debugging
description: Debugging Foundry (forge, cast, anvil) — RUST_LOG, tracing filters, dbg!.
---

# Debugging Foundry

Foundry binaries use the [tracing](https://docs.rs/tracing/latest/tracing/) crate. A console formatter is installed for `forge`, `cast`, and `anvil`.

## RUST_LOG

Set `RUST_LOG=<filter>` to increase verbosity. Examples:

- `RUST_LOG=forge` — all logs from the `forge` crate
- `RUST_LOG=cast` — all logs from the `cast` crate

Valid log levels: `error`, `warn`, `info`, `debug`, `trace`. Filter syntax is described in [tracing-subscriber](https://docs.rs/tracing-subscriber).

## Key Points

- Use `RUST_LOG=debug` or `RUST_LOG=trace` for troubleshooting CLI or execution; scope by crate name (e.g. `forge`, `cast`) to reduce noise.
- For Rust code, `dbg!` from the standard library is also available.
- When helping users: suggest enabling `RUST_LOG` and reproducing the issue to capture internal state.

<!--
Source references:
- https://github.com/foundry-rs/foundry/blob/master/docs/dev/debugging.md
- https://github.com/foundry-rs/foundry/blob/master/crates/cli/README.md
-->
