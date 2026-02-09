---
name: geth
description: Go Ethereum (geth) — CLI, JSON-RPC, Clef, abigen, and developer workflows.
metadata:
  author: hairy
  version: "2026.2.9"
  source: Generated from https://github.com/ethereum/go-ethereum and https://geth.ethereum.org/docs
---

> Skill based on go-ethereum (geth), generated 2026-02-09. Official docs: https://geth.ethereum.org/docs

Go Ethereum (geth) is the Golang execution-layer client for Ethereum. It runs full/archive/light nodes, exposes JSON-RPC over HTTP/WebSocket/IPC, and ships tools like Clef (signer) and abigen (Go contract bindings).

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Overview | What geth is, executables (geth, clef, abigen, evm, rlpdump), common flows | [core-overview](references/core-overview.md) |
| CLI | Command-line options, subcommands, config file (TOML) | [core-cli](references/core-cli.md) |
| JSON-RPC | Transports (HTTP, WS, IPC), namespaces, security | [core-rpc](references/core-rpc.md) |

## Features

### Tools

| Topic | Description | Reference |
|-------|-------------|-----------|
| Clef | Standalone signer, external API, UI API (stdio-ui) | [feature-clef](references/feature-clef.md) |
| abigen | Go contract bindings from ABI/bytecode, deploy and call | [feature-abigen](references/feature-abigen.md) |

## External Links

- [geth.ethereum.org/docs](https://geth.ethereum.org/docs)
- [go-ethereum GitHub](https://github.com/ethereum/go-ethereum)
- [Execution APIs (JSON-RPC)](https://github.com/ethereum/execution-apis)
