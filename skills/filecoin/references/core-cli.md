---
name: Lotus CLI
description: lotus, lotus-miner, and lotus-worker command structure and common usage.
---

# Lotus CLI

Three binaries: **lotus** (node + wallet + chain/state/mpool), **lotus-miner** (storage miner), **lotus-worker** (sealing/mining tasks). All content in English; agent-oriented usage only.

## lotus

- **daemon**: `lotus daemon` — start node. Options: `--api`, `--config`, `--lite`, `--import-snapshot`, `--bootstrap`, `--pprof`. `lotus daemon stop` to stop.
- **Wallet**: `lotus wallet new` (secp256k1 default; BLS optional), `lotus wallet list`, `lotus send <target> <amount>`.
- **Chain/state**: `lotus chain head`, `lotus state call`, `lotus state replay`, `lotus state wait-msg`.
- **mpool**: `lotus mpool pending`, `lotus mpool sub`, `lotus mpool stat`, `lotus mpool replace`, `lotus mpool find`, `lotus mpool config`, `lotus mpool clear` (use with care).
- **Auth**: `lotus auth` for API tokens. **Network**: `lotus net`, `lotus sync`, `lotus status`. **F3**: `lotus f3` for Fast Finality. **EVM**: `lotus evm` for Filecoin EVM runtime.
- **Config**: `lotus config default`, `lotus config updated`. **Backup**: `lotus backup [path]` (respects LOTUS_BACKUP_BASE_PATH for online backups).

## lotus-miner

- **Init**: `lotus-miner init` — creates StorageMiner node; requires synced full node and proof params. Owner/worker addresses and peer ID define the miner; CreateMiner message is sent to Power Actor.
- **Run**: `lotus-miner run` (with API connection to lotus). Commands for storage, deals, sectors, proving, etc. (see lotus-miner docs on lotus.filecoin.io for full list).

## lotus-worker

- Used by miners to run sealing and other compute-heavy tasks; connects to lotus-miner. See `cli-lotus-worker.md` and miner docs for subcommands.

## Usage for agents

- Start/stop node: `lotus daemon` / `lotus daemon stop`. Check readiness: `lotus wait-api` then `lotus status` or `lotus chain head`.
- Send FIL: `lotus send <addr> <amount>`. Create wallet: `lotus wallet new`.
- Inspect mpool: `lotus mpool pending`, `lotus mpool find --from <addr>`. Replace tx: `lotus mpool replace --gas-feecap <cap> --gas-premium <premium> --gas-limit <limit> <from> <nonce>`.
- For miner creation flow (owner, worker, Power Actor, Init Actor), see create-miner doc; use `lotus-miner init` with defaults or specified owner/worker.

## Key points

- Default repo: `~/.lotus` (lotus), `~/.lotusstorage` (lotus-miner). Only one daemon per repo (repo.lock).
- Nonce handling: prefer `MpoolPushMessage` (API) for atomic nonce+sign+push; `MpoolGetNonce` is not atomic.
- Full install/get-started docs are at lotus.filecoin.io; this skill omits them.

<!--
Source references:
- sources/filecoin/documentation/en/cli-lotus.md
- sources/filecoin/documentation/en/cli-lotus-miner.md
- sources/filecoin/documentation/en/cli-lotus-worker.md
- sources/filecoin/documentation/en/create-miner.md
-->
