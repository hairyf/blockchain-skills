---
name: hardhat-getting-started
description: Hardhat project init, built-in tasks, compile/test/deploy quick flow.
---

# Hardhat Getting Started

Hardhat is an Ethereum development environment. The main component is **Hardhat Runner**: a task runner. Every CLI invocation runs a task (e.g. `compile`, `test`). Functionality is extended via **plugins**.

## Init and install

Project-local install (recommended):

```bash
npm init -y
npm install --save-dev hardhat@hh2
npx hardhat init
```

`npx hardhat init` offers: JavaScript/TypeScript project, or empty config. Use `npx hardhat` to list tasks.

## Key tasks

| Task | Purpose |
|------|---------|
| `npx hardhat compile` | Compile Solidity; writes artifacts (and TypeChain if TS) |
| `npx hardhat test` | Run Mocha tests (uses Hardhat Network by default) |
| `npx hardhat run <script>` | Run a script after compiling |
| `npx hardhat node` | Start standalone Hardhat Network JSON-RPC server |
| `npx hardhat ignition deploy <module>` | Deploy via Hardhat Ignition module |
| `npx hardhat clean` | Clear cache and artifacts |
| `npx hardhat help [task]` | List tasks or show task help |

Default network is `hardhat` (in-process). Use `--network <name>` to target another network (e.g. `localhost`, `sepolia`).

## Quick flow

1. **Compile:** `npx hardhat compile` → `artifacts/`, `cache/`
2. **Test:** put tests in `test/`, use `hre.ethers` (or viem) and `loadFixture` from network-helpers
3. **Deploy:** define an Ignition module in `ignition/modules/`, then `npx hardhat ignition deploy ./ignition/modules/Lock.ts`
4. **Standalone node:** `npx hardhat node` → connect wallet/dapp to `http://127.0.0.1:8545`; run Hardhat with `--network localhost` to use it

## Key points

- Tasks and plugins: override or add tasks via config/plugins.
- Config file: `hardhat.config.js` (or `.ts`) at project root; Hardhat loads the closest from CWD.
- Node.js: use Node 22+ for Hardhat 3; Hardhat 2 uses `hardhat@hh2`.

<!--
Source references:
- https://hardhat.org/hardhat-runner/docs/getting-started
- https://hardhat.org/docs
-->
