---
name: ton-blueprint
description: Blueprint dev toolkit, create-ton, Sandbox, project structure.
---

# Blueprint Development Toolkit

**Blueprint** is the standard environment for building, testing, and deploying TON smart contracts.

## Components

- **Blueprint** (ton-org/blueprint): core build and tooling.
- **Sandbox** (ton-org/sandbox): local in-process blockchain for fast tests.
- **Create TON App** (ton-org/create-ton): project scaffolding.
- **Test utils** (ton-org/test-utils): matchers and helpers for tests.

## Quick start

```bash
npm create ton@latest
```

Follow prompts (project name, contract name, type e.g. `tolk-empty`). Then:

```bash
cd <project>
npm install
```

**Requirements**: Node.js 22+ (`node -v`).

## Project structure

- **contracts/** — source (e.g. Tolk, Tact, FunC) and imports.
- **scripts/** — deploy and interaction scripts (Mainnet/Testnet).
- **tests/** — TypeScript tests using Sandbox (in-process).
- **wrappers/** — TypeScript contract interfaces (except Tact): implement `Contract` from `@ton/core` (message encode/decode, getters, compile). Used in tests and clients.
- **build/** — compile output.

## Workflow

1. **Build**: compile contracts (output in `build/`).
2. **Test**: run test suite against Sandbox.
3. **Deploy**: run deploy script; publish from wallet to Mainnet/Testnet.

IDE support: see contract-dev/ide (VS Code, JetBrains).

## Key points

- Use `npm create ton@latest` to scaffold; Node 22+ required.
- Sandbox = local chain for tests; wrappers = TypeScript API for contracts.
- Build → test (Sandbox) → deploy (scripts + wallet).

<!--
Source references:
- https://github.com/ton-org/docs (contract-dev/blueprint/overview.mdx)
- contract-dev/blueprint/cli, config, deploy, testing
-->
