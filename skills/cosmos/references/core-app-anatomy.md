---
name: cosmos-app-anatomy
description: App structure, constructor, InitChainer, PreBlocker, BeginBlocker, EndBlocker, encoding.
---

# Anatomy of a Cosmos SDK Application

The **full-node** binary (e.g. `appd`) runs the state machine. The core is defined in `app.go`: app type, constructor, and lifecycle hooks.

## App Type

- Embed **runtime.App** (wraps BaseApp and module manager). Runtime configures modules via dependency injection and app wiring.
- **App wiring**: Config file (e.g. `app_config.go` / `app.yaml`) lists modules and orders for InitGenesis, Pre/Begin/EndBlocker, etc.
- **appCodec**: Default is Protobuf; used to serialize/deserialize state.
- **legacyAmino**: Still referenced where not yet migrated; avoid for new code.

## Constructor

- Build codec and register module codecs (BasicManager).
- Create app with BaseApp, codec, store keys.
- Instantiate keepers (order matters: dependencies first).
- Build module manager with all AppModules; set InitGenesis, PreBlocker, BeginBlocker, EndBlocker orders.
- Register Msg services, gRPC Query services, legacy routes; register invariants.
- Set InitChainer, PreBlocker, BeginBlocker, EndBlocker, AnteHandler.
- Mount stores and return the app.

State is loaded from `~/.app/data` on restart or from genesis on first start.

## Lifecycle Hooks

- **InitChainer**: Runs on `InitChain` (height 0). Calls module manager's `InitGenesis` in configured order. Set via `SetInitChainer`.
- **PreBlocker**: Runs before BeginBlock; can change consensus params; if it returns `ConsensusParamsChanged=true`, the caller must refresh consensus params in the finalize context.
- **BeginBlocker / EndBlocker**: Run at block start/end. Composed of each module's BeginBlock/EndBlock in manager order. Set via `SetBeginBlocker` / `SetEndBlocker`. Keep logic deterministic and cheap (no gas limit here).

## EncodingConfig

Holds `InterfaceRegistry`, `Codec`, `TxConfig`, and `Amino`. Used for (de)serialization and tx handling (e.g. SIGN_MODE_DIRECT, SIGN_MODE_LEGACY_AMINO_JSON).

<!--
Source references:
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/learn/beginner/00-app-anatomy.md
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/build/building-apps/00-runtime.md
-->
