---
name: cosmos-modules-intro
description: Role of modules in Cosmos SDK apps, main components, and design principles.
---

# Cosmos SDK Modules Introduction

Modules implement most of an application's logic. Developers compose modules to build application-specific blockchains. The SDK core provides ABCI boilerplate, multistore, server, and interfaces; modules implement business logic and state.

## Main Components

- **Keeper**: Manages access to the module's store(s) and state. Only the keeper holds the store key(s).
- **Msg service**: Protobuf service that processes messages when BaseApp routes them to the module. Triggers state transitions.
- **Query service**: Processes queries routed by BaseApp; exposes the module's state subset.
- **AppModule / AppModuleBasic**: Implemented in `module.go` so the module can be managed by the module manager.

Modules live by convention in `./x/{module_name}/`. They define a subset of state (one or more KVStores) and a subset of message types.

## Design Principles

- **Composability**: Integrate with SDK core and other modules. Expose store access only via the keeper.
- **Specialization**: One concern per module; avoid batching unrelated functionality. Enables reuse and upgrades.
- **Capabilities**: Access to another module's store is by passing a reference to that module's keeper (object-capabilities model). The keeper defines how and under what conditions its store is accessed.

## Flow

Transaction → BaseApp decodes and routes messages → Message routed to module's Msg service → Module handles message and updates state → Result returned to consensus engine.

<!--
Source references:
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/build/building-modules/00-intro.md
- https://docs.cosmos.network/
-->
