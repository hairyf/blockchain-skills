---
name: cosmos-upgrade
description: ConsensusVersion, in-place store migrations, RegisterMigration, Migrator.
---

# Upgrading Modules

In-place store migrations let modules upgrade to new versions with breaking state changes. Each module declares a **consensus version** and registers migration handlers for version bumps.

## ConsensusVersion

- Implement `ConsensusVersion() uint64` on AppModule. Start at 1; increment when the module introduces breaking state or logic changes.
- Versions are hard-coded by the module developer.

## Registering migrations

In `RegisterServices`, use the `Configurator` to register migrations:

```go
cfg.RegisterMigration(types.ModuleName, fromVersion, func(ctx sdk.Context) error {
    // Migrate store from fromVersion to fromVersion+1.
    return nil
})
```

- Register one migration per version step (e.g. 1→2, 2→3). If a version bump has no store changes, register a no-op.
- If a migration is missing for a version, `RunMigrations` can panic during upgrade.

## Migration scripts

- Put migration logic in a `migrations/` package (e.g. `x/bank/migrations/v2`). Use a **Migrator** type that holds the keeper (or store service and codec) so the migration function can access the store.
- In `RegisterServices`, call into the migration package, e.g. `v2.MigrateStore(ctx, m.keeper.storeService, m.keeper.cdc)`.

Example: bank's migration from version 1 to 2 updated balance key format (e.g. per ADR-028). Implement similar functions for key layout or schema changes.

<!--
Source references:
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/build/building-modules/13-upgrade.md
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/learn/advanced/15-upgrade.md
-->
