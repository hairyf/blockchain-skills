---
name: ton
description: TON Blockchain — addresses, messages, TVM, cells, Blueprint, contracts, payments, API.
metadata:
  author: Hairy
  version: "2026.2.9"
  source: Generated from https://github.com/ton-org/docs, scripts located at https://github.com/antfu/skills
---

> Skill is based on TON documentation (ton-org/docs), generated at 2026-02-09.

TON (The Open Network) is a decentralized blockchain with an Actor model (all entities are smart contracts), stack-based TVM, and cell-based serialization. This skill covers foundations, contract development with Blueprint, payments, and API access.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Addresses | Internal/external addresses, workchains, account ID | [core-addresses](references/core-addresses.md) |
| Messages | Message types, StateInit, deploy, transactions | [core-messages](references/core-messages.md) |
| Cells & serialization | Cells, BOC, builders and slices | [core-cells-serialization](references/core-cells-serialization.md) |
| TVM | Stack, data types, gas, instructions, get methods | [core-tvm](references/core-tvm.md) |

## Features

### Development

| Topic | Description | Reference |
|-------|-------------|-----------|
| Blueprint | create-ton, Sandbox, project structure | [features-blueprint](references/features-blueprint.md) |
| Contract development | First contract, storage, messages, get methods, Tolk | [features-contract-development](references/features-contract-development.md) |

### Payments & API

| Topic | Description | Reference |
|-------|-------------|-----------|
| Payments | Toncoin, Jettons, finality, monitoring | [features-payments](references/features-payments.md) |
| API | Liteservers, TON Center, TonAPI, dTON | [features-api](references/features-api.md) |
