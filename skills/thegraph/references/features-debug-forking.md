---
name: thegraph-features-debug-forking
description: Debug a failing subgraph at block X by forking from a remote Graph Node store; avoid full re-sync during debugging.
---

# The Graph — Debug Forking

When a subgraph fails at block X on a remote Graph Node, **debug forking** lets you run a local Graph Node that fetches entity state from the remote subgraph's store up to block X. You can then deploy your fixed mappings locally starting at block X without waiting for a full sync.

## Concept

- The remote node has the subgraph synced up to block X (and serves GraphQL from that store).
- You configure the local node with a **fork-base** URL such that `<fork-base>/<subgraph-id>` is the GraphQL endpoint of that subgraph's store.
- You deploy locally with **--debug-fork &lt;subgraph-id&gt;** so the local node lazily loads entities from the remote store instead of indexing from genesis.
- Set **dataSources.source.startBlock** in the manifest to the problematic block so indexing starts there and uses the forked state.

## Deploy with forking

```bash
graph deploy <subgraph-name> --debug-fork <subgraph-id> --ipfs http://localhost:5001 --node http://localhost:8020
```

- **subgraph-id**: The failing subgraph's ID (from Studio or the remote deployment).
- The local Graph Node must be started with the appropriate **fork-base** so it can resolve the subgraph-id to the remote GraphQL endpoint.

## Workflow

1. Subgraph fails at block X on Studio or a remote node.
2. Start a local Graph Node with fork-base pointing at the remote API (e.g. Studio query URL base).
3. Set `startBlock` in the manifest to block X (or the block you want to debug from).
4. Fix the mapping and run `graph build`.
5. Deploy to the local node with `--debug-fork <subgraph-id>`.
6. Indexing runs from block X with state loaded from the remote store; reproduce the failure or verify the fix without full sync.
7. Iterate on steps 4–6 until fixed, then deploy to Studio/remote as usual.

## Key points

- fork-base is the base URL; the node appends the subgraph-id to form the store endpoint.
- Use the **subgraph ID** (not deployment ID) for `--debug-fork` when the remote serves that subgraph.
- Speeds up debug cycles by avoiding re-sync from block 0.

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/guides/subgraph-debug-forking/
-->
