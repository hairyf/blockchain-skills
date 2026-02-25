---
name: java-tron config
description: config.conf structure — net, storage, node (P2P, HTTP, gRPC, JSON-RPC), localwitness, seed nodes, advanced tuning.
---

# java-tron Configuration

FullNode and SR are configured via a single config file (e.g. `config.conf`). Pass it with `-c config.conf` or `--config config.conf`.

## Main blocks

| Block | Purpose |
|-------|---------|
| `net` | `type = mainnet` or `testnet` (address prefix 0x41 vs 0xa0). |
| `storage` | DB engine (LEVELDB/ROCKSDB), paths, per-db `properties`, RocksDB `dbSettings`. |
| `node.discovery` | P2P discovery (enable, persist). |
| `node.backup` | Backup sync (port, priority, members). |
| `node` | P2P, HTTP, gRPC, JSON-RPC, trustNode, localwitness, seed.node, genesis.block. |

## Network and P2P

- **node.p2p.version** — Mainnet: 11111; Nile: 201910292; Shasta: 1. Must match network.
- **node.active** / **node.passive** — Optional peer IP:port lists.
- **node.fastForward** — Fast-sync peers (sample entries in default config).
- **seed.node** — Genesis/seed node list for the network (required for private/test nets).
- **genesis.block** — Genesis block definition (witnesses, timestamp, etc.); used for private/test nets.

## APIs (under `node`)

- **node.http** — fullNodeEnable, fullNodePort (8090), solidityEnable/Port, PBFTEnable/PBFTPort.
- **node.rpc** — enable, port (50051), solidityEnable/Port, PBFTEnable/Port; gRPC tuning (thread, maxConnectionIdleInMillis, maxMessageSize, etc.).
- **node.jsonrpc** — httpFullNodeEnable, httpFullNodePort (8545), etc.

Enable/disable and ports here; when exposing publicly, use authentication, rate limiting, and network controls (see best-practices-api-security).

## Super Representative (SR)

- **localwitness** — List with the SR account private key (hex). One key when using `-w`/`--witness`.
- **localwitnesskeystore** — Optional: path(s) to keystore file(s) instead of raw key in config.

Fill one of these when running as SR; keep config file secure.

## Storage tuning

- **storage.db.engine** — `"LEVELDB"` or `"ROCKSDB"`. ARM supports only ROCKSDB.
- **storage.properties** — Optional per-database config (name required; path, LevelDB options). Used for splitting DBs across disks or tuning; see Advanced Configurations.
- **storage.dbSettings** — RocksDB-only (levelNumber, blockSize, maxBytesForLevelBase, etc.). Change only if understood.

Advanced LevelDB/gRPC/backup options are documented in `common/src/main/java/org/tron/core/config/README.md`.

## Usage

- Mainnet: use bundled `framework/src/main/resources/config.conf` (or copy).
- Nile: use config from [nile-testnet](https://github.com/tron-nile-testnet/nile-testnet) repo.
- Private net: set seed.node, genesis.block, and optionally localwitness; align p2p.version and needSyncCheck with docs.

<!--
Source references:
- sources/tron-java/framework/src/main/resources/config.conf
- sources/tron-java/common/src/main/java/org/tron/core/config/README.md
- https://github.com/tronprotocol/java-tron (README.md, run.md)
-->
