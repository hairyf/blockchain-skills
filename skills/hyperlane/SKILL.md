---
name: hyperlane
description: Interchain messaging with Hyperlane – Mailbox, ISMs, hooks, Warp routes, SDK, CLI, and relayer.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/hyperlane-xyz/hyperlane-monorepo, scripts at https://github.com/antfu/skills
---

> Skill based on Hyperlane monorepo, generated from `sources/hyperlane`. Doc path: `sources/hyperlane/AGENTS.md`, `sources/hyperlane/CLAUDE.md`, `sources/hyperlane/typescript/sdk/README.md`, `sources/hyperlane/typescript/cli/README.md`, `sources/hyperlane/typescript/relayer/README.md`, and Solidity contracts under `sources/hyperlane/solidity/contracts/`.

Hyperlane is an interchain messaging protocol. Apps dispatch messages via the Mailbox on the origin chain; relayers index and deliver them to the destination chain. The stack includes Solidity core contracts (Mailbox, ISMs, hooks, Warp token routes), a TypeScript SDK and CLI, and Rust relayer/validator agents.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Architecture | Message flow, domains, Message format, IMessageRecipient | [core-architecture](references/core-architecture.md) |
| Core contracts | Mailbox, ISMs, hooks, token contracts, Router/GasRouter | [core-contracts](references/core-contracts.md) |
| SDK | MultiProvider, ChainMap, HyperlaneCore, WarpCore, multi-VM | [core-sdk](references/core-sdk.md) |

## Features

### CLI and deployment

| Topic | Description | Reference |
|-------|-------------|-----------|
| CLI | Config create, deploy core/warp, send message, logging | [features-cli](references/features-cli.md) |

### Protocol features

| Topic | Description | Reference |
|-------|-------------|-----------|
| ISMs and hooks | Interchain Security Modules, post-dispatch hooks, gas payment | [features-isms-hooks](references/features-isms-hooks.md) |
| Warp routes | Token bridges (HypERC20, HypNative, etc.), WarpCore | [features-warp-routes](references/features-warp-routes.md) |
| Relayer | HyperlaneRelayer, RelayerService, config, metrics | [features-relayer](references/features-relayer.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Solidity | Security guidelines, storage, external calls, events | [best-practices-solidity](references/best-practices-solidity.md) |
| TypeScript | assert(), ChainMap, MultiProvider, type safety, infra | [best-practices-typescript](references/best-practices-typescript.md) |
