---
name: hardhat
description: Hardhat — Ethereum development environment (Runner, Network, Ignition, config, tasks, plugins, testing, deployment).
metadata:
  author: hairy
  version: "2026.2.9"
  source: Generated from https://github.com/NomicFoundation/hardhat and https://hardhat.org/docs
---

> Skill based on Hardhat (NomicFoundation/hardhat), generated 2026-02-09. Official docs: https://hardhat.org/docs

Hardhat is an Ethereum development environment: task runner (compile, test, run, node), built-in Hardhat Network, Hardhat Ignition for declarative deployment, and plugins (toolbox ethers/viem, Chai matchers, verify, etc.).

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Getting started | Init, tasks, compile/test/deploy flow | [core-getting-started](references/core-getting-started.md) |
| Configuration | hardhat.config, networks, solidity, paths, mocha | [core-config](references/core-config.md) |
| HRE | Hardhat Runtime Environment, network, artifacts, config | [core-hre](references/core-hre.md) |
| Compiler config | Solidity version, optimizer, viaIR, settings | [core-compiler-config](references/core-compiler-config.md) |
| Build profiles | default vs production, --build-profile, solidity.profiles | [core-build-profiles](references/core-build-profiles.md) |
| Config variables | configVariable, keystore, secrets, env | [core-config-variables](references/core-config-variables.md) |
| Tasks and plugins | HRE, tasks, plugins, creating tasks | [core-tasks-plugins](references/core-tasks-plugins.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Hardhat Network | In-process vs node, JSON-RPC, forking, network helpers | [features-network](references/features-network.md) |
| Hardhat Ignition | Declarative deployment, buildModule, Future, deploy | [features-ignition](references/features-ignition.md) |
| Deployment overview | Ignition vs scripts, network and keystore setup | [features-deployment-overview](references/features-deployment-overview.md) |
| Deployment scripts | viem/ethers deploy in scripts, hardhat run, --build-profile | [features-deployment-scripts](references/features-deployment-scripts.md) |
| Multichain | Chain types (l1, op), --chain-type, network.connect chainType | [features-multichain](references/features-multichain.md) |
| Testing | loadFixture, Chai matchers, network helpers | [features-testing](references/features-testing.md) |
| Testing (Viem + node:test) | hre.network.connect, viem assertions, network helpers | [features-testing-viem](references/features-testing-viem.md) |
| Solidity tests | .t.sol, setUp, fuzz, forge-std, cheatcodes | [features-testing-solidity](references/features-testing-solidity.md) |
| Code coverage | --coverage, LCOV, HTML report | [features-testing-coverage](references/features-testing-coverage.md) |
| Gas statistics | --gas-stats, per-function and deployment gas | [features-testing-gas-stats](references/features-testing-gas-stats.md) |
| Toolbox and verify | Ethers vs Viem toolbox, contract verification | [features-toolbox-verify](references/features-toolbox-verify.md) |

## Advanced

| Topic | Description | Reference |
|-------|-------------|-----------|
| Cheatcodes | vm.prank, time, and other Solidity test cheatcodes | [advanced-cheatcodes](references/advanced-cheatcodes.md) |

## External Links

- [Hardhat docs](https://hardhat.org/docs)
- [Hardhat Runner](https://hardhat.org/hardhat-runner)
- [Hardhat Network](https://hardhat.org/hardhat-network/docs)
- [Hardhat Ignition](https://hardhat.org/ignition/docs)
- [NomicFoundation/hardhat](https://github.com/NomicFoundation/hardhat)
