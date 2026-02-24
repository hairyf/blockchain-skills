---
name: cosmos-depinject
description: Making modules depinject-ready; module config proto and ProvideModule.
---

# Modules and depinject

**depinject** wires modules in `app.go`. To be depinject-ready a module must declare its configuration and dependencies; the app then configures and injects the module without manual keeper ordering.

## Module configuration

Define configuration in Protobuf at `{moduleName}/module/v1/module.proto`:

- `go_import` must point to the module's Go package.
- Message fields define options (e.g. `max_metadata_len`). These are set in `app_config.go` or `app.yaml` by the chain developer.

Run codegen (`make proto-gen`); the config type is used when wiring.

## Dependency definition (module.go)

1. In `init()`, register the module config type and wiring with depinject.
2. Implement `appmodule.AppModule`.
3. Define a **depinject.In** struct with the module's required inputs (other keepers, config, store keys, etc.). Use `optional:"true"` for optional deps.
4. Define a **depinject.Out** struct with outputs (e.g. the module and its keeper).
5. Implement **ProvideModule**: accept the In struct, instantiate keeper and module, return the Out struct. Return a type that implements `cosmossdk.io/core/appmodule.AppModule` and the needed extension interfaces.

All types and fields used in In/Out must be exported so depinject can reflect on them.

## App integration

Chain developers list the module in the app wiring config (`app_config.go` / `app.yaml`) and ensure the module is included in the depinject graph (e.g. via `RegisterModules` or config-driven discovery). No manual keeper construction is needed for the module's own keeper and dependencies.

<!--
Source references:
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/build/building-modules/15-depinject.md
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/build/building-apps/01-app-go-di.md
-->
