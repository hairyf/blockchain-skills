---
name: hardhat-network
description: Hardhat Network, in-process vs node, JSON-RPC, forking.
---

# Hardhat Network

Hardhat Network is a local Ethereum node for development: deploy, test, and debug. It has first-class Solidity support (stack traces, `console.log` via `hardhat/console.sol`).

## Modes

1. **In-process (default):** When you run a task with `--network hardhat`, Hardhat starts an in-memory instance; no separate process.
2. **Standalone node:** `npx hardhat node` starts a JSON-RPC server (default `http://127.0.0.1:8545`). Wallets and other tools connect to this URL. Run Hardhat with `--network localhost` to use the same node.

## Config (networks.hardhat)

Common options (see full reference on hardhat-network docs):

- **chainId**
- **forking:** `url: "https://eth-mainnet.g.alchemy.com/v2/<key>"`, optional `blockNumber`
- **accounts:** same HD/array pattern as other networks; default gives funded accounts

## JSON-RPC

Standard Ethereum JSON-RPC. Hardhat Network also supports extra methods (e.g. `evm_snapshot`, `evm_revert`, `evm_increaseTime`, `evm_mine`) used by testing helpers.

## Network Helpers

`@nomicfoundation/hardhat-network-helpers` (included in toolbox) provides helpers such as:

- **time.latest()**, **time.increaseTo(t)**, **time.increase(n)**
- **loadFixture(fn)** – run fixture once, snapshot, revert to snapshot per test
- **mine()**, **mine(n)**

Use in tests to control time and blocks without calling RPC directly.

## Key points

- Use `loadFixture` for repeatable test state; avoids re-deploying every test.
- For mainnet fork testing, set `networks.hardhat.forking.url` and optionally `blockNumber`.

<!--
Source references:
- https://hardhat.org/hardhat-network/docs
- https://hardhat.org/hardhat-network-helpers/docs
- https://hardhat.org/hardhat-runner/docs/getting-started#connecting-a-wallet-or-dapp-to-hardhat-network
-->
