---
name: foundry-architecture
description: Foundry high-level architecture — evm, config, cli crates and how they fit together.
---

# Foundry Architecture

Foundry is a Cargo workspace. High-level layout:

- **`evm/`** — EVM tooling built around [revm](https://github.com/bluealloy/revm). Implements [cheatcodes](core-cheatcodes.md) (Solidity calls that manipulate execution environment for tests).
- **`config/`** — All Foundry settings and how to load them (e.g. `foundry.toml`).
- **`cli/`** — Core `forge` and `cast` CLI implementation and subcommands.

## Key Points

- Cheatcodes are the main testing hook; they are implemented in the EVM layer and invoked at a fixed address.
- Config is centralized in `config/`; CLIs consume it for forge/cast/anvil/chisel.
- For agent tasks: use `config` for understanding options, `cli` for subcommand behavior, `evm` for test/script execution and cheatcode semantics.

<!--
Source references:
- https://github.com/foundry-rs/foundry/blob/master/docs/dev/architecture.md
- https://github.com/foundry-rs/foundry/blob/master/docs/dev/README.md
-->
