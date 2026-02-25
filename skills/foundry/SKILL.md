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
| Config | foundry.toml, profiles, compiler, paths, remappings | [core-config](references/core-config.md) |
| Project layout | forge init, src, test, script, lib | [core-project-layout](references/core-project-layout.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Forge build & test | forge build, forge test, snapshot, gas report, fuzz | [features-forge-build-test](references/features-forge-build-test.md) |
| Forge fmt | forge fmt, [fmt] config, --check | [features-forge-fmt](references/features-forge-fmt.md) |
| Contract size | forge build --sizes, 24KB limit | [features-contract-size](references/features-contract-size.md) |
| Forge install | forge install, remappings, lib layout | [features-forge-install](references/features-forge-install.md) |
| Scripting | forge script flow, broadcast, resume, nonce, multi-chain | [features-scripting](references/features-scripting.md) |
| Testing patterns | vm.prank, expectRevert, expectEmit, forge-std Test | [features-testing-patterns](references/features-testing-patterns.md) |
| Coverage & verify | forge coverage, forge verify-contract | [features-coverage-verify](references/features-coverage-verify.md) |
| Invariant testing | invariant_* functions, runs, depth, stateful fuzz | [features-invariant](references/features-invariant.md) |
| Fork testing | createSelectFork, selectFork, activeFork, multi-fork | [features-fork-testing](references/features-fork-testing.md) |
| FFI & signing | vm.ffi, vm.sign, EIP-712 helpers | [features-ffi-signatures](references/features-ffi-signatures.md) |
| State cheatcodes | vm.deal, vm.mockCall, vm.etch | [features-state-cheatcodes](references/features-state-cheatcodes.md) |
| Cast | cast call, send, ABI encode/decode, chain queries | [features-cast](references/features-cast.md) |
| Anvil | Local node, fork, pre-funded accounts, block time | [features-anvil](references/features-anvil.md) |
| Chisel | Solidity REPL for snippets and quick checks | [features-chisel](references/features-chisel.md) |
| Debugging | RUST_LOG, tracing filters for forge/cast/anvil | [features-debugging](references/features-debugging.md) |
| Custom Networks | Custom precompiles, evm-networks crate | [features-networks](references/features-networks.md) |
| Lint (forge lint) | Early/late passes, adding lint rules, testing | [features-lint](references/features-lint.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Testing | Test layout, naming, isolation, CI patterns | [best-practices-testing](references/best-practices-testing.md) |
| Scripting | Broadcast, verify, resume, keys, multi-chain | [best-practices-scripting](references/best-practices-scripting.md) |

## External Links

- [Foundry Docs](https://getfoundry.sh)
- [Foundry Book](https://book.getfoundry.sh)
- [foundry-rs/foundry GitHub](https://github.com/foundry-rs/foundry)
- [Cheatcodes reference](https://book.getfoundry.sh/cheatcodes)
