---
name: geth-overview
description: Go Ethereum (geth) — what it is, executables, and main usage flows.
---

# Geth Overview

Go Ethereum (geth) is the Golang execution-layer client for the Ethereum protocol. It runs as a full, archive, or light node and exposes JSON-RPC over HTTP, WebSocket, and IPC.

## Executables (cmd/)

| Command   | Purpose |
|-----------|---------|
| **geth**  | Main Ethereum CLI client; entry point to main/test/private nets. Can run full (default), archive, or light. Exposes JSON-RPC on HTTP, WS, IPC. Use `geth --help` and [CLI docs](https://geth.ethereum.org/docs/fundamentals/command-line-options). |
| **clef**  | Stand-alone signer; can be used as backend for geth (`--signer`). Replaces in-node account management for DApps. |
| **devp2p**| Utilities for P2P layer (discovery, crawl, etc.) without running a full chain. |
| **abigen**| Generates type-safe Go bindings from contract ABI (and optional bytecode). See [Native DApps](https://geth.ethereum.org/docs/developers/dapp-developer/native-bindings). |
| **evm**   | EVM dev tool: run bytecode in a configurable environment for debugging (e.g. `evm --code 60ff60ff --debug run`). |
| **rlpdump**| Converts RLP dumps to a readable hierarchical representation. |

## Common Flows

- **Full node, mainnet**: `geth console` — snap sync (default), then JS console.
- **Testnet (e.g. Holesky)**: `geth --holesky console` — same UX, different datadir (e.g. `~/.ethereum/holesky`), different genesis/bootnodes.
- **Config file**: `geth --config /path/to/config.toml`. Export current flags: `geth --your-flags dumpconfig`.
- **Programmatic access**: Enable `--http` / `--ws` and call [standard JSON-RPC](https://ethereum.org/en/developers/docs/apis/json-rpc/) and [geth-specific APIs](https://geth.ethereum.org/docs/interacting-with-geth/rpc). IPC is on by default and exposes all namespaces.
- **Private / dev**: Post-merge, multi-node private nets need a consensus client. For local testing use [Dev Mode](https://geth.ethereum.org/docs/developers/dapp-developer/dev-mode) or [Simulated Backend](https://geth.ethereum.org/docs/developers/dapp-developer/native-bindings#blockchain-simulator); for multi-node, [Kurtosis](https://geth.ethereum.org/docs/fundamentals/kurtosis).

## Key Points

- Build: `make geth` or `make all`. Requires Go 1.23+ and a C compiler.
- Binaries: https://geth.ethereum.org/downloads/
- Do not expose HTTP/WS with unlocked accounts unless you understand the risk; prefer IPC locally or Clef for signing.

<!--
Source references:
- https://github.com/ethereum/go-ethereum (README.md)
- https://geth.ethereum.org/docs/
-->
