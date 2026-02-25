---
name: ton-blueprint
description: TON Blueprint development environment — project layout, build/test/run, NetworkProvider, config, scripts, wrappers, and deploy/testing practices.
metadata:
  author: Anthony Fu
  version: "2026.2.25"
  source: Generated from https://github.com/ton-org/blueprint, scripts located at https://github.com/antfu/skills
---

> Skill is based on Blueprint (ton-org/blueprint), generated at 2026-02-25.

Blueprint is a development environment for the TON blockchain: create projects with `npm create ton@latest`, then build (Tolk/FunC/Tact), test (Sandbox), and run scripts (deploy via TonConnect, deeplink, or mnemonic). Projects use a fixed layout: `contracts/`, `wrappers/`, `compilables/`, `tests/`, `scripts/`, `build/`.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Project structure | Directory layout, contracts/wrappers/compilables/tests/scripts/build | [core-project-structure](references/core-project-structure.md) |
| CLI commands | build, test, run, create, rename, help, pack | [core-commands](references/core-commands.md) |
| NetworkProvider | sender, open, waitForDeploy, waitForLastTransaction, api, config | [core-network-provider](references/core-network-provider.md) |
| Config | blueprint.config.ts, plugins, network, requestTimeout, recursiveWrappers, manifestUrl | [core-config](references/core-config.md) |

## Features

### Scripts and compilation

| Topic | Description | Reference |
|-------|-------------|-----------|
| Scripts | run(provider, args), deploy pattern, blueprint run | [features-scripts](references/features-scripts.md) |
| Compilation | compile(), CompilerConfig, compilables, build output, hooks | [features-compilation](references/features-compilation.md) |
| Wrappers | Contract, createFromConfig, createFromAddress, sendDeploy | [features-wrappers](references/features-wrappers.md) |

### Best practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Deploy | Deploy flow, TonConnect/deeplink/mnemonic, env vars, verify | [best-practices-deploy](references/best-practices-deploy.md) |
| Testing | Sandbox tests, compile(), coverage, gas report/snapshot | [best-practices-testing](references/best-practices-testing.md) |
