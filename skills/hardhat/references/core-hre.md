---
name: hardhat-hre
description: Hardhat Runtime Environment (HRE), import and main properties (network, artifacts, config).
---

# Hardhat Runtime Environment (HRE)

The **HRE** is the object that exposes Hardhat and plugin functionality when running a task, test, or script. Plugins inject into the HRE so their APIs are available everywhere the HRE is used.

## Using the HRE

- **In tasks:** the HRE is passed as an argument to the task action.
- **In TypeScript tests or scripts:** import it:

```ts
import hre from "hardhat";
```

You can also construct it manually via `"hardhat/hre"` if needed.

## Main HRE properties

- **network** – Connect to live networks or create blockchain simulations (`network.connect()`, network config). See [network management](https://hardhat.org/docs/explanations/network-management).
- **artifacts** – Read compilation artifacts (contract ABIs, bytecode, etc.) for the project.
- **config** – Resolved config Hardhat uses (after merging defaults and user config).
- **userConfig** – Raw user config from `hardhat.config`.
- **tasks** – Task manager to run Hardhat tasks.
- **solidity** – Solidity build system.
- **hooks** – Hook manager for plugins to customize behavior.
- **globalOptions** – Global CLI options.
- **interruptions** – User interruptions manager for plugin I/O.
- **versions** – Versions of Hardhat and key dependencies.

## Named imports

You can import specific pieces from `"hardhat"`:

```ts
import {
  config,
  userConfig,
  artifacts,
  network,
  globalOptions,
  hooks,
  interruptions,
  solidity,
  tasks,
  versions,
} from "hardhat";
```

## Key points

- Use `import hre from "hardhat"` in scripts and tests; use `hre.network`, `hre.artifacts`, etc., or the named imports.
- Plugins extend the HRE (e.g. `hre.ethers`, `hre.viem` from toolboxes).

<!--
Source references:
- https://hardhat.org/docs/explanations/hardhat-runtime-environment
- https://hardhat.org/docs/explanations/network-management
-->
