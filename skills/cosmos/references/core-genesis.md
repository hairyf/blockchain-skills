---
name: cosmos-genesis
description: GenesisState, DefaultGenesis, ValidateGenesis, InitGenesis, ExportGenesis.
---

# Module Genesis

Modules that own state define their **genesis subset**: a `GenesisState` type and methods to default, validate, initialize, and export it.

## GenesisState

Define in `genesis.proto`; the struct holds all module values needed at chain init. Commonly named `GenesisState`.

## Methods

- **DefaultGenesis**: Returns default `GenesisState` (e.g. for tests). Part of `HasGenesisBasics` / genesis interfaces.
- **ValidateGenesis**: Validates raw genesis JSON; unmarshal then run module-specific checks. Called before init.
- **InitGenesis**: Runs on `InitChain` when the app starts from genesis. Receives the module's `GenesisState`; uses the keeper to set initial state. Order is set via the module manager's `SetOrderInitGenesis` (respect dependencies, e.g. genutil after staking, capability before others).
- **ExportGenesis**: Builds `GenesisState` from current state; used for exports and hard-fork upgrades. Order via `SetOrderExportGenesis`.

## GenesisTxHandler

Modules can submit state transitions before the first block via `GenesisTxHandler`. Used by `x/genutil` for validator genesis txs.

<!--
Source references:
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/build/building-modules/08-genesis.md
-->
