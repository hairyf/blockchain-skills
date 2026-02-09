---
name: ton-contract-development
description: First smart contract on TON, storage, messages, get methods, Tolk.
---

# Contract Development on TON

## Contract layout

On-chain, a contract has **code** (TVM instructions) and **data** (persistent state), stored at one [address](/foundations/addresses/overview). Contracts interact only via [messages](/foundations/messages/overview).

Logical layout:

- **Storage**: persistent state (e.g. counter, owner).
- **Messages**: handlers for incoming messages (internal/external); each can change state and send out messages.
- **Get methods**: read-only entrypoints; return data without changing state. Not callable from other contracts; inter-contract use is messages only.

## First contract (Blueprint + Tolk)

1. **Scaffold**: `npm create ton@latest -- Example --contractName FirstContract --type tolk-empty`.
2. **Storage**: define a struct (e.g. `Storage { counter: Int }`) in the contract.
3. **Messages**: define receivers (e.g. `increase`, `reset`) that read body, update storage, optionally send messages.
4. **Get method**: expose read-only value (e.g. current counter).
5. **Build**: compile; run tests in Sandbox; deploy via script and wallet.

Contract code lives in `contracts/`; wrappers in `wrappers/`; deploy in `scripts/`. Use IDE plugins for Tolk/FunC (see contract-dev/ide).

## Tolk

Tolk is a high-level language for TON contracts (structures, message handlers, get methods). Blueprint supports Tolk via `--type tolk-empty`. Alternatives: FunC, Tact (different wrapper workflow).

## Key points

- Contract = code + data at one address; entrypoints = message handlers + get methods.
- Storage = persistent state; messages = state-changing and cross-contract; get methods = read-only, off-chain or SDK.
- Blueprint + Tolk: define storage, message handlers, get method; build, test in Sandbox, deploy with scripts.

<!--
Source references:
- https://github.com/ton-org/docs (contract-dev/first-smart-contract.mdx, blueprint/overview)
- languages/tolk, contract-dev/testing, deploy
-->
