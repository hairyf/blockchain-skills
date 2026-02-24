---
name: cosmos-module-structure
description: Recommended folder and file layout for Cosmos SDK modules.
---

# Recommended Module Structure

Suggested layout for a Cosmos SDK module. Treat as guidance; adapt to your project.

## Proto

Under `proto/{project}/{module}/{version}/`:

- `{module}.proto`: Shared message types.
- `event.proto`: Event types.
- `genesis.proto`: Genesis state.
- `query.proto`: Query service and request/response types.
- `tx.proto`: Msg service and request/response types.

## Go layout (x/{module})

- **client/cli**: `query.go`, `tx.go` for CLI commands; `testutil/` for CLI tests.
- **exported/**: Exported types used in expected keeper interfaces to avoid import cycles and keep contracts canonical.
- **keeper/**: `keeper.go`, `msg_server.go`, `grpc_query.go`, `genesis.go`, `keys.go`, `invariants.go`, `querier.go` (legacy), `hooks.go` if needed.
- **module/**: `module.go` (AppModule, AppModuleBasic); `abci.go` for BeginBlocker/EndBlocker; `autocli.go` for autocli options.
- **simulation/**: `decoder.go`, `genesis.go`, `operations.go`, `params.go` for simapp.
- **Root**: `codec.go`, `errors.go`, `events.go`, `expected_keepers.go`, `genesis.go`, `keys.go`, `msgs.go`, `params.go`, plus generated `*.pb.go`. `README.md` for spec and concepts.

## Key files

- **expected_keepers.go**: Interfaces for other modules' keepers this module depends on.
- **errors.go**: Sentinel errors registered with the SDK errors package.
- **events.go**: Event types and constructors (and generated `events.pb.go`).

<!--
Source references:
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/build/building-modules/11-structure.md
-->
