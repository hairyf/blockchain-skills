---
name: stacks
description: Stacks blockchain node and mining — RPC API, testnet transactions, PoX mining, event observer, SIPs, property testing, release process, profiling, and service setup.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/stacks-network/stacks-blockchain, scripts located at https://github.com/antfu/skills
---

> Skill is based on Stacks blockchain (stacks-node v3.3.0.0.5), generated 2026-02-24. Docs: `sources/stacks/docs/`, [docs.stacks.co](https://docs.stacks.co/)

Stacks is a layer-2 blockchain anchored to Bitcoin security, using Proof of Transfer (PoX) for mining and Clarity for smart contracts. This skill covers the reference node (stacks-node): RPC endpoints, testnet tx flow, mining config, event observer, SIPs, property testing, release/branching, profiling, init/service, and CI.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| RPC Endpoints | POST/GET for transactions, accounts, contracts, blocks, PoX, Nakamoto (v2/v3) | [core-rpc-endpoints](references/core-rpc-endpoints.md) |
| Testnet and Transactions | Genesis balance, encode/sign, publish contract, contract-call via blockstack-cli and RPC | [core-testnet-transactions](references/core-testnet-transactions.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Mining (PoX) | Miner config, burn commitment, RBF, fee/cost estimation | [features-mining](references/features-mining.md) |
| Event Dispatcher | events_observer config, events_keys, POST endpoints and payloads | [features-event-dispatcher](references/features-event-dispatcher.md) |
| SIPs | Stacks Improvement Proposals — where they live and how to use them | [features-sips](references/features-sips.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Property Testing | proptest-rs, strategies, assertions, CI (PROPTEST_CASES) | [best-practices-property-testing](references/best-practices-property-testing.md) |
| Release and Branching | Version format, master/develop/release, release steps, hotfixes | [best-practices-release-branching](references/best-practices-release-branching.md) |

## Advanced

| Topic | Description | Reference |
|-------|-------------|-----------|
| Profiling | Logging, mock miner, tip-mine, flamegraph, SQLite profiling | [advanced-profiling](references/advanced-profiling.md) |
| Init and Service | systemd, SysVinit, macOS LaunchAgents, paths and user | [advanced-init-service](references/advanced-init-service.md) |
| CI Workflow | Tests, partitions, release builds, Docker, adding tests | [advanced-ci-workflow](references/advanced-ci-workflow.md) |

## External Links

- [Stacks docs](https://docs.stacks.co/)
- [Stacks blockchain (GitHub)](https://github.com/stacks-network/stacks-blockchain)
- [SIPs (stacksgov/sips)](https://github.com/stacksgov/sips)
