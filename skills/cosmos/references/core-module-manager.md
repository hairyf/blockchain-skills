---
name: cosmos-module-manager
description: AppModule interfaces, BasicManager, Manager, and execution order for Cosmos SDK modules.
---

# Module Manager

Modules implement **AppModule** (and related interfaces) so the application's **module manager** can manage them. The manager drives message/query routing and the order of PreBlocker, BeginBlocker, EndBlocker, InitGenesis, etc.

## Application Module Interfaces

Prefer the **Core API** `appmodule` package for new modules (less SDK coupling). Legacy: `module` package.

- **AppModuleBasic** (legacy): Stateless/independent methods (codec, interfaces, gRPC gateway). Use `module.CoreAppModuleBasicAdaptor` for new modules. Managed by **BasicManager**.
- **AppModule**: Stateful and inter-module methods. Implement extension interfaces only for what the module needs (e.g. HasBeginBlocker, HasEndBlocker, HasServices, HasGenesis).

Key extension interfaces:

- `HasGenesis` / `HasABCIGenesis`: Genesis init/export.
- `HasPreBlocker`, `HasBeginBlocker`, `HasEndBlocker`: Block lifecycle.
- `HasPrecommit`, `HasPrepareCheckState`: Commit-phase hooks.
- `HasServices`: Register gRPC Msg/Query services.
- `HasInvariants` (legacy): Register invariants.
- `HasConsensusVersion`: For upgrades.

## BasicManager

Holds all `AppModuleBasic`. Methods: `RegisterLegacyAminoCodec`, `RegisterInterfaces`, `DefaultGenesis`, `ValidateGenesis`, `RegisterGRPCGatewayRoutes`, `AddTxCommands`, `AddQueryCommands`. Built in `init()` or app constructor.

## Manager

Holds all `AppModule` and defines execution order:

- `SetOrderInitGenesis`, `SetOrderExportGenesis`: Genesis order (respect module dependencies, e.g. genutil after staking).
- `SetOrderPreBlockers`, `SetOrderBeginBlockers`, `SetOrderEndBlockers`: Block lifecycle order.
- `SetOrderPrecommiters`, `SetOrderPrepareCheckStaters`: Commit-phase order.
- `SetOrderMigrations`: Upgrade migration order.

Other methods: `RegisterInvariants`, `RegisterServices`, `InitGenesis`, `ExportGenesis`, `BeginBlock`, `EndBlock`, `Precommit`, `PrepareCheckState`.

Implement interfaces in `./x/{module}/module.go`; the concrete type often embeds the keeper and AppModuleBasic.

<!--
Source references:
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/build/building-modules/01-module-manager.md
-->
