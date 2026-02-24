---
name: cosmos
description: Cosmos SDK module development—modules, keepers, Msg/Query services, genesis, app wiring, upgrades, and structure.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/cosmos/cosmos-sdk, scripts at https://github.com/antfu/skills
---

> Skill based on Cosmos SDK, generated from `sources/cosmos`. Doc path: `sources/cosmos/docs/docs/`, `sources/cosmos/README.md`, and `sources/cosmos/x/`.

The Cosmos SDK is a modular framework for building application-specific blockchains. Applications are composed of modules that own state (via keepers), expose Msg and Query services (Protobuf/gRPC), and plug into the app lifecycle (genesis, BeginBlock, EndBlock, upgrades). Use this skill when implementing or wiring SDK modules, keepers, services, depinject, or migrations.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Modules intro | Role of modules, main components, composability and capabilities | [core-modules-intro](references/core-modules-intro.md) |
| Module manager | AppModule interfaces, BasicManager, Manager, execution order | [core-module-manager](references/core-module-manager.md) |
| Messages and queries | Msg/Query types, gRPC services, legacy paths, protobuf | [core-messages-queries](references/core-messages-queries.md) |
| Keeper | Type definition, store access, inter-module access, methods | [core-keeper](references/core-keeper.md) |
| Genesis | GenesisState, DefaultGenesis, ValidateGenesis, Init/ExportGenesis | [core-genesis](references/core-genesis.md) |
| App anatomy | App type, constructor, InitChainer, PreBlocker, Begin/EndBlocker | [core-app-anatomy](references/core-app-anatomy.md) |
| BaseApp and store | ABCI, routers, volatile states; multistore, KVStore, IAVL | [core-baseapp-store](references/core-baseapp-store.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Msg services | Implementing Msg service, validation, state transition, events | [features-msg-services](references/features-msg-services.md) |
| Query services | gRPC Query implementation, module_query_safe | [features-query-services](references/features-query-services.md) |
| depinject | Module config proto, ProvideModule, app wiring | [features-depinject](references/features-depinject.md) |
| Upgrades | ConsensusVersion, in-place migrations, RegisterMigration | [features-upgrade](references/features-upgrade.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Errors | Registration, wrapping, ABCI helpers | [best-practices-errors](references/best-practices-errors.md) |
| Module structure | Recommended folder and file layout | [best-practices-module-structure](references/best-practices-module-structure.md) |
