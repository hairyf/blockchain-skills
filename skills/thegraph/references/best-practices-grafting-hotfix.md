---
name: thegraph-best-practices-grafting-hotfix
description: Grafting — reusing indexed data from a base subgraph for hotfix deployment; when to use and when to avoid.
---

# The Graph — Grafting for Hotfix Deployment

Grafting lets you deploy a new subgraph that reuses the indexed data of an existing (e.g. failed) deployment up to a given block, then continues indexing from there. Use it for quick hotfixes without re-indexing from genesis.

## When to use grafting

- **Critical indexing error**: The current deployment stopped at a block; you fix the mapping and want to resume without losing history.
- **Minimize downtime**: Deploy the fixed subgraph immediately; it copies data up to the last good block and continues.
- **Data preservation**: Historical entities from the base deployment are copied; no need to re-index from block 0.

## Manifest configuration

Declare `grafting` under `features` and add a `graft` block with the **base deployment** (Deployment ID, not Subgraph ID) and the **block** number (last successfully indexed block). Set the new data source's `startBlock` to one block after that.

```yaml
specVersion: 1.3.0
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum/contract
    name: NewSmartContract
    network: sepolia
    source:
      address: '0xNewContractAddress'
      abi: Lock
      startBlock: 6000001   # one block after last indexed
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.9
      language: wasm/assemblyscript
      entities: [Withdrawal]
      abis:
        - name: Lock
          file: ./abis/Lock.json
      eventHandlers:
        - event: Withdrawal(uint256,uint256)
          handler: handleWithdrawal
      file: ./src/lock.ts
features:
  - grafting
graft:
  base: QmBaseDeploymentID   # Deployment ID of the base (failed) subgraph
  block: 6000000              # last successfully indexed block
```

## Workflow

1. **Identify** the last good block (e.g. from Studio logs).
2. **Implement** the fix in mappings (and schema if compatible).
3. **Update** manifest: new/updated data sources, `startBlock`, `features: [grafting]`, `graft.base` (Deployment ID), `graft.block`.
4. **Deploy** with `graph deploy` (or Studio).
5. **Verify** indexing from the graft block; then plan a **non-grafted** republish for long-term maintenance.

## When to avoid grafting

- **Schema incompatibility**: Changing field types or removing fields; grafted data won't match the new schema.
- **Major mapping changes**: Very different event/handler logic can make grafted state inconsistent.
- **Decentralized network (mainnet)**: Grafting is not recommended for subgraphs published to The Graph Network; prefer full re-index for reliability.

## Key points

- Use **Deployment ID** for `graft.base`, not Subgraph ID (find it in Studio or IPFS).
- Choose the graft block carefully (last correctly processed block) to avoid data loss or duplication.
- After the hotfix is stable, deploy a new version **without** grafting for ongoing maintenance.

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/best-practices/grafting-hotfix/
-->
