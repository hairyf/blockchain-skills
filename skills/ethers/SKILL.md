---
name: ethers
description: Ethers.js v6 — Provider/Signer/Contract, units, ABI, contract calls and events, signing, v5→v6 migration.
metadata:
  author: hairy
  version: "2026.2.9"
  source: Generated from https://github.com/ethers-io/ethers.js (docs.wrm), scripts at https://github.com/antfu/skills
---

> Skill based on ethers.js v6.16.0, generated at 2026-02-09. Official docs: https://docs.ethers.org/v6/

Ethers.js is a complete, compact library for interacting with Ethereum: dapps, wallets, and scripts. This skill covers Provider/Signer/Contract separation, units and formatting, ABI, contract calls and events, message signing, and v5→v6 migration.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Provider, Signer, Contract | Read/write separation, BrowserProvider, JsonRpcProvider, connecting | [core-provider-signer](references/core-provider-signer.md) |
| Units and Formatting | parseEther, parseUnits, formatEther, formatUnits | [core-units-format](references/core-units-format.md) |
| ABI | Human-readable ABI, Fragment, encoding, event topics/data | [core-abi](references/core-abi.md) |

## Features

### Contract and Signing

| Topic | Description | Reference |
|-------|-------------|-----------|
| Contract | Creation, view/pure, state-changing, staticCall, events, queryFilter | [features-contract](references/features-contract.md) |
| Signing | signMessage, verifyMessage, Signature, EIP-191, EIP-712 | [features-signing](references/features-signing.md) |

## Advanced

| Topic | Description | Reference |
|-------|-------------|-----------|
| Migrating v5→v6 | BigInt, Provider/Contract/Signature, utils renames | [advanced-migrating-v6](references/advanced-migrating-v6.md) |
