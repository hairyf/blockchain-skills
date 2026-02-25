---
name: java-tron chainbase module
description: Chainbase — rollback, RevokingDatabase, TronStoreWithRevoking; LevelDB and RocksDB implementations.
---

# Chainbase Module

Chainbase is the storage layer for java-tron. It defines interfaces for databases that support **rollback** (e.g. for reorgs or consensus switches) and allows swapping the underlying engine (LevelDB or RocksDB).

## Rollback and interfaces

- **RevokingDatabase** — Interface for a container that manages multiple revocable (rollback-capable) databases. **SnapshotManager** is the default implementation.
- **TronStoreWithRevoking** — Abstract base for stores that support rollback: state can be reverted to a previous checkpoint.
- **Chainbase** — Concrete implementation of TronStoreWithRevoking used for chain data.

Requirements for a store to plug in: state rollback mechanism and checkpoint-based fault tolerance so that chainbase can revert state when the consensus layer decides to switch chain (e.g. DPoS reorg).

## Storage engines

- **LevelDB** — Default on x86; used by many DB-related Toolkit commands (archive, convert). Not available on ARM in some setups.
- **RocksDB** — Supported on all platforms including ARM; config via `storage.db.engine = "ROCKSDB"` and optional `storage.dbSettings`.

Both can be used as the underlying store for chainbase; the same `storage.properties` (name, path) apply. LevelDB-specific options (createIfMissing, blockSize, etc.) are documented in Advanced Configurations; RocksDB uses `dbSettings`.

## Key Points

- Chainbase abstracts rollback and checkpointing; do not assume a single linear append-only DB when writing plugins or custom actuators that persist state.
- For custom persistent data in an actuator, consider a dedicated store that follows the chainbase rollback contract or stores only after finality.
- Toolkit operations (e.g. db convert, db lite) are engine- and platform-specific; see features-toolkit.

<!--
Source references:
- sources/tron-java/docs/modular-introduction-en.md
- sources/tron-java/common/src/main/java/org/tron/core/config/README.md
- https://github.com/tronprotocol/java-tron (modularization docs)
-->
