---
name: hardhat-tasks-plugins
description: Hardhat tasks, Hardhat Runtime Environment (HRE), and plugins.
---

# Hardhat Tasks and Plugins

Hardhat is task-based: each CLI run executes one task. Tasks can call other tasks. Plugins add or override tasks and extend the **Hardhat Runtime Environment (HRE)**.

## Built-in tasks

Examples: `compile`, `clean`, `test`, `run`, `node`, `console`, `flatten`, `help`, `verify` (when verify plugin is used). List all: `npx hardhat`.

## Hardhat Runtime Environment (HRE)

In tasks, scripts, and tests you get the global `hre` (or import from `"hardhat"`). It provides:

- **hre.config** – resolved config
- **hre.network** – current network (name, config)
- **hre.ethers** – Ethers.js bindings (when `@nomicfoundation/hardhat-ethers` or toolbox is used)
- **hre.artifacts** – `hre.artifacts.readArtifact(name)`, etc.
- **hre.run(taskName, args)** – run another task programmatically

Plugins extend `hre` (e.g. toolbox adds `ethers`, network-helpers, chai matchers).

## Plugins

Install and load in config:

```javascript
require("@nomicfoundation/hardhat-toolbox");
// or
require("@nomicfoundation/hardhat-ignition-ethers");
```

Plugin can: add tasks, extend HRE, override existing tasks (e.g. `compile`). Official plugins: toolbox (ethers or viem), ignition, chai-matchers, verify, network-helpers, etc.

## Creating a task

In `hardhat.config.js`:

```javascript
task("accounts", "List accounts").setAction(async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const a of accounts) console.log(await a.getAddress());
});
```

Use `addParam`, `addOptionalParam`, `addPositionalParam` for arguments. Override existing task by redefining it (e.g. `task("compile", ...)`).

## Key points

- Use `hre.run("compile")` inside scripts/tasks to ensure artifacts are up to date.
- Plugin API: `extendEnvironment`, `extendConfig`, `task`, `subtask` – see “Building plugins” in docs.

<!--
Source references:
- https://hardhat.org/hardhat-runner/docs/advanced/hardhat-runtime-environment
- https://hardhat.org/hardhat-runner/docs/advanced/create-task
- https://hardhat.org/hardhat-runner/docs/advanced/building-plugins
-->
