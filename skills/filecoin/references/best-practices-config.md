---
name: Lotus config and environment
description: Key Lotus config sections and environment variables for API, libp2p, and node behavior.
---

# Config and Environment

Lotus full node config is TOML; path can be set via `--config` or env. Default config template is in `documentation/en/default-lotus-config.toml`. Many options have matching env vars (e.g. LOTUS_*).

## API

- **ListenAddress** — bind address (e.g. `/ip4/127.0.0.1/tcp/1234/http`). Env: LOTUS_API_LISTENADDRESS.
- **RemoteListenAddress**, **Timeout** — optional. Env: LOTUS_API_REMOTELISTENADDRESS, LOTUS_API_TIMEOUT.
- **LOTUS_API_MAXREQSIZE** — max JSON-RPC request size (default 0 = no limit).

## Libp2p

- **ListenAddresses** — multiaddrs; 0 = random port. Env: LOTUS_LIBP2P_LISTENADDRESSES.
- **AnnounceAddresses**, **NoAnnounceAddresses** — what to announce to peers.
- **DisableNatPortMap** — disable NAT port mapping (default false).
- **ConnMgrLow / ConnMgrHigh** — connection manager trim target and GC trigger.

## Repo and paths

- Default repo: **$HOME/.lotus** (or LOTUS_PATH). Single daemon per repo; repo.lock enforces.
- **LOTUS_BACKUP_BASE_PATH** — required for online backups; backup command path must be under this base.
- **LOTUS_ENABLE_CHAINSTORE_FALLBACK=1** — enable fallback blockstore (bitswap) for any block Get.
- **LOTUS_ENABLE_MESSAGE_FETCH_INSTRUMENTATION=1** — metrics for message fetch (local vs network).

## Fevm and Events

- **Fevm.EnableEthRPC** — enable Eth JSON-RPC (requires ChainIndexer).
- **Events.EnableActorEventsAPI** — enable GetActorEventsRaw / SubscribeActorEventsRaw (requires ChainIndexer).
- **ChainIndexer.EnableIndexer**, **GCRetentionEpochs** — see best-practices-chain-indexer.

## Logging

- **Logging.SubsystemLevels** — per-subsystem log level. Env: LOTUS_LOGGING_SUBSYSTEMLEVELS_<subsystem>.

## Daemon flags (override config)

- `--api`, `--config`, `--lite`, `--bootstrap`, `--import-snapshot`, `--pprof`, `--manage-fdlimit` — see `lotus daemon --help`.

## Usage for agents

- Remote API: set ListenAddress or use port forwarding; use AuthNew to create tokens, pass token in RPC client. Connect with http or ws (for Subscribe*).
- Tuning: adjust ConnMgr* for peer count; set GCRetentionEpochs if you need to cap index size.
- Debug: enable MESSAGE_FETCH_INSTRUMENTATION to see bitswap vs local message fetch; set subsystem log levels for sync/mpool/vm.

## Key points

- Config file is optional; defaults apply. Env vars override config.
- One repo per node type (full node vs miner); miner uses different repo (e.g. ~/.lotusstorage) and connects to full node API.
- Full option list and types are in default-lotus-config.toml with comments and env var names.

<!--
Source references:
- sources/filecoin/documentation/en/default-lotus-config.toml
- sources/filecoin/documentation/en/architecture/architecture.md (repo, node)
- sources/filecoin/README.md (env, advanced options)
-->
