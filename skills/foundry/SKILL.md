---
name: foundry
description: Foundry — Forge, Cast, Anvil, Chisel; EVM tooling, cheatcodes, scripting, lint, debugging.
metadata:
  author: hairy
  version: "2026.2.9"
  source: Generated from https://github.com/foundry-rs/foundry, scripts located at https://github.com/antfu/skills
---

> Skill based on Foundry (foundry-rs/foundry), generated 2026-02-09. User docs: https://getfoundry.sh, book: https://book.getfoundry.sh

Foundry is a fast, portable Ethereum dev toolkit (Rust): **Forge** (build, test, fuzz, deploy), **Cast** (EVM interaction), **Anvil** (local node), **Chisel** (Solidity REPL). This skill focuses on agent capabilities — architecture, cheatcodes, scripting, debugging, custom networks, and the linter — from the in-repo dev docs.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Architecture | evm, config, cli crates; where cheatcodes and CLI live | [core-architecture](references/core-architecture.md) |
| Cheatcodes | Vm address, Inspector, adding cheatcodes, Cheatcode trait, JSON spec | [core-cheatcodes](references/core-cheatcodes.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Scripting | forge script flow, broadcast, resume, nonce, multi-chain | [features-scripting](references/features-scripting.md) |
| Debugging | RUST_LOG, tracing filters for forge/cast/anvil | [features-debugging](references/features-debugging.md) |
| Custom Networks | Custom precompiles, evm-networks crate | [features-networks](references/features-networks.md) |
| Lint (forge lint) | Early/late passes, adding lint rules, testing | [features-lint](references/features-lint.md) |

## External Links

- [Foundry Docs](https://getfoundry.sh)
- [Foundry Book](https://book.getfoundry.sh)
- [foundry-rs/foundry GitHub](https://github.com/foundry-rs/foundry)
- [Cheatcodes reference](https://book.getfoundry.sh/cheatcodes)
