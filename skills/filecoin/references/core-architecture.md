---
name: Lotus architecture
description: Filecoin/Lotus node components — tipsets, actors, sync, state, VM, repo, and network flow.
---

# Lotus Architecture

Lotus implements the Filecoin Distributed Storage Network. A node comprises the Syncer, State Manager, VM, Repository, and P2P (libp2p) stack. Full user docs live at [lotus.filecoin.io](https://lotus.filecoin.io); this skill focuses on concepts and code paths useful for agents.

## Key concepts

- **Tipsets**: Filecoin allows multiple blocks per round with the same parent set. A tipset is a set of blocks sharing the same parents. Chain weight is the number of blocks in the chain (not difficulty). The "head" is the heaviest tipset.
- **Actors and messages**: Actors are like smart contracts; builtin actors (Power, Miner, Market, Init, etc.) are pre-compiled. Messages are like transactions; the VM executes them and updates state.
- **Sync**: Node syncs to the heaviest chain advertised by peers. Flow: hello exchange → collect headers (StageHeaders/PersistHeaders) → fetch and validate full blocks (StageMessages) → set head (StageSyncComplete). Uses ChainExchange for bulk headers and bitswap for message retrieval when messages are missing locally.
- **State**: Chain state at any point is a root CID in a StateTree, managed by StateManager. Tipset state is computed by applying all messages in the tipset (and implicit Reward/Cron messages).
- **VM**: Applies messages, invokes builtin actor methods via an invoker (method number → Go function), meters gas, and produces MessageReceipts.
- **Repo**: Single directory (e.g. `~/.lotus`) defines the node; one daemon per repo (enforced by `repo.lock`). Contains Datastore (e.g. Badger), ChainBlockstore (`/blocks`), metadata, keystore.
- **Node types**: FullNode (full validation, sync, API) and StorageMiner (miner services, own repo e.g. `~/.lotusstorage`).

## Network flow

- **PubSub**: `/fil/blocks/{network}` for block headers, `/fil/msgs/{network}` for messages. Messages are usually received via pubsub before blocks; when a block is processed, messages are fetched from local blockstore or via bitswap if missing.
- **Bitswap**: Session-based bitswap fetches missing messages during block processing. Optional `LOTUS_ENABLE_CHAINSTORE_FALLBACK=1` wraps blockstores for transparent network fetch on any missing Get. Monitor with `LOTUS_ENABLE_MESSAGE_FETCH_INSTRUMENTATION=1`.

## Usage for agents

- Reason about chain growth in terms of tipsets and weight; use ChainHead/ChainGetTipSet for current head.
- To push transactions use MpoolPushMessage (assigns nonce, signs, pushes) or MpoolPush for pre-signed messages.
- State queries go through State* APIs; chain data through Chain* APIs. Gas estimation: GasEstimateMessageGas, GasEstimateFeeCap, GasEstimateGasPremium.

## Key points

- Heaviest tipset wins; no single "block difficulty."
- Builtin actors only; no user-deployed contracts in the native VM (FEVM is separate).
- Sync and block validation are multi-stage; block validation includes beacon, VRF, winning PoSt, message validity, and state root checks.

<!--
Source references:
- sources/filecoin/documentation/en/architecture/architecture.md
- sources/filecoin/documentation/en/about.md
- https://spec.filecoin.io
-->
