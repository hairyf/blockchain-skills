---
name: geth-sync-modes
description: Geth sync modes - snap (default), full, archive, light; when to use which.
---

# Sync Modes

Geth can run as a full node (default), archive node, or light node. Sync mode determines how much historical state is kept and how initial sync works.

## Modes

- **Snap (default)** - Snap sync: downloads state in snapshots rather than replaying all blocks. Fastest way to reach the head; does not retain full history. Use for typical nodes and DApps.
- **Full** - Full sync: replays blocks to build state. Slower than snap; still prunes old state by default.
- **Archive** - Keeps full historical state. Required for historical queries (e.g. state at old block). High storage and resource usage.
- **Light** - Light client: retrieves data on demand; minimal storage. Experimental; check docs for current support.

## Flags

--syncmode snap|full|archive|light
--snapshot (enable/disable snapshot for snap sync)

Default is snap. Use archive only when you need full history; prefer snap for normal operation.

<!-- Source: https://github.com/ethereum/go-ethereum (README.md), https://geth.ethereum.org/docs/fundamentals/command-line-options -->
