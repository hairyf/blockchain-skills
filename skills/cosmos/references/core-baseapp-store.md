---
name: cosmos-baseapp-store
description: BaseApp, ABCI, routers, volatile states; multistore, KVStore, IAVL, wrappers.
---

# BaseApp and Store

## BaseApp

BaseApp implements the ABCI and routing layer:

- **ABCI**: CheckTx, FinalizeBlock, Commit, InitChain, PrepareProposal, ProcessProposal. CometBFT sends transaction bytes; BaseApp decodes, validates, routes messages, and returns results.
- **Msg service router**: Routes `sdk.Msg` by `type_url` to module Msg services.
- **gRPC query router**: Routes gRPC queries to module Query services.
- **AnteHandler**: Signature verification, fees, pre-message checks (CheckTx and FinalizeBlock).
- **Volatile states**: `checkState` (CheckTx), `finalizeBlockState` (FinalizeBlock), `prepareProposalState`, `processProposalState`. Only the commit store is persisted; others are cached/branched and reset or re-initialized on Commit.

Apps extend BaseApp (usually via `runtime.App`) and set InitChainer, PreBlocker, BeginBlocker, EndBlocker, AnteHandler.

## Store

- **Multistore**: Root store is a store of KVStores. Each module gets one or more stores identified by a key held only by that module's keeper.
- **KVStore / CommitKVStore**: Key-value interface; CommitKVStore can commit. Modules use KVStore (no commit capability) from context. Default implementation: **IAVL** store (versioned, O(log n) get/set, iterable).
- **Wrappers**: `CacheKVStore` (branch/cache for revertible writes), `GasKv` (gas on read/write), `Prefix` (key prefixing), `TraceKv`, `ListenKv`. Transient stores are discarded at end of block.
- **Context**: `ctx.KVStore(storeKey)` returns the module's KVStore (gas-wrapped). Branching the multistore gives isolated state for a block or transaction.

<!--
Source references:
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/learn/advanced/00-baseapp.md
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/learn/advanced/04-store.md
-->
