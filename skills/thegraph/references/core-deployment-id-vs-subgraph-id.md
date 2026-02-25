---
name: thegraph-core-deployment-id-vs-subgraph-id
description: Subgraph ID vs Deployment ID — when to use which for querying and version pinning.
---

# The Graph — Subgraph ID vs Deployment ID

Queries can target a subgraph by **Subgraph ID** (all versions) or **Deployment ID** (one version). Both are visible in Subgraph Studio.

## Deployment ID

- **What it is**: IPFS hash of the compiled subgraph manifest (that version's deployment).
- **Querying**: Use the deployments endpoint, e.g. `https://gateway-arbitrum.network.thegraph.com/api/<api-key>/deployments/id/<DEPLOYMENT_ID>`.
- **Behavior**: Pins a **specific version**. No automatic switch to a new deployment when you publish again.
- **Use when**: Production when you need stable, predictable results and are okay updating the endpoint when you intentionally move to a new version.

## Subgraph ID

- **What it is**: Stable identifier for the subgraph; same across all versions.
- **Querying**: Use the subgraphs endpoint, e.g. `https://gateway-arbitrum.network.thegraph.com/api/<api-key>/subgraphs/id/<SUBGRAPH_ID>`.
- **Behavior**: Resolves to the **latest published version**. After a new publish, indexers need time to sync; queries may still hit the previous version temporarily. New versions can introduce breaking schema changes.
- **Use when**: Development or when you always want the latest version and can handle sync delay and possible breaking changes.

## Comparison

| Aspect | Deployment ID | Subgraph ID |
|--------|----------------|-------------|
| Version | Single deployment | Latest version |
| Maintenance | Update endpoint when you adopt a new version | No endpoint change |
| Best for | Production, stability | Development, "always latest" |

## Grafting and other references

For **grafting**, the `graft.base` in the manifest must be the **Deployment ID** of the base subgraph, not the Subgraph ID. Find the Deployment ID in Studio or from the compiled manifest's IPFS hash.

## Key points

- Prefer **Deployment ID** in production for version control and consistency.
- Use **Subgraph ID** when you want automatic latest and can tolerate sync lag and breaking changes.
- Never use Subgraph ID as `graft.base`; use Deployment ID only.

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/querying/subgraph-id-vs-deployment-id/
-->
