---
name: hardhat-tron
description: Agent-oriented skills for Hardhat on TRON—config, compilation, deployment, and testing with @layerzerolabs/hardhat-tron and hardhat-deploy.
metadata:
  author: Anthony Fu
  version: "2026.2.25"
  source: Generated from https://github.com/aziz1975/layerzero-hardhat-tron, scripts located at https://github.com/antfu/skills
---

> The skill is based on the LayerZero Hardhat TRON example (layerzero-hardhat-tron), generated at 2026-02-25.

Use this skill when configuring Hardhat for TRON (Nile/mainnet), compiling Solidity with tronSolc, deploying with hardhat-deploy, or writing tests. Plugin: `@layerzerolabs/hardhat-tron`; deploy: `@layerzerolabs/hardhat-deploy`.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Config | Plugin, solidity/tronSolc alignment, networks (Nile), env (TRON_PRIVATE_KEY, TRON_PRO_API_KEY) | [core-config](references/core-config.md) |
| Compilation | tronSolc enable/filter/compilers, version match, remapping | [core-compilation](references/core-compilation.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Deployment | hardhat-deploy script pattern, deploy to Nile, tags | [features-deployment](references/features-deployment.md) |
| Testing | Mocha/Chai tests on local Hardhat network, ethers | [features-testing](references/features-testing.md) |
