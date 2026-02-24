---
name: axelar-core-overview
description: Axelar network overview, axelard binary, Gateway, and cross-chain model
metadata:
  author: hairy
---

# Axelar Overview

Axelar is a cross-chain overlay network that enables cross-chain transfers and General Message Passing (GMP) between connected blockchains. The **axelar-core** app is a Cosmos SDK application that runs the Axelar network; the main binary is **axelard**.

## Key concepts

- **Axelar network**: Cosmos-based chain that coordinates validators, gateway signing, and cross-chain state. Users and contracts interact with it to send assets or messages across chains.
- **Gateway**: On EVM chains, the Axelar Gateway contract holds locked assets and executes commands signed by the network (e.g. mint, transfer, contract calls). Gateway address per chain is stored in the **evm** module.
- **Nexus**: Module that registers chains and assets, tracks cross-chain transfers and general messages, and provides deposit addresses and rate limits.
- **axelard**: CLI and node binary. Use `axelard start` for a full node; use `axelard query` / `axelard tx` for queries and transactions. Default home is `$HOME/.axelar`.
- **vald**: Validator process that participates in TSS keygen/signing and submits signatures for gateway commands. Used with `axelard vald-start` and `axelard vald-sign`.

## Chain types

- **EVM chains**: Integrated via the **evm** module and Gateway contracts (see [features-evm-gateway](features-evm-gateway.md)). Commands are batched and executed on-chain.
- **Cosmos-based chains**: Integrated via **axelarnet** (IBC). Transfers and contract calls are routed through IBC.

## Flow (high level)

1. **Cross-chain transfer**: User locks/sends assets on source chain → Axelar validators observe and create transfer state in nexus → On destination chain, Gateway or IBC releases/mints assets.
2. **General Message**: Source chain emits a message; after approval, it is routed to the destination (e.g. `axelarnet route-message` for Cosmos, or GMP on EVM).
3. **EVM commands**: Validators sign commands; relayers call `execute()` on the Gateway with batched signed commands from `axelard query evm batched-commands` / `latest-batched-commands`.

## Key points

- One **nexus** registry of chains and assets; EVM-specific state (gateway, commands, tokens) lives in the **evm** module.
- Gateway bytecode and contract artifacts are versioned (see repo `contract-version.json` and axelar-cgp-solidity releases); `make generate` produces `x/evm/types/contracts.go` from `contract-artifacts/`.
- Full CLI reference: `docs/cli/toc.md` in the repo; use `axelard <cmd> --help` for flags.

<!--
Source references:
- https://github.com/axelarnetwork/axelar-core (README.md, docs/cli/toc.md)
- https://docs.axelar.dev/
-->
